import React from "react";
import AddIcon from "../assets/icons8-success-96.svg";
import EditIcon from "../assets/edit-icon-2375785.svg";

const TaskButton = ({ editMode, onClick }) => {
  return (
    <button className="add-task-button" onClick={onClick}>
      {editMode ? (
        <img src={AddIcon} alt="Add Task" height={48} />
      ) : (
        <img src={EditIcon} alt="Edit Task" height={42} width={49} />
      )}
    </button>
  );
};

export default TaskButton;
