// importiamo Link dalla libreria
import { Link } from 'react-router-dom';

const Navbar = ({ handleLogout }) => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <h1 className="text-primary">Control Panel</h1>

            <div className="container-fluid">
                {/* nei link tags c'è una funz speciale che previene la richiesta al server */}
                {/* tramite il router, inietta nel browser il percorso al singolo componente */}
                <Link to="/" className="navbar-brand">Home</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
                            <Link to="/" aria-disabled>Some Stuff</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    );
}

export default Navbar;