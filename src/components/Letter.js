import { useContext } from "react";
import { AppContext } from "../App";

function Letter({ letterPosition, attemptValue }) {
  const { board, currentAttempt, correctWord } = useContext(AppContext);
  const letter = board[attemptValue][letterPosition];

  const correct = correctWord[letterPosition] === letter;
  const almost = !correct && letter !== "" && correctWord.includes(letter);

  const letterState =
    currentAttempt.attemptValue > attemptValue ?
    (correct ? "correct" : almost ? "almost" : "error") : "default";

  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
}

export default Letter;
