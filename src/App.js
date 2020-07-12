import React, { useState, useEffect, useCallback, Fragment } from "react";
import Game from "./components/Game";
import Win from "./components/Win";
import IntroScreen from "./components/IntroScreen";
import Select from "./components/Select";
import Options from "./components/Options";
// import class
import "./styles/App.css";

//import hooks
// import useToggle from "./hooks/useToggle";
// import useInput from "./hooks/useInput";

// import initializeDeck from "./deck";
const binth = [
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
// const frozen = [
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
const initializeDeck = num => {
  let id = 0;
  const cards = binth;
  // console.log("cards in initializeDeck", cards);
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
};

export default function App() {
  const localsName = window.localStorage.getItem("name");
  const localsLogin = window.localStorage.getItem("login");

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [dimension, setDimension] = useState(400);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // option settings
  const [options, setOptions] = useState([]);
  const [time, setTime] = useState("");
  const [level, setLevel] = useState("");
  const [cardType, setCardType] = useState("");
  const [disableStart, setDisableStart] = useState(false);
  const [disableReset, setDisableReset] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  // Introscreen name useInput

  const [name, setName] = useState(localsName);
  // const [first, setFirst] = useState("");
  const [login, setLogin] = useState(localsLogin);
  const [openModal, setOpenModal] = useState(false);

  // state for wins
  const [result, setResult] = useState(false);
  const [win, setWin] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  //local storage useEffect

  // timer //////////////////////////////
  const [timer, setTimer] = useState(time);

  /////////////////// END HOOKS SETUP //////////////////////////
  const resetOptions = () => {
    setLevel("");
    setTime("");
    setCardType("");
  };

  // INTRO PAGE BUTTON
  const initialiseGame = () => {
    setName(localsName);
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
    setOptions([
      {
        name: "Easy",
        value: 12,
        number: 9,
        cardType: "Frozen"
      },
      {
        name: "Medium",
        value: 120,
        number: 12,
        cardType: "Binth"
      },
      {
        name: "Hard",
        value: 90,
        number: 16,
        cardType: "Wild"
      },
      {
        name: "Crazy",
        value: 60,
        number: 24,
        cardType: "AcesHigh"
      }
    ]);
    setCardType({});
  };

  const resetTimer = () => {
    console.log("resetTimer > resetGame");
    setTimer("");
    setIsActive(false);
    toggleButtons();
    setSolved([]);
    setFlipped([]);
    setDisabled(true);
  };

  // for pause game button
  // function pauseButton() {
  //   toggleActive();
  // }

  const checkForWin = useCallback(() => {
    if (solved.length === cards.length - 2) {
      console.log("check for win");
      setSolved([]);
      setWin(true);
      setGameOver(true);
      setResult(true);
      setScore(score + 1);
    }
  }, [cards.length, score, solved.length]);

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
        console.log("seconds in timer", timer);
      }, 1000);
    } else if (!isActive && timer === 0) {
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
    setDisabled(false);
  };

  const toggleButtons = () => {
    console.log("togglebutton > disableStart", disableStart);
    console.log("togglebutton > disableReset", disableReset);
    setDisableStart(!disableStart);
    setDisableReset(!disableReset);
  };

  const pauseGame = () => {
    setIsActive(!isActive);
    setIsPaused(!isPaused);
    // setDisabled(!disabled);
    console.log("isActive in toggle", isActive);
  };

  // const handleTimerReset = () => {
  //   console.log("Reset game");
  //   // toggleButtons();
  //   setTimer(0);
  //   toggleButtons();
  // };

  // set time, gamelevel and card type in options drop down menus
  const handleSelect = event => {
    setTime(event.target.value);
  };
  const handleTimerSelect = event => {
    setLevel(event.target.value);
  };
  const handleCardsSelect = event => {
    setCardType(event.target.value);
  };
  // set name on IntroScreen
  const handleNameInput = event => {
    setName(event.target.value);
  };

  const handleSubmit = event => {
    window.localStorage.setItem("name", name);
    window.localStorage.setItem("login", login);
    event.preventDefault();
    setLogin(true);
  };

  // open reset modal
  const openResetModal = () => {
    console.log("clicky click");
    setOpenModal(true);
  };

  const resetLocals = () => {
    setLogin(false);
    window.localStorage.clear("name");
    setOpenModal(false);
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

  console.log("localsName", localsName); // check contents of Binth
  // console.log("cardType = binth", cardType);
  // console.log("In app > hello", cardType);
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
              openModal={openModal}
              openResetModal={openResetModal}
              resetLocals={resetLocals}
              initialiseGame={initialiseGame}
              handleNameInput={handleNameInput}
              name={name}
              handleSubmit={handleSubmit}
              login={login}
            />
          ) : (
            <Fragment>
              <Select
                cards={cards}
                disableStart={disableStart}
                handleSelect={handleSelect}
                handleTimerSelect={handleTimerSelect}
                handleCardsSelect={handleCardsSelect}
                level={level}
                options={options}
                solved={solved}
                time={time}
                isActive={isActive}
                cardType={cardType}
                startGame={startGame}
                name={name}
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
                <Options
                  pauseGame={pauseGame}
                  name={name}
                  isPaused={isPaused}
                  isActive={isActive}
                  resetTimer={resetTimer}
                  time={time}
                  score={score}
                  level={level}
                  cards={cards}
                  solved={solved}
                  options={options}
                  value={time}
                  cardType={cardType}
                  handleCardsSelect={handleCardsSelect}
                  handleTimerSelect={handleTimerSelect}
                  handleSelect={handleSelect}
                  startGame={startGame}
                  timer={timer}
                  setTimer={setTimer}
                  disabled={disabled}
                  disableStart={disableStart}
                  disableReset={disableReset}
                />
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
}
