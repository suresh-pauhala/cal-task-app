import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DayBox = ({ offset, onAddTask }) => {
  const navigate = useNavigate();
  const [titles, setTitles] = useState(["", "", "", ""]); // Default empty titles
  const [added, setAdded] = useState(false); // State to track whether titles have been added
  const date = new Date();
  date.setDate(date.getDate() + offset);

  // Format the date as "dd-mm-yyyy"
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const handleTitleChange = (index, value) => {
    const newTitles = [...titles];
    newTitles[index] = value;
    setTitles(newTitles);
  };

  const handleAddTask = () => {
    if (!added) {
      const date = new Date();
      date.setDate(date.getDate() + offset);
      const jsonData = JSON.stringify({
        date: date.toISOString().split("T")[0],
        titles: titles.filter((title) => title !== ""), // Filter out empty titles
      });
      //show MasterData
      onAddTask(offset, titles);
      //Post Data
      fetch("http://localhost:8000/weekly_workout_summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => console.log(data))
        .catch((error) => {
          console.error("Error sending data:", error);
        });
    }
    setAdded(!added); // Toggle the added state
  };

  const handleTitleClick = (title) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    const clickedData = { date: date.toISOString().split("T")[0], title };
    const jsonData = JSON.stringify(clickedData);
    localStorage.setItem("clickedData", jsonData); // Store data for new page
    navigate("/new-page"); // Redirect to new page using useNavigate
  };

  return (
    <div className="day-box">
      <div className="date">{formattedDate}</div>
      {added // If titles are added, render clickable buttons
        ? titles.map(
            (title, index) =>
              title && (
                <button
                  key={index}
                  className="button-13"
                  onClick={() => handleTitleClick(title)}
                >
                  {title} {/* Show the title */}
                </button>
              )
          )
        : // If titles are not added, render input fields
          titles.map((title, index) => (
            <input
              key={index}
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(index, e.target.value)}
              placeholder={`Title ${index + 1}`}
              className="title-input"
            />
          ))}
      <button className="add-task-button" onClick={handleAddTask}>
        {added ? "Edit Task" : "Add Task"}{" "}
      </button>
    </div>
  );
};

export default DayBox;
