<?php
if (!isset($_SESSION)) {
    session_start();
}

class RegisterContr extends Register
{
    private $username;
    private $email;
    private $password;
    private $password_confirmation;

    public function __construct($username, $email, $password, $password_confirmation)
    {
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
        $this->password_confirmation = $password_confirmation;
    }

    public function signupUser()
    {
        if ($this->emptyInput() == false) {
            echo json_encode(['error' => 'Empty fields detected']);
            http_response_code(400);
            exit();
        }

        if ($this->invalidUser() == false) {
            echo json_encode(['error' => 'Invalid username']);
            http_response_code(400);
            exit();
        }

        if ($this->invalidEmail() == false) {
            echo json_encode(['error' => 'Invalid email']);
            http_response_code(400);
            exit();
        }

        if ($this->pwdMatch() == false) {
            echo json_encode(['error' => 'Passwords do not match']);
            http_response_code(400);
            exit();
        }

        if ($this->TakenUser() == false) {
            echo json_encode(['error' => 'Username or email already taken']);
            http_response_code(409); // 409 Conflict
            exit();
        }

        $this->setUser($this->username, $this->email, $this->password);
    }

    private function emptyInput()
    {
        return !(empty($this->username) || empty($this->email) || empty($this->password) || empty($this->password_confirmation));
    }

    private function invalidUser()
    {
        return preg_match("/^[a-zA-Z0-9]*$/", $this->username);
    }

    private function invalidEmail()
    {
        return filter_var($this->email, FILTER_VALIDATE_EMAIL);
    }

    private function pwdMatch()
    {
        return $this->password === $this->password_confirmation;
    }

    private function TakenUser()
    {
        $result = $this->checkUser($this->username, $this->email);
        return $result;
    }
}
