class DockState extends Phaser.State {

  sky: Phaser.Sprite;
  clouds: Phaser.Sprite;
  mountains: Phaser.Sprite;
  boat: Phaser.Sprite;
  boatCollision: Phaser.Sprite;
  ground: Phaser.Sprite;
  shop: Phaser.Sprite;

  create() {
    this.sky = this.add.sprite(0, 0, "sky");
    this.clouds = this.add.sprite(0, 0, "clouds");
    
    this.mountains = this.add.sprite(0, 0, "dockMountains");

    this.boat = this.add.sprite(166, 111, "boat");
    // Use a white sprite to still get mouseover on the windows
    this.boatCollision = this.add.sprite(this.boat.x, this.boat.y, "boatCollision");
    this.boatCollision.alpha = 0;
    this.boatCollision.inputEnabled = true;
    this.boatCollision.input.pixelPerfectOver = true;
    this.boatCollision.events.onInputOver.add(function() {
      this.boat.loadTexture("boatOutline");
    }, this);
    this.boatCollision.events.onInputOut.add(function() {
      this.boat.loadTexture("boat");
    }, this);
    this.boatCollision.events.onInputDown.add(function() {
      console.log("Boat was clicked");
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
    this.shop.events.onInputDown.add(function() {
      console.log("Shop was clicked");
    }, this);

    // Fade from black
    this.camera.flash(0x000);
  }
}