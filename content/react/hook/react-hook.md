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



# #useImperativeHandle

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
