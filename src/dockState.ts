class DockState extends Phaser.State {

  sky: Phaser.Sprite;
  clouds: Phaser.Sprite;
  mountains: Phaser.Sprite;
  boat: Phaser.Sprite;
  boatCollision: Phaser.Sprite;
  ground: Phaser.Sprite;
  pots: Phaser.Sprite;
  shop: Phaser.Sprite;

  create() {
    this.sky = this.add.sprite(0, 0, "sky");
    this.clouds = this.add.sprite(0, 0, "clouds");
    
    this.mountains = this.add.sprite(0, 0, "dockMountains");

    // Helper funcion to add outline to a sprite on hover
    function addOutline(sprite: Phaser.Sprite, normalKey: string, outlineKey: string, affects?: Phaser.Sprite) {
      sprite.inputEnabled = true;
      sprite.input.pixelPerfectOver = true
      sprite.input.pixelPerfectClick = true;
      sprite.events.onInputOver.add(function() {
        if (affects) {
          affects.loadTexture(outlineKey);
        } else {
          sprite.loadTexture(outlineKey);
        }
      });
      sprite.events.onInputOut.add(function() {
        if (affects) {
          affects.loadTexture(normalKey);
        } else {
          sprite.loadTexture(normalKey);
        }
      });
    }
    
    this.boat = this.add.sprite(166, 111, "boat");
    // Use a white sprite to still get mouseover on the windows
    this.boatCollision = this.add.sprite(this.boat.x, this.boat.y, "boatCollision");
    this.boatCollision.alpha = 0;
    addOutline(this.boatCollision, "boat", "boatOutline", this.boat);
    this.boatCollision.events.onInputDown.add(function() {
      console.log("Boat was clicked");
    }, this);

    this.ground = this.add.sprite(0, 0, "dockGround");

    this.pots = this.add.sprite(144, 126, "dockPots");
    addOutline(this.pots, "dockPots", "dockPotsOutline");

    this.shop = this.add.sprite(5, 99, "dockShop");
    addOutline(this.shop, "dockShop", "dockShopOutline");
    this.shop.events.onInputDown.add(function() {
      console.log("Shop was clicked");
    }, this);

    // Fade from black
    this.camera.flash(0x000);
  }
}