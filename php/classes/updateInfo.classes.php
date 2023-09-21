<?php

class UpdateInfo extends Dbh
{
    protected function setBiography($name, $surname, $date_of_birth, $address, $profile_pic, $biography, $account_id)
    {
        // Fetch existing data
        $sql = "SELECT * FROM personal_info WHERE account_id = ?";
        $stmt = $this->connect()->prepare($sql);
        $stmt->execute([$account_id]);
        $existingData = $stmt->fetch(PDO::FETCH_ASSOC);


        // Compare existing data with new data
        if (
            $existingData['name'] === $name &&
            $existingData['surname'] === $surname &&
            $existingData['date_of_birth'] === $date_of_birth &&
            $existingData['address'] === $address &&
            $existingData['profile_pic'] === $profile_pic &&
            $existingData['biography'] === $biography
        ) {
            // If the info is the same as before, exit and do nothing
            return false;
        }

        // Otherwise, update the info
        $sql = "UPDATE personal_info SET name = ?, surname = ?, date_of_birth = ?, address = ?, profile_pic = ?, biography = ? WHERE account_id = ?";
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
