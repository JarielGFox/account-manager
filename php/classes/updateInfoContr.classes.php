<?php

class UpdateInfoContr extends UpdateInfo
{
    private $name;
    private $surname;
    private $date_of_birth;
    private $address;
    private $profile_pic;
    private $biography;
    private $account_id;


    public function __construct($name, $surname, $date_of_birth, $address, $profile_pic, $biography, $account_id)
    {
        $this->name = $name;
        $this->surname = $surname;
        $this->date_of_birth = $date_of_birth;
        $this->address = $address;
        $this->profile_pic = $profile_pic;
        $this->biography = $biography;
        $this->account_id = $account_id;
    }

    public function addBiography()
    {
        if ($this->emptyBio() == false) {
            echo json_encode(['error' => 'Empty fields detected']);
            http_response_code(400);
            return false;
        }

        $result = $this->setBiography($this->name, $this->surname, $this->date_of_birth, $this->address, $this->profile_pic, $this->biography, $this->account_id);

        if ($result === false) {
            // Handle the case where no update was needed (existing data matches new data)
            echo json_encode(['info' => 'No changes were made']);
            http_response_code(200);  // 200 OK
            return false;
        }

        return true;
    }

    private function emptyBio()
    {
        return !(empty($this->name) || empty($this->surname) || empty($this->date_of_birth) || empty($this->address) || empty($this->profile_pic) || empty($this->biography));
    }
}
