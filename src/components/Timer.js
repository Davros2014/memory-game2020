import React, { Fragment } from "react";
import AnimatedCircle from "./AnimatedCircle";
import "../styles/OptionsStyles.css";

const Timer = ({ isActive, timer, time, pauseGame }) => {
  return (
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
          {isActive ? (
            <button className="buttonMain start" onClick={pauseGame}>
              PAUSE GAME
            </button>
          ) : null}
        </Fragment>
      )}
    </div>
  );
};

export default Timer;
