import React from "react";
// import "../styles/IntroScreenstyles.css";

export default function IntroScreen({
  initialiseGame,
  name,
  handleNameInput,
  handleSubmit,
  login,
  resetLocals,
  openResetModal,
  openModal,
  handleResetGame
}) {
  return (
    <div className="containerIntro">
      {openModal ? (
        <div className="selectOptions">
          <h5 className="byeee">
            Leaving us so soon? <br /> Pressing confirm will erase all of your
            current game data.
          </h5>
          <div className="pausedButtonsContainer ">
            <button className="buttonMain mr1" onClick={resetLocals}>
              Confirm
            </button>
            <button className="buttonMain ml1" onClick={handleResetGame}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="containerWrapper">
          <h5>Davros productions presents</h5>
          <h1 className="introHeader">
            Mnemonic<span>A Memory Game</span>
          </h1>
          <h6>
            Inspired by the
            <a
              target="blank"
              href="http://binth.com/shop/home-office/binth-matching-game/"
            >
              Binth memory game
            </a>
          </h6>
          {login ? (
            <div className="introButtons">
              <button
                className="buttonMain playButton"
                onClick={() => initialiseGame()}
              >
                {name}, let's play
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
                <input
                  key="name"
                  type="text"
                  className="nameInputField"
                  placeholder="Please, enter your first name"
                  maxLength="50"
                  minLength="3"
                  onChange={handleNameInput}
                  required
                />
                <input
                  key="submit"
                  type="submit"
                  value="Submit name"
                  className="buttonMain"
                  required
                />
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}
