import React, { Fragment } from "react";
import "../styles/OptionsStyles.css";

import Timer from "./Timer";

export default function Options({
  cards,
  disableReset,
  disableStart,
  handleSelect,
  handleTimerSelect,
  handleCardsSelect,
  level,
  resetTimer,
  options,
  score,
  setTimer,
  solved,
  startGame,
  time,
  timer,
  isActive,
  cardType,
  name,
  pauseGame
}) {
  const duplication = 2;
  const cardPackSize = cards.length / duplication;
  const pairsSoFar = solved.length / duplication;
  // console.log("timer", timer);
  // console.log("time", time);

  return (
    <div className="optionsContainer">
      {isActive ? (
        <div className="playerDetails">
          <div className="playerInfo">
            <h3> Player One - {name}</h3>
          </div>
          <Timer
            isActive={isActive}
            timer={timer}
            time={time}
            pauseGame={pauseGame}
          />

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
                PAUSE GAME
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
