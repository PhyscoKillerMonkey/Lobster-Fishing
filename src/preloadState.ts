class PreloadState extends Phaser.State {
  loadingBar: Phaser.Sprite;

  preload() {
    console.log("Preload preload");

    // Set-up the loading bar
    this.loadingBar = this.add.sprite(this.world.width*0.5, this.world.height*0.5, "loadingBar");
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
  }

  create() {
    console.log("Preload create");
    let tween = this.add.tween(this.loadingBar).to(
      {alpha: 0}, 
      1000, 
      Phaser.Easing.Linear.None,
      true);
    tween.onComplete.add(this.switchToMenu, this);
  }

  switchToMenu() {
    this.game.state.start("Dock", true);
  }
}