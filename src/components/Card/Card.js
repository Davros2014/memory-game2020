import React from "react";
import PropTypes from "prop-types";

import "./Cardstyles.css";

export default function Card({
  handleClick,
  id,
  flipped,
  height,
  width,
  type,
  disabled,
  solved,
  win
}) {
  return (
    <div
      onClick={() => (disabled ? null : handleClick(id))}
      className={`memoryCard ${flipped || solved ? "flip" : ""}`}
    >
      {solved ? (
        <img
          alt={id}
          className={`clicked cardFront ${win ? "animateIn" : "animateOut"}`}
          src={require(`../../img/${type}.jpg`)}
        />
      ) : (
        <img
          alt={id}
          className={flipped ? "clicked cardFront" : "cardFront"}
          src={require(`../../img/${type}.jpg`)}
        />
      )}
      <div
        className={`cardBack ${flipped || solved ? "opacityNone" : ""}`}
        alt="cardImage"
      ></div>
    </div>
  );
}

Card.propTypes = {
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  flipped: PropTypes.bool.isRequired,
  solved: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired
};
