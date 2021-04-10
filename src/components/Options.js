import React from "react";
// import "../styles/OptionsStyles.css";

import Timer from "./Timer";

export default function Options({
  cards,
  dimension,
  isActive,
  name,
  moves,
  pauseGame,
  score,
  solved,
  time,
  timer
}) {
  const duplication = 2;
  const cardPackSize = cards.length / duplication;
  const pairsSoFar = solved.length / duplication;

  return (
    <div className="optionsContainer">
      {isActive ? (
        <div className="playerDetails">
          <div className="playerInfo">
            <h3 className="totalMovesWins">
              Player: <span>{name}</span>
            </h3>
            <h3 className="totalMovesWins">
              Moves: <span>{moves}</span>
            </h3>
            <h3 className="totalMovesWins">
              Wins: <span>{score}</span>
            </h3>
          </div>
          <Timer isActive={isActive} timer={timer} time={time} />

          <div className="playerScores">
            <div className="playerScoreDetails">
              <h3 className="totalMovesWins">
                Sets collected: <br />
                <span>
                  {pairsSoFar}/{cardPackSize}
                </span>
              </h3>
            </div>
            {isActive ? (
              <button className="buttonMain start pause" onClick={pauseGame}>
                {dimension > 768 ? "PAUSE" : <i class="fas fa-pause"></i>}
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
