---
title: react > react-docs
metaTitle: "This is the title tag of this page"
metaDescription: "This is the meta description"
---



- [React vs Vue 비교하기 ](https://joshua1988.github.io/web_dev/vue-or-react)

- [공식 자습서](https://ko.reactjs.org/tutorial/tutorial.html)

- [공식 개념서](https://ko.reactjs.org/docs/hello-world.html)



React의 구조에 대해 자세하게 알아봅니다.

React를 간단하게 배우기는 어렵지 않으나

정확한 동작원리를 파악하지 않으면 오히려 개발이 어려워 질 수 있습니다.

동작은 하는데 왜 동작을 하는지 모르는 상태가 돼버릴 수 있죠.



그렇기 때문에 React 구조를 상세히 알아보는 것은 매우 중요합니다.



## JSX

### React Element

React Element `JSON 객체`를 사용하여 DOM 구조를 표현하는 방식

JSX를 빌드하면 React Element로 변환



### React Component

props를 전달받아 React Element를 반환하는 `function or class`



### JSX

별도의 파일에 마크업(HTML)과 로직(JavaScript)를 넣어 기술을 인위적으로 분리

둘 다 포함하는 `컴포넌트` 라고 부르는 느슨하게 연결된 유닛으로 관심사를 분리

필수요소는 아니지만 로직(JavaScript) 안에서 UI관련 작업을 할 때 시각적으로 더 도움이 된다고 생각



- Tip.
  - class 속성을 className 이라고 표기합니다. 실제 HTML이 아니기 때문
  - 실제 DOM이 아니며 React Element로 반환

```react
const name = 'Heo';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
	element,
  docuemnt.getElementById('root');
);
```



#### JSX 객체 & 로직

JSX도 하나의 표현식

컴파일이 끝나면 JSX 표현식이 정규 JavaScript 함수 호출이 되고 JavaScript 객체로 인식

따라서 if, for와 같은 로직을 사용할 수 있음



##### JSX 객체

객체이기 때문에 다음과 같은 속성을 가질 수 있음

```react
const element = <img src={user.name}></img>;
```



아래 두개의 객체는 동일 ( React.createELement() 함수 사용 )

```react
# JSX 표현식
const element = (
	<h1 className="greeting">
  	hello, world!
  </h1>
);

# React Element
const elementB = React.createElement(
	'h1',
  { className : 'greating' },
	'hello, world!'
);
```



#####  JSX  랜더링

JSX에 사용자 입력을 삽입하는 것은 안전

기본적으로 React DOM은 JSX에 삽입된 모든 값을 렌더링하기 전에 `escape` 하므로 

애플리케이션에서 명시적으로 작성되지 않은 내용은 주입되지 않음

모든 항목은 랜더링 되기전에 문자열로 변환

이런 특성으로 `XSS(cross-site-scripting)` 공격을 방지

```react
const title = response.potentiallyMaliciousInput;
// 이것은 안전합니다.
const element = <h1>{title}</h1>;
```



## ReactROM & ReactDOMServer

React Element는 불변객체로 Element를 생성한 이후에는 해당 Element의 자식이나 속성을 변경할 수 없음

Element는 영화에서 하나의 프레임과 같이 특정 시점의 UI 제공

```
ReactDOM.render() 함수는 한 번만 호출하며, 실제 Element 객체가 변하는 것이 아닌 노드의 텍스트 영역만 변동
```

### ReactDOM

- render()

```react
ReactDOM.render(
  reactElement,
  containerDOM,
  [callback]
)
```

- unmountComponentAtNode()
- findDomNode()
  - Ref 대체 가능, funcctional component 불가

### ReactDOMServer

- renderToString()
  - server rendering 후 client rendering 시 재사용
- renderToStaticMarkup()
  - 단순 static 마크업 생성

## Components & Props

### components

위와 동일

컴포넌트를 쪼개는 것을 꺼리지 말고 재사용이 높다면 컴포넌트를 적극적으로 쪼개세요

React 컴포넌트는 자신의 props를 다룰 때 반드시 순수함수(외부 영향이 없는 단순 함수)처럼 동작해야 합니다.

### props

React가 사용자 정의 컴포넌트로 작성한 엘리먼트를 발견하면

JSX 어트리부트를 해당 컴포넌트에 단일 객체로 전달하며 이 객체를 props라고 정의

> typeA. ES5 function
>
> 컴포넌트로 사용할 함수는 대문자를 쓰나요 ? -> 네

```react
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>
}
```

> typeB. ES6 class

```react
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

> Component render

```react
const element = <Welcome name="Heo" />;
```

#### defaultProps

상위에서 props를 정의하지 않았을 때

```react
class Counter extends React.Component {
	render() {
    // const { count = 2 } = this.props;
    return <div>count: {this.props.coount}</div>
	}
}

// 권장
Counter.defaultProps = {
  count : 1
}
```

#### className에 props로 동적으로 설정

## State & LifeCycle

### state

state는 props와 유사하지만 비공개이며 컴포넌트에 의해 완전히 제어

`props(properties) vs state`

props는 컴포넌트에 전달되는 반면, state는 (함수내 선언된 변수처럼) 컴포넌트 안에서 관리

```react
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
    	<div>
      	<h1>Hello, World!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

#### setState()

- 비동기로 동작

```react
this.setState({count:1});
```

- 비동기 동작이기 때문에 주의할 점

+1

```react
this.setState({count:1});
this.setState({count:1});
```

+2

```react
this.setState((prevState) => ({count:prevState.count+1}))
this.setState((prevState) => ({count:prevState.count+1}))
```

콜백을 이용해 동기로 동작시키기

```react
this.setState({count : 1}, () => {
  // something ..
})
```

정확한 업데이트 시점에 수정하기

```react
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment
})

// Correct - 업데이트가 적용된 시점의 props를 두 번째 인자로 받음
this.setState((state, props) => {
  counter : state.counter + props.increment
})
```

> 직접 state를 수정하지 마세요. setState() 메서드를 사용하세요.
> 렌더링 하지 못합니다.

#### array state

- https://www.robinwieruch.de/react-state-array-add-update-remove

궁금한게 생겼다.

배열의 state는 어떻게 관리해야 잘 관리하는 것일까 .. ?

##### push

1. concat
2. [ ...originArr, newArr ]

##### remove

##### update

### lifeCycle

![image-20200110111623886](01-react-docs.assets/image-20200110111623886.png)

- example

1. ReactDOM.render() 전달시 Clock 컴포넌트의 `constructor` 호출
2. Clock 컴포넌트의 `render()` 호출
3. `componentDidMount()` 생명주기 메서드 호출, tick() 호출
4. Clock 컴포넌트는 `setState()`에 현재 시각을 포함하는 객체를 호출하며 UI 업데이트 진행
5. 출 덕분에 state 변경을 인지하고 화면에 표시될 내용을 알아내기 위해 `render()` 다시 호출
6. Clock 컴포넌트가 DOM으로 부터 한 번이라도 삭제된 적이 있다면 `componentWillUnmount()` 생명주기 메서드 호출

```react
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
    	() => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
    	<div>
      	<h1>Hello, World!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

#### Mounting

- constructor(props)
- componentWillMount()
  - ES6에선 constructor 대체 (=constructor)
- render()
  - DOM 구성
- componentDidMount()

#### Updating

> 언제실행? props가 업데이트 될 경우

- componentWillReceiveProps(nextProps)
- shouldComponentUpdate(nextProps, nextState)
  - return true - 뒤로진행
  - return false - 진행중단
- componentWillUpdate(nextProps, nextState)
- render()
- componentDidUpdate(prevProps, prevState)

#### Unmounting

- componentWillUnmount()

## Event

- 실제 DOM element의 event handling과 비슷
- event callback 함수에 전달되는 event 객체는 React에서 합성한 event 객체
- 실제 event 객체에 접근하기 위해서는 `e.nativveEvent` 사용
- 이름 규칙으로 camelCase 사용
- JSX를 사용하여 `문자열이 아닌 함수`로 이벤트 핸들러 전달
- 기본 동작 방지를 위해 `preventDefault` 명시적으로 호출 (return false; X)

> HTML vs React

- addEventListener() 사용할 필요 없음

```react
<!-- HTML -->
<button onClick="activateLasers()">
  Activate Lasers
</button>

<!-- React -->
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

> preventDefault

```react
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

> binding (typeA)

```react
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // 콜백에서 `this`가 작동하려면 아래와 같이 바인딩 해주어야 합니다.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <!-- bind 없이 onClick 전달했다면 this는 undefined 처리 -->
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

> bind (typeB)

LoggingButton가 렌더링 될 때마다 다른 콜백이 생성

콜백이 하위 컴포넌트에 props로 전달 된다면 그 컴포넌트들은 추가로 다시 렌더링을 수행할 수도 있음

따라서 typeA 방식을 권장

```react
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // 이 문법은 `this`가 handleClick 내에서 바인딩되도록 합니다.
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
```

> parameter

```react
<!-- Lambda -->
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>

<!-- prototype bind -->
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

> function을 prop으로 전달하는 경우, re-render를 피하기 위해 `JSX inline function` 바로 사용은 좋지 않음

```react
<!-- RIGHT -->
<Child handleClick={this.handleClick} />

<!-- WRONG -->
<Child handleClick={() => console.log("click!")} />
```



## Conditional Rendering

> 논리연산자 & 엘리먼트

```react
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```

> IF-ELSE (typeA)

```react
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

> IF-ELSE (typeB)

```react
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
```

## List & Key

> 엘리먼트 배열

```react
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```

> 엘리먼트 key

- key는 React가 어떤 항목을 변경, 추가 또는 삭제할지 식별할 때 사용

- key를 선택하는 가장 좋은 방법은 리스트를 다른 항목들 사이에서 해당 항목을 고유하게 식별할 수 있는 문자열 사용
  (데이터 ID)
  (데이터 ID가 없다면 최후의 수단으로 INDEX를 사용합니다, 하지만 항목 순서가 바뀔 수 있는 경우 권장 X)
- key 주변 배열 context에서만 의미가 있습니다.
- key는 형제 사이에서만 고유한 값이여야 합니다.
- 컴포넌트에서 key를 사용하진 않습니다. 만약 key와 같은 value가 필요하다면 prop에 재정의합니다.

다음 코드에서 <li\> 태크에 key가 없다면 key를 넣어야 한다는 경고를 발생

key는 엘리먼트 리스트르 만들 때 포함해야 하는 특수한 문자열 어트리뷰트

```react
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

> Key로 컴포넌트 추출

키 주변 배열 context에서만 의미가 있습니다.

```react
function ListItem(props) {
  const value = props.value;
  return (
    // 틀렸습니다! 여기에는 key를 지정할 필요가 없습니다.
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 틀렸습니다! 여기에 key를 지정해야 합니다.
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

## Form

https://ko.reactjs.org/docs/forms.html

> 제어컴포넌트(controlled components)

```react

```

## State 끌어올리기

### State 끌어올리기

동일한 데이터의 변경사항을 여러 컴포넌트에 반영

> State 끌어올리기 예제
>
> State를 부모 컴포넌트에서 매니지할 수 있게 끌어올린다

예제가 너무 어려운데 ..

즉, 하위에 같은 state(진리의원천) 를 사용해야 하면 state 값을 부모로 올려서 받아 사용하는 개념

하지만 자식 컴포넌트는 부모 컴포넌트의 state를 받을 수 없기 때문에 이벤트에 따라 부모의 state를 함수를 통해 호출

( 자식 컴포넌트가 state를 부모에 전달할 수 있도록 prop에 호출 함수를 미리 가지고 있음 )

```react
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />

        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />

        <BoilingVerdict
          celsius={parseFloat(celsius)} />

      </div>
    );
  }
}
```

### State 끌어내리기는 없나..

parent component state를 하위 자식에게 전달하는 것

## 합성 (vs 상속)

- React는 강력한 합성 모델을 가지고 있으며, 상속 대신 합성을 사용하여 컴포넌트 간에 코드를 재사용하는 것이 좋습니다.
- props.children (의미를 가진 변수)

> 자식을 중첩하여 전달하기

props로 JSX를 전달하며, 자식이 한 개일 경우에는 태크 사이에 입력하는 것(props.children)으로 전달이 가능

```react
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <!-- children Start -->
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
      <!-- children End -->
    </FancyBorder>
  );
}
```

> 자식을 2개 이상 전달하기

props로 JSX를 전달

```react
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane left={<Contacts />} right={<Chat />} />
  );
}
```

> 특수화 (state를 전달하는 합성)

```react
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">

        <!-- children - state 전달가능 -->
        <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
        <!-- children - state 전달가능 -->

      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}
```



## Render Props

render prop란, React 컴포넌트 간에 코드를 공유하기 위해 함수 props를 이용하는 간단한 테크닉입니다.

컴포넌트는 React에서 코드의 재사용성을 위해 사용하는 주요 단위입니다.

하지만 컴포넌트에서 캡슐화된 상태나 동작을 같은 상태를 가진 다른 컴포넌트와 공유하는 방법이 항상 명확하지는 않습니다.

## ErrorBoundary

https://ko.reactjs.org/docs/error-boundaries.html

**도입**

- UI의 일부에서 JavaScript 오류가 전체 앱을 중단하지 않아야함으로 `ErrorBoundary`이 도입
- 하위 구성 요소 트리에서 JS 오류를 포착하여 해당 오류를 기록하고 충돌한 구성 요소 대신 UI 표시

- ErroyBoundary는 어디에 두어야 할까 ?

- UncaughtError는 어떻게 처리해야 할까 ?
  - 화면이 없는 것 보다 고장난 화면을 두는 것이 더 나쁘다.

**차이**

- 사용하지 않는 경우 -> 전체 ReactAPP unmount
- 사용하는 경우 -> Error Boundary 위로는 괜찮음

**lifecycle 함수에서 error를 잡을 수 있음**

- error
  - 자바스크립트 에러객체
- info
  - shape of {component stack}

```react
componentDidCatch(error, info)
```

> ErroyBoundary 정의부

- getDerivedStateFromError
- `componentDidCatch()`
  - lifeCycle 추가

```react
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

> ErroyBoundary 활용부

```react
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

### Event Handling ErrorBoundary

```react
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    try {
      // Do something that could throw
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    if (this.state.error) {
      return <h1>Caught an error.</h1>
    }
    return <div onClick={this.handleClick}>Click Me</div>
  }
}
```

### Uncaught Error

일단 잡히는 에러

- `componentDidCatch()` 가 정의된 컴포넌트의 하위 모든 컴포넌트에서 발생한 에러

잡히지 않는 에러

- Event handler 발생에러
- Async Code (ex. setTimeout)
- Server Side Rendering
- ErrorBoundary 컴포넌트에서 발생하는 에서

## Fragment

(React16)

React 컴포넌트가 여러 엘리먼트를 반환할 때 사용하는 패턴

Fragmentsms Dom에 별도 노드를 추가하지 않고 여러 자식을 그룹화

```react
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
```

> 단축문법

```react
class Columns extends React.Component {
  render() {
    return (
      <>
        <td>Hello</td>
        <td>World</td>
      </>
    );
  }
}
```

> key

`key`는 `Fragment`에 전달할 수 있는 유일한 어트리뷰트입니다.

```react
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // React는 `key`가 없으면 key warning을 발생합니다.
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
```

## Portal

(React16)

DOM이 외부에 있어도 로직부분을 컨트롤 할 수 있음

**사용하기 좋은 예**

modal, layer, tooltip

- child : renderable React child
- container : DOM element

```react 
ReactDOM.createPortal(child, container)
```

```react
const Modal = ({children}) => {
	return ReactDOM.createPortal(
    children,
    document.body.querySeletor('#model .model')
	)
}

const App = () => [
  <Fragment>
  	<div>Hello!</div>
    <Modal>
    	<div>Modal!</div>
      <span>I am modal!</span>
    </Modal>
  </Fragment>
]
```

## HOC (Higher Order Component)

[https://www.vobour.com/%EB%A6%AC%EC%95%A1%ED%8A%B8-react-%EC%9D%B4%ED%95%B4-4-higher-order-component](https://www.vobour.com/리액트-react-이해-4-higher-order-component)

HOC (고차 컴포넌트)

리엑트 컴포넌트를 인자로 받아 새로운 리액트 컴포넌트를 리턴하는 함수

### 사용처?

- `Container 컴포넌트와 Presentational 컴포넌트 분리`
  - 비즈니스 로직을 담당하는 컴포넌트와 디스플레이를 담당하는 컴포넌트를 분리하여 사용 시
    컨테이너 컴포넌트를 HOC로 만들어서 사용할 수 있음
    - 로직담당 컴포넌트(Container 컴포넌트)
    - 디스플레이담당 컴포넌트(Presentational 컴포넌트)
- `로딩중 화면 표시`
  - SPA에서 화면이 로딩중일 경우 Skeleton 화면을 보여주고 로딩이 완료되면 데이터르 보여줌
- `유저 인증 로직 처리`
  - 컴포넌트 내에서 권한 체크나 로그인 상태를 체크하기 보다 인증 로직을 HOC로 분리하면
    컴포넌트 재사용성을 높이고, 컴포넌트 역할도 쉽게 분리 가능
- `에러 메시지 표시`
  - 컴포넌트 내에서 분기문(if/else 등등)을 통해 처리할 수도 있지만,
    분기문을 HOC로 만들어 처리 하면 컴포넌트를 더욱 깔끔하게 사용 가능

> ReactDevTool 툴에서 디버깅을 위해 displayName을 명시
>
> render 메소드에 HOC를 사용해선 안됨

HOC 만드는 방법에는 크게 두 가지가 있음

HOC는 Class 기반 컴포넌트와 Function 기반 컴포넌트를 리턴



### Functional Component 반환

```react
const withHOC = WrappedComponent => {
  const newProps = {
    loading: false,
  };
  return props => {
    return <WrappedComponent {...props} {...newProps} />
  }
};
```



### Class Component 반환

```react
const withHOC = WrappedComponent => {
  const newProps = {
    loading: false,
  };
  return class extends React.Component {
    render() {
      return <WrappedComponent {...this.props} {...newProps} />
    }
  }
};
```

### HOC 사용

다음 HOC는 isLoading prop을 받아 이 값에 따라 다른 컴포넌트를 렌딩해주는 HOC입니다.

```react
export default withHOC(AnyComponent);

const withLoading = (WrappedComponent => (props) =>
                     props.isLoading
                     ? <div> Loading... </div>
                     : <WrappedComponent {...props} />)
```

