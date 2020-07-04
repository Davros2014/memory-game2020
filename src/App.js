import React, { useState, useEffect, useCallback, Fragment } from "react";
import Game from "./components/Game";
import Win from "./components/Win";
import IntroScreen from "./components/IntroScreen";
import Options from "./components/Options";

//import hooks
// import useToggle from "./hooks/useToggle";
// import useInput from "./hooks/useInput";

import "./App.css";

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

  // option settings
  const [time, setTime] = useState(0);
  const [level, setLevel] = useState(0);

  // state for wins
  const [result, setResult] = useState(false);
  const [win, setWin] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [name, setName] = useState("");

  const [score, setScore] = useState(0);
  // const [numberOfWins, setnumberOfWins] = useState(false);

  //options state

  const [disableStart, setDisableStart] = useState(false);
  const [disableReset, setDisableReset] = useState(true);
  //Timer
  const [timer, setTimer] = useState(0);

  const [options, setOptions] = useState([]);

  const checkForWin = useCallback(() => {
    if (solved.length === cards.length - 2) {
      setSolved([]);
      setWin(true);
      setGameOver(true);
      setResult(true);
      setScore(score + 1);
    }
  }, [cards.length, score, solved.length]);

  // const countDown = useCallback(() => {
  //   if (timer === 0 && !checkForWin) {
  //     setGameOver(true);
  //     setWin(false);
  //     setTimeout(resetCards, 500);
  //     return;
  //   }
  // }, [checkForWin, timer]);

  // const countDown = () => {
  //   if (timer === 0) {
  //     console.log("timer ran down, you lose");
  //     setResult(true);
  //     setTimeout(resetCards, 500);
  //     return;
  //   }
  // };

  useEffect(() => {
    resizeBoard();
    setResult(true);
    setGameOver(true);
    setCards(initializeDeck());
    setDisabled(true);
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
  }, []);

  // changes size of the board based on viewable area > removeEventListener works like component did unmount
  useEffect(() => {
    const resizeListener = window.addEventListener("resize", resizeBoard);
    return () => window.removeEventListener("resize", resizeListener);
  });

  //timer
  useEffect(() => {
    timer > 0 && setTimeout(() => setTimer(timer - 1), 1000);
    if ((timer === 0 && checkForWin) || (timer === 0 && !checkForWin)) {
      console.log("timer ran down, you lose");
      setResult(true);
      resetCards();
      setGameOver(true);
      return;
    }
  }, [checkForWin, timer]);

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
  // RESETS GAME IN WIN COMPONENT
  const handleResetGame = () => {
    setResult(false);
    setWin(false);
    setDisableStart(false);
    setDisableReset(true);
    setGameOver(true);
  };
  const initialiseGame = () => {
    setGameOver(false);
    // so user cant click on cards unitl timer is set
    setDisabled(true);

    setFlipped([]);
    setSolved([]);
    // resets win
    setWin(false);
    setTimer(0);
    setResult(false);

    setLevel(0);
    setTime(0);

    setDisableStart(false);
    setDisableReset(true);
  };
  const startGame = () => {
    console.log("start game");
    setDisabled(false);
    setTimer(time);
    setCards(initializeDeck(level));
    // setDisableStart(true);
    toggleButtons();
  };
  const toggleButtons = () => {
    console.log("toggled");
    setDisableStart(!disableStart);
    setDisableReset(!disableReset);
  };
  const handleTimerReset = () => {
    console.log("Reset game");
    toggleButtons();
    setTimer(0);
  };

  const handleSelect = event => {
    setTime(event.target.value);
  };
  const handleTimerSelect = event => {
    setLevel(event.target.value);
  };

  // checks for the id of the current card to see if it matches one in the flipped state array
  const sameCardClicked = id => flipped.includes(id);

  const cardsMatch = id => {
    const clickedCard = cards.find(card => card.id === id);
    const flippedCard = cards.find(card => flipped[0] === card.id);
    // checks type of the first index in the flipped array against the type of the current clicked card, if same then it's a match
    setDisabled(true);

    return flippedCard.type === clickedCard.type;
  };

  const resetCards = () => {
    // reset flipped array to zero
    setFlipped([]);
    // allow clicking
    setDisabled(false);
  };

  const handleSubmit = event => {
    setName(event.target.value);
  };

  const resizeBoard = () => {
    setDimension(
      Math.min(
        document.documentElement.clientWidth,
        document.documentElement.clientHeight
      )
    );
  };
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
            <IntroScreen
              initialiseGame={initialiseGame}
              handleSubmit={handleSubmit}
              name={name}
            />
          ) : (
            <div className="gameContainer">
              <Options
                score={score}
                level={level}
                cards={cards}
                solved={solved}
                options={options}
                value={time}
                handleTimerSelect={handleTimerSelect}
                handleSelect={handleSelect}
                handleTimerReset={handleTimerReset}
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
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
}
