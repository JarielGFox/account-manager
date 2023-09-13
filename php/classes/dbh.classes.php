<?php
if (!isset($_SESSION)) {
    session_start();
}

class Dbh
{
    // metodo protected, si accede o all'interno di questa classe o dalle classi che lo ereditano
    protected function connect()
    {
        //informazioni del db salvate in variabili
        $db_engine = 'mysql';
        $db_host = 'localhost';
        $db_name = 'account_management';
        $db_user = 'root';
        $db_password = 'root';

        //creiamo la data source name con i dati di cui sopra
        $dsn = "$db_engine:host=$db_host;dbname=$db_name";

        // utilizziamo un blocco try catch per effettuare connessione al DB. Se la connessione fallisce, andrà al catch block.
        try {
            // creiamo una nuova istanza della PDO passando i parametri al costruttore in modo da stabilire connessione al DB
            $dbh = new PDO($dsn, $db_user, $db_password);
            // nel qual caso avremo errori saranno gestiti dagli attributi ATTR_ERRMODE e ERRMODE_EXCEPTION
            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $dbh;
        } catch (PDOException $e) {
            // verrà mostrato quale errore si è avuto tramite JSON error message
            echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
            http_response_code(500); // 500 Internal Server Error
            die();
        }
    }
}
