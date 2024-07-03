import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoEllipsisVertical } from "react-icons/io5";
import ElipsisMenu from "../components/ElipsisMenu";
import Subtask from "../components/Subtask";
import { deleteTask, setTaskStatus } from "../store/boardSlice";
import DeleteModal from "./DeleteModal";
import AddEditTaskModal from "./AddEditTaskModal";

function TaskModal({ colIndex, taskIndex, setIsTaskModelOpen }) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  const columns = board.columns;
  const col = columns.find((col, index) => index === colIndex);
  const task = col.tasks.find((task, index) => index === taskIndex);
  const subtasks = task.subtasks;

  let completed = 0;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const [status, setStatus] = useState(task.status);
  const [newColIndex, setNewColIndex] = useState(columns.indexOf(col));
  const [elipsisMenuOpen, setElipsisMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const setOpenEditModel = () => {
    setIsAddTaskModalOpen(true);
    setElipsisMenuOpen(false);
  };

  const setOpenDeleteModel = () => {
    setElipsisMenuOpen(false);
    setIsDeleteModalOpen(true);
  };

  const onChange = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const onClose = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }

    dispatch(setTaskStatus({ taskIndex, colIndex, newColIndex, status }));
    setIsTaskModelOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    dispatch(deleteTask({ taskIndex, colIndex }));
    setIsTaskModelOpen(false);
    setIsDeleteModalOpen(false);
  };

  return (
    <div
      onClick={onClose}
      className="fixed right-0 left-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide z-50 bottom-0 justify-center items-center flex bg-[#00000080]"
    >
      {/* Modal Section */}
      <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
        <div className="relative flex justify-between w-full items-center">
          <h1 className="text-lg">{task.title}</h1>
          <IoEllipsisVertical
            className="cursor-pointer h-6"
            onClick={() => {
              setElipsisMenuOpen((state) => !state);
            }}
          />

          {elipsisMenuOpen && (
            <ElipsisMenu
              setOpenEditModel={setOpenEditModel}
              setOpenDeleteModel={setOpenDeleteModel}
              type={"Task"}
            />
          )}
        </div>

        <p className="text-gray-500 font-semibold tracking-wide text-sm pt-6">
          {task.description}
        </p>

        <p className="pt-6 text-gray-500 tracking-widest text-sm">
          Subtasks ({completed}) of {subtasks.length}
        </p>

        {/* Subtasks Section */}
        <div className="mt-3 space-y-2">
          {subtasks.map((subtask, index) => (
            <Subtask
              index={index}
              taskIndex={taskIndex}
              colIndex={colIndex}
              key={index}
            />
          ))}
        </div>

        {/* Current Status Section */}
        <div className="mt-8 flex flex-col space-y-3">
          <label htmlFor="" className="text-sm dark:text-white text-gray-500">
            Current Status
          </label>
          <select
            className="select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border border-gray-300 focus:outline-[#645fc7] outline-none"
            value={status}
            onChange={onChange}
          >
            {columns.map((col, index) => (
              <option className="status-option" key={index}>
                {col.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          onDeleteBtnClick={onDeleteBtnClick}
          title={task.title}
          type={"task"}
        />
      )}

      {isAddTaskModalOpen && (
        <AddEditTaskModal
          setOpenAddEditTask={setIsAddTaskModalOpen}
          type={"edit"}
          taskIndex={taskIndex}
          prevColIndex={colIndex}
          setIsTaskModalOpen={setIsTaskModelOpen}
        />
      )}
    </div>
  );
}

export default TaskModal;
