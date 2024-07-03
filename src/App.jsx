import React, { useState } from "react";
import Header from "./components/Header";
import Center from "./components/Center";
import { useDispatch, useSelector } from "react-redux";
import { setBoardActive } from "./store/boardSlice";
import EmptyBoard from "./components/EmptyBoard";

function App() {
  const dispatch = useDispatch();
  const [boardModalOpen, setBoardModalOpen] = useState(false);
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);

  if (!activeBoard && boards.length > 0) {
    dispatch(setBoardActive({ index: 0 }));
  }

  return (
    <div className="overflow-hidden overflow-x-scroll">
      {boards.length > 0 ? (
        <>
          <Header
            boardModalOpen={boardModalOpen}
            setBoardModalOpen={setBoardModalOpen}
          />

          <Center />
        </>
      ) : (
        <>
          <EmptyBoard type={"add"} />
        </>
      )}
    </div>
  );
}

export default App;
