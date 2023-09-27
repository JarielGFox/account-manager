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
                Registrati ed inizia il tuo viaggio nella digital homelessness.
            </p>
        </div>
    );
}

export default Home;