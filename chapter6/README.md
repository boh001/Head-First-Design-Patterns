# Command Pattern

`Command Pattern`을 사용하면 요청하는 객체와 요청을 수행하는 객체를 분리할 수 있습니다.

`Invoker`객체가 무언가를 요청할 때는 `Command`객체의 `execute` 메소드를 호출합니다. `execute` 메소드는 `Receiver` 객체를 호출하면 됩니다.
