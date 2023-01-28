import { useContext } from "react";
import { AppContext } from "../App";

function GameOver() {
  const { currentAttempt, correctWord, gameOver } = useContext(AppContext);
  return (
    <div className="gameOver">
      <h3>
        {gameOver.guessedWord
          ? "Parabéns, você acertou a palavra!"
          : "Que pena, você perdeu :("}
      </h3>
      <h1>Resposta: {correctWord}</h1>
      {gameOver.guessedWord && (
        <h3>Você acertou na {currentAttempt.attemptValue}ª tentativa!</h3>
      )}
    </div>
  );
}

export default GameOver;
