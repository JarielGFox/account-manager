import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import ShowMessage from "./ShowMessage";

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
    // State del form
    const [formLogin, setFormLogin] = useState({
        username: "",
        password: "",
    });


    // redirect automatico con Navigate
    const navigate = useNavigate();

    //stato per mostrare la password
    const [showPassword, setShowPassword] = useState(false);

    //stato per il messaggio di errore
    const [messageFromServer, setMessageFromServer] = useState(null);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormLogin((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/php/includes/login.inc.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formLogin)
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            setMessageFromServer(JSON.stringify(data));
            setIsLoggedIn(true);
            navigate('/main');  // Navigate to the Main.js view
        } catch (error) {
            console.error('There was a problem with the login:', error.message)
            setMessageFromServer(JSON.stringify({ error: error.message }));
        }
    };

    return (
        <div>
            <ShowMessage messageFromServer={messageFromServer} />
            <form onSubmit={handleLogin}>
                <label htmlFor="username" className="form-label">
                    Username
                </label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    className="form-control"
                    value={formLogin.username}
                    onChange={handleChange}
                />

                <label htmlFor="password" className="form-label">
                    Password
                </label>
                <i className="bi bi-eye-fill btn button" id="eyePassword" onClick={() => setShowPassword(!showPassword)}></i>
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="form-control"
                    value={formLogin.password}
                    onChange={handleChange}
                />
                <button className="btn btn-primary" type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
