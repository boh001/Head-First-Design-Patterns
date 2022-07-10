interface Invoker {
  invoke(slot: number) : void
  cancel(slot: number): void
}
class InvokerImpl implements Invoker {
  commands: Command[]

  constructor() {
    this.commands = []
  }

  setCommand(slot:number, command: Command) {
    this.commands[slot] = command
  }

  invoke(slot: number) {
    this.commands[slot].execute()
  }

  cancel(slot: number){
    this.commands[slot].undo()
  }
}

interface Command {
  execute(): void;
  undo(): void;
}
class CommandImpl implements Command {
  receiver: Receiver

  constructor(receiver: Receiver) {
    this.receiver = receiver
  }

  execute() {
    this.receiver.action1();
    this.receiver.action2();
  }

  undo() {
    this.receiver.undoAction1();
    this.receiver.undoAction2();
  }
}
class MacroCommandImpl implements Command {
  commands: Command[]

  constructor(commands: Command[]) {
    this.commands = commands
  }

  execute() {
    this.commands.forEach(command => {
      console.log("marco ####################################")
      command.execute()
    })
  }

  undo() {
    this.commands.forEach(command => {
      console.log("marco ####################################")
      command.undo()
    })
  }
}

interface Receiver {
  action1(): void
  action2(): void
  undoAction1(): void
  undoAction2(): void
}
class ReceiverImpl implements Receiver {
  action1() {
    console.log("action1")
  }
  action2() {
    console.log("action2")
  }

  undoAction1() {
    console.log("undoAction1")
  }
  undoAction2() {
    console.log("undoAction2")
  }
}

(function main() {
  const invoker = new InvokerImpl();
  const receiver = new ReceiverImpl();
  const command = new CommandImpl(receiver)

  invoker.setCommand(0, command)
  invoker.invoke(0)
  invoker.cancel(0)

  // 여러가지 커맨들을 묶은 매크로커맨드를 활용함
  const command1 = new CommandImpl(receiver)
  const command2 = new CommandImpl(receiver)
  const command3 = new CommandImpl(receiver)
  const marcoCommand = new MacroCommandImpl([command1, command2, command3])

  invoker.setCommand(0, marcoCommand)
  invoker.invoke(0)
  invoker.cancel(0)
})()

