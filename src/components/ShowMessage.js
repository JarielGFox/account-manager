import { useState, useEffect } from "react";

const ShowMessage = ({ messageFromServer }) => {
    const [message, setMessage] = useState('');

    // determiniamo se il messaggio è 'error' or 'success'
    const [messageType, setMessageType] = useState('');


    useEffect(() => {
        //se messageFromServer esiste, altrimenti il blocco non verrà eseguito
        if (messageFromServer) {
            //fin quando il messaggio è JSON verrà parsato in oggetto JS
            const parsedMessage = JSON.parse(messageFromServer);
            if (parsedMessage.error) {
                setMessage(parsedMessage.error);
                setMessageType('error');
            } else if (parsedMessage.success) {
                setMessage(parsedMessage.success);
                setMessageType('success');
            }
        }
    }, [messageFromServer]);


    return (
        <div>
            {message ? (
                <div className={`message-box ${messageType}`}>
                    {message}
                </div>
            ) : null}
        </div>
    );
}

export default ShowMessage;