import React, { Fragment } from "react";
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
            <h3> Player 1 - {name}</h3>
            <h3>
              You have taken {moves} {`${moves === 1 ? "move" : "moves"}`} so
              far
            </h3>
          </div>
          <Timer isActive={isActive} timer={timer} time={time} />

          <div className="playerScores">
            <Fragment>
              <h3>
                Sets collected: {pairsSoFar}/{cardPackSize}
              </h3>
              {score ? (
                <h3>
                  {score} {`${score === 1 ? "game" : "games"}`} won so far
                </h3>
              ) : null}
            </Fragment>
            {isActive ? (
              <button className="buttonMain start" onClick={pauseGame}>
                PAUSE
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
