import React from "react";
import "../styles/PopupContent.css";

const PopupContent = ({ data, popupHeight, setSelectedTitleData }) => {
  // Check if data is null or undefined
  if (!data) {
    return null; // Render nothing if data is null or undefined
  }

  // Check if message is null or undefined
  const { message } = data;

  function isFlatObject(obj) {
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        return false; // Object has nested objects
      }
    }
    return true; // Object has no nested objects
  }

  // Conditional rendering for flat object message
  if (isFlatObject(message)) {
    return (
      <div className="popup">
        <div className="popup-content">
          <span
            className="close-btn"
            onClick={() => setSelectedTitleData(null)}
          >
            &times;
          </span>
          <div>
            <p>No value found for requested title</p>
          </div>
        </div>
      </div>
    );
  }

  // Render ingredients section separately
  const renderIngredients = (ingredients) => {
    return (
      <div>
        <h2>Ingredients</h2>
        <ul className="ingredients-list">
          {ingredients.map((item, index) => (
            <li key={index}>
              <strong>{item.item} </strong>
              {item.quantity} {item.unit} {item.preparation}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Main content rendering
  return (
    <div className="popup" style={{ maxHeight: popupHeight }}>
      <div className="popup-content">
        <span className="close-btn" onClick={() => setSelectedTitleData(null)}>
          &times;
        </span>
        {renderIngredients(message.ingredients)}
        {Object.entries(message).map(([key, value]) => {
          if (key !== "ingredients") {
            return (
              <div key={key}>
                <h2>{key}</h2>
                {Array.isArray(value) ? (
                  <ul>
                    {value.map((item, index) => (
                      <li style={{ textAlign: "left" }} key={index}>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>{value}</p>
                )}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default PopupContent;
