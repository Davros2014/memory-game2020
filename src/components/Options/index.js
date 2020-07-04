import React, { Fragment } from "react";
import "./OptionsStyles.css";

export default function Options({
  setTimer,
  timer,
  disableStart,
  disableReset,
  startGame,
  handleTimerReset,
  handleSelect,
  handleTimerSelect,
  value,
  options,
  solved,
  cards,
  level,
  score
}) {
  const cardPackSize = cards.length / 2;
  const pairsSoFar = solved.length / 2;
  return (
    <div className="optionsContainer">
      <div className="playerDetails">
        <h3> Player One</h3>
        <h3>
          {" "}
          Sets so far: {pairsSoFar}/{cardPackSize}
        </h3>
        <h3>
          {" "}
          You have won {score} {`${score <= 1 ? "game" : "games"}`} so far{" "}
        </h3>
        <div className="selectTimeContainer">
          <label className="skillLevel" htmlFor="skillLevel">
            Select game time:
          </label>
          <select disabled={disableStart} onChange={handleSelect} value={value}>
            <option>Select game time</option>
            {options.map(item => (
              <option key={item.value} name={item.name} value={item.value}>
                {item.value} seconds
              </option>
            ))}
          </select>
        </div>
        <div className="selectTilesContainer">
          <label className="skillLevel" htmlFor="skillLevel">
            Select card number:
          </label>
          <select
            disabled={disableStart}
            onChange={handleTimerSelect}
            value={level}
          >
            <option>Choose number of cards</option>
            {options.map(item => (
              <option key={item.number} name={item.name} value={item.number}>
                {item.name} - {item.number * 2} tiles
              </option>
            ))}
          </select>
        </div>
        {value && level && !disableStart ? (
          <button
            className="buttonMain start"
            disabled={disableStart}
            onClick={startGame}
          >
            START
          </button>
        ) : null}
      </div>

      <div>
        {timer === 0 ? null : (
          <Fragment>
            <h5>
              Time remaining: <br />
              <span className={`timer ${timer <= 10 ? "flashRed" : ""}`}>
                {timer >= 0 ? timer : ""}
              </span>
            </h5>
            <h3 className="message">
              {timer > 0 ? "" : "Sorry your time is up, better luck next time!"}
            </h3>
            <button
              className="buttonMain"
              disabled={disableReset}
              onClick={handleTimerReset}
            >
              {timer > 0 ? "RESET" : "TRY AGAIN"}
            </button>
          </Fragment>
        )}
      </div>
    </div>
  );
}
