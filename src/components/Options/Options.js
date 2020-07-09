import React, { Fragment } from "react";
import "./OptionsStyles.css";

import AnimatedCircle from "../AnimatedCircle/AnimatedCircle";

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
  cardType
}) {
  const duplication = 2;
  const cardPackSize = cards.length / duplication;
  const pairsSoFar = solved.length / duplication;
  // console.log("timer", timer);
  // console.log("time", time);

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
          {score} {`${score <= 1 ? "game" : "games"}`} won so far
        </h3>
        {isActive ? null : (
          <Fragment>
            <div className="selectTimeContainer">
              <label className="selectLabel" htmlFor="skillLevel">
                Select game time:
              </label>
              <select
                className="selectOuterDropDown"
                disabled={disableStart}
                onChange={handleSelect}
                value={time}
              >
                <option>Select game time</option>
                {options.map(item => (
                  <option key={item.value} name={item.name} value={item.value}>
                    {item.value} seconds
                  </option>
                ))}
              </select>
            </div>

            <div className="selectTilesContainer">
              <label className="selectLabel" htmlFor="skillLevel">
                Select card number:
              </label>
              <select
                className="selectOuterDropDown"
                disabled={disableStart}
                onChange={handleTimerSelect}
                value={level}
              >
                <option>Choose number of cards</option>
                {options.map(item => (
                  <option
                    key={item.number}
                    name={item.name}
                    value={item.number}
                  >
                    {item.name} - {item.number * 2} tiles
                  </option>
                ))}
              </select>
            </div>

            <div className="selectTilesContainer">
              <label className="selectLabel" htmlFor="skillLevel">
                Select theme:
              </label>
              <select
                className="selectOuterDropDown"
                disabled={disableStart}
                onChange={handleCardsSelect}
                value={cardType}
              >
                <option>Choose card type</option>
                {options.map(item => (
                  <option
                    key={item.number}
                    name={item.name}
                    value={item.cardType}
                  >
                    {item.cardType}
                  </option>
                ))}
              </select>
            </div>
          </Fragment>
        )}

        {time && level && cardType && !isActive ? (
          <button
            className="buttonMain start"
            disabled={disableStart}
            onClick={startGame}
          >
            START
          </button>
        ) : null}
      </div>

      <div className="timerContainer">
        {!isActive ? null : (
          <Fragment>
            {timer > -1 ? (
              <div className="timerWrapper">
                <h5 className="timerNumbers">
                  <span
                    id="time"
                    className={`timer ${timer <= 10 ? "flashRed" : ""}`}
                  >
                    {timer}
                  </span>
                </h5>
                <AnimatedCircle
                  timer={timer}
                  time={time}
                  className="animatedCircle"
                />
              </div>
            ) : null}

            <h3 className="message">
              {timer > -1
                ? ""
                : "Sorry your time is up, better luck next time!"}
            </h3>
            <button
              className="buttonMain"
              disabled={disableReset}
              onClick={resetTimer}
            >
              RESET
            </button>
          </Fragment>
        )}
      </div>
    </div>
  );
}
