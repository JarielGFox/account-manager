<?php

class UpdateInfo extends Dbh
{
    protected function setBiography($name, $surname, $date_of_birth, $address, $profile_pic, $biography, $account_id)
    {
        // Upsert query per inserire o modificare le personal info
        $sql = "INSERT INTO personal_info (name, surname, date_of_birth, address, profile_pic, biography, account_id) VALUES (?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE name = VALUES(name), surname = VALUES(surname), date_of_birth = VALUES(date_of_birth), address = VALUES(address), profile_pic = VALUES(profile_pic), biography = VALUES(biography)";
        $stmt = $this->connect()->prepare($sql);

        if (!$stmt->execute([$name, $surname, $date_of_birth, $address, $profile_pic, $biography, $account_id])) {
            echo json_encode(['error' => 'Statement failed']);
            http_response_code(400);
            return false;
        }

        return true;
    }

    public function getUserInfo($account_id)
    {
        $sql = "SELECT accounts.*, personal_info.* FROM accounts INNER JOIN personal_info ON accounts.id = personal_info.account_id WHERE accounts.id = ?";
        $stmt = $this->connect()->prepare($sql);
        $stmt->execute([$account_id]);
        $userData = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($userData) {
            return $userData;
        } else {
            echo json_encode(['error' => 'User not found']);
            http_response_code(404);
            exit();
        }
    }
}
