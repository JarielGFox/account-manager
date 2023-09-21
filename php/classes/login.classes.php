<?php

class Login extends Dbh
{
    // metodo che estende la classe Database handler, prende un utente basato su username e pwd
    protected function getUser($username, $password)
    {
        //prepariamo uno statement SQL dove email o username restituiscono un input
        //il metodo prepare restituisce un PDO statement object
        $stmt = $this->connect()->prepare('SELECT password FROM accounts WHERE username = ? OR email = ?;');

        //esegue lo statement preparato sopra, se fallisce restituisce un messaggio JSON ed imposta un HTTP response code a 400.
        if (!$stmt->execute(array($username, $password))) {
            echo json_encode(['error' => 'Statement failed']);
            http_response_code(400);
            exit();
        }

        //controlla se la query restituisce qualsiasi riga, sennò vuol dire che non trova l'utente, hence 404
        if ($stmt->rowCount() == 0) {
            echo json_encode(['error' => 'User not found']);
            http_response_code(404);
            exit();
        }

        //prende tutte le righe restituite dalla query in un array associativo
        $pwdHashed = $stmt->fetchAll(PDO::FETCH_ASSOC);
        //utilizza la funzione PHP password_verify() per controllare se la password hashata nel DB corrisponde a quella inserita
        $checkPwd = password_verify($password, $pwdHashed[0]['password']);

        //se la password è sbagliata restituisce errore 401
        if ($checkPwd == false) {
            echo json_encode(['error' => 'Wrong password']);
            http_response_code(401);
            exit();
            //se la password è giusta, invece, prepariamo un altro statement e si prendono i dettagli dell'utente
        } elseif ($checkPwd == true) {
            $stmt = $this->connect()->prepare('SELECT * FROM accounts WHERE username = ? OR email = ? AND password = ?;');

            if (!$stmt->execute(array($username, $username, $password))) {
                echo json_encode(['error' => 'Statement failed']);
                http_response_code(400);
                exit();
            }

            if ($stmt->rowCount() == 0) {
                echo json_encode(['error' => 'User not found']);
                http_response_code(404);
                exit();
            }

            $user = $stmt->fetchAll(PDO::FETCH_ASSOC);

            //viene inizializzata una nuova sessione e lo username viene salvato nell'array della superglobal $_SESSION
            session_unset();
            session_destroy();
            session_start();

            $_SESSION['id'] = $user[0]['id'];
            $_SESSION['username'] = $user[0]['username'];

            //Se tutto è andato per il verso giusto, il metodo restituisce i dettagli dell'utente in un array JSON.
            echo json_encode(['user' => [
                'id' => $user[0]['id'],
                'username' => $user[0]['username'],
                'account_id' => $user[0]['id']
            ]]);
            exit();
        }
    }
}
