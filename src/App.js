import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import Calendar from "./components/Calendar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div>
        <div className="calendar-container">
          <Navbar />
          <header>
            <h1>Modern Calendar App</h1>
            <p>A beautiful and intuitive way to organize your schedule.</p>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Calendar />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </main>
        </div>
        <footer className="footer">
          <p>&copy; 2024 Modern Calendar App. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
