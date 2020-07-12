import React from "react";
import "../styles/OptionsStyles.css";

import Select from "./Select";
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
      <div className="playerDetails">
        {isActive ? (
          <div className="playerInfo">
            <h3> Player One - {name}</h3>
            <h3>
              {" "}
              Sets so far: {pairsSoFar}/{cardPackSize}
            </h3>
            <h3>
              {" "}
              {score} {`${score <= 1 ? "game" : "games"}`} won so far
            </h3>
          </div>
        ) : null}

        <Select
          cards={cards}
          disableStart={disableStart}
          handleSelect={handleSelect}
          handleTimerSelect={handleTimerSelect}
          handleCardsSelect={handleCardsSelect}
          level={level}
          options={options}
          solved={solved}
          time={time}
          isActive={isActive}
          cardType={cardType}
          startGame={startGame}
          name={name}
        />
        <Timer
          isActive={isActive}
          timer={timer}
          time={time}
          pauseGame={pauseGame}
        />
      </div>
    </div>
  );
}
