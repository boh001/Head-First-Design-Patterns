//=========================================================
// Beverage
//=========================================================
abstract class Beverage {
  protected description = '제목 없음';

  getDescription() {
    return this.description;
  }

  abstract cost(): number;
}

//=========================================================
// CondimentDecorator
//=========================================================
abstract class CondimentDecorator extends Beverage {
  protected beverage: Beverage;
}

class Mocha extends CondimentDecorator {
  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }

  getDescription(): string {
    return this.beverage.getDescription() + ', 모카';
  }

  cost(): number {
    return this.beverage.cost() + 0.2;
  }
}

class Soy extends CondimentDecorator {
  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }

  getDescription(): string {
    return this.beverage.getDescription() + ', 두유';
  }

  cost(): number {
    return this.beverage.cost() + 0.1;
  }
}

//=========================================================
// concrete
//=========================================================
class Espresso extends Beverage {
  constructor() {
    super();
    this.description = '에스프레소';
  }

  cost(): number {
    return 1.99;
  }
}

class HouseBlend extends Beverage {
  constructor() {
    super();
    this.description = '하우스 블렌드 커피';
  }

  cost(): number {
    return 0.89;
  }
}

//=========================================================
// main
//=========================================================
function main() {
  const beverage = new Espresso();
  console.log(beverage.getDescription() + '$' + beverage.cost());

  let beverage2 = new HouseBlend();
  beverage2 = new Mocha(beverage2);
  beverage2 = new Soy(beverage2);
  console.log(beverage2.getDescription() + '$' + beverage2.cost());
}

main();
