/* jshint devel: true */
"use strict";

// HTML Elements
var playTable = document.getElementById("playTable");

// Game variables
var dice = 1;
var day = 1;
var pots = 5;
var potsIn = 5;
var potsOut = 0;
var money = 0;

function moreIn() {
  if (potsIn < pots) {
    potsIn++;
    potsOut--;
    updateSheet();
  }
}

function moreOut() {
  if (potsOut < pots) {
    potsOut++;
    potsIn--;
    updateSheet();
  }
}

function rollDice() {

  var profit;

  // Do the actual roll
  dice = Math.ceil(Math.random() * 6);
  console.log(dice);

  // Is it fine or stormy?
  if (dice === 2 | dice === 4 | dice === 6) {

    playTable.rows[day].cells[3].innerHTML = " Fine ";
    profit = potsIn + 6 * potsOut;
    money += profit;

  } else {

    playTable.rows[day].cells[3].innerHTML = "Stormy";
    profit = 3 * potsIn;
    money += profit;
    pots -= potsOut;
  }

  playTable.rows[day].cells[4].innerHTML = profit;
}

function updateSheet() {

  var i, text;

  if (playTable.rows.length < day + 1) {

    // Make a new row
    var newRow = playTable.insertRow(-1);

    // Make 7 new cells
    for (i = 0; i < 7; i++) {
      newRow.insertCell(-1);
    }

    // Insert the day number into the first cell
    playTable.rows[day].cells[0].innerHTML = day;
  }

  // Update the In-Shore and Off-Shore pot numbers
  playTable.rows[day].cells[1].innerHTML = potsIn;
  playTable.rows[day].cells[2].innerHTML = potsOut;
}

// Initalise the sheet
updateSheet();
