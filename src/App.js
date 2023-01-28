import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { useEffect, useState } from "react";
import { boardDefault, generateWordSet } from "./utils/Words";
import { createContext } from "react";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currentAttempt, setCurrentAttempt] = useState({
    attemptValue: 0,
    letterPosition: 0,
  });
  const [wordSet, setWordSet] = useState(new Set());

  const correctWord = "TESTE";

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
    });
  }, []);

  const onEnter = () => {
    if (currentAttempt.letterPosition !== 5) return;

    setCurrentAttempt({
      attemptValue: currentAttempt.attemptValue + 1,
      letterPosition: 0,
    });
  };

  const onDelete = () => {
    if (currentAttempt.letterPosition === 0) return;

    const newBoard = [...board];
    newBoard[currentAttempt.attemptValue][currentAttempt.letterPosition - 1] =
      "";

    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPosition: currentAttempt.letterPosition - 1,
    });
  };

  const onSelectLetter = (keyValue) => {
    if (currentAttempt.letterPosition > 4) return;

    const newBoard = [...board];
    newBoard[currentAttempt.attemptValue][currentAttempt.letterPosition] =
      keyValue;

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
          correctWord,
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
