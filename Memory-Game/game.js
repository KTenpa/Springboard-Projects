const gameContainer = document.getElementById("game");

let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {

/*a counter to remove the values of randomly selected indices in the 
array so that it will not be selected randomly again. */
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it:
    //This holds the value of the current last index of the array
    let temp = array[counter];
    /*This put the value of the randomly selected index at the last 
    index so that it gets removed when we decrement counter by 1.*/
    array[counter] = array[index];
    /*This now replaces the value of the last index into the 
    postion of the randomly selected index so that this value is still
    within the array*/ 
    array[index] = temp;
  }
  //Returns the updated array
  return array;
}

//calling shuffle function and assigning it to shuffledColors
let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!

function handleCardClick(event) {
  //if noClicking is true return back to this function?
  if (noClicking) return;
  //if the div clicked on already has a class of flipped do nothing? when I comment this out, the game app was still functional.
  if (event.target.classList.contains("flipped")) return;
  
  //div that is clicked on is assigned to currentCard
  let currentCard = event.target;

  /*since the first class we assigned to all our new divs was the the values of Colors array 
  we simple take the first class of the div that is clicked on and make that its background color*/
  currentCard.style.backgroundColor = currentCard.classList[0];

  // if card1 and/or card2 does not have the value of null do this:
  if (!card1 || !card2) {
    //add a class of flipped to the div that is clicked on
    currentCard.classList.add("flipped");

    //card1 is equal to card1 or the currentCard which is the div that is clicked on?
    card1 = card1 || currentCard;

    /*if currentCard is strictly equal to card1 that means card1 has the assignment of the div that is clicked on
    if that is the case then card2 gets the value of null because it is not the div that was clicked on but
    if card1 does not strictly equal the currentCard then card2 must be the div that is clicked on and 
    will be assigned the value of currentCard*/
    card2 = currentCard === card1 ? null : currentCard;
  }

  //if card1 and card2 does not have the value of null do this:
  if (card1 && card2) {
    //noClicking set to true?
    noClicking = true;

    // debugger:
    /*gif1 and gif2 holds the color class names of card1 and card2 respectively*/
    let gif1 = card1.className;
    let gif2 = card2.className;

    //if the values of gif1 and gif2 are strictly equal that means the user has found a matching color and do this:
    if (gif1 === gif2) {

      //since the user has matched a color we will add 2 to cardsFipped to count how many divs has already been matched
      cardsFlipped += 2;

      //removes the click event listeners for the card1 and card2 that has been matched.
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);

      //resetting their value to null
      card1 = null;
      card2 = null;

      //resetting noClicking to false
      noClicking = false;
    } 
    //if gif1 and gif2 does not match then do this:
    else {
      /*this resets the value of card1 and card2 and removes their class of flipped so that those divs could be 
      clicked on again for a reattempt at finding their matching pair, performs after a second has passed*/
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }

  //once cardsFlipped value equals the length of the COLORS array the game has ended because user has found all matching colors
  if (cardsFlipped === COLORS.length) alert("game over!");
}

// when the DOM loads
createDivsForColors(shuffledColors);
