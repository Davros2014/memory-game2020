import React from "react";
import "./IntroScreenstyles.css";

export default function IntroScreen({ initialiseGame }, ...props) {
  return (
    <div className="containerIntro">
      <div className="containerWrapper">
        <h5>Davros productions presents</h5>
        <h1>Welcome to the ultimate memory game</h1>
        <h6>
          Inspired by the Binth memory game, {""}
          <a
            target="blank"
            href="http://binth.com/shop/home-office/binth-matching-game/"
          >
            find here
          </a>
        </h6>
        <button
          className="buttonMain containerButton"
          onClick={() => initialiseGame()}
        >
          Play game
        </button>
      </div>
    </div>
  );

  // const { gameOver, gamesWon, clickEvent } = props;
}
