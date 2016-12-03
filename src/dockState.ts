class DockState extends Phaser.State {
  
  sky: Phaser.Graphics;
  ground: Phaser.Graphics;
  boat: Phaser.Sprite;
  shop: Phaser.Sprite;
  cameraFocus: Phaser.Sprite;

  create() {
    this.sky = this.add.graphics(0, 0);
    this.sky.beginFill(0x5DB4F2);
    this.sky.drawRect(0, 0, this.game.width*2, this.game.height);

    this.ground = this.add.graphics(0, this.game.height - 40);
    this.ground.beginFill(0xA27D29);
    this.ground.drawRect(0, 0, this.game.width*2, 40);

    this.boat = this.add.sprite(10, 80);
    this.boat.addChild(this.add.graphics(0, 0).beginFill(0xFFA458).drawRect(0, 0, 60, 40));

    this.shop = this.add.sprite(250, 70);
    this.shop.addChild(this.add.graphics(0, 0).beginFill(0xFFA458).drawRect(0, 0, 80, 50));

    this.cameraFocus = this.add.sprite(0, this.game.height / 2);
    this.cameraFocus.addChild(this.add.graphics(0, 0).beginFill(0xFF5722).drawRect(0, 0, 5, 5));

    this.world.setBounds(0, 0, this.game.width*2, this.game.height);
    this.camera.follow(this.cameraFocus, Phaser.Camera.FOLLOW_LOCKON, 0.5);

    // Fade from black
    this.camera.flash(0x000);
  }

  update() {
    if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.cameraFocus.x -= 5;
    } else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.cameraFocus.x += 5;
    }
  }

  render() {
    this.game.debug.cameraInfo(this.game.camera, 5, 5);
  }
}