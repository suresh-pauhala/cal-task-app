import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import ClickedInfo from "./components/ClickedInfo";
import "./App.css";
import Calendar from "./components/Calendar";

const App = () => {
  return (
    <Router>
      <div className="calendar-container">
        <Navbar />
        <Routes>
          <Route path="/">
            <Route index element={<Calendar />} />
            <Route path="/new-page" element={<ClickedInfo />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
