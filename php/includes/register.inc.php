<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

require_once('../classes/dbh.classes.php');
require_once('../classes/register.classes.php');
require_once('../classes/registercontr.classes.php');

if (!isset($_SESSION)) {
    session_start();
}

// perchè nella chiamata API il content-type è application/json
$rawData = file_get_contents('php://input');
$jsonData = json_decode($rawData, true);

if (!empty($jsonData)) {

    $username = $jsonData['username'];
    $email = $jsonData['email'];
    $password = $jsonData['password'];
    $password_confirmation = $jsonData['password_confirmation'];

    $register = new RegisterContr($username, $email, $password, $password_confirmation);

    //error handlers
    $register->signupUser();

    //Registrazione completata
    echo json_encode(['success' => 'New user successfully registered']);
    http_response_code(201);  // 201 Created
}
