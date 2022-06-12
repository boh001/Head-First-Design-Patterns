# Observer Pattern

Observer Pattern은 어떤 객체의 변경사항이 발생하였을 때 이와 연관된 객체들에게 알려주는 디자인 패턴입니다.

객체의 상태 변화를 관찰하는 `Observer`와 상태의 변화를 `Observer`에게 알리는 `Subject`로 구성되어있습니다.

`Subject`와 `Observer`은 1:N 관계이고, Observer 인터페이스를 구현하기만 하면 어떤 구상 클래스도 `Observer`로 참여가 가능합니다.


