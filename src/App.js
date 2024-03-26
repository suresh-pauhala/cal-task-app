import React, { useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import Calendar from "./components/Calendar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";
import Header from "./components/Header";

const App = () => {
  const bottomRef = useRef(null);

  const scrollToMain = () => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <Router>
      <div>
        <div className="calendar-container">
          <Navbar />
          <Header scrollToMain={scrollToMain} />
          <main ref={bottomRef}>
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
