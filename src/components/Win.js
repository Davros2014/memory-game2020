import React, { Fragment } from "react";
import PropTypes from "prop-types";

import "../styles/Winstyles.css";

export default function Win({ handleResetGame, solved, cards, win, moves }) {
  const cardPackSize = cards.length / 2;
  const pairsSoFar = solved.length / 2;
  console.log("win container, is it a win?", win);
  return (
    <div className="winContainer">
      <div className="winWrapper">
        {win ? (
          <Fragment>
            <h1>You Won!</h1>
            <h4>
              That was great but can you do it in even less than {moves} moves?{" "}
              <br /> Or perhaps try a harder level?
            </h4>
          </Fragment>
        ) : (
          <Fragment>
            <h1>You Lost!</h1>
            <h4>
              That was tough, you managed to get {pairsSoFar}/{cardPackSize}{" "}
              pairs, but you can do way better!
            </h4>
          </Fragment>
        )}
        <button
          onClick={handleResetGame}
          className="buttonMain containerButton"
        >
          PLAY AGAIN?
        </button>
      </div>
    </div>
  );
}

Win.propTypes = {
  handleResetGame: PropTypes.func.isRequired,
  solved: PropTypes.arrayOf(PropTypes.number).isRequired,
  win: PropTypes.bool.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};
