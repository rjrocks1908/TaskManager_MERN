import { shuffle } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Task from "./Task";

function Column({ colIndex }) {
  const colors = [
    "bg-red-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-orange-500",
    "bg-gray-500",
    "bg-teal-500",
  ];

  const [color, setColor] = useState(null);
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  const column = board.columns.find((column, index) => index === colIndex);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [dispatch]);

  return (
    <div className="scrollbar-hide mx-5 pt-[90px] min-w-[280px]">
      <p className="font-semibold flex items-center gap-2 tracking-widest md:tracking-[2em] text-[#828fa3]">
        <div className={`rounded-full w-4 h-4 ${color}`} />
        {column.name} ({column.tasks.length})
      </p>
      {column.tasks.map((task, index) => (
        <Task key={index} taskIndex={index} colIndex={colIndex} />
      ))}
    </div>
  );
}

export default Column;