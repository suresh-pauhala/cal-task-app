import React from "react";
import "../styles/DataDisplay.css";

const DataDisplay = ({ data }) => {
  return (
    <div className="data-wrapper">
      <div className="weekly-summary-heading">Weekly Summary</div>
      <div className="data-container">
        {Object.keys(data).map((categoryName, index) => (
          <div key={index} className="category-card">
            <h3>{categoryName}</h3>
            <ul>
              {Object.keys(data[categoryName]).map((key, keyIndex) => (
                <li key={keyIndex} className="list-item">
                  <span className="list-item-key">{key}:</span>
                  <span className="list-item-value">
                    {data[categoryName][key]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataDisplay;
