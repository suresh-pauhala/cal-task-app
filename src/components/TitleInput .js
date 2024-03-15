import React from "react";

const TitleInput = ({ title, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={title}
      onChange={onChange}
      placeholder={placeholder}
      className="title-input"
    />
  );
};

export default TitleInput;
