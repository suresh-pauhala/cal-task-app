import React, { useState } from "react";
import DayBox from "./DayBox";
import AddDayBox from "./AddDayBox";
import Titles from "./Titles";
const Calendar = () => {
  const [days, setDays] = useState([0, 1, 2, 3, 4, 5, 6]); // Initial state with 6 days
  const handleAddTitles = (titles) => {
    console.log("Titles added:", titles);
    //implement logic to handle the added titles here
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
  return (
    <div className="calendar">
      {/* Day boxes */}
      {days.map((offset) => (
        <DayBox key={offset} offset={offset} />
      ))}
      <Titles onAddTitles={handleAddTitles} />
      {/* Box to add further days */}
      <AddDayBox addDay={addDay} />
    </div>
  );
};

export default Calendar;
