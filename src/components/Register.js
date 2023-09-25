import { useState } from "react";
import ShowMessage from "./ShowMessage";

const Register = () => {
    //stato dei dati da compilare, all'inizio stringa vuota
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    //nuovo stato per il messaggio di errore
    const [messageFromServer, setMessageFromServer] = useState(null);

    //quando un input field cambia, lo stato viene aggiornato
    const handleChange = (e) => {
        //destrutturiamo nome dell'input field e valore di ciò che viene inserito nel field
        const { name, value } = e.target;
        //funzione che aggiorna lo stato
        setFormData({
            ...formData,
            [name]: value
        });
    };

    //al click del submit parte la funzione
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/php/includes/register.inc.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }
            // Aggiorna il messaggio dal server
            setMessageFromServer(JSON.stringify(data));
            // Qua volendo si può reindirizzare l'user al login con un setTimeOut
        } catch (error) {
            console.error('There was a problem with the registration:', error.message);
            // Aggiorna il messaggio dal server
            setMessageFromServer(JSON.stringify({ error: error.message }));
        }
    };


    return (
        <div>
            <ShowMessage messageFromServer={messageFromServer} />
            <form onSubmit={handleSubmit}>

                <label htmlFor="username" className="form-label">Username</label>
                <input type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.username}
                />

                <label htmlFor="email" className="form-label">E-mail</label>
                <input type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.email}
                />

                <label htmlFor="password" className="form-label">Password</label>
                <input type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.password}
                />

                <label htmlFor="password_confirmation" className="form-label">Confirm password</label>
                <input type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                    placeholder="Confirm Password"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.password_confirmation}
                />


                <button className="btn btn-primary" type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;