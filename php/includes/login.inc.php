<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    exit;
}

require_once('../classes/dbh.classes.php');
require_once('../classes/login.classes.php');
require_once('../classes/logincontr.classes.php');


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
    // echo ['success' => 'Welcome ' . $_SESSION['username']];
    // Da spostare magari all'interno della dashboard
    http_response_code(200);
}
