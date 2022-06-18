//=========================================================
// Pizza with FactoryMethod
//=========================================================
abstract class PizzaFactoryMethod {
  protected name: string;
  protected dough: string;
  protected sauce: string;
  protected toppigs: string[] = [];

  get getName() {
    return this.name;
  }

  prepare() {
    console.log(`준비 중: ${this.name}`);
    console.log(`도우를 돌리는 중...`);
    console.log(`소스를 뿌리는 중...`);
    console.log(`토핑을 올리는 중...`);

    this.toppigs.forEach((topping) => {
      console.log(` ${topping}`);
    });
  }

  bake() {
    console.log('175도에서 25분 간 굽기');
  }

  cut() {
    console.log('피자를 사선으로 자르기');
  }

  box() {
    console.log('상자에 피자 담기');
  }
}

class NYStyleCheesePizza extends PizzaFactoryMethod {
  constructor() {
    super();
    this.name = '뉴욕 스타일 소스와 치즈 피자';
    this.dough = '씬 크러스트 도우';
    this.sauce = '마리나라 소스';

    this.toppigs.push('잘게 썬 레지아노 치즈');
  }
}

class ChicagoStyleCheesePizza extends PizzaFactoryMethod {
  constructor() {
    super();
    this.name = '시카고 스타일 딥 디쉬 치즈 피자';
    this.dough = '아주 두꺼운 크러스트 도우';
    this.sauce = '플럼 토마토 소스';

    this.toppigs.push('잘게 썬 모짜렐라 치즈');
  }

  cut() {
    console.log('네모난 모양으로 피자 자르기');
  }
}

//=========================================================
// PizzaStoreFactoryMethod
//=========================================================
abstract class PizzaStore {
  abstract createPizza(type: string): PizzaFactoryMethod;

  orderPizza(type: string): PizzaFactoryMethod {
    const pizza = this.createPizza(type);

    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();

    return pizza;
  }
}

class NYPizzaStore extends PizzaStore {
  createPizza(type: string): PizzaFactoryMethod {
    if (type === 'cheese') {
      return new NYStyleCheesePizza();
    }

    return null;
  }
}

class ChicagoPizzaStore extends PizzaStore {
  createPizza(type: string): PizzaFactoryMethod {
    if (type === 'cheese') {
      return new ChicagoStyleCheesePizza();
    }

    return null;
  }
}

//=========================================================
// PizzaIngredientFactory
//=========================================================
const DOUGH = 'dough';
const SAUCE = 'sauce';
const CHEESE = 'cheese';
const VEGGIES = 'veggies';
const PEPEERONI = 'pepeeroni';
const CLAM = 'clam';

type Dough = typeof DOUGH;
type Sauce = typeof SAUCE;
type Cheese = typeof CHEESE;
type Veggies = typeof VEGGIES;
type Pepperoni = typeof PEPEERONI;
type Clam = typeof CLAM;

interface PizzaIngredientFactory {
  createDough(): Dough;
  createSauce(): Sauce;
  createCheese(): Cheese;
  createVeggies(): Veggies;
  createPepperoni(): Pepperoni;
  createClam(): Clam;
}

class NYPizzaIngredientFactory implements PizzaIngredientFactory {
  createDough(): Dough {
    return DOUGH;
  }

  createSauce(): Sauce {
    return SAUCE;
  }

  createCheese(): Cheese {
    return CHEESE;
  }

  createVeggies(): Veggies {
    return VEGGIES;
  }

  createPepperoni(): Pepperoni {
    return PEPEERONI;
  }

  createClam(): Clam {
    return CLAM;
  }
}

//=========================================================
// Pizza with AbstractFactory
//=========================================================
abstract class PizzaAbstractFactory {
  protected name: string;
  protected dough: Dough;
  protected sauce: Sauce;
  protected cheese: Cheese;
  protected veggies: Veggies;
  protected clam: Clam;
  protected ingredientFactory: PizzaIngredientFactory;

  get getName() {
    return this.name;
  }

  set setName(name: string) {
    this.name = name;
  }

  abstract prepare(): void;

  bake() {
    console.log('175도에서 25분 간 굽기');
  }

  cut() {
    console.log('피자를 사선으로 자르기');
  }

  box() {
    console.log('상자에 피자 담기');
  }
}

class CheesePizza extends PizzaAbstractFactory {
  constructor(ingredientFactory: PizzaIngredientFactory) {
    super();
    this.ingredientFactory = ingredientFactory;
  }

  prepare() {
    console.log(`준비 중: ${this.name}`);

    this.dough = this.ingredientFactory.createDough();
    this.sauce = this.ingredientFactory.createSauce();
    this.cheese = this.ingredientFactory.createCheese();
    this.clam = this.ingredientFactory.createClam();
  }
}

class ClamPizza extends PizzaAbstractFactory {
  constructor(ingredientFactory: PizzaIngredientFactory) {
    super();
    this.ingredientFactory = ingredientFactory;
  }

  prepare() {
    console.log(`준비 중: ${this.name}`);

    this.dough = this.ingredientFactory.createDough();
    this.sauce = this.ingredientFactory.createSauce();
    this.cheese = this.ingredientFactory.createCheese();
  }
}

//=========================================================
// PizzaStore with Abstract Factory
//=========================================================
abstract class PizzaStoreAbstractFactory {
  abstract createPizza(type: string): PizzaAbstractFactory;

  orderPizza(type: string): PizzaAbstractFactory {
    const pizza = this.createPizza(type);

    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();

    return pizza;
  }
}

class NYPizzaStoreAbstractStory extends PizzaStoreAbstractFactory {
  createPizza(type: string): PizzaAbstractFactory {
    const ingredientFactory = new NYPizzaIngredientFactory();
    if (type === 'cheese') {
      const pizza = new CheesePizza(ingredientFactory);
      pizza.setName = '뉴욕 스타일 치즈 피자';

      return pizza;
    }

    if (type === 'clam') {
      const pizza = new ClamPizza(ingredientFactory);
      pizza.setName = '뉴욕 스타일 조개 피자';

      return pizza;
    }

    return null;
  }
}

//=========================================================
// main
//=========================================================
function main() {
  const nyStore = new NYPizzaStore();
  const chicagoStore = new ChicagoPizzaStore();

  const nyPizza = nyStore.orderPizza('cheese');
  console.log(`에단이 주문한 ${nyPizza.getName}`);

  const chicagoPizza = chicagoStore.orderPizza('cheese');
  console.log(`조엘이 주문한 ${chicagoPizza.getName}`);

  const nyStoreAbstract = new NYPizzaStoreAbstractStory();

  const cheesePizza = nyStoreAbstract.orderPizza('cheese');
  console.log(cheesePizza.getName);

  const clamPizza = nyStoreAbstract.orderPizza('clam');
  console.log(clamPizza.getName);
}

main();
