// per il routing importiamo queste proprietà
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Register from "./components/Register";
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
            </Routes>
          </div>
        </header>
      </div>
    </Router>
  );
}

export default App;
