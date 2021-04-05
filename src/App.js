import React, { useState, useEffect, useCallback, Fragment } from "react";
import Game from "./components/Game";
import Win from "./components/Win";
import IntroScreen from "./components/IntroScreen";
import Select from "./components/Select";
import Options from "./components/Options";
import { binth, frozen, initializeDeck } from "./cardTypes";

//import hooks
// import useToggle from "./hooks/useToggle";
import useInput from "./hooks/useInput";

export default function App() {
  // GET INFO FROM LOCALSTORAGE
  const localsLogin = JSON.parse(window.localStorage.getItem("login") || false);
  const localsName = window.localStorage.getItem("name");
  const localScore = window.localStorage.getItem("score");

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [dimension, setDimension] = useState(400);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // option settings
  // const [options, setOptions] = useState([]);
  const [time, setTime] = useState("");
  const [level, setLevel] = useState();
  const [disableStart, setDisableStart] = useState(false);
  const [disableReset, setDisableReset] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Introscreen name useInput
  const [name, setName] = useState(localsName);
  const [login, setLogin] = useState(localsLogin);
  const [openModal, setOpenModal] = useState(false);

  // state for wins
  const [result, setResult] = useState(false);
  const [win, setWin] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(localScore);
  const [moves, setMoves] = useState(0);

  //local storage useEffect
  useEffect(() => {
    setResult(false);
    setGameOver(true);
    // setCards(initializeDeck(12, binth));
    setDisabled(true);
  }, []);

  // timer //////////////////////////////
  const [timer, setTimer] = useState(time);

  /////////////////// END HOOKS SETUP //////////////////////////
  const resetOptions = () => {
    setLevel("");
    setTime("");
  };

  // INTRO PAGE BUTTON
  const initialiseGame = () => {
    // setName(localsName);
    // setResult(false);
    setGameOver(false);
    // so user cant click on cards until timer is set
    setDisabled(true);
    // resets cards flipped and solved arrays
    setSolved([]);
    // resets win
    setFlipped([]);
    resetOptions();
    setDisableStart(false);
    setDisableReset(true);
  };

  const checkForWin = useCallback(() => {
    if (solved.length === cards.length - 2) {
      // console.log("check for win");
      setSolved([]);
      setWin(true);
      setGameOver(true);
      setResult(true);
      setScore(score + 1);
      setIsActive(false);
    }
  }, [cards.length, score, solved.length]);

  // update scores in localStorage
  useEffect(() => {
    setScore(score);
    // console.log("updateScore", score);
    const scored = window.localStorage.setItem("score", Number(score));
    return () => scored;
  }, [score]);

  // use effect for timer
  useEffect(() => {
    let interval = null;
    if (isActive && timer > -1) {
      interval = setInterval(() => {
        if (timer === 0) {
          // console.log("game over");
          setGameOver(true);
          setWin(false);
          setResult(true);
          setDisabled(true);
        }
        setTimer(seconds => seconds - 1);
        // console.log("seconds in timer", timer);
      }, 1000);
    } else if (!isActive && timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const resizeBoard = useCallback(() => {
    setDimension(
      Math.min(
        document.documentElement.clientWidth,
        document.documentElement.clientHeight
      )
    );
  }, []);

  useEffect(() => {
    resizeBoard();
  }, [resizeBoard]);

  useEffect(() => {
    const loggedIn = JSON.stringify(
      window.localStorage.setItem("login", login)
    );
    return () => loggedIn;
  }, [login]);

  // changes size of the board based on viewable area > removeEventListener works like component did unmount

  useEffect(() => {
    const resizeListener = window.addEventListener("resize", resizeBoard);
    return () => window.removeEventListener("resize", resizeListener);
  });

  // runs when user clicks card
  const handleClick = id => {
    setMoves(moves + 1);
    setDisabled(true);
    // if flipped.length == 0, no card has been turned
    if (flipped.length === 0) {
      setFlipped([id]);
      setDisabled(false);
    } else {
      // card has been flipped - is it the same card - if so disable
      if (sameCardClicked(id)) {
        setDisabled(false);
        return;
        // else add new card to flipped array
      } else {
        setFlipped([flipped[0], id]);
        // check if cards match
        if (cardsMatch(id)) {
          setSolved([...solved, flipped[0], id]);
          setTimeout(checkForWin, 2000);

          setTimeout(resetCards, 500);
        } else {
          setTimeout(resetCards, 500);
        }
      }
    }
  };
  // WIN COMPONENT >>> RESETS GAME
  const handleResetGame = () => {
    setResult(false);
    setWin(false);
    setTimer("");
    setGameOver(true);
    setIsActive(false);
    setIsPaused(false);
    setOpenModal(false);
  };

  // OPTION PAGE >>> START BUTTON
  const startGame = () => {
    setDisableStart(true);
    setTimer(time);
    // setCards(initializeDeck(level, cards));
    toggleButtons();
    setSolved([]);
    setIsActive(true);
    setDisabled(false);
    setMoves(0);
  };
  const toggleButtons = () => {
    setDisableStart(!disableStart);
    setDisableReset(!disableReset);
  };
  // PAUSE IN MAIN GAME AND MODAL
  const pauseGame = () => {
    setIsActive(!isActive);
    setIsPaused(!isPaused);
    setDisableReset(true);
    // setDisabled(!disabled);
  };

  // sets time, gamelevel and card type in options drop down menus
  // eventually refactor th four methods below using a custom hook
  const handleSelect = event => {
    setTime(event.target.value);
  };
  const handleTimerSelect = event => {
    setLevel(event.target.value);
  };
  const handleCardsSelect = event => {
    if (event.target.value === "Frozen") {
      setCards(initializeDeck(level, frozen));
    } else if (event.target.value === "Binth") {
      setCards(initializeDeck(level, binth));
    }
  };
  // set name on IntroScreen
  const handleNameInput = event => {
    const userNameClean =
      event.target.value.slice(0, 1).toUpperCase() +
      event.target.value.slice(1, event.target.value.length);
    setName(userNameClean);
  };

  const handleSubmit = event => {
    event.preventDefault();
    // remove whitespace with regex
    var replaceString = name.replace(/\s/g, "");
    var cleanString = replaceString.replace(/[^0-9a-z]/gi, "");
    window.localStorage.setItem("name", cleanString);
    setName(cleanString);
    setLogin(true);
  };

  // open reset modal
  const openResetModal = () => {
    setOpenModal(true);
  };
  const resetLocals = () => {
    setLogin(false);
    setOpenModal(false);
    window.localStorage.clear();
    JSON.stringify(window.localStorage.setItem("login", false));
  };

  // checks for the id of the current card to see if it matches one in the flipped state array
  const sameCardClicked = id => flipped.includes(id);
  // checks type of the first index in the flipped array against the type of the current clicked card, if same then it's a match
  const cardsMatch = id => {
    const clickedCard = cards.find(card => card.id === id);
    const flippedCard = cards.find(card => flipped[0] === card.id);
    setDisabled(true);
    return flippedCard.type === clickedCard.type;
  };

  const resetCards = () => {
    // reset flipped array to zero
    setFlipped([]);
    setDisabled(false);
  };
  let id = 1;
  console.log("level", level);
  console.log("id", id++);

  return (
    <div className="appContainer">
      {result ? (
        <Win
          handleResetGame={handleResetGame}
          solved={solved}
          cards={cards}
          win={win}
          moves={moves}
        />
      ) : (
        <Fragment>
          {gameOver ? (
            <IntroScreen
              openModal={openModal}
              openResetModal={openResetModal}
              resetLocals={resetLocals}
              initialiseGame={initialiseGame}
              handleNameInput={handleNameInput}
              name={name}
              handleSubmit={handleSubmit}
              login={login}
              handleResetGame={handleResetGame}
            />
          ) : (
            <Fragment>
              <Select
                disableStart={disableStart}
                disableReset={disableReset}
                handleResetGame={handleResetGame}
                isActive={isActive}
                isPaused={isPaused}
                level={level}
                name={name}
                cards={cards}
                handleSelect={handleSelect}
                handleTimerSelect={handleTimerSelect}
                handleCardsSelect={handleCardsSelect}
                pauseGame={pauseGame}
                startGame={startGame}
                time={time}
              />
              <div className="gameContainer">
                <Game
                  dimension={dimension}
                  handleClick={handleClick}
                  cards={cards}
                  flipped={flipped}
                  disabled={disabled}
                  solved={solved}
                  win={win}
                />
              </div>
              <Options
                dimension={dimension}
                cards={cards}
                isActive={isActive}
                name={name}
                moves={moves}
                pauseGame={pauseGame}
                score={score}
                solved={solved}
                time={time}
                timer={timer}
              />
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
}
