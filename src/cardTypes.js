export const binth = [
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
export const frozen = [
  { name: "anna" },
  { name: "anna2" },
  { name: "babyAnna" },
  { name: "babyElsa" },
  { name: "bruni" },
  { name: "elsa" },
  { name: "elsa2" },
  { name: "grandPabbie" },
  { name: "hans" },
  { name: "herzogVonPitzbühl" },
  { name: "honeymaren" },
  { name: "kingAgnarr" },
  { name: "kingRuneard" },
  { name: "kristof" },
  { name: "lieutenantMattias" },
  { name: "littleStone" },
  { name: "marshmallow" },
  { name: "nokk" },
  { name: "oakenSaunaGuy" },
  { name: "olaf" },
  { name: "queenIduna" },
  { name: "royalGuards" },
  { name: "ryder" },
  { name: "sven" }
];

export const shuffle = array => {
  const newArray = array.slice();
  for (let i = 0; i < newArray.length - 1; i++) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let temp = newArray[i];
    newArray[i] = newArray[randomIndex];
    newArray[randomIndex] = temp;
  }
  return newArray;
};
export const initializeDeck = (num, cards) => {
  let id = 0;
  let gameCards = cards.slice(0, num);
  // console.log("gameCards - seems to be ok", gameCards);
  const doubledCards = [...gameCards, ...gameCards];
  // console.log("doubledCards - seems to be ok", doubledCards);
  let newCardSet = doubledCards.map((cards, index) => {
    return {
      ...cards,
      id: id++,
      type: cards.name
    };
  });
  // console.log("newCardSet- seems to be ok", shuffle(newCardSet));
  return shuffle(newCardSet);
};
