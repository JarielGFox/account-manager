<?php

class LoginContr extends Login
{
    private $username;
    private $password;

    public function __construct($username, $password)
    {
        $this->username = $username;
        $this->password = $password;
    }

    public function loginUser()
    {
        if ($this->emptyInput() == false) {
            echo json_encode(['error' => 'Username or password cannot be empty!']);
            http_response_code('400');
            exit();
        }

        $this->getUser($this->username, $this->password);
    }

    public function emptyInput()
    {
        return !(empty($this->password) || empty($this->username));
    }
}
