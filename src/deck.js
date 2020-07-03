// import { cardDetails } from "./cards.json";
// const devCards = [
//   { name: "react" },
//   { name: "reactu" },
//   { name: "redux" },
//   { name: "vue" },
//   { name: "angular" },
//   { name: "javascript" },
//   { name: "ruby" },
//   { name: "rails" }
// ];
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
