import { Link } from 'react-router-dom';
import digitalclochard from '../assets/img/digitalclochard.gif';

const Home = () => {
    return (
        <div>
            <p>
                Welcome to Barbone digitale.
            </p>
            <img src={digitalclochard} className="logo" alt="logo" />

            <p>
                Registrati ed inizia il tuo sogno nella digital homelessness.
            </p>
            <p>
                <Link to="/register">Registrati</Link>
            </p>
            <p>Hai già un account?</p>
            <p>
                <Link to="/login">LOGIN</Link>
            </p>
        </div>
    );
}

export default Home;