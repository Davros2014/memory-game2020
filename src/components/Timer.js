import React, { Fragment } from "react";
import AnimatedCircle from "./AnimatedCircle";
// import "../styles/Timer.css";
// import "../styles/OptionsStyles.css";
// import "../styles/TimerStyles.css";

const Timer = ({ isActive, timer, time }) => {
  return (
    <div className="timerContainer">
      {!isActive ? null : (
        <Fragment>
          <h3> Time remaining</h3>
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
        </Fragment>
      )}
    </div>
  );
};

export default Timer;
