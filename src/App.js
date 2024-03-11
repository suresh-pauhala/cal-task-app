//App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import ClickedInfo from "./components/ClickedInfo";
import "./App.css";
import Calendar from "./components/Calendar";

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
              <Route path="/">
                <Route index element={<Calendar />} />
                <Route path="/new-page" element={<ClickedInfo />} />
              </Route>
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
