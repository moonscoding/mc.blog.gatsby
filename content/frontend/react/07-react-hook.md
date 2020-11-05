# React Hook

## Hook 어디까지 써봤니 ?

v16.8

-   [ko.reactjs.org](https://ko.reactjs.org/docs/hooks-intro.html)
-   [ko.reactjs.org](https://ko.reactjs.org/docs/hooks-overview.html)

-   [velog.io](https://velog.io/@velopert/react-hooks)

## Hook?

### 개념

Hook은 `함수 컴포넌트에서 React state와 lifecycle 기능을 연동 (hook into)` 할 수 있게 해주는 함수

Hook은 class 안에서 동작하지 않고, class 없이 React를 사용할수 있게 해줌

> 새로 작성하는 컴포넌트 부터 Hook을 이용하는 것을 권장합니다. ( by facebook )

[왜 Hook을 써야하는 걸까?](https://ko.reactjs.org/docs/hooks-intro.html)

React는 컴포넌트 사이에서 상태와 관련된 로직을 재사용하기 어려움

React는 컴포넌트에 재사용 가능한 행동을 붙이는 방법을 제공하지 않아요

Hook을 사용하면 컴포넌트로부터 상태 관련 로직을 추상화 가능

이것은 독립적인 테스트와 재사용이 가능하며 Hook은 계층 변화 없이 상태 관련 로직을 재사용할 수 있도록 해줌

그래서 Hook은 여러 커뮤니티를 통해 공유도 용이해짐

> Hook을 통해 로직에 기반을 둔 작은 함수로 컴포넌트를 나눔
> (구독 설정 및 데이터를 불러오는 것과 같은 로직)

### 특징

-   `구현방식`
    -   Hook을 이용하여 Class 작성 없이 상태값과 여러 React의 기능을 사용
-   `선택적사용`
    -   기존 코드를 다시 작없 없이 Hook이 필요하다면 사용가능
    -   이것은 독립적인 테스트와 재사용이 가능하며 Hook은 계층 변화 없이 상태 관련 로직을 재사용할 수 있음
-   `로직추상화`
    -   Hook을 사용하면 컴포넌트로부터 상태 관련 로직을 추상화
-   `호환성`
    -   Hook 호환성을 깨뜨리는 변화가 없음

### #props

FunctionComponent 에서 props 사용하는 방식

```react
interface IProps {
  a : number
  b : number
}

const Sum : FunctionComponent<IProps> ({a, b}) => {
  return (<div>{a + b}</div>)
}
```

### #useState

버튼을 클릭하면 값이 증가하는 간단한 카운터 예시

useState는 인자로 초기 state값을 하나 받습니다. (카운터는 0부터 시작함으로 위 예시에서는 초기값으로 0 설정)

setState Hook의 state는 객체일 필요가 없습니다. (초기값은 첫 번째 렌더링에서만 딱 한번 사용)

#### useState

useState Hook을 이해해보자면, 이 함수의 파라미터에는 초기값을 넣어 주며 배열을 반환

반환하는 배열을 첫 번째 인자는 상태 값이며, 두 번째 인자는 상태를 설정하는 함수

```react
import React, { useState } from 'react';

function Example() {
  // "count"라는 새로운 상태 값을 정의합니다.
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

이것을 `클래스` 로 어떻게 구현했을까?

```react
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

#### useState (Multiple)

하나의 컴포넌트 내에서 State Hook을 여러 개 사용

`배열 구조 분해 (destructuring)` 문법은 useState로 호출된 state 변수들을 다른 변수명으로 할당

```react
function ExampleWithManyStates() {
  // 상태 변수를 여러 개 선언했습니다!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  // ...
}
```

### #useEffect

React 컴포넌트 안에서 데이터를 가져오거나 구독하고, DOM을 직접 조작하는 작업을 Side Effect (effect)라고 합니다.

이 부분은 다른 컴포넌트에 영향을 줄 수 있고, 렌더링 과정에서 구현할 수 없는 작업입니다.

**useEffect = componentDidMount + componentDidUpdate + componentWillUnmount**

#### useEffect (mount, update)

`useEffect`를 사용하면 React는 DOM을 바꾼 뒤에 `effect` 함수를 실행할 것입니다.

(componentDidMount + componentDidUpdate)

Effects는 컴포넌트 안에 선언되어 props와 state에 접근할 수 있음

기본적으로 React는 매 랜더링 이후에 effects를 실행 (첫번째 랜더링 포함)

```react
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // componentDidMount, componentDidUpdate와 비슷합니다
  // 1. 하는 일이 무엇이니 ?
  // 리엑트에게 컴포넌트가 렌더링 이후에 어떤 일을 수행해야 하는지 말함
  // 리엑트는 우리가 넘긴 함수를 기억했다가 ( 이 함수를 effect라고 부름 ) DOM 업데이트를 수행한 이후에 불러냄
  // 다음의 경우에 effect를 통해 문서 타이틀을 지정하지만, 이 외에도 데이터를 가져오거나 다른 명령형 API 호출 가능
  // 2. 컴포너트 안에서 불러내는 이유는 ?
  // 컴포넌트 내부에서 둠으로써 effect를 통해 count state에 접근 가능
  // 함수 범위 안에 존재하기 때문에 특별한 API 없이도 값을 얻을 수 있는 것
  // 3. 계속 호출 되니 ?
  // ㅇㅇ 기본적으로 첫번째 렌더링과 이후의 모든 업데이트에서 수행
  // 랜더링 이후에 실행이라고 생각하는 것이 좋음
  useEffect(() => {
    // 브라우저 API를 이용해 문서의 타이틀을 업데이트합니다
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

#### useEffect (only mount)

두 번째 인자로 빈 배열을 삽입

```react
useEffect(() => {
  console.log('마운트 될 때만 실행됩니다.');
}, []);
```

#### useEffect (each update)

effect는 DOM이 렌더링 된 후 실행되는 함수입니다만,

모든 props, state에 대응하게 된다면 매우 많은 useEffect이 실행될 것입니다.

따라서 필요한 내용이 변경되었을 때 실행하겠다 할 때는 아래와 같이 실행합니다.

```react
// nmae 값이 변경되었을 때만 effect를 실행합니다. (componentDidUpdate)
useEffect(() => {
	console.log(name);
}, [name]);
```

#### useEffect (unmount)

뒷정리(cleanup) 함수를 사용하여 unmount 이벤트를 처리

... 2번째 파라미터는 있거나 없거나 상관 없을까 ??

```react
useEffect(() => {
  // (mount, update) subscribe 같은 동작을...
  console.log('effect');
  console.log(name);

  return () => {
    // (unmount) unsubscribe 같은 동작을...
    console.log('cleanup');
    console.log(name);
  };
}, []);
```

#### useEffect (multiple)

여러 개의 effect를 설정하는 것도 충분히 가능

```javascript
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }
  // ...
```

> 기본적으로 React는 매 렌더링 이후에 effect를 실행 **(생명주기함수와 다른점은?)**

### #useLayoutEffect

useEffect에 입력된 함수는 랜더링 결과가 Dom에 반영된 후 비동기로 호출

<u>useLayoutEffect는 useEffect와 거의 비슷하게 동작하나, 동기로 호출</u>

componentDidMount, componentDidUpdate 메서드로 렌더링 결과가 Dom에 반영된 직후에 동기되어

더 비슷하게 동작을 기대할 때 사용할 수다

<u>\* 단 useLayoutEffect에 입력한 함수에서 연산이 많다면 브라우저가 먹통이 될 수 있다는 것을 주의해야 함</u>

특별한 이유가 없다면 useEffect를 사용하고

랜더링 직후 Dom 요소의 값을 읽는 경우라면 useLayoutEffect를 사용하라 ~

### #useConext

Hook을 사용하면 함수형 컴포넌트에서 Context를 보다 쉽게 사용 가능

useContext를 사용하고 있는 컴포넌트 자체에서 부터 다시 렌더링

#### useContext

위에서 전달되는 Context를 간단히 받을 수 있음

```react
import React, { createContext, useContext } from 'react';

const ThemeContext = createContext('black');
const ContextSample = () => {
  const theme = useContext(ThemeContext);
  const style = {
    width: '24px',
    height: '24px',
    background: theme
  };
  return <div style={style} />;
};

export default ContextSample;
```

useContext를 Context.Provider와 같이 사용해주세요

```react
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);

  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```

### #useRef

`ref` 속성값은 ClassComponent에서만 사용이 가능

FunctionComponent는 인스턴스로 만들어지지 않기 때문에 ref 속성값을 사용하면 에러가 발생

#### current 프로퍼티

useRef는 `current` 프로퍼티로 전달된 인자(initalValue)로 초기화된 변경 가능한 ref 객체를 반환

<u>반환된 객체는 컴포넌트의 전 생애주기를 통해 유지될 것 ( => 이 부분때문에 인스턴스 변수와 같이 사용이 가능한 것)</u>

```react
const refContainer = useRef(initialValue);
```

#### React는 Dom에 어떻게 접근할까 ?

react에서 Dom에 직접 접근해야 할 경우 ref 속성값을 사용

-   Dom 요소에 포커스를 줄 때
-   Dom 요소의 스크롤 위치를 알고 싶을 때
-   ...

일반적인 케이스

```react
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    if(inputEl.current) {
      inputEl.current.focus();
    }
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

#### useRef는 인스턴스 변수를 관리한다 !?

ClassComponent는 랜더링과 무관한 값을 멤버 변수에 저장

FunctionComponent는 인스턴스로 생성되지 않기에 사용된 컴포넌트의 고유한 값을 저장할 방법이 ....

useRef를 사용하면 인스턴스 변수가 있는 것처럼 사용할 수 있음

```react
function Profile() {
  const [age, setAge] = useState(20)
  const prevAgeRef = useRef(20)

  useEffect(() => {
    	prevAgeRef.current = age
  }, [age])

  const prevAge = prevAgeRef.current
  const text = age === prevAge ? 'same' : age > prevAge ? 'older' : 'younger'

  return (
  	<div>
    	<p>{`age ${age} is ${text} than age ${prevAge}`}</p>
      <button onClick={() => {
      		const age = Math.floor(Math.random() * 50 + 1)
          setAge(age) // * 다시 랜더링 - prevAgeRef는 이전 age를 나타냄
        }}>
        나이변경
      </button>
    </div>
  )
}
```

#### useRef 주의점

current 프로터티는 Dom의 마운트 여부에 따라 없을 수도 있기 때문에 방어코드를 항상 생활화 해야한다. (조심하세요!)

### #useMemo

useMemo, useCallback은 이전 값을 기억하여 성능을 최적화하는 용도로 사용

useMemo는 계산량이 많은 함수의 반환값을 재활용하는 용도로 사용

매개변수 1. 함수

매개변수2. 배열 - 배열의 값이 변경되지 않으면 이전의 값을 재활용

```react
function MyComponent({v1, v2}) {
  const value = useMemo(() => runExpensiveJob(v1, v2), [v1, v2])
  return <p>{`value is ${value}`}</p>
}
```

### #useCallback

useCallback은 리액트 렌더링 성능을 위해 제공해주는 Hook

Hook을 사용하게 되면 컴포넌트가 랜더링 될 때 마다 함수를 생성해서 자식 컴포넌트의 속성값으로 입력하는 경우가 많음

(리액트 팀에서 최근의 브라우저에서 함수 생성이 성능에 미치는 영향은 작다고 주장)

그 보다는 속성값이 매번 변경되기 때문에 자식 컴포넌트에서 PureComponent나 React.memo를 사용해도 불필요한 랜더링이 발생

```react
function Profile() {
 const [name, setName] = useState('')
 const [age, setAge] = useState(0)

 return (
   <div>
 		 <p>{`name is ${name}`}</p>
 		 <p>{`age is ${age}`}</p>
     {/* Profile 컴포넌트의 랜더링에 따라 onSave 속성값으로 새로운 함수가 입력, 불필요한 추가 랜더링 */}
     <userEdit
       onSave={() => saveToServer(name, age)}
       setname={setName}
       setAge={setAge}
       />
   </div>
 )
}

function Profile() {
 const [name, setName] = useState('')
 const [age, setAge] = useState(0)

 // name, age 값이 변경되기 전에는 추가 랜더링을 하지 않음
 const onSave = useCallback(() => saveToServer(name, age), [name, age])

 return (
   <div>
 		 <p>{`name is ${name}`}</p>
 		 <p>{`age is ${age}`}</p>
     <userEdit
       onSave={onSave}
       setname={setName}
       setAge={setAge}
       />
   </div>
 )
}
```

### #useReducer

컴포넌트의 상태값을 리덕스처럼(리덕스는 아니라는 이야기) 관리하기

```react

const INITAIL_STATE = { name : 'empty', age : 0 }

// 리덕스의 리듀서와 같은 방식으로 작성한 리듀서 함수
function reducer(state, action: { type: string, name, age}) {
  switch(action.type) {
    case 'setName' :
      return { ...state, name : action.name }
    case 'setAge':
      return { ...state, age: action.age }
    default :
      return state
  }
}

function Profile () {
  // 리듀서와 초기 상태값
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  return (
    <div>
     	<p>{`name is ${state.name}`}</p>
  	  <p>{`age is ${state.age}`}</p>
      <input
        type="text"
        value={state.name}
        onChange={e =>
    			dispatch({type: 'setName', name: e.currentTarget.value })
        } />
      <input
        type="number"
        value={state.age}
        onChange={e =>
    			dispatch({type: 'setAge', age: e.currentTarget.value })
        } />
   </div>
  )
}
```

**트리 깊은 곳으로 이벤트 처리 함수 전달**

보통 상위 컴포넌트를 컨테이너 컴포넌트로 만들고 상탯값을 관리

이때 자식 컴포넌트로부터 발생한 이벤트에서 컨테이너 컴포넌트의 상탯값을 변경해야 하는 경우 (!!!)

```react
export ProfileDispatch = React.createContext(null)

function Profile () {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  return (
    <div>
     	<p>{`name is ${state.name}`}</p>
  	  <p>{`age is ${state.age}`}</p>
      <ProfileDispatch.Provider value={dispatch}>
      	<SomeComponent />
      </ProfileDispatch.Provider>
   </div>
  )
}
```

### #useImperativeHandle

**부모 컴포넌트에서 접근 가능한 함수 구현하기**

ClassComponent의 부모 컴포넌트는 ref 객체를 통해 자식 컴포넌트의 메서드를 호출할 수 있었다 (진짜?)

(이 방식은 자식 컴포넌트의 내부 구현에 대한 의존성이 생김으로 지양해야 하나 종종 필요한 경우가 있음)

**useImperativeHandle Hook을 이용해서 부모 컴포넌트에서 접근 가능한 함수 구현**

```react
function Profile(props, ref) {
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)

  // 부모에서 접근 가능한 여러 함수를 전달
  useImperativeHandle(ref, () => ({
    addAge: value => setAge(age + value),
    getNameLength: () => name.length,
  }))

  return (
    <div>
 			<p>{`name is ${state.name}`}</p>
  	  <p>{`age is ${state.age}`}</p>
    	{/* ... */}
    </div>
  )
}

export default forwardRef(Profile) // 부모 컴포넌트에서 입력한 ref 객체를 직접 처리하기 위해 forwardRef 호출
```

**부모 컴포넌트**

```react
function Parent () {
  const profileRef = useRef()
  const onClick = () => {
    if(profileRef.current) {
      console.log('current name length:', profileRef.current.getNameLength())
      profileRef.current.addAge(5)
    }
  }

  return (
    <div>
      <Profile ref={profileRef} />
      <button onClick={onClick}>add age 5</button>
    </div>
  )
}
```

### #useDebugValue

useDebugValue는 개발 편의를 위해 제공하는 Hook으로

커스텀 Hook의 내부 상태를 관찰할 수 있기 때문에 디버깅에 도움이 된다

useToggle 커스텀 Hook에서 디버깅을 위해 useDebugValue Hook을 사용하는 코드

useDebugValue Hook으로 입력한 값은 리액트 개발자 도구에서 확인이 가능

```react
function useToogle(initialValue) {
  const [value, setValue] = useState(initialValue)
  const onToggle = () => setValue (!value)
  useDebugValue(value ? 'on' : 'off')
  return [value, onToggle]
}
```

### Custom Hook

기존에는 컴포넌트 재사용을 위해 `HOC, render props`를 대게 사용하는데 ..

Custom Hook은 위와 달리 컴포넌트 트리에 새 컴포넌트를 추가하지 않고도 이것을 가능하게 처리

#### Custom Hook 선언 & 호출하기 (useWindowWidth)

아래 예시와 같이 2가지 규칙이 필요합니다.

1. 'use' 로 시작하도록 ( 관용적 표현 )
2. 다른 hook을 호출하도록

```react 
function useWindowWidth () {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])
  return width
}

function Profile() {
  const width = useWindowWidth()
  const [name, setName] = useState('')
  return (
  	<div>
      <p>{`name is ${name}`}</p>
      {width < 600 && <br/>}
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}/>
    </div>
  )
}
```

#### Custom Hook 선언 & 호출하기 (useHasMounted)

```react
function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => setHasMounted(true), [])
  return hasMounted
}

function withHasMounted(InputComponent) {
  return class OutputComponent extentds Component {

  }
}
```

아래 두개의 컴포넌트는 같은 hook을 사용했으니 같은 state를 공유할까요 ? => X

커스텀 훅은 로직을 재사용하기 위한 것이지 커스텀 훅을 사용한 state, effect는 완벽히 분리되어 있음

```react
function FriendStatus(props) {
  //custom hook
  const inOnline = useFriendStatus(props.friend.id)

  if(isOnline === null) {
    return 'loading ...'
  }
  return isOnline ? 'Online' : 'Offline'
}

function FriendListItem(props) {
	//custom hook
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

### Hook에서 지켜야할 규칙

Hook은 단지 JavaScript 함수지만 다음 규칙을 따라야 합니다.

우리는 이 두 가지 규칙을 강제하는 [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) 라는 ESLint 플러그인을 출시했습니다.

이 플러그인을 프로젝트에 추가할 수 있습니다.

1. 하나의 컴포넌트에서 훅을 호출하는 순서는 항상 같아야 한다
   우리가 useState에게 전달하는 정보는 기본값밖에 없다
   리액트가 중첩된 useState의 상태값을 구분하는 유일한 정보는 훅이 <u>`사용된 순서`</u>

2. 함수의 최상위( at the Top Level )에서만 Hook을 호출해야 합니다.
   중첩된 어떠한 스코프 내에서(반복, 조건, 중첩된 함수 등등) Hook을 실행하지 마세요.

3. 훅은 함수형 컴포넌트 또는 커스텀 훅 안에서만 호출되어야 한다
   클래스 컴포넌트나 일반 자사스크립트에서 호출하지 마세요.

### 리액트는 Hook을 어떻게 관리할까 ?

Hook이 사용된 순서를 리액트가 내부적으로 어떻게 관리할까

의사코드로 표현한 리액트의 내부 코드

```react
let hooks = null

// 훅을 사용한 만큼 배열에 추가
export function useHook() {
  // ...
  hooks.push(hookData)
}

function process_a_component_rendering (component) {
  hooks = []
  component() // <- useHook 발생 * n ( n = 1 ~ n)

  // 생성된 배열을 저장하고 hook 변수 초기화
  let hooksForThisComponent = hooks
  hooks = null
  // ...
}
```
