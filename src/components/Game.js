import React from "react";
import PropTypes from "prop-types";

import Card from "./Card";
import "../styles/Gamestyles.css";

export default function Game({
  dimension,
  cards,
  flipped,
  handleClick,
  disabled,
  solved
}) {
  const cardsList = cards.map((card, index) => {
    return (
      <Card
        key={card.id}
        type={card.type}
        id={card.id}
        height={dimension / 4.5}
        width={dimension / 4.5}
        flipped={flipped.includes(card.id)}
        handleClick={handleClick}
        disabled={disabled || solved.includes(card.id)}
        solved={solved.includes(card.id)}
      />
    );
  });

  return <div className="memoryGame">{cardsList}</div>;
}

Game.propTypes = {
  win: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  dimension: PropTypes.number.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  flipped: PropTypes.arrayOf(PropTypes.number).isRequired,
  solved: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleClick: PropTypes.func.isRequired
};
