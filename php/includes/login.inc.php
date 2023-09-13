<?php

require_once('../classes/dbh.classes.php');
require_once('../classes/login.classes.php');
require_once('../classes/logincontr.classes.php');

if (isset($_POST['submit'])) {
    //prendiamo i dati necessari al login
    $username = $_POST['username'];
    $password = $_POST['password'];

    //istanziamo la classe
    $login = new LoginContr($username, $password);

    //error handler
    $login->loginUser();

    // Se tutto è andato bene, mostriamo il messaggio
    echo json_encode(['success' => 'Welcome ' . $_SESSION['username']]);
    http_response_code(200);
}
