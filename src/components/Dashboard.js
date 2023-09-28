// importiamo Link dalla libreria
import { Link } from 'react-router-dom';

const Dashboard = ({ handleLogout }) => {
    return (
        <div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <button onClick={handleLogout}>Logout</button>
                </li>v
                <li className="nav-item">
                    <Link className="nav-link" href="#">Link</Link>
                </li>
                <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
                        Dropdown
                    </Link>
                    <ul className="dropdown-menu">
                        <li><Link to="/">Some Stuff</Link></li>
                        <li><Link to="/">Another Action</Link></li>

                        <li><Link className="dropdown-item" href="#">Something else here</Link></li>
                    </ul>
                </li>
                <li className="nav-item">
                    <Link to="/editBio" aria-disabled>Aggiorna Info</Link>
                </li>
            </ul>
        </div>
    );
}

export default Dashboard;