abstract class TemplateWithHook {
  templateMethod() {
    this.abstractMethod1()
    this.abstractMethod2()
    this.concreteMethod1()
    if (this.hook()) {
      this.concreteMethod2()
    }
  }

  protected abstract abstractMethod1(): void
  protected abstract abstractMethod2(): void

  protected concreteMethod1(): void {
    console.log("concreteMethod1")
  }

  protected concreteMethod2(): void {
    console.log("concreteMethod1")
  }

  protected hook(): boolean {
    return true
  }
}

class ConcreteClass1 extends TemplateWithHook {
  protected abstractMethod1() {
    console.log("abstractMethod1 in concreteClass1")
  }

  protected abstractMethod2() {
    console.log("abstractMethod2 in concreteClass1")
  }

  protected concreteMethod1() {
    console.log("concreteMethod1 in concreteClass1")
  }

  protected concreteMethod2() {
    console.log("concreteMethod2 in concreteClass1")
  }

  protected hook(): boolean {
    return false
  }
}

class ConcreteClass2 extends TemplateWithHook {
  protected abstractMethod1() {
    console.log("abstractMethod1 in concreteClass2")
  }

  protected abstractMethod2() {
    console.log("abstractMethod2 in concreteClass2")
  }

  protected concreteMethod1() {
    console.log("concreteMethod1 in concreteClass2")
  }

  protected concreteMethod2() {
    console.log("concreteMethod2 in concreteClass2")
  }
}

(function () {
  const class1 = new ConcreteClass1()
  const class2 = new ConcreteClass2()

  console.log("################class1################")
  class1.templateMethod()
  console.log("################class2################")
  class2.templateMethod()
})()
