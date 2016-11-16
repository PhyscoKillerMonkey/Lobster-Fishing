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
function byID(id) {
    return document.getElementById(id);
}
var g = new Game();
function init() {
    var stage = new createjs.Stage("canvas");
    var sWidth = stage.canvas.width;
    var sHeight = stage.canvas.height;
    var sceneSea = new createjs.Container();
    var sky = new createjs.Shape();
    sky.graphics.lf(["#3498DB", "#FAD7A0"], [0, 1], 0, 0, 0, sHeight * .75).drawRect(0, 0, sWidth, sHeight);
    var mountains = new createjs.Shape();
    mountains.graphics.beginFill("#229954")
        .mt(0, sHeight * .75)
        .lt(sWidth * .4, sHeight * .6)
        .lt(sWidth * .6, sHeight * .7)
        .lt(sWidth * .8, sHeight * .65)
        .lt(sWidth, sHeight * .75)
        .lt(sWidth, sHeight)
        .lt(0, sHeight);
    sceneSea.addChild(sky, mountains);
    stage.addChild(sceneSea);
    stage.update();
}
//# sourceMappingURL=main.js.map