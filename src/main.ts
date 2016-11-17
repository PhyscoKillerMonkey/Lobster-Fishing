// PIXI.js Aliases
let resources = PIXI.loader.resources;

function byID(id: string): HTMLElement {
  return document.getElementById(id);
}
  
let g = new Game();

let WIDTH = 100;
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
  .add([
    "assets/sky.png",
    "assets/ground.png",
    "assets/boat.png"])
  .load(setup);

// Once loading is finished run this function
function setup() {
  // Create the stage
  let stage = new PIXI.Container();

  let sky = new PIXI.Sprite(resources["assets/sky.png"].texture);
  stage.addChild(sky);

  let ground = new PIXI.Sprite(resources["assets/ground.png"].texture);
  stage.addChild(ground);

  let boat = new PIXI.Sprite(resources["assets/boat.png"].texture);
  boat.anchor.set(0.6, 0.5);
  boat.x = renderer.view.width*0.5;
  boat.y = 120;
  stage.addChild(boat);
  
  let boatVX = 0; 
  let boatVel = 1;
  let screenOff = 0;

  let leftKey = keyboard(37);
  leftKey.press = function() {
    boatVX -= boatVel;
  }
  leftKey.release = function() {
    boatVX += boatVel;
  }

  let rightKey = keyboard(39);
  rightKey.press = function() {
    boatVX += boatVel;
  }
  rightKey.release = function() {
    boatVX -= boatVel;
  }

  function gameLoop() {
    requestAnimationFrame(gameLoop);

    // Update the screen position
    screenOff -= boatVX;
    sky.x = screenOff * 0.5;
    ground.x = screenOff;
    
    // Render the stage
    renderer.render(stage);
  }
  gameLoop();
}