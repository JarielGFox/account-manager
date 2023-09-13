import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    // State del form
    const [formLogin, setFormLogin] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

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
                body: JSON.stringify(formLogin)
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            console.log('User logged in correctly:', data);
            navigate('/main');  // Navigate to the Main.js view
        } catch (error) {
            console.error('There was a problem with the login:', error.message)
        }
    };

    return (
        <div>
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
                <input
                    type="password"
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
