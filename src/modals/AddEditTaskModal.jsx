import React, { useState } from "react";
import { v4 as uuidv4, validate } from "uuid";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../store/boardSlice";

function AddEditTaskModal({
  type,
  device,
  setOpenAddEditTask,
  prevColIndex = 0,
  taskIndex,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState([
    { title: "", isCompleted: false, id: uuidv4() },
    { title: "", isCompleted: false, id: uuidv4() },
  ]);
  const [isValid, setIsValid] = useState(true);
  const dispatch = useDispatch();

  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );
  const columns = board.columns;
  const col = columns.find((col, index) => index === prevColIndex);
  const [status, setStatus] = useState(columns[prevColIndex].name);
  const [newColIndex, setNewColIndex] = useState(prevColIndex);

  const onSubtaskDelete = (id) => {
    setSubtasks((prevState) =>
      prevState.filter((subtask) => subtask.id !== id)
    );
  };

  const onSubtaskChange = (id, value) => {
    setSubtasks((prevState) => {
      const newState = [...prevState];
      const subtask = newState.find((subtask) => subtask.id === id);
      if (subtask) {
        subtask.title = value;
      }
      return newState;
    });
  };

  const onStatusChange = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const validate = () => {
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }

    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].title.trim()) {
        return false;
      }
    }

    setIsValid(true);
    return true;
  };

  const onSubmit = (type) => {
    if (type === "add") {
      dispatch(addTask({ title, description, subtasks, status, newColIndex }));
    } else {
      dispatch(
        editTask({
          title,
          description,
          subtasks,
          status,
          taskIndex,
          prevColIndex,
          newColIndex,
        })
      );
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenAddEditTask(false);
      }}
      className={
        device === "mobile"
          ? "py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-[-100vh] top-0 bg-[#00000080]"
          : "py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-0 top-0 bg-[#00000080]"
      }
    >
      {/* Modal Section */}
      <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
        <h3 className="text-lg">{type === "edit" ? "Edit" : "Add New"} Task</h3>

        {/* Task Name */}
        <div className="mt-8 flex flex-col space-y-1">
          <label htmlFor="" className="text-sm dark:text-white text-gray-500">
            Task Name
          </label>
          <input
            className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border border-gray-600 focus:outline-[#635fc7] ring-0"
            type="text"
            value={title}
            placeholder="E.g Take Coffe break"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="mt-8 flex flex-col space-y-1">
          <label htmlFor="" className="text-sm dark:text-white text-gray-500">
            Description
          </label>
          <textarea
            className="bg-transparent px-4 py-2 outline-none min-h-[200px] focus:border-0 rounded-md text-sm border border-gray-600 focus:outline-[#635fc7] ring-0"
            type="text"
            value={description}
            placeholder="E.g It's always a good idea to take a break. This 15 minute break will recharge the batteries a little."
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Subtasks Section */}
        <div className="mt-8 flex flex-col space-y-1">
          <label htmlFor="" className="text-sm dark:text-white text-gray-500">
            Subtasks
          </label>
          {subtasks.map((subtask, index) => (
            <div key={subtask.id} className="flex items-center w-full">
              <input
                type="text"
                value={subtask.title}
                onChange={(e) => {
                  onSubtaskChange(subtask.id, e.target.value);
                }}
                placeholder="E.g Take Coffe break"
                className="bg-transparent border outline-none focus:border-0 flex-grow px-4 py-2 rounded-md text-sm border-gray-600 focus:outline-[#635fc7]"
              />
              <RxCross2
                onClick={() => onSubtaskDelete(subtask.id)}
                className="m-4 cursor-pointer text-gray-500 hover:text-[#635fc7]"
              />
            </div>
          ))}

          <button
            onClick={() => {
              setSubtasks((state) => [
                ...state,
                { title: "", isCompleted: false, id: uuidv4() },
              ]);
            }}
            className="w-full items-center dark:text-[#635fc7] dark:bg-white text-white bg-[#635fc7] py-2 rounded-full"
          >
            + Add New Subtask
          </button>
        </div>

        {/* Current Status Section */}
        <div className="mt-8 flex flex-col space-y-3">
          <label htmlFor="" className="text-sm dark:text-white text-gray-500">
            Current Status
          </label>
          <select
            value={status}
            onChange={onStatusChange}
            className="select-status flex flex-grow px-4 py-2 rounded-md text-sm bg-white dark:bg-[#2b2c37] focus:border-0 border border-gray-300 focus:outline-[#635fc7] outline-none"
          >
            {columns.map((column, index) => (
              <option key={index} value={column.name}>
                {column.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              const isValid = validate();
              if (isValid) {
                onSubmit(type);
                setOpenAddEditTask(false);
              }
            }}
            className="w-full items-center text-white bg-[#635fc7] py-2 rounded-full"
          >
            {type === "edit" ? "Update" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEditTaskModal;
