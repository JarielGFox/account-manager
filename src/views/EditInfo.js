import { useState } from "react";
import ShowMessage from "../components/ShowMessage";

const EditInfo = () => {
    const [info, setInfo] = useState({
        name: '',
        surname: '',
        date_of_birth: '',
        address: '',
        biography: '',
        profile_pic: '',
    });

    //stato per il messaggio di errore
    const [messageFromServer, setMessageFromServer] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo({
            ...info,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/php/includes/updateInfo.inc.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(info)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong!');
            }

            setMessageFromServer(JSON.stringify(data));
        } catch (error) {
            console.error('There was a problem updating info:', error.message)
            setMessageFromServer(JSON.stringify({ error: error.message }));
        }
    }

    return (
        <>
            <ShowMessage messageFromServer={messageFromServer} />
            <form onSubmit={handleSubmit}>
                <label htmlFor="name" className="form-label">
                    Nome
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="first name"
                    className="form-control"
                    onChange={handleChange}
                />

                <label htmlFor="surname" className="form-label">
                    Cognome
                </label>
                <input
                    type="text"
                    name="surname"
                    id="surname"
                    placeholder="surname"
                    className="form-control"
                    onChange={handleChange}
                />

                <label htmlFor="date_of_birth" className="form-label">
                    Data di nascita
                </label>
                <input
                    type="date"
                    name="date_of_birth"
                    id="date_of_birth"
                    placeholder="date of birth"
                    className="form-control"
                    onChange={handleChange}
                />

                <label htmlFor="address" className="form-label">
                    Indirizzo
                </label>
                <textarea
                    name="address"
                    id="address"
                    placeholder="your address"
                    className="form-control"
                    onChange={handleChange}
                />

                <label htmlFor="biography" className="form-label">
                    Biografia
                </label>
                <textarea
                    name="biography"
                    id="biography"
                    placeholder="a short biography"
                    className="form-control"
                    onChange={handleChange}
                />

                <label htmlFor="profile_pic" className="form-label">
                    Avatar
                </label>
                <input
                    type="text"
                    name="profile_pic"
                    id="profile_pic"
                    placeholder="immagine profilo"
                    className="form-control"
                    onChange={handleChange}
                />

                <button type="submit" className="btn btn-primary">Aggiorna Info</button>
            </form>
        </>
    );
}

export default EditInfo;