import React from "react";

const PopupContent = ({ data, popupHeight, setSelectedTitleData }) => {
  return (
    <div className="popup" style={{ maxHeight: popupHeight }}>
      <div className="popup-content">
        <span className="close-btn" onClick={() => setSelectedTitleData(null)}>
          &times;
        </span>
        {data.message}
      </div>
    </div>
  );
};

export default PopupContent;
