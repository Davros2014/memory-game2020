import React, { Fragment } from "react";
import "../styles/OptionsStyles.css";

export default function Select({
  cards,
  disableStart,
  handleSelect,
  handleTimerSelect,
  handleCardsSelect,
  level,
  options,
  solved,
  time,
  isActive,
  cardType,
  startGame,
  name,
  disableReset,
  resetTimer,
  isPaused
}) {
  return (
    <Fragment>
      {isActive || isPaused ? null : (
        <div className="selectOptions">
          <div className="selectTimeContainer">
            <h3 className="selectText">Define your game settings, {name}</h3>
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
                <option key={item.number} name={item.name} value={item.number}>
                  {item.name} - {item.number * 2} tiles
                </option>
              ))}
            </select>
          </div>

          {/*<div className="selectTilesContainer">
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
            </div>*/}
          {time && level && cardType && !isActive ? (
            <button
              className="buttonMain start"
              disabled={disableStart}
              onClick={startGame}
            >
              START
            </button>
          ) : null}
          {!isActive && isPaused ? (
            <button
              className="buttonMain"
              disabled={disableReset}
              onClick={resetTimer}
            >
              RESET
            </button>
          ) : null}
        </div>
      )}
    </Fragment>
  );
}
