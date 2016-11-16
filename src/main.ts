function byID(id: string): HTMLElement {
  return document.getElementById(id);
}

let page = {
  status: {
    money: byID("statusMoney"),
    in: byID("statusPotsIn"),
    out: byID("statusPotsOut"),
    total: byID("statusPotsTot"),
    day: byID("statusDay")
  }
}

let g = new Game();

function update() {
  page.status.money.innerText = g.money.toString();
  page.status.in.innerText = g.potsIn.toString();
  page.status.out.innerText = g.potsOut.toString();
  page.status.total.innerText = g.pots.toString();
  page.status.day.innerText = g.day.toString();
}

update();

function act(action: string) {
  switch(action) {
    case "potIn": g.movePotIn(); break;
    case "potOut": g.movePotOut(); break;
    case "buyPot": g.buyPots(1); break;
    case "doTurn": 
      g.doTurn(); 
      if (g.wasFine) { console.log("Was fine"); }
      else { console.log("Was stormy"); }
      break;
  }
  
  update();
}