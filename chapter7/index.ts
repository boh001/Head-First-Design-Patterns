//=========================================================
// Adapter Pattern
//=========================================================
interface Duck {
  quack(): void;
  fly(): void;
}

class MallardDuck implements Duck {
  quack() {
    console.log("꽥")
  }

  fly() {
    console.log("닐고 있어요!!")
  }
}

interface Turkey {
  gobble(): void
  fly(): void
}

class WildTurkey implements Turkey {
  gobble() {
    console.log("골골")
  }

  fly() {
    console.log("짧은 거리를 날고 있어요!")
  }
}

class  TurkeyAdapter implements Duck {
  turkey: Turkey

  constructor(turkey: Turkey) {
    this.turkey = turkey
  }

  quack() {
    this.turkey.gobble()
  }

  fly() {
    this.turkey.fly()
  }
}

(function() {
  const duck = new MallardDuck();

  const turkey = new WildTurkey();

  const turkeyAdapter = new TurkeyAdapter(turkey);

  console.log("칠면조가 말하길")
  turkey.gobble()
  turkey.fly()

  console.log("오리가 말하길")
  duck.quack()
  duck.fly()

  console.log("칠면조 어댑터가 말하길")
  turkeyAdapter.quack()
  turkeyAdapter.fly()
})()

//=========================================================
// Facade Pattern
//=========================================================
interface Sub {
  action1() :void
  action2() :void
}
class Sub1Impl implements Sub {
  action1() {
    console.log("sub1 action1")
  }

  action2() {
    console.log("sub1 action2")
  }
}
class Sub2Impl implements Sub {
  action1() {
    console.log("sub2 action1")
  }

    action2() {
    console.log("sub2 action2")
  }
}
class Sub3Impl implements Sub {
  action1() {
    console.log("sub3 action1")
  }

    action2() {
    console.log("sub3 action2")
  }
}

interface Facade {
  action1(): void
  action2(): void
}

class FacadeImpl implements Facade {
  private sub1: Sub
  private sub2: Sub
  private sub3: Sub

  constructor(sub1: Sub, sub2: Sub, sub3: Sub) {
    this.sub1 = sub1
    this.sub2 = sub2
    this.sub3 = sub3
  }

  action1() {
    this.sub1.action1()
    this.sub2.action1()
    this.sub3.action1()
  }

  action2() {
    this.sub1.action2()
    this.sub2.action2()
    this.sub3.action2()
  }
}

(function() {
  const sub1 = new Sub1Impl()
  const sub2 = new Sub2Impl()
  const sub3 = new Sub3Impl()

  const facade = new FacadeImpl(sub1, sub2, sub3)

  facade.action1()
  facade.action2()
})()
