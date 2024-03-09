// AddDayBox.js
import React from "react";
import { useNavigate } from "react-router-dom";

const AddDayBox = ({ addDay }) => {
  const navigate = useNavigate();

  const handleAddDay = () => {
    addDay(); // Call the addDay function passed from the parent component
  };

  return (
    <div className="add-day-box" onClick={handleAddDay}>
      <span>+</span>
    </div>
  );
};

export default AddDayBox;
