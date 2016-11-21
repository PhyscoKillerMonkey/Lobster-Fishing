class Game extends Phaser.Game {

  constructor() {
    super(250, 150, Phaser.AUTO, "content");

    this.state.add("Boot", BootState);
    this.state.add("Preload", PreloadState);
    this.state.add("Dock", DockState);

    this.state.start("Boot");
  }
}

window.onload = function() {
  let game = new Game();
}