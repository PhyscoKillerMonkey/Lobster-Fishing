// PIXI.js Aliases
let resources = PIXI.loader.resources;

// Keep those crisp pixels
PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

function byID(id: string): HTMLElement {
  return document.getElementById(id);
}
  
let g = new Game();

// Create the renderer
let renderer = PIXI.autoDetectRenderer(250, 150, {
  antialias: false,
  roundPixels: true
});

// Add the canvas to the body
document.body.appendChild(renderer.view);

// Load the textures
PIXI.loader
  .add("assets/background.png")
  .load(setup);

// Once loading is finished run this function
function setup() {
  // Create the stage
  let stage = new PIXI.Container();

  let background = new PIXI.Sprite(
    resources["assets/background.png"].texture
  );

  stage.addChild(background);

  // Render the stage
  renderer.render(stage);
}