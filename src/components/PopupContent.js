import React from "react";

const PopupContent = ({ data, popupHeight, setSelectedTitleData }) => {
  return (
    <div className="popup" style={{ maxHeight: popupHeight }}>
      <div className="popup-content">
        <span className="close-btn" onClick={() => setSelectedTitleData(null)}>
          &times;
        </span>
        <p>Name: {data.item_name}</p>
        <p>Number of People: {data.number_of_people}</p>
        <h3>Checklist:</h3>
        <ul>
          {data.checklist.map((item, index) => (
            <li key={index}>
              Item: {item.item}, Quantity: {item.quantity}, Unit: {item.unit}
            </li>
          ))}
        </ul>
        <h3>Instructions:</h3>
        <ul>
          {data.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PopupContent;
