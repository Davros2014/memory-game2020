import React from "react";
import "../styles/IntroScreenstyles.css";

export default function IntroScreen({
  initialiseGame,
  name,
  handleNameInput,
  handleSubmit,
  value,
  login,
  resetLocals,
  openResetModal,
  openModal
}) {
  return (
    <div className="containerIntro">
      {openModal ? (
        <div className="selectOptions">
          <h5 className="byeee">
            Leaving us so soon? <br /> Pressing confirm will erase all of the
            current users game data.
          </h5>
          <button className="buttonMain resetLocals" onClick={resetLocals}>
            Confirm
          </button>
        </div>
      ) : (
        <div className="containerWrapper">
          <h5>Davros productions presents</h5>
          <h1 className="mainHeader">Welcome to the ultimate memory game</h1>
          <h6>
            Inspired by the Binth memory game, {""}
            <a
              target="blank"
              href="http://binth.com/shop/home-office/binth-matching-game/"
            >
              find here
            </a>
          </h6>
          {login ? (
            <div className="introButtons">
              <button
                className="buttonMain playButton"
                onClick={() => initialiseGame()}
              >
                Hello, {name}, let's play
              </button>
              <button
                className="buttonMain resetLocals"
                onClick={openResetModal}
              >
                Reset game
              </button>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="nameInputForm">
                <label className="nameInputLabel">
                  Enter your first name to continue
                </label>
                <input
                  className="nameInputField"
                  type="text"
                  placeholder="Enter first name"
                  name="name"
                  onChange={event => handleNameInput(event)}
                  required
                />
                <input
                  type="submit"
                  value="Submit name"
                  className="buttonMain"
                />
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}
