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
  console.log("cards.length in game component", cards.length);

  let numberCards = cards.length;
  let divider;
  if (numberCards === 48) {
    divider = 8;
  } else if (numberCards === 32) {
    divider = 6.5;
  } else if (numberCards === 24) {
    divider = 6;
  } else {
    divider = 5.5;
  }

  console.log("dimension in game component", dimension);
  let checksize = dimension / 18;
  console.log("checksize in game component", checksize);

  const cardsList = cards.map((card, index) => {
    return (
      <Card
        key={card.id}
        type={card.type}
        id={card.id}
        height={dimension / divider}
        width={dimension / divider}
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
  dimension: PropTypes.number.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  flipped: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  solved: PropTypes.arrayOf(PropTypes.number).isRequired
};
