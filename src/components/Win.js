import React, { Fragment } from "react";
import PropTypes from "prop-types";

// import "../styles/Winstyles.css";

export default function Win({ handleResetGame, solved, cards, win, moves }) {
  const cardPackSize = cards.length / 2;
  const pairsSoFar = solved.length / 2;
  return (
    <div className="winContainer">
      <div className="winWrapper">
        <Fragment>
          <h1 className="mainHeader introHeader winLose">
            {win ? "You Won!" : "Sorry, you lost!"}
          </h1>
          {win ? (
            <h4 className="winLoseMessage">
              That was great but can you do it in less than {moves} moves?{" "}
              <br /> Or perhaps try a harder level?
            </h4>
          ) : (
            <h4 className="winLoseMessage">
              That was tough, you managed to get {pairsSoFar}/{cardPackSize}{" "}
              pairs, but you can do way better!
            </h4>
          )}
        </Fragment>

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
