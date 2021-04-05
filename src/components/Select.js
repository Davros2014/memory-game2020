import React, { useState, useEffect, Fragment } from "react";
// import "../styles/SelectStyles.css";

export default function Select({
  cardType,
  disableReset,
  disableStart,
  handleResetGame,
  isActive,
  isPaused,
  level,
  name,
  cards,
  handleSelect,
  handleTimerSelect,
  handleCardsSelect,
  pauseGame,
  startGame,
  time
}) {
  const handleGameLengthSelect = event => {
    handleSelect(event);
  };
  const handleGameTimeSelect = event => {
    handleTimerSelect(event);
  };
  const handleCardTypeSelect = event => {
    handleCardsSelect(event);
  };
  const [options, setOptions] = useState([]);
  useEffect(() => {
    setOptions([
      {
        id: 1,
        name: "Easy",
        value: 180,
        number: 9,
        cardType: "Frozen"
      },
      {
        id: 2,
        name: "Medium",
        value: 120,
        number: 12,
        cardType: "Frozen"
      },
      {
        id: 3,
        name: "Hard",
        value: 90,
        number: 16,
        cardType: "Binth"
      },
      {
        id: 4,
        name: "Crazy",
        value: 60,
        number: 24,
        cardType: "Binth"
      }
    ]);
  }, []);

  // remove duplicates options for game theme
  const gameTheme = options.map(item => {
    return item.cardType;
  });
  const removeDuplicates = [...new Set(gameTheme)];
  return (
    <Fragment>
      {isActive && !isPaused ? null : (
        <div className="selectContainer">
          <div className="selectOptions">
            <h3 className="selectText">
              {isPaused
                ? `Game paused. Do you want to quit, ${name}?`
                : `Define your game settings, ${name}`}
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
                    onChange={handleGameLengthSelect}
                    value={time}
                  >
                    <option>Choose duration</option>
                    {options.map(item => (
                      <option
                        key={item.id}
                        name={item.value}
                        value={item.value}
                      >
                        {item.value} seconds
                      </option>
                    ))}
                  </select>
                </div>

                <div className="selectTilesContainer">
                  <label className="selectLabel" htmlFor="skillLevel">
                    Select number of tiles:
                  </label>
                  <select
                    className="selectOuterDropDown"
                    disabled={disableStart}
                    onChange={handleGameTimeSelect}
                    value={level}
                  >
                    <option>Select quantity</option>
                    {options.map(item => (
                      <option
                        key={item.id}
                        name={item.number}
                        value={item.number}
                      >
                        {item.name} - {item.number * 2} tiles
                      </option>
                    ))}
                  </select>
                </div>

                <div className="selectTilesContainer">
                  <label className="selectLabel" htmlFor="skillLevel">
                    Choose game type
                  </label>
                  <select
                    className="selectOuterDropDown"
                    disabled={disableStart}
                    onChange={handleCardTypeSelect}
                    value={cardType}
                  >
                    <option>Select theme</option>
                    {removeDuplicates.map((item, index) => (
                      <option key={index} name={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
            {time && level && cards.length > 0 && !isActive && !isPaused ? (
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
                <button className="buttonMain mr1" onClick={pauseGame}>
                  Return
                </button>
                <button className="buttonMain ml1" onClick={handleResetGame}>
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
