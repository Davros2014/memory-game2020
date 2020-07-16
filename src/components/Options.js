import React from "react";
import "../styles/OptionsStyles.css";

import Timer from "./Timer";

export default function Options({
  cards,
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
            <h3> P1 - {name}</h3>
            <h3 className="totalMovesWins">
              <span>{moves}</span> {`${moves === 1 ? "move" : "moves"}`}
            </h3>
            {score ? (
              <h3 className="totalMovesWins">
                Total wins: <span>{score}</span>
              </h3>
            ) : null}
          </div>
          <Timer isActive={isActive} timer={timer} time={time} />

          <div className="playerScores">
            <div className="playerScoreDetails">
              <h3>
                Sets collected: <br />
                <span>
                  {pairsSoFar}/{cardPackSize}
                </span>
              </h3>
            </div>
            {isActive ? (
              <button className="buttonMain start pause" onClick={pauseGame}>
                PAUSE
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
