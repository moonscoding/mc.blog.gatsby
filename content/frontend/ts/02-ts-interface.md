# TypeScript

## Interface

TypsScript의 행심 원리중 하나는 값이 가지는 형태에 초점을 맞추는 타입-체킹을 한다는 것

이것은 때때로 덕타이핑(Duck Typing) 또는 구조적 하위 유형화(Structural SubTyping)이라고도 합니다.

인터페이스는 개발 단계에서 도움을 주기 위해 제공되는 기능으로 자바스크립트의 표준이 아니다.

따라서TypeScript 파일을 자바스크립트 파일로 트랜스파일링하면 인터페이스가 삭제된다.

### Interface 경험하기

인터페이스를 사용하지 않는다면 ?

```typescript
function printLabel(labelledObj: { label: string }) {
    console.log(labelledObj.label)
}

let myObj = { size: 10, label: 'Size 10 Object' }
printLabel(myObj)
```

인터페이스를 사용한다면 ? => 매개변수에 정의되는 형식을 인터페이스로 정의하고 재사용 할 수 있음

```typescript
interface LabelledValue {
    label: string
}

function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label)
}

let myObj = { size: 10, label: 'Size 10 Object' }
printLabel(myObj)
```

## Properties

### Optional Properties

**선택적 프로퍼티**

인터페이스 프로퍼티는 반드시 구현되어야 하나 인터페이스의 프로퍼티가 선택적으로 필요한 경우가 있을 수 있음

이 때 선택적 프로퍼티(Optional Property)를는 프로퍼티명 뒤에 `?`를 붙여 생략하여도 에러가 발생하지 않음

```typescript
interface UserInfo {
    username: string
    password: string
    age?: number
    address?: string
}

const userInfo: UserInfo = {
    username: 'ungmo2@gmail.com',
    password: '123456',
}

console.log(userInfo)
```

### Readonly Properties

일부 프로퍼티는 객체를 처음 생성할 때만 수정할 수 있어야 합니다.

```typescript
interface Point {
    readonly x: number
    readonly y: number
}
```

한 번 값을 할당한 후에는 바꿀 수 없습니다. (final 속성과 같음)

```typescript
let p1: Point = { x: 10, y: 20 }
p1.x = 5 // 오류!
```

#### ReadonlyArray\<T>

```typescript
let a: number[] = [1, 2, 3, 4]
let ro: ReadonlyArray<number> = a
ro[0] = 12 // 오류!
ro.push(5) // 오류!
ro.length = 100 // 오류!
a = ro // 오류! - 배열을 변경하는 것도 안됨
```

### Excess Property Checks

(프로퍼티 초과 검사)

```typescript
interface SquareConfig {
    color?: string
    width?: number
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    // ...
}

// 오류 : 'colour'는 'SquareConfig' 타입에서 필요하지 않습니다.
let mySquare = createSquare({ colour: 'red', width: 100 })
```

1. type asertion을 이용해서 검사하는 방법

```typescript
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig)
```

2. 문자열 인덱스 시그니처를 추가하여 검사하는 방법

**\* 인덱스 시그니처란 .. ? =>**

SquareConfig 는 여러 프로퍼티들을 가질 수 있으며 color, width가 아닌 다른 프로퍼티들의 타입은 문제 되지 않음

```typescript
interface SquareConfig {
    color?: string
    width?: number
    [propName: string]: any
}
```

3. 객체를 다른 변수에 할당하는 것

squareOptions는 프로퍼티 초과 검사를 거치지 않기 때문에 컴파일러 오류 제공 않음

```typescript
let squareOptions = { colour: 'red', width: 100 }
let mySquare = createSquare(squareOptions)
```

## Interface Type

### Object & Interface

```typescript
// 인터페이스의 정의
interface Todo {
    id: number
    content: string
    completed: boolean
}

// 변수 todo의 타입으로 Todo 인터페이스를 선언하였다.
let todo: Todo

// 변수 todo는 Todo 인터페이스를 준수하여야 한다.
todo = { id: 1, content: 'typescript', completed: false }
```

### Array & Interface

```typescript
// 인터페이스의 정의
interface Todo {
    id: number
    content: string
    completed: boolean
}

let todos: Todo[] = []

// 파라미터 todo의 타입으로 Todo 인터페이스를 선언하였다.
function addTodo(todo: Todo) {
    todos = [...todos, todo]
}

// 파라미터 todo는 Todo 인터페이스를 준수하여야 한다.
const newTodo: Todo = { id: 1, content: 'typescript', completed: false }
addTodo(newTodo)
console.log(todos)
// [ { id: 1, content: 'typescript', completed: false } ]
```

### Function & Interface

인터페이스를 함수의 타입으로 사용 가능

```typescript
interface SearchFunc {
    (source: string, subString: string): boolean
}

let mySearch: SearchFunc
mySearch = function(source: string, subString: string) {
    let result = source.search(subString)
    return result > -1
}
```

### Indexable Types

인덱스를 생성할 수 있는 타입을 만들 수 있음

인덱싱 가능 타입에는 객체로 `인덱싱하는데 사용할 수 있는 타입`과 인덱싱할 때 해당 반환 타입을 설명하는 `인덱스 시그니처`가 있음

**인덱스 시그니처**

인덱스 시그니처에는 문자열과 숫자의 두 가지 타입만 지원

두 가지 타입의 인덱서를 모두 지원할 수 있지만 숫자 인덱서에서 반환되는 타입은 문자열 인덱서에서 반환된 타입의 하위 타입이여야 함

숫자로 인덱싱을 생성하는 시점에 JS가 객체로 인덱싱하기 전에 문자열로 변환하기 때문

```typescript
interface StringArray {
    [index: number]: string
}

let myArray: StringArray
myArray = ['Bob', 'Fred']

let myStr: string = myArray[0]
```

문자열 인덱스 시그니처로 사전(Dictionary) 패턴을 만드는 강력한 방법이지만 모든 프로퍼티가 반환 타입을 일치하도록 강요

```typescript
class Animal {
    name: string
}
class Dog extends Animal {
    breed: string
}

// 오류: numeric과 string으로 인덱싱하면 완전히 다른 타입의 Animal을 얻을 수 있습니다!
interface NotOkay {
    [x: number]: Animal
    [x: string]: Dog
}
```

```typescript
interface NumberDictionary {
    [index: string]: number
    length: number // 좋아요, length는 'number'입니다.
    name: string // 오류, 'name'의 타입이 인덱서의 하위 타입('number')이 아닙니다.
}
```

**readonly**

```typescript
interface ReadonlyStringArray {
    readonly [index: number]: string
}
let myArray: ReadonlyStringArray = ['Alice', 'Bob']
myArray[2] = 'Mallory' // 오류!
```

### Class & Interface

#### properties

부모 인터페이스의 내용을 반드시 구현해야 합니다.

```typescript
// 인터페이스의 정의
interface ITodo {
    id: number
    content: string
    completed: boolean
}

// Todo 클래스는 ITodo 인터페이스를 구현하여야 한다.
class Todo implements ITodo {
    constructor(public id: number, public content: string, public completed: boolean) {}
}

const todo = new Todo(1, 'Typescript', false)

console.log(todo)
```

#### properties + method

인터페이스는 public 측면의 class를 만듬

클래스를 사용하여 클래스 인스턴스의 private 측에 특정 타입이 있는지 검사하는 것은 금지

```typescript
// 인터페이스의 정의
interface IPerson {
    name: string
    sayHello(): void
}

/*
인터페이스를 구현하는 클래스는 인터페이스에서 정의한 프로퍼티와 추상 메소드를 반드시 구현하여야 한다.
*/
class Person implements IPerson {
    // 인터페이스에서 정의한 프로퍼티의 구현
    constructor(public name: string) {}

    // 인터페이스에서 정의한 추상 메소드의 구현
    sayHello() {
        console.log(`Hello ${this.name}`)
    }
}

function greeter(person: IPerson): void {
    person.sayHello()
}

const me = new Person('Lee')
greeter(me) // Hello Lee
```

#### Static vs Instance

```typescript
interface ClockConstructor {
    new (hour: number, minute: number)
}

class Clock implements ClockConstructor {
    currentTime: Date
    constructor(h: number, m: number) {}
}
```

### DuckTyping

주의할 것은 인터페이스 구현이 타입 체크 통과의 유일한 방법은 아니라는 점

타입 체크에서 중요한 것은 값을 실제로 가지고 있다는 것

> Typescript는 해당 인터페이스에서 정의한 프로퍼티나 메소드를 가지고 있다면, 그 인터페이스를 구현한 것으로 인정
>
> 이것을 덕 타이핑(Duck Typing) 또는 구조적 타이핑(Structural Typing)이라 명명

```typescript
interface IDuck {
    // 1
    quack(): void
}

class MallardDuck implements IDuck {
    // 3
    quack() {
        console.log('Quack!')
    }
}

class RedheadDuck {
    // 4
    quack() {
        console.log('q~uack!')
    }
}

function makeNoise(duck: IDuck): void {
    // 2
    duck.quack()
}

makeNoise(new MallardDuck()) // Quack!
makeNoise(new RedheadDuck()) // q~uack! // 5
```

##
