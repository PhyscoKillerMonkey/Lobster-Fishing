class DockState extends Phaser.State {

  sky: Phaser.Sprite;
  clouds: Phaser.Sprite;
  mountains: Phaser.Sprite;
  boat: Phaser.Sprite;
  ground: Phaser.Sprite;
  shop: Phaser.Sprite;

  create() {
    this.sky = this.add.sprite(0, 0, "sky");
    this.clouds = this.add.sprite(0, 0, "clouds");
    
    this.mountains = this.add.sprite(0, 0, "dockMountains");

    this.boat = this.add.sprite(166, 112, "boat");
    this.boat.inputEnabled = true;
    this.boat.input.pixelPerfectOver = true;
    this.boat.events.onInputOver.add(function() {
      this.boat.loadTexture("boatOutline");
    }, this);
    this.boat.events.onInputOut.add(function() {
      this.boat.loadTexture("boat");
    }, this);

    this.ground = this.add.sprite(0, 0, "dockGround");

    this.shop = this.add.sprite(5, 99, "dockShop");
    this.shop.inputEnabled = true;
    this.shop.input.pixelPerfectOver = true;
    this.shop.events.onInputOver.add(function() {
      this.shop.loadTexture("dockShopOutline"); 
    }, this);
    this.shop.events.onInputOut.add(function() {
      this.shop.loadTexture("dockShop");
    }, this);

    // Fade from black
    this.camera.flash(0x000);
  }
}