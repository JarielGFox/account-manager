<?php
//prendiamo la sessione esistente, per fare l'unset ci serve per forza lo start
session_start();
//svuota tutte le variabili di sessione e pulisce l'array della superglobal $_SESSION
session_unset();
//distrugge la sessione storata sul server
session_destroy();

echo json_encode(['success' => 'Successfully logged out']);
http_response_code(200);
