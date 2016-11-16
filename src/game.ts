class Game {
  public day: number;
  public pots: number;
  public potsIn: number;
  public potsOut: number;
  public money: number;
  public profit: number;
  public wasFine: boolean;

  // Game constants
  private potCost = 5;
  private fIn = 1;
  private fOut = 6;
  private sIn = 3;

  public constructor() {
    this.newGame();
  }

  public newGame() {
    this.day = 1;
    this.pots = 5;
    this.potsIn = 5;
    this.potsOut = 0;
    this.money = 0;
  }

  public movePotIn() {
    if (this.potsIn < this.pots) {
      this.potsIn++;
      this.potsOut--;
    }
  }

  public movePotOut() {
    if (this.potsOut < this.pots) {
      this.potsOut++;
      this.potsIn--;
    }
  }

  public doTurn() {
    // Roll the dice
    let dice = Math.ceil(Math.random() * 6);
    if (dice % 2 == 0) {
      // Weather is fine
      this.wasFine = true;
      this.profit = this.potsIn * this.fIn + this.potsOut * this.fOut;
      this.money += this.profit;
    
    } else {
      // Weather was stormy
      this.wasFine = false;
      this.profit = this.potsIn * this.sIn;
      this.money += this.profit;
      this.pots -= this.potsOut;
      this.potsOut = 0; 
    }

    this.day++;
  }

  public buyPots(n: number): boolean {
    // Check if we can buy that many pots
    if (this.money >= n * this.potCost) {
      this.money -= n * this.potCost;
      this.pots += n;
      return true;
    } else {
      return false;
    }
  }
} 