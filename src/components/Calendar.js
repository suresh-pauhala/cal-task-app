import React, { useState } from "react";
import DayBox from "./DayBox";
import AddDayBox from "./AddDayBox";
import Titles from "./Titles";

const Calendar = () => {
  const [days, setDays] = useState([0, 1, 2, 3, 4, 5, 6]); // Initial state with 6 days
  const [masterData, setMasterData] = useState([]);

  const handleAddTitles = (titles) => {
    console.log("Titles added:", titles);
    // implement logic to handle the added titles here
  };

  const addDay = () => {
    if (days.length < 10) {
      // Check if the number of days is less than 10
      // Calculate the offset for the new day
      const newDayOffset = days.length;
      // Add the new day to the days array
      setDays([...days, newDayOffset]);
    }
  };

  const handleAddTask = (offset, { id, title }) => {
    // Construct JSON object containing all titles
    const date = new Date();
    date.setDate(date.getDate() + offset);
    const jsonData = JSON.stringify({
      date: date.toISOString().split("T")[0],
      title: title, // Filter out empty titles
    });

    fetch("http://localhost:8000/weekly_workout_summary")
      .then((response) => response.json())
      .then((data) => setMasterData(data));
  };

  return (
    <div>
      <div className="calendar">
        {/* Day boxes */}
        {days.map((offset) => (
          <DayBox key={offset} offset={offset} onAddTask={handleAddTask} />
        ))}
        <Titles onAddTitles={handleAddTitles} />
        {/* Box to add further days */}
        <AddDayBox addDay={addDay} />
      </div>
      {/* Render the fetched data table outside the calendar container */}
      {masterData.length > 0 && (
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Body Part</th>
                <th>Exercise Count</th>
                <th>Total Calories Burned</th>
                <th>Protein Intake</th>
              </tr>
            </thead>
            <tbody>
              {masterData.map((item, index) => (
                <tr key={index}>
                  <td>{item.body_part}</td>
                  <td>{item.exercise_count}</td>
                  <td>{item.total_calories_burned}</td>
                  <td>{item.protein_intake}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Calendar;
