var Game = (function () {
    function Game() {
        // Game constants
        this.potCost = 5;
        this.fIn = 1;
        this.fOut = 6;
        this.sIn = 3;
        this.newGame();
    }
    Game.prototype.newGame = function () {
        this.day = 1;
        this.pots = 5;
        this.potsIn = 5;
        this.potsOut = 0;
        this.money = 0;
    };
    Game.prototype.movePotIn = function () {
        if (this.potsIn < this.pots) {
            this.potsIn++;
            this.potsOut--;
        }
    };
    Game.prototype.movePotOut = function () {
        if (this.potsOut < this.pots) {
            this.potsOut++;
            this.potsIn--;
        }
    };
    Game.prototype.doTurn = function () {
        // Roll the dice
        var dice = Math.ceil(Math.random() * 6);
        if (dice % 2 == 0) {
            // Weather is fine
            this.wasFine = true;
            this.profit = this.potsIn * this.fIn + this.potsOut * this.fOut;
            this.money += this.profit;
        }
        else {
            // Weather was stormy
            this.wasFine = false;
            this.profit = this.potsIn * this.sIn;
            this.money += this.profit;
            this.pots -= this.potsOut;
            this.potsOut = 0;
        }
        this.day++;
    };
    Game.prototype.buyPots = function (n) {
        // Check if we can buy that many pots
        if (this.money >= n * this.potCost) {
            this.money -= n * this.potCost;
            this.pots += n;
            return true;
        }
        else {
            return false;
        }
    };
    return Game;
}());
// PIXI.js Aliases
var resources = PIXI.loader.resources;
function byID(id) {
    return document.getElementById(id);
}
var g = new Game();
var WIDTH = 250;
var HEIGHT = 150;
var SCALE = 3;
// Create the renderer
var renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT, {
    antialias: false,
    roundPixels: true
});
// Resize of the canvas
renderer.view.style.width = WIDTH * SCALE + "px";
renderer.view.style.height = HEIGHT * SCALE + "px";
// Add the canvas to the body
document.body.appendChild(renderer.view);
// Load the textures
PIXI.loader
    .add("assets/background.png")
    .load(setup);
// Once loading is finished run this function
function setup() {
    // Create the stage
    var stage = new PIXI.Container();
    var background = new PIXI.Sprite(resources["assets/background.png"].texture);
    stage.addChild(background);
    // Render the stage
    renderer.render(stage);
}
//# sourceMappingURL=main.js.map