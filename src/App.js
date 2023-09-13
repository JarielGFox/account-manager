// per il routing importiamo queste proprietà
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Main from "./views/Main";
import Register from "./components/Register";
import Login from "./components/Login";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/main" element={<Main />} />
            </Routes>
          </div>
        </header>
      </div>
    </Router>
  );
}

export default App;
