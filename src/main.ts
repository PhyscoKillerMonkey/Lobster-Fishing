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
  .add([
    "assets/sky.png",
    "assets/clouds.png",
    "assets/foreground.png",
    "assets/mountains.png",
    "assets/boat.png",
    "assets/boatOutline.png",
    "assets/dock/ground.png",
    "assets/dock/mountains.png",
    "assets/dock/shop.png",
    "assets/dock/shopOutline.png"])
  .load(setup);

// Once loading is finished run this function
function setup() {
  // Create the stage
  let stage = new PIXI.Container();

  let sky = new PIXI.Sprite(resources["assets/sky.png"].texture);
  stage.addChild(sky);

  let clouds = new PIXI.Sprite(resources["assets/clouds.png"].texture);
  stage.addChild(clouds);

  let mountains = new PIXI.Sprite(resources["assets/dock/mountains.png"].texture);
  stage.addChild(mountains);

  let boat = new PIXI.Sprite(resources["assets/boat.png"].texture);
  let boatOutline = new PIXI.Sprite(resources["assets/boatOutline.png"].texture);
  boat.interactive = true;
  boat.on("mouseover", function() {
    boat.texture = resources["assets/boatOutline.png"].texture;
  });
  boat.on("mouseout", function() {
    boat.texture = resources["assets/boat.png"].texture;
  })
  stage.addChild(boat);

  let ground = new PIXI.Sprite(resources["assets/dock/ground.png"].texture);
  stage.addChild(ground);

  let shop = new PIXI.Sprite(resources["assets/dock/shop.png"].texture);
  let shopOutline = new PIXI.Sprite(resources["assets/dock/shopOutline.png"].texture);
  shopOutline.visible = false;
  
  stage.addChild(shop);

  function gameLoop() {
    requestAnimationFrame(gameLoop);
    
    // Render the stage
    renderer.render(stage);
  }
  gameLoop();
}