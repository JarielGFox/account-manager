<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

require_once('../classes/dbh.classes.php');
require_once('../classes/updateInfo.classes.php');

$account_id = $_SESSION['id'];

//istanza di UpdateInfo() class
$updateInfo = new UpdateInfo();

//fetchiamo le user info
$userInfo = $updateInfo->getUserInfo($account_id);

//utente trovato
if ($userInfo) {
    echo json_encode($userInfo);
    http_response_code(200);
    // utente non trovato
} else {
    echo json_encode(['error' => 'No data found for this user']);
    http_response_code(404);
}
