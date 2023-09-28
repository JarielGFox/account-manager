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

//prendiamo la sessione esistente, per fare l'unset ci serve per forza lo start
session_start();
//svuota tutte le variabili di sessione e pulisce l'array della superglobal $_SESSION
session_unset();
//distrugge la sessione storata sul server
session_destroy();

echo json_encode(['success' => 'Successfully logged out']);
http_response_code(200);
