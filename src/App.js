import React, { useState, useEffect, useCallback, Fragment } from "react";
import Game from "./components/Game/Game";
import Win from "./components/Win/Win";
import IntroScreen from "./components/IntroScreen/IntroScreen";
import Options from "./components/Options/Options";
// import class
import "./App.css";

//import hooks
// import useToggle from "./hooks/useToggle";
// import useInput from "./hooks/useInput";

// import initializeDeck from "./deck";
const binthCards = [
  { name: "bears" },
  { name: "berghain" },
  { name: "blackbird" },
  { name: "bug" },
  { name: "castle" },
  { name: "clown" },
  { name: "crown" },
  { name: "deer" },
  { name: "fishes" },
  { name: "fishVase" },
  { name: "flowers" },
  { name: "funkyChicken" },
  { name: "funkyChicken2" },
  { name: "lion" },
  { name: "mountains" },
  { name: "octopus" },
  { name: "owl" },
  { name: "policeman" },
  { name: "poodle" },
  { name: "poodle2" },
  { name: "rats" },
  { name: "sunflowers" },
  { name: "whiteCorn" },
  { name: "yellowCorn" }
];
// const binthCards = [
//   { name: "anna" },
//   { name: "anna2" },
//   { name: "babyAnna" },
//   { name: "babyElsa" },
//   { name: "bruni" },
//   { name: "elsa" },
//   { name: "elsa2" },
//   { name: "grandPabbie" },
//   { name: "hans" },
//   { name: "herzogVonPitzbühl" },
//   { name: "honeymaren" },
//   { name: "kingAgnarr" },
//   { name: "kingRuneard" },
//   { name: "kristof" },
//   { name: "lieutenantMattias" },
//   { name: "littleStone" },
//   { name: "marshmallow" },
//   { name: "nokk" },
//   { name: "oakenSaunaGuy" },
//   { name: "olaf" },
//   { name: "queenIduna" },
//   { name: "royalGuards" },
//   { name: "ryder" },
//   { name: "sven" }
// ];

function shuffle(array) {
  const newArray = array.slice(0);
  for (let i = 0; i < array.length - 1; i++) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let temp = newArray[i];
    newArray[i] = newArray[randomIndex];
    newArray[randomIndex] = temp;
  }
  return newArray;
}
function initializeDeck(num) {
  let id = 0;
  const cards = binthCards;
  let gameCards = cards.slice(0, num);
  // let cardSet2 = cards.slice(0, 7);
  const doubledCards = [...gameCards, ...gameCards];
  let newCardSet = doubledCards.map((cards, index) => {
    return {
      ...cards,
      id: id++,
      type: cards.name
    };
  });

  return shuffle(newCardSet);
}

export default function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [dimension, setDimension] = useState(400);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // option settings
  const [time, setTime] = useState("");
  const [level, setLevel] = useState("");

  // state for wins
  const [result, setResult] = useState(false);
  const [win, setWin] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  //options state
  const [disableStart, setDisableStart] = useState(false);
  const [disableReset, setDisableReset] = useState(true);
  const [options, setOptions] = useState([]);

  // timer //////////////////////////////
  const [timer, setTimer] = useState(time);

  /////////////////// END HOOKS SETUP //////////////////////////

  // INTRO PAGE BUTTON
  const initialiseGame = () => {
    // setResult(false);
    setGameOver(false);
    // so user cant click on cards until timer is set
    setDisabled(true);
    // resets cards flipped and solved arrays
    setSolved([]);
    // resets win
    resetCards();
    setLevel("");
    setTime("");
    setDisableStart(false);
    setDisableReset(true);
    setOptions([
      {
        name: "Easy",
        value: 15,
        number: 9
      },
      {
        name: "Medium",
        value: 120,
        number: 12
      },
      {
        name: "Hard",
        value: 90,
        number: 16
      },
      {
        name: "Crazy",
        value: 60,
        number: 24
      }
    ]);
  };

  function resetTimer() {
    console.log("resetGame");
    console.log("timer before reset", timer);
    setTimer("");
    console.log("timer  after reset", timer);
    setIsActive(false);
    toggleButtons();
    setSolved([]);
    setFlipped([]);
  }

  // for pause game button
  // function pauseButton() {
  //   toggleActive();
  // }

  const checkForWin = useCallback(() => {
    if (solved.length === cards.length - 2) {
      console.log("check, check for win");
      setSolved([]);
      setWin(true);
      setTimer(time);
      setGameOver(true);
      setResult(true);
      setScore(score + 1);
    }
  }, [cards.length, score, time, solved.length]);

  // use effect for timer
  useEffect(() => {
    let interval = null;
    if (isActive && timer > -1) {
      interval = setInterval(() => {
        if (timer === 0) {
          console.log("game over, dude");

          setGameOver(true);
          setWin(false);
          setResult(true);
          setDisabled(true);
        }
        setTimer(seconds => seconds - 1);

        console.log("time, time, time", timer);
      }, 1000);
    } else if (!isActive && timer === 0) {
      console.log("game over?");

      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  useEffect(() => {
    resizeBoard();
    setResult(false);
    setGameOver(true);
    setCards(initializeDeck());
    setDisabled(true);
  }, []);

  // changes size of the board based on viewable area > removeEventListener works like component did unmount
  // useEffect(() => {
  //   const resizeListener = window.addEventListener("resize", resizeBoard);
  //   return () => window.removeEventListener("resize", resizeListener);
  // });

  // runs when user clicks card
  const handleClick = id => {
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
          setTimeout(checkForWin, 3000);
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
  };

  // OPTION PAGE >>> START BUTTON
  const startGame = () => {
    console.log("start game");
    setDisableStart(true);
    setTimer(time);
    setCards(initializeDeck(level));
    toggleButtons();
    setSolved([]);
    setIsActive(true);
  };

  const toggleButtons = () => {
    console.log("togglebutton > disableStart", disableStart);
    console.log("togglebutton > disableReset", disableReset);
    setDisableStart(!disableStart);
    setDisableReset(!disableReset);
  };

  // const toggleActive = () => {
  //   setIsActive(!isActive);
  //   setDisabled(!disabled);
  //   console.log("isActive in toggle", isActive);
  // };
  // const handleTimerReset = () => {
  //   console.log("Reset game");
  //   // toggleButtons();
  //   setTimer(0);
  //   toggleButtons();
  // };

  // set time and gamelevel in options drop down menus
  const handleSelect = event => {
    setTime(event.target.value);
  };
  const handleTimerSelect = event => {
    setLevel(event.target.value);
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
    // allow clicking
    setDisabled(false);
  };

  const resizeBoard = () => {
    setDimension(
      Math.min(
        document.documentElement.clientWidth,
        document.documentElement.clientHeight
      )
    );
  };
  console.log("isActive", isActive);
  console.log("result", result);
  return (
    <div className="appContainer">
      {result ? (
        <Win
          handleResetGame={handleResetGame}
          solved={solved}
          cards={cards}
          win={win}
        />
      ) : (
        <Fragment>
          {gameOver ? (
            <IntroScreen initialiseGame={initialiseGame} />
          ) : (
            <Fragment>
              <Options
                isActive={isActive}
                resetTimer={resetTimer}
                time={time}
                score={score}
                level={level}
                cards={cards}
                solved={solved}
                options={options}
                value={time}
                handleTimerSelect={handleTimerSelect}
                handleSelect={handleSelect}
                startGame={startGame}
                timer={timer}
                setTimer={setTimer}
                disableStart={disableStart}
                disableReset={disableReset}
              />

              <Game
                dimension={dimension}
                handleClick={handleClick}
                cards={cards}
                flipped={flipped}
                disabled={disabled}
                solved={solved}
                win={win}
              />
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
}
