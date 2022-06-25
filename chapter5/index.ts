//=========================================================
// ChocolateBoiler
//=========================================================
class ChocolateBoiler {
  private empty: boolean;
  private boiled: boolean;

  private static instance: ChocolateBoiler;

  static getInstance(): ChocolateBoiler {
    if (!this.instance) {
      this.instance = new ChocolateBoiler()
    }
    return this.instance
  }

  private constructor() {
    this.empty = true;
    this.boiled = false;
  }

  fill() {
    if(this.empty) {
      this.empty = false;
      this.boiled = false;
      console.log("fiil")
    }
  }
}

//=========================================================
// main
//=========================================================
function main() {
  const boiler1 = ChocolateBoiler.getInstance();
  const boiler2 = ChocolateBoiler.getInstance();

  boiler1.fill()
  boiler2.fill()
}

main()
