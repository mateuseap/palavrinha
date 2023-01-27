import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { useState } from "react";
import { boardDefault } from "./utils/Words";
import { createContext } from "react";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currentAttempt, setCurrentAttempt] = useState({
    attempt: 0,
    letterPosition: 0,
  });

  const onEnter = (keyValue) => {
    if (currentAttempt.letterPosition !== 5) return;

    setCurrentAttempt({
      attempt: currentAttempt.attempt + 1,
      letterPosition: 0,
    });
  };

  const onDelete = () => {
    if (currentAttempt.letterPosition === 0) return;

    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPosition - 1] = "";

    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPosition: currentAttempt.letterPosition - 1,
    });
  };

  const onSelectLetter = (keyValue) => {
    if (currentAttempt.letterPosition > 4) return;

    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPosition] = keyValue;

    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPosition: currentAttempt.letterPosition + 1,
    });
  };

  return (
    <div className="App">
      <nav>
        <h1>Palavrinha</h1>
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currentAttempt,
          setCurrentAttempt,
          onEnter,
          onDelete,
          onSelectLetter,
        }}
      >
        <div className="game">
          <Board />
          <Keyboard />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
