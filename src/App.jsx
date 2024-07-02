import React, { useState } from "react";
import Header from "./components/Header";
import Center from "./components/Center";

function App() {
  const [boardModalOpen, setBoardModalOpen] = useState(false);
  return (
    <div>
      <Header
        boardModalOpen={boardModalOpen}
        setBoardModalOpen={setBoardModalOpen}
      />

      <Center />
    </div>
  );
}

export default App;
