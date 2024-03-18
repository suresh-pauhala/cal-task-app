import React from "react";
import "../styles/DataDisplay.css";

const DataDisplay = ({ data }) => {
  const hasData = Object.keys(data).some(
    (categoryName) => Object.keys(data[categoryName]).length > 0
  );

  return (
    <div className="data-wrapper">
      {hasData && <div className="weekly-summary-heading">Weekly Summary</div>}
      {hasData &&
        Object.entries(data).map(([categoryName, categoryData], index) => {
          if (Object.keys(categoryData).length === 0) {
            // Skip rendering if category has no items
            return null;
          }
          return (
            <div key={index} className="category-card">
              <h3>{categoryName}</h3>
              <ul>
                {Object.entries(categoryData).map(
                  ([itemName, itemValue], itemIndex) => (
                    <li key={itemIndex} className="list-item">
                      <span className="list-item-key">{itemName}:</span>
                      <span className="list-item-value">{itemValue}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          );
        })}
    </div>
  );
};

export default DataDisplay;
