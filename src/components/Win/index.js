import React from "react";
import PropTypes from "prop-types";

import "./Winstyles.css";

export default function Win({ handleResetGame, solved, cards, win }) {
  const cardPackSize = cards.length / 2;
  const pairsSoFar = solved.length / 2;
  return (
    <div className="winContainer">
      {win ? (
        <div className="winWrapper">
          <h1>You Won!</h1>
          <h4>
            That was great but can you do even better? <br /> Try a harder
            level?
          </h4>
          <button
            onClick={handleResetGame}
            className="buttonMain containerButton"
          >
            TRY AGAIN?
          </button>
        </div>
      ) : (
        <div className="winWrapper">
          <h1>You Lost!</h1>
          <h4>
            That was tough, you managed to get {pairsSoFar} / {cardPackSize}
            pairs, but you can do way better!
          </h4>

          <button
            onClick={handleResetGame}
            className="buttonMain containerButton"
          >
            TRY AGAIN?
          </button>
        </div>
      )}
    </div>
  );
}

Win.propTypes = {
  handleResetGame: PropTypes.func.isRequired,
  solved: PropTypes.arrayOf(PropTypes.number).isRequired,
  win: PropTypes.bool.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};
