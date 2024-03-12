import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const DayBox = ({ offset, onAddTask }) => {
  const navigate = useNavigate();
  const [titles, setTitles] = useState(["", "", "", ""]); // Default empty titles
  const [titleEditModes, setTitleEditModes] = useState([
    true,
    true,
    true,
    true,
  ]); // State to track edit mode for each title
  const [added, setAdded] = useState(false); // State to track whether titles have been added
  const [selectedTitleData, setSelectedTitleData] = useState(null);
  const [popupHeight, setPopupHeight] = useState(null); // State to track popup height
  const [taskIds, setTaskIds] = useState(Array(4).fill(null)); // State to store task IDs

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

  const handleAddTask = (index) => {
    const titleToSend = titles[index].trim(); // Trim leading and trailing whitespace

    if (!titleEditModes[index]) {
      // If not in edit mode, set to edit mode
      toggleEditMode(index);
    } else if (titleToSend) {
      // Check if title is not empty
      // If in edit mode and title is not empty, handle edit task logic here
      console.log(`Adding task for title: ${titleToSend}`);
      const taskId = uuidv4(); // Generate a unique ID for the task

      // Update state with the new task ID
      setTaskIds((prevIds) => {
        const newIds = [...prevIds];
        newIds[index] = taskId;
        return newIds;
      });

      const date = new Date();
      date.setDate(date.getDate() + offset);
      const jsonData = JSON.stringify({
        id: taskId, // Include the unique ID in the data
        date: date.toISOString().split("T")[0],
        title: titleToSend, // Send only the selected title
      });

      //show MasterData
      onAddTask(offset, { id: taskId, title: titleToSend });

      // Post Data
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

      toggleEditMode(index);
    } else {
      // If title is empty, you can handle it here (e.g., show an error message)
      console.log("Title is empty. Please enter a title.");
    }

    // if (!added) {
    //   // const date = new Date();
    //   // date.setDate(date.getDate() + offset);
    //   // const jsonData = JSON.stringify({
    //   //   date: date.toISOString().split("T")[0],
    //   //   titles: titles.filter((title) => title !== ""), // Filter out empty titles
    //   // });
    //   //show MasterData
    //   onAddTask(offset, titles);
    //   //Post Data
    //   // fetch("http://localhost:8000/weekly_workout_summary", {
    //   //   method: "POST",
    //   //   headers: {
    //   //     "Content-Type": "application/json",
    //   //   },
    //   //   body: jsonData,
    //   // })
    //   //   .then((response) => {
    //   //     return response.json();
    //   //   })
    //   //   .then((data) => console.log(data))
    //   //   .catch((error) => {
    //   //     console.error("Error sending data:", error);
    //   //   });
    // }
    // setAdded(!added); // Toggle the added state
  };
  const toggleEditMode = (index) => {
    const newEditModes = [...titleEditModes];
    newEditModes[index] = !newEditModes[index];
    setTitleEditModes(newEditModes);
  };

  const handleTitleClick = (title) => {
    //show current selected date and title
    // const date = new Date();
    // date.setDate(date.getDate() + offset);
    // const clickedData = { date: date.toISOString().split("T")[0], title };
    // const jsonData = JSON.stringify(clickedData);
    // localStorage.setItem("clickedData", jsonData); // Store data for new page
    // navigate("/new-page"); // Redirect to new page using useNavigate
    fetch("http://localhost:8000/workouts")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSelectedTitleData(data);
        // Calculate popup height based on content
        const popupContentHeight =
          document.querySelector(".popup-content").offsetHeight;
        setPopupHeight(popupContentHeight);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div className="day-box">
      <div className="date">{formattedDate}</div>
      {titles.map((title, index) => (
        <div key={index} className="title-container">
          {titleEditModes[index] ? (
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(index, e.target.value)}
              placeholder={`Title ${index + 1}`}
              className="title-input"
            />
          ) : (
            <button
              className="button-13"
              onClick={() => handleTitleClick(title)}
            >
              {title}
            </button>
          )}
          <div>
            <button
              className="add-task-button"
              onClick={() => handleAddTask(index)}
            >
              {titleEditModes[index] ? "Add Task" : "Edit Task"}
            </button>
          </div>
        </div>
      ))}
      {selectedTitleData && (
        <div className="popup" style={{ maxHeight: popupHeight }}>
          <div className="popup-content">
            <span
              className="close-btn"
              onClick={() => setSelectedTitleData(null)}
            >
              &times;
            </span>
            {selectedTitleData.map((dataItem, index) => (
              <div key={index}>
                <p>Name: {dataItem.name}</p>
                <p>Description: {dataItem.description}</p>
                <p>Repetitions: {dataItem.repetitions}</p>
                <p>Calories Burned: {dataItem.calories_burned}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DayBox;
