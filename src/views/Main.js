import Dashboard from "../components/Dashboard";
import { useNavigate } from "react-router-dom";

const Main = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8000/php/includes/logout.inc.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong')
            }

            console.log('Successfully logged out!');
            navigate('/login');
        } catch (error) {
            console.error('There was a problem with the logout:', error.message);
        }

    }

    return (
        <div className="dashboard">
            <Dashboard handleLogout={handleLogout} />
        </div>
    );
}

export default Main;