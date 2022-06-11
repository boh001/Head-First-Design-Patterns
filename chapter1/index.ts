interface FlyBehavior {
  fly(): void;
}

interface QuackBehavior {
  quack(): void;
}

abstract class Duck {
  flyBehavor: FlyBehavior;
  quackBehavor: QuackBehavior;

  abstract display(): void;

  setFlyBehavior(fb: FlyBehavior) {
    this.flyBehavor = fb;
  }

  setQuackBehavior(qb: QuackBehavior) {
    this.quackBehavor = qb;
  }

  performFly() {
    this.flyBehavor.fly();
  }

  performQuack() {
    this.quackBehavor.quack();
  }

  swim() {
    console.log('모든 오리는 물에 뜹니다. 가짜 오리도 뜨죠');
  }
}

//=========================================================
// MallardDuck
//=========================================================
class FlyWithWings implements FlyBehavior {
  fly() {
    console.log('날고 있어요!!');
  }
}

class Quack implements QuackBehavior {
  quack() {
    console.log('꽥');
  }
}

class MallardDuck extends Duck {
  constructor() {
    super();
    this.flyBehavor = new FlyWithWings();
    this.quackBehavor = new Quack();
  }

  display() {
    console.log('저는 말라드 오리입니다');
  }
}

//=========================================================
// ModelDuck
//=========================================================
class FlyNoWay implements FlyBehavior {
  fly() {
    console.log('저는 못 날아요');
  }
}

class FlyRocketPowered implements FlyBehavior {
  fly() {
    console.log('로켓 추진으로 날아갑니다');
  }
}

class ModelDuck extends Duck {
  constructor() {
    super();
    this.flyBehavor = new FlyNoWay();
    this.quackBehavor = new Quack();
  }

  display() {
    console.log('저는 모형 오리입니다');
  }
}

//=========================================================
// main
//=========================================================
function main() {
  const mallard = new MallardDuck();
  mallard.performQuack();
  mallard.performFly();

  const model = new ModelDuck();
  model.performFly();
  model.setFlyBehavior(new FlyRocketPowered());
  model.performFly();
}

main();
