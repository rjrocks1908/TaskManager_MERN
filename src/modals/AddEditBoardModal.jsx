import React, { useState } from "react";
import { v4 as uuidv4, validate } from "uuid";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { addBoard, editBoard } from "../store/boardSlice";

function AddEditBoard({ setBoardModalOpen, type }) {
  const [name, setName] = useState("");
  const [newColumns, setNewColumns] = useState([
    { name: "Todo", task: [], id: uuidv4() },
    { name: "Doing", task: [], id: uuidv4() },
  ]);
  const [isValid, setIsValid] = useState(true);
  const dispatch = useDispatch();

  const onBoardColumnNameChange = (id, newValue) => {
    setNewColumns((prev) => {
      const newState = [...prev];
      const column = newState.find((col) => col.id === id);
      column.name = newValue;
      return newState;
    });
  };

  const onBoardColumnDelete = (id) => {
    setNewColumns((prev) => prev.filter((col) => col.id !== id));
  };

  const validate = () => {
    setIsValid(false);
    if (!name.trim()) {
      return false;
    }

    for (let i = 0; i < newColumns.length; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }
    }

    setIsValid(true);
    return true;
  };

  const onSubmit = (type) => {
    setBoardModalOpen(false);
    if (type === "add") {
      dispatch(addBoard({ name, newColumns }));
    } else {
      dispatch(editBoard({ name, newColumns }));
    }
  };

  return (
    <div
      className="fixed right-0 left-0 top-0 bottom-0 px-2 py-4 overflow-scroll z-50 justify-center items-center flex bg-[#00000080] scrollbar-hide"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setBoardModalOpen(false);
      }}
    >
      {/* Modal Section */}
      <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
        <h3 className="text-lg">
          {type === "edit" ? "Edit" : "Add New"} Board
        </h3>

        {/* Task Name */}
        <div className="mt-8 flex flex-col space-y-3">
          <label htmlFor="">Board Columns</label>
          <input
            type="text"
            className="bg-transparent px-4 py-2 rounded-md text-sm border border-gray-600 outline-none focus:outline-[#635fc7] outline-1 ring-0"
            placeholder="e.g Web Design"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="border-name-input"
          />
        </div>

        {/* Board Columns */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500" htmlFor="">
            Board Columns
          </label>
          {newColumns.map((column, index) => (
            <div key={column.id} className="flex items-center w-full">
              <input
                type="text"
                className="bg-transparent flex-grow px-4 py-2 rounded-md text-sm border border-gray-600 outline-none focus:outline-[#735fc7]"
                value={column.name}
                onChange={(e) => {
                  onBoardColumnNameChange(column.id, e.target.value);
                }}
              />
              <RxCross2
                className="cursor-pointer m-4"
                onClick={(e) => onBoardColumnDelete(column.id)}
              />
            </div>
          ))}
        </div>

        {/* Add New Column */}
        <div>
          <button
            className="w-full items-center hover:opacity-75 dark:text-[#635fc7] dark:bg-white text-white bg-[#635fc7] mt-2 py-2 rounded-full"
            onClick={() => {
              setNewColumns((prev) => [
                ...prev,
                { name: "", task: [], id: uuidv4() },
              ]);
            }}
          >
            + Add New Column
          </button>

          <button
            className="w-full items-center hover:opacity-75 dark:text-white dark:bg-[#635fc7] text-white bg-[#635fc7] mt-8 relative py-2 rounded-full"
            onClick={() => {
              const isValid = validate();
              if (isValid) {
                onSubmit(type);
              }
            }}
          >
            {type === "add" ? "Create New Board" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEditBoard;
