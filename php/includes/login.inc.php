<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

require_once('../classes/dbh.classes.php');
require_once('../classes/login.classes.php');
require_once('../classes/logincontr.classes.php');

if (!isset($_SESSION)) {
    session_start();
}

$rawData = file_get_contents('php://input');
$jsonData = json_decode($rawData, true);

// perchè nella chiamata API il content-type è application/json
if (!empty($jsonData)) {
    //prendiamo i dati necessari al login
    $username = $jsonData['username'];
    $password = $jsonData['password'];

    //istanziamo la classe
    $login = new LoginContr($username, $password);

    //error handler
    $login->loginUser();

    // Se tutto è andato bene, mostriamo il messaggio
    echo json_encode(['success' => 'Welcome ' . $_SESSION['username']]);
    http_response_code(200);
}
