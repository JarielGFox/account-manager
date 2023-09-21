<?php

class Register extends Dbh
{
    //metodo che registra nuovo utente
    protected function setUser($username, $email, $password)
    {
        //prepariamo l'SQL statement con i placeholder da bindare per evitare SQLInjections
        $stmt = $this->connect()->prepare('INSERT INTO accounts (username, email, password, role) VALUES (?,?,?,0)');
        //crea una password hashata tramite la funzione di PHP password_hash()
        $hashedpsw = password_hash($password, PASSWORD_DEFAULT);

        // var_dump($username, $hashedpsw, $email);

        //esegue lo statement preparato, se fallisce manda un JSON error message ed imposta il response code a 400
        if (!$stmt->execute(array($username, $email, $hashedpsw))) {
            echo json_encode((['error' => 'Statement failed']));
            http_response_code(400);
            exit();
        }
    }

    //questo metodo va a controllare se l'utente è presente nel DB con username o psw
    protected function checkUser($username, $email)
    {
        //statement preparato e cerca tra l'user selezionato o la mail selezionata
        $stmt = $this->connect()->prepare('SELECT username FROM accounts WHERE username = ? OR email = ?;');

        // var_dump($username, $email);

        //esegue lo statement preparato con l'email e l'username
        $stmt->execute(array($username, $email));

        //se lo statement dà errore, manda un JSON error message ed imposta il response code a 400
        if ($stmt->errorInfo()[0] !== '00000') {
            echo json_encode(['error' => 'Failed to execute statement']);
            http_response_code(400);
            exit();
        }

        //controlla se la query restituisce una riga, se si allora l'utente in questione esiste
        $userExists = $stmt->rowCount() > 0;
        $stmt->closeCursor();

        //restituisce true se un utente con la stessa mail o username esiste, sennò false
        return !$userExists;
    }
}
