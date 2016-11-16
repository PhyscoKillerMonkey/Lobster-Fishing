function byID(id: string): HTMLElement {
  return document.getElementById(id);
}
  
let g = new Game();

function init() {
  let stage = new createjs.Stage("canvas");
  let sWidth = (<HTMLCanvasElement>stage.canvas).width;
  let sHeight = (<HTMLCanvasElement>stage.canvas).height;

  let sceneSea = new createjs.Container();

  let sky = new createjs.Shape();
  sky.graphics.lf(["#3498DB", "#FAD7A0"], [0, 1], 0, 0, 0, sHeight*.75).drawRect(0, 0, sWidth, sHeight);

  let mountains = new createjs.Shape();
  mountains.graphics.beginFill("#229954")
    .mt(0, sHeight*.75)
    .lt(sWidth*.4, sHeight*.6)
    .lt(sWidth*.6, sHeight*.7)
    .lt(sWidth*.8, sHeight*.65)
    .lt(sWidth, sHeight*.75)
    .lt(sWidth, sHeight)
    .lt(0, sHeight);

  sceneSea.addChild(sky, mountains);
  stage.addChild(sceneSea);
  stage.update();
}