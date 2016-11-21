class BootState extends Phaser.State {

  preload() {
    console.log("Boot preload");
    this.load.image("loadingBar", "assets/loadingBar.png");
  }

  create() {
    console.log("Boot create");
    // Disable multi touch
    this.input.maxPointers = 1;

    // Scale the game
    let scale = 2;
    this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    this.game.scale.setUserScale(scale, scale);

    // Enable crisp rendering
    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
    this.game.stage.smoothed = false; // Seems to round pixels

    this.game.state.start("Preload", true);
  }
}