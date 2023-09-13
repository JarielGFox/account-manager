import { Link } from 'react-router-dom';
import digitalclochard from '../assets/img/digitalclochard.gif';

const Home = () => {
    return (
        <div>
            <img src={digitalclochard} className="logo" alt="logo" />
            <p>
                Welcome to Barbone digitale.
            </p>
            <p>
                Registrati ed inizia il tuo sogno nella digital homelessness.
            </p>
            <p>
                <Link to="/register">Registrati</Link>
            </p>
        </div>
    );
}

export default Home;