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
function keyboard(keyCode) {
    var key = {
        code: keyCode,
        isDown: false,
        isUp: true,
        press: undefined,
        release: undefined,
        downHandler: function (event) {
            if (event.keyCode === key.code) {
                if (key.isUp && key.press)
                    key.press();
                key.isDown = true;
                key.isUp = false;
            }
            event.preventDefault();
        },
        upHandler: function (event) {
            if (event.keyCode === key.code) {
                if (key.isDown && key.release)
                    key.release();
                key.isDown = false;
                key.isUp = true;
            }
            event.preventDefault();
        }
    };
    //Attach event listeners
    window.addEventListener("keydown", key.downHandler.bind(key), false);
    window.addEventListener("keyup", key.upHandler.bind(key), false);
    return key;
}
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
    .add([
    "assets/sky.png",
    "assets/clouds.png",
    "assets/foreground.png",
    "assets/mountains.png",
    "assets/boat.png",
    "assets/boatOutline.png",
    "assets/dock/ground.png",
    "assets/dock/mountains.png",
    "assets/dock/shop.png",
    "assets/dock/shopOutline.png"])
    .load(setup);
// Once loading is finished run this function
function setup() {
    // Create the stage
    var stage = new PIXI.Container();
    var sky = new PIXI.Sprite(resources["assets/sky.png"].texture);
    stage.addChild(sky);
    var clouds = new PIXI.Sprite(resources["assets/clouds.png"].texture);
    stage.addChild(clouds);
    var mountains = new PIXI.Sprite(resources["assets/dock/mountains.png"].texture);
    stage.addChild(mountains);
    var boat = new PIXI.Sprite(resources["assets/boat.png"].texture);
    var boatOutline = new PIXI.Sprite(resources["assets/boatOutline.png"].texture);
    boat.interactive = true;
    boat.on("mouseover", function () {
        boat.texture = resources["assets/boatOutline.png"].texture;
    });
    boat.on("mouseout", function () {
        boat.texture = resources["assets/boat.png"].texture;
    });
    stage.addChild(boat);
    var ground = new PIXI.Sprite(resources["assets/dock/ground.png"].texture);
    stage.addChild(ground);
    var shop = new PIXI.Sprite(resources["assets/dock/shop.png"].texture);
    var shopOutline = new PIXI.Sprite(resources["assets/dock/shopOutline.png"].texture);
    shopOutline.visible = false;
    stage.addChild(shop);
    function gameLoop() {
        requestAnimationFrame(gameLoop);
        // Render the stage
        renderer.render(stage);
    }
    gameLoop();
}
//# sourceMappingURL=main.js.map