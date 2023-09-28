<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

require_once('../classes/dbh.classes.php');

$response = [];

if (isset($_SESSION['id'])) {
    $response['status'] = 'loggedIn';
} else {
    $response['status'] = 'notLoggedIn';
}

echo json_encode($response);
