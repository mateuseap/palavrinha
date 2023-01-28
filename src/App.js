import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import GameOver from "./components/GameOver";
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
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctWord, setCorrectWord] = useState("");
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord.toUpperCase());
    });
  }, []);

  const onEnter = () => {
    if (currentAttempt.letterPosition !== 5) return;

    let currentWord = "";

    for (let i = 0; i < 5; i++) {
      currentWord += board[currentAttempt.attemptValue][i];
    }

    if (wordSet.has(currentWord.toLowerCase())) {
      setCurrentAttempt({
        attemptValue: currentAttempt.attemptValue + 1,
        letterPosition: 0,
      });
    } else {
      alert("Palava inválida!");
    }

    if (currentWord === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }

    if (currentAttempt.attemptValue === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
    }
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
          disabledLetters,
          setDisabledLetters,
          gameOver,
          setGameOver,
        }}
      >
        <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
