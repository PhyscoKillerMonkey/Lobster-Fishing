class DockState extends Phaser.State {
  
  sky: Phaser.Sprite;
  ground: Phaser.Graphics;
  boat: Phaser.Sprite;
  shop: Phaser.Sprite;
  cameraFocus: Phaser.Sprite;
  cls: number[];
  cl: number;

  create() {
    this.sky = this.add.sprite(0, 0, "new");

    this.cameraFocus = this.add.sprite(0, this.game.height / 2);
    this.cameraFocus.addChild(this.add.graphics(0, 0).beginFill(0xFF5722).drawRect(0, 0, 5, 5));

    this.world.setBounds(0, 0, this.game.width*4, this.game.height);
    this.camera.follow(this.cameraFocus, Phaser.Camera.FOLLOW_LOCKON, 0.2);

    this.cls = [200, 290, 345, 600]
    this.cl = 0;

    let leftKey = this.input.keyboard.addKey(37);
    let rightKey = this.input.keyboard.addKey(39);

    leftKey.onDown.add(function() {
      this.cl--;
      if (this.cl < 0) { this.cl = 0; }
      this.cameraFocus.x = this.cls[this.cl];
    }, this);
    rightKey.onDown.add(function() {
      this.cl++;
      if (this.cl >= this.cls.length) { this.cl = this.cls.length - 1; }
      this.cameraFocus.x = this.cls[this.cl];
    }, this);

    // Fade from black
    this.camera.flash(0x000);
  }

  render() {
    this.game.debug.cameraInfo(this.game.camera, 5, 5);
  }
}