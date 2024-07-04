import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDarkMode from "../Hooks/useDarkMode";
import { setBoardActive } from "../store/boardSlice";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { CiLight, CiDark } from "react-icons/ci";
import { Switch } from "@headlessui/react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import AddEditBoard from "../modals/AddEditBoardModal";

function SideBar({ isSideBarOpen, setIsSideBarOpen }) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(colorTheme === "light");
  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  return (
    <div>
      <div
        className={
          isSideBarOpen
            ? "min-w-[261px] bg-white dark:bg-[#2b2c37] fixed top-[72px] h-screen items-center left-0 z-20"
            : "bg-[#635fc7] dark:bg-[#2b2c37] dark:hover:bg-[#635fc7] top-auto bottom-10 justify-center items-center hover:opacity-80 cursor-pointer p-0 transition duration-300 transform fixed w-[56px] h-[48px] rounded-r-full"
        }
      >
        <div>
          {/* Rewrite Modal */}
          {isSideBarOpen && (
            <div className="bg-white dark:bg-[#2b2c37] w-full py-4 rounded-xl">
              <h3 className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8">
                ALL BOARDS {boards?.length}
              </h3>
              <div className="flex flex-col h-[70vh] justify-between">
                <div>
                  {boards.map((board, index) => (
                    <div
                      className={`flex items-baseline space-x-2 px-5 mr-8 rounded-r-full duration-500 ease-in-out py-4 cursor-pointer hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white dark:hover:text-[#635fc7] dark:text-white ${
                        board.isActive &&
                        "bg-[#635fc7] rounded-r-full text-white mr-8"
                      }`}
                      key={index}
                      onClick={() => {
                        dispatch(setBoardActive({ index }));
                      }}
                    >
                      <MdOutlineSpaceDashboard className="h-4" />
                      <p className="text-lg font-bold">{board.name}</p>
                    </div>
                  ))}

                  <div
                    onClick={() => setIsBoardModalOpen(true)}
                    className="flex items-baseline space-x-2 mr-8 rounded-r-full duration-500 ease-in-out cursor-pointer text-[#635fc7] px-5 py-4 hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white"
                  >
                    <MdOutlineSpaceDashboard className="h-4" />
                    <p className="text-lg font-bold">Create New Board</p>
                  </div>
                </div>

                <div className="mx-2 p-4 relative space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg">
                  <CiLight color={`${darkSide ? "#635fc7" : "black"}`} />
                  {/* Switch */}
                  <Switch
                    checked={darkSide}
                    onChange={toggleDarkMode}
                    className={`${
                      darkSide ? "bg-[#635fc7]" : "bg-gray-200"
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span
                      aria-hidden="true"
                      className={`${
                        darkSide ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>
                  <CiDark color={`${darkSide ? "#635fc7" : "black"}`} />
                </div>
              </div>
            </div>
          )}

          {/* Sidebar Hide/Show toggle */}
          {isSideBarOpen ? (
            <div
              onClick={() => setIsSideBarOpen((state) => !state)}
              className="flex items-center mt-2 absolute bottom-16 text-lg font-bold rounded-r-full hover:text-[#635fc7] cursor-pointer mr-6 mb-8 px-8 py-4 hover:bg-[#635fc71a] dark:hover:bg-white space-x-2 justify-center my-4 text-gray-500"
            >
              <FaRegEyeSlash className="min-w-[20px]" />
              {isSideBarOpen && <p>Hide Sidebar</p>}
            </div>
          ) : (
            <div
              onClick={() => setIsSideBarOpen((state) => !state)}
              className="absolute p-5"
            >
              <FaRegEye />
            </div>
          )}
        </div>
      </div>

      {isBoardModalOpen && (
        <AddEditBoard type={"add"} setBoardModalOpen={setIsBoardModalOpen} />
      )}
    </div>
  );
}

export default SideBar;
