import React, { useState } from "react";
import { FaBook } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { IoEllipsisVertical } from "react-icons/io5";
import HeaderDropdown from "./HeaderDropdown";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import { useDispatch, useSelector } from "react-redux";

function Header({ setBoardModalOpen, boardModalOpen }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  return (
    <div className="p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0">
      <header className="flex justify-between dark:text-white items-center">
        {/* Left Side */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <FaBook className="h-6 w-6" />
          <h3 className="hidden md:inline-block font-bold md:text-4xl">
            Task Manager
          </h3>
          <div className="flex items-center">
            <h3 className="truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans">
              {board.name}
            </h3>
            <span
              className="w-3 ml-2 md:hidden"
              onClick={() => setOpenDropdown((state) => !state)}
            >
              {openDropdown ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
            </span>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex space-x-4 items-center md:space-x-6">
          <button className="hidden md:block button">+ Add New Task</button>
          <button className="button py-1 px-3 md:hidden">+</button>
          <IoEllipsisVertical className="h-6 cursor-pointer" />
        </div>
      </header>

      {openDropdown && (
        <HeaderDropdown
          setBoardModalOpen={setBoardModalOpen}
          setOpenDropdown={setOpenDropdown}
        />
      )}

      {boardModalOpen && (
        <AddEditBoardModal
          setBoardModalOpen={setBoardModalOpen}
          type={boardType}
        />
      )}
    </div>
  );
}

export default Header;
