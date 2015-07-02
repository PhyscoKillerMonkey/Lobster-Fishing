/* jshint devel: true */
"use strict";

console.log("Starting");

// HTML Elements
var messageCon = document.getElementById("messageCon");
var inDisplay = document.getElementById("potsIn");
var outDisplay = document.getElementById("potsOut");

// Green: 3da Red: 5d5 Grey: ddd
var dice1 = document.getElementById("dice1");
var dice2 = document.getElementById("dice2");
var dice3 = document.getElementById("dice3");
var dice4 = document.getElementById("dice4");
var dice5 = document.getElementById("dice5");
var dice6 = document.getElementById("dice6");

var numPots = 5;
var potsIn = 5;
var potsOut = 0;
var money = 0;
var dice = 1;

function setupDice() {
  // Setup dice to be Even: fine, Odd: Stormy for now
  dice1.style["background-color"] = "#d35";
  dice2.style["background-color"] = "#5d5";
  dice3.style["background-color"] = "#d35";
  dice4.style["background-color"] = "#5d5";
  dice5.style["background-color"] = "#d35";
  dice6.style["background-color"] = "#5d5";
  dice1.style.border = "solid #fff";
  dice2.style.border = "solid #fff";
  dice3.style.border = "solid #fff";
  dice4.style.border = "solid #fff";
  dice5.style.border = "solid #fff";
  dice6.style.border = "solid #fff";
}

function rollDice() {
  // Do the actual dice roll
  dice = Math.ceil(Math.random() * 6);

  // Reset then highlight the correct dice indicator
  setupDice();
  switch (dice) {
    case 1: dice1.style.border = "solid #ddd"; break;
    case 2: dice2.style.border = "solid #ddd"; break;
    case 3: dice3.style.border = "solid #ddd"; break;
    case 4: dice4.style.border = "solid #ddd"; break;
    case 5: dice5.style.border = "solid #ddd"; break;
    case 6: dice6.style.border = "solid #ddd"; break;
  }

  // Do things with pots and moneys
  if (dice === 2 | 4 | 6) {
    money += potsIn + potsIn * 3;
  }
}

function refresh() {
  inDisplay.innerHTML = "In: " + potsIn;
  outDisplay.innerHTML = "Out: " + potsOut;
}

function message(msg) {
  // Create and append the new message
  var text = document.createElement("div");
  text.innerHTML = msg;
  messageCon.appendChild(text);

  // If there are more than 10 messages, remove the first
  if (messageCon.childElementCount > 10) {
    messageCon.removeChild(messageCon.childNodes[0]);
  }
}

function moreIn() {
  if (potsIn < numPots) {
    potsOut--;
    potsIn++;
    refresh();
  };
}

function moreOut() {
  if (potsOut < numPots) {
    potsOut++;
    potsIn--;
    refresh();
  }
}

// Setup the displays
/*setupDice();
refresh();

message("Welcome to lobster fishing!");
message("Here is another message");*/
