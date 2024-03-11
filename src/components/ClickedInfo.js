//ClickedInfo.js
import React from "react";

const ClickedInfo = () => {
  const clickedData = JSON.parse(localStorage.getItem("clickedData"));

  return (
    <div>
      <p>Date: {clickedData.date}</p>
      <p>Title: {clickedData.title}</p>
      <h4>Title Descrition with long content</h4>
    </div>
  );
};

export default ClickedInfo;
