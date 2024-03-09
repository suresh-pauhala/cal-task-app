// Titles.js
import React, { useState } from "react";

const Titles = ({ onAddTitles }) => {
  const [titleInputs, setTitleInputs] = useState(["", "", "", ""]);

  const handleInputChange = (index, value) => {
    const newInputs = [...titleInputs];
    newInputs[index] = value;
    setTitleInputs(newInputs);
  };

  const handleAddTitles = () => {
    onAddTitles(titleInputs);
  };

  return (
    <div id="task-form" className="task-form">
      {titleInputs.map((title, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Title ${index + 1}`}
          value={title}
          onChange={(e) => handleInputChange(index, e.target.value)}
        />
      ))}
      <button type="button" onClick={handleAddTitles}>
        Add Titles
      </button>
    </div>
  );
};

export default Titles;
