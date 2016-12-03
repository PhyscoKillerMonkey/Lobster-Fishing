var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BootState = (function (_super) {
    __extends(BootState, _super);
    function BootState() {
        _super.apply(this, arguments);
    }
    BootState.prototype.preload = function () {
        console.log("Boot preload");
        this.load.image("loadingBar", "assets/loadingBar.png");
    };
    BootState.prototype.create = function () {
        console.log("Boot create");
        // Disable multi touch
        this.input.maxPointers = 1;
        // Scale the game
        var scale = 2;
        this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        this.game.scale.setUserScale(scale, scale);
        // Enable crisp rendering
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
        this.game.stage.smoothed = false; // Seems to round pixels
        this.game.state.start("Preload", true);
    };
    return BootState;
}(Phaser.State));
var DockState = (function (_super) {
    __extends(DockState, _super);
    function DockState() {
        _super.apply(this, arguments);
    }
    DockState.prototype.create = function () {
        this.sky = this.add.sprite(0, 0, "new");
        this.cameraFocus = this.add.sprite(0, this.game.height / 2);
        this.cameraFocus.addChild(this.add.graphics(0, 0).beginFill(0xFF5722).drawRect(0, 0, 5, 5));
        this.world.setBounds(0, 0, this.game.width * 4, this.game.height);
        this.camera.follow(this.cameraFocus, Phaser.Camera.FOLLOW_LOCKON, 0.2);
        this.cls = [200, 290, 345, 600];
        this.cl = 0;
        var leftKey = this.input.keyboard.addKey(37);
        var rightKey = this.input.keyboard.addKey(39);
        leftKey.onDown.add(function () {
            this.cl--;
            if (this.cl < 0) {
                this.cl = 0;
            }
            this.cameraFocus.x = this.cls[this.cl];
        }, this);
        rightKey.onDown.add(function () {
            this.cl++;
            if (this.cl >= this.cls.length) {
                this.cl = this.cls.length - 1;
            }
            this.cameraFocus.x = this.cls[this.cl];
        }, this);
        // Fade from black
        this.camera.flash(0x000);
    };
    DockState.prototype.render = function () {
        this.game.debug.cameraInfo(this.game.camera, 5, 5);
    };
    return DockState;
}(Phaser.State));
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        _super.call(this, 250, 150, Phaser.AUTO, "content");
        this.state.add("Boot", BootState);
        this.state.add("Preload", PreloadState);
        this.state.add("Dock", DockState);
        this.state.start("Boot");
    }
    return Game;
}(Phaser.Game));
window.onload = function () {
    var game = new Game();
};
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
var Logic = (function () {
    function Logic() {
        // Game constants
        this.potCost = 5;
        this.fIn = 1;
        this.fOut = 6;
        this.sIn = 3;
        this.newGame();
    }
    Logic.prototype.newGame = function () {
        this.day = 1;
        this.pots = 5;
        this.potsIn = 5;
        this.potsOut = 0;
        this.money = 0;
    };
    Logic.prototype.movePotIn = function () {
        if (this.potsIn < this.pots) {
            this.potsIn++;
            this.potsOut--;
        }
    };
    Logic.prototype.movePotOut = function () {
        if (this.potsOut < this.pots) {
            this.potsOut++;
            this.potsIn--;
        }
    };
    Logic.prototype.doTurn = function () {
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
    Logic.prototype.buyPots = function (n) {
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
    return Logic;
}());
var PreloadState = (function (_super) {
    __extends(PreloadState, _super);
    function PreloadState() {
        _super.apply(this, arguments);
    }
    PreloadState.prototype.preload = function () {
        console.log("Preload preload");
        // Set-up the loading bar
        this.loadingBar = this.add.sprite(this.world.width * 0.5, this.world.height * 0.5, "loadingBar");
        this.loadingBar.anchor.set(0.5, 0.5);
        this.load.setPreloadSprite(this.loadingBar);
        // Load the actual game sprites
        this.load.image("dockGround", "assets/dock/ground.png");
        this.load.image("dockMountains", "assets/dock/mountains.png");
        this.load.image("dockPots", "assets/dock/pots.png");
        this.load.image("dockPotsOutline", "assets/dock/potsOutline.png");
        this.load.image("dockShop", "assets/dock/shop.png");
        this.load.image("dockShopOutline", "assets/dock/shopOutline.png");
        this.load.image("sky", "assets/sky.png");
        this.load.image("clouds", "assets/clouds.png");
        this.load.image("boat", "assets/boat.png");
        this.load.image("boatOutline", "assets/boatOutline.png");
        this.load.image("boatCollision", "assets/boatCollision.png");
        this.load.image("new", "assets/new.png");
    };
    PreloadState.prototype.create = function () {
        console.log("Preload create");
        var tween = this.add.tween(this.loadingBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(this.switchToMenu, this);
    };
    PreloadState.prototype.switchToMenu = function () {
        this.game.state.start("Dock", true);
    };
    return PreloadState;
}(Phaser.State));
//# sourceMappingURL=main.js.map