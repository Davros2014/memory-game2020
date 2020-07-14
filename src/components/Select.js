import React, { Fragment } from "react";
import "../styles/SelectStyles.css";

export default function Select({
  cardType,
  disableReset,
  disableStart,
  handleResetGame,
  isActive,
  isPaused,
  level,
  name,
  options,
  handleSelect,
  handleTimerSelect,
  pauseGame,
  startGame,
  time
}) {
  console.log("isActive in select", isActive);
  console.log("isPaused in select", isPaused);

  return (
    <Fragment>
      {isActive && !isPaused ? null : (
        <div className="selectContainer">
          <div className="selectOptions">
            <h3 className="selectText">
              {`${
                isPaused
                  ? "Game paused. Want to quit, "
                  : "Define your game settings, "
              }`}
              {`${name}`}
            </h3>

            {isPaused ? null : (
              <>
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
                      <option
                        key={item.value}
                        name={item.name}
                        value={item.value}
                      >
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
              </>
            )}

            {time && level && cardType && !isActive && !isPaused ? (
              <button
                className="buttonMain start"
                disabled={disableStart}
                onClick={startGame}
              >
                START
              </button>
            ) : null}
            {isPaused ? (
              <div className="pausedButtonsContainer">
                <button className="buttonMain" onClick={pauseGame}>
                  Return
                </button>
                <button className="buttonMain" onClick={handleResetGame}>
                  Quit
                </button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </Fragment>
  );
}

// cardtypes selecter

/*<div className="selectTilesContainer">
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
</div>*/
