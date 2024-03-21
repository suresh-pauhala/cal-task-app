import React, { useState } from "react";
import DayBox from "./DayBox";
import AddDayBox from "./AddDayBox";
import Titles from "./Titles";
import DataDisplay from "./DataDisplay";
import { v4 as uuidv4 } from "uuid";
import Spinner from "../components/Spinner";

const Calendar = () => {
  const [sessionId] = useState(uuidv4());

  const [days, setDays] = useState([0, 1, 2, 3, 4, 5, 6]); // Initial state with 6 days
  // const [taskIdsByDay, setTaskIdsByDay] = useState({}); // State to store task IDs by day
  const [masterData, setMasterData] = useState({}); // State to store fetched data
  const [isLoadingPopup, setIsLoadingPopup] = useState(false); // State to track loading of popup data
  const [dataLoadingError, setDataLoadingError] = useState(false);
  const [masterDataFlag, setMasterDataFlag] = useState(false);

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
    setDataLoadingError(false);
    setIsLoadingPopup(true);

    // Construct JSON object containing all titles
    const date = new Date();
    date.setDate(date.getDate() + offset);
    const jsonData = JSON.stringify({
      date: date.toISOString().split("T")[0],
      title: title, // Filter out empty titles
    });
    console.log(sessionId);
    const week_reference_id = "week123";

    fetch(
      `https://falsk-mongo.onrender.com/master_summary?week_reference_id=${week_reference_id}&session_id=${sessionId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMasterDataFlag(true);
        console.log(data);
        // Update task IDs for the day with the fetched data
        // setTaskIdsByDay((prevTaskIds) => ({
        //   ...prevTaskIds,
        //   [offset]: [...prevTaskIds[offset], id],
        // }));
        // Update master data with the fetched data
        setIsLoadingPopup(false);
        setMasterData(data);
      });
    setTimeout(() => {
      setIsLoadingPopup(false);
      if (masterDataFlag) {
        setDataLoadingError(false);
      } else {
        setDataLoadingError(true);
      }
    }, 10000);
  };

  return (
    <div>
      <div className="calendar">
        {/* Day boxes */}
        {days.map((offset) => (
          <DayBox
            key={offset}
            offset={offset}
            sessionId={sessionId}
            onAddTask={(taskId, title) => handleAddTask(offset, taskId, title)}
            //taskIds={taskIdsByDay[offset] || []} // Pass task IDs for the day
          />
        ))}
        <Titles onAddTitles={handleAddTitles} />
        {/* Box to add further days */}
        <AddDayBox addDay={addDay} />
      </div>
      {isLoadingPopup && <Spinner />}
      {dataLoadingError && (
        <p style={{ color: "red", textAlign: "center", fontSize: "20px" }}>
          Server is taking too long time to load please try again later
        </p>
      )}
      {/* Render the fetched data table outside the calendar container */}
      <DataDisplay data={masterData} />
    </div>
  );
};

export default Calendar;
