import Dashboard from "../components/Dashboard";

const Main = ({ isLoggedIn, setIsLoggedIn }) => {


    return (
        <div className="dashboard">
            <Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>
    );
}

export default Main;