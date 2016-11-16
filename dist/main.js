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
var page = {
    status: {
        money: byID("statusMoney"),
        in: byID("statusPotsIn"),
        out: byID("statusPotsOut"),
        total: byID("statusPotsTot"),
        day: byID("statusDay")
    }
};
var g = new Game();
function update() {
    page.status.money.innerText = g.money.toString();
    page.status.in.innerText = g.potsIn.toString();
    page.status.out.innerText = g.potsOut.toString();
    page.status.total.innerText = g.pots.toString();
    page.status.day.innerText = g.day.toString();
}
update();
function act(action) {
    switch (action) {
        case "potIn":
            g.movePotIn();
            break;
        case "potOut":
            g.movePotOut();
            break;
        case "buyPot":
            g.buyPots(1);
            break;
        case "doTurn":
            g.doTurn();
            if (g.wasFine) {
                console.log("Was fine");
            }
            else {
                console.log("Was stormy");
            }
            break;
    }
    update();
}
//# sourceMappingURL=main.js.map