<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

require_once('../classes/dbh.classes.php');
require_once('../classes/updateInfo.classes.php');
require_once('../classes/updateInfoContr.classes.php');

$rawData = file_get_contents('php://input');
$jsonData = json_decode($rawData, true);

if (!empty($jsonData)) {
    $name = $jsonData['name'];
    $surname = $jsonData['surname'];
    $date_of_birth = $jsonData['date_of_birth'];
    $address = $jsonData['address'];
    $profile_pic = $jsonData['profile_pic'];
    $biography = $jsonData['biography'];
    $account_id = $_SESSION['id'];

    $editInfo = new UpdateInfoContr($name, $surname, $date_of_birth, $address, $profile_pic, $biography, $account_id);

    //error handlers:
    $editInfo->addBiography();

    //Dati modificati:
    echo json_encode(['success' => 'Info successfully updated!']);
    http_response_code(201);
}
