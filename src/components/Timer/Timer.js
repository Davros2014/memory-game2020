import React, { Fragment } from "react";

const Timer = ({
  resetStart,
  toggleStart,
  isActive,
  timer,
  disableReset,
  handleTimerReset
}) => {
  return (
    <Fragment>
      <div className="timerContainer">
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

            <div className="row">
              <button
                className={`button button-primary button-primary-${
                  isActive ? "active" : "inactive"
                }`}
                onClick={toggleStart}
              >
                {isActive ? "Pause" : "Start"}
              </button>
              <button
                className="button"
                disabled={disableReset}
                onClick={resetStart}
              >
                Reset
              </button>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Timer;
