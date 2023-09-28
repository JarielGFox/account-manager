// per il routing importiamo queste proprietà
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Navbar from "./components/Navbar";
import Main from "./views/Main";
import Register from "./components/Register";
import Login from "./components/Login";
import './App.css';
import EditInfo from "./views/EditInfo";

function App({ isLoggedIn, setIsLoggedIn }) {

  return (
    <Router>

      <header className="App-header">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/main" element={<Main isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/editBio" element={<EditInfo />} />
          </Routes>
        </div>
      </header>
    </Router>
  );
}

export default App;
