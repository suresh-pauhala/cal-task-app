import React, { useState } from "react";
import DayBox from "./DayBox";
import AddDayBox from "./AddDayBox";
import Titles from "./Titles";
import DataDisplay from "./DataDisplay";
import { v4 as uuidv4 } from "uuid";
import Spinner from "../components/Spinner";
import DataLoadingError from "./DataLoadingError";

const Calendar = () => {
  const [sessionId] = useState(uuidv4());

  const [days, setDays] = useState([0, 1, 2, 3, 4, 5, 6]); // Initial state with 6 days
  // const [taskIdsByDay, setTaskIdsByDay] = useState({}); // State to store task IDs by day
  const [masterData, setMasterData] = useState({}); // State to store fetched data
  const [isLoadingPopup, setIsLoading] = useState(false); // State to track loading of popup data
  const [dataLoadingError, setDataLoadingError] = useState(false);

  const handleAddTitles = (titles) => {
    console.log("Titles added:", titles);
    // Implement logic to handle the added titles here
  };

  const addDay = () => {
    // Check if the number of days is less than 10
    if (days.length < 10) {
      // Calculate the offset for the new day
      const newDayOffset = days.length;
      // Add the new day to the days array
      setDays([...days, newDayOffset]);
      // Initialize task IDs for the new day
      // setTaskIdsByDay((prevTaskIds) => ({
      //   ...prevTaskIds,
      //   [newDayOffset]: [],
      // }));
    }
  };

  const handleAddTask = (offset, { id, title }) => {
    setIsLoading(true);
    setDataLoadingError(false);
    console.log("Loading popup must be true:", isLoadingPopup);

    const date = new Date();
    date.setDate(date.getDate() + offset);
    const jsonData = JSON.stringify({
      date: date.toISOString().split("T")[0],
      title: title,
    });
    const week_reference_id = "week123";

    fetch(
      `https://falsk-mongo.onrender.com/master_summary?week_reference_id=${week_reference_id}&session_id=${sessionId}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMasterData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
        setDataLoadingError(true);
      });
  };

  return (
    <div>
      <div className="calendar">
        {/* Day boxes */}
        {days.map((offset, index) => (
          <DayBox
            key={offset}
            offset={offset}
            sessionId={sessionId}
            onAddTask={(taskId, title) => handleAddTask(offset, taskId, title)}
            isFirstDay={index === 0}
            //taskIds={taskIdsByDay[offset] || []} // Pass task IDs for the day
          />
        ))}
        <Titles onAddTitles={handleAddTitles} />
        {/* Box to add further days */}
        <AddDayBox addDay={addDay} />
      </div>
      {isLoadingPopup && <Spinner />}
      {dataLoadingError && <DataLoadingError />}
      {/* Render the fetched data table outside the calendar container */}
      <DataDisplay data={masterData} />
    </div>
  );
};

export default Calendar;
