// PIXI.js Aliases
let resources = PIXI.loader.resources;

function byID(id: string): HTMLElement {
  return document.getElementById(id);
}
  
let g = new Game();

let WIDTH = 250;
let HEIGHT = 150;
let SCALE = 3;

// Create the renderer
let renderer = PIXI.autoDetectRenderer( WIDTH, HEIGHT, {
  antialias: false,
  roundPixels: true
});
// Resize of the canvas
renderer.view.style.width = WIDTH * SCALE + "px";
renderer.view.style.height = HEIGHT * SCALE + "px";

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