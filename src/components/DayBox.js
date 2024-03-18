import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddIcon from "../assets/icons8-success-96.svg";
import editIcon from "../assets/edit-icon-2375785.svg";
import PopupContent from "./PopupContent";

const DayBox = ({ offset, onAddTask }) => {
  const [titles, setTitles] = useState(["", "", "", ""]); // Default empty titles
  const [titleEditModes, setTitleEditModes] = useState([
    true,
    true,
    true,
    true,
  ]); // State to track edit mode for each title
  const [selectedTitleData, setSelectedTitleData] = useState(null);
  const [popupHeight, setPopupHeight] = useState(null); // State to track popup height
  const [taskIds, setTaskIds] = useState(Array(4).fill(null)); // State to store task IDs
  const [taskIdsForButtons, setTaskIdsForButtons] = useState(
    Array(4).fill(null)
  ); // State to store task IDs for each button

  const date = new Date();
  date.setDate(date.getDate() + offset);

  // Format the date as "dd-mm-yyyy"
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const dayOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][date.getDay()];

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
      // If in edit mode and title is not empty, handle edit task logic here
      console.log(`Adding task for title: ${titleToSend}`);
      const taskId = uuidv4(); // Generate a unique ID for the task
      console.log(taskId);
      const newTaskIdsForButtons = [...taskIdsForButtons];
      newTaskIdsForButtons[index] = taskId;
      setTaskIdsForButtons(newTaskIdsForButtons);

      // Update state with the new task ID
      setTaskIds((prevIds) => {
        const newIds = [...prevIds];
        newIds[index] = taskId;
        return newIds;
      });

      const date = new Date();
      date.setDate(date.getDate() + offset);
      const jsonData = JSON.stringify({
        item_id: taskId,
        session_id: "session123",
        request_date: date.toISOString().split("T")[0],
        week_reference_id: "week123",
        user_id: "user123",
        category: "electronics",
        item: titleToSend,
        count: "2",
        // id: taskId, // Include the unique ID in the data
        // date: date.toISOString().split("T")[0],
        // title: titleToSend, // Send only the selected title
      });

      //show MasterData
      onAddTask(offset, { id: taskId, title: titleToSend });

      // Post Data
      fetch("https://falsk-mongo.onrender.com/item_summary", {
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
  };
  const toggleEditMode = (index) => {
    const newEditModes = [...titleEditModes];
    newEditModes[index] = !newEditModes[index];
    setTitleEditModes(newEditModes);
  };
  const handleTitleClick = (title, index) => {
    const buttonId = taskIdsForButtons[index]; // Get the button's ID based on the index
    // fetch(`https://falsk-mongo.onrender.com/item_summary?item_id=${buttonId}`)
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,

      redirect: "follow",
    };

    fetch(
      `https://falsk-mongo.onrender.com/item_summary?item_id=${buttonId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSelectedTitleData(data);
        // Calculate popup height based on content
        const popupContentElement = document.querySelector(".popup-content");
        const popupContentHeight = popupContentElement
          ? popupContentElement.offsetHeight
          : null;
        setPopupHeight(popupContentHeight);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // const myHeaders = new Headers();
    // myHeaders.append("Content-Type", "text/plain");

    // const itemId = "ef74a513-f4d9-4bef-bb86-deb199b66ded";
    // const url = `https://falsk-mongo.onrender.com/item_summary?item_id=${itemId}`;

    // const requestOptions = {
    //   method: "GET",
    //   headers: myHeaders,
    //   redirect: "follow",
    // };

    // fetch(url, requestOptions)
    //   .then((response) => response.text())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.error(error));
  };

  return (
    <div className="day-box">
      <div className="date">
        {formattedDate}
        <p className="day">{dayOfWeek}</p>
      </div>
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
              onClick={() => handleTitleClick(title, index)}
            >
              {title}
            </button>
          )}
          <div>
            <button
              className="add-task-button"
              onClick={() => handleAddTask(index)}
            >
              {titleEditModes[index] ? (
                <img src={AddIcon} alt="img" height={48} />
              ) : (
                <img src={editIcon} alt="img" height={42} width={49} />
              )}
            </button>
          </div>
        </div>
      ))}
      {selectedTitleData && (
        <PopupContent
          data={selectedTitleData}
          popupHeight={popupHeight}
          setSelectedTitleData={setSelectedTitleData}
        />
      )}
    </div>
  );
};

export default DayBox;
