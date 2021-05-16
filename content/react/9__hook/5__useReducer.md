---
index : 5
title : useReducer
---



```react
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

- reducer
- initialArg
- init - 지연초기화 함수



다수의 하윗값을 포함하는 복잡한 정적 로직을 만드는 경우  `useState`보다 `useReducer`를 선호합니다.

 다음 state가 이전 state에 의존적인 경우  `useState`보다 `useReducer`를 선호합니다.

`useReducer`는 업데이트를 트리거하는 컴포넌트의 성능을 최적화할 수 있게 하는데 `콜백대신 dispatch를 전달`하기 때문



## useReducer

```react
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```



### 초기 state

useReducer state 초기화 방법에는 두 가지가 있습니다.



#### [1] 초기 state 구체화

```react
const [state, dispatch] = useReducer(reducer, {count: initialCount} );
```

초기에 initialState를 전달하는 방법



#### [2] 초기화 지연 (init)

```react
function init(initialCount) {
  return {count: initialCount};
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}

```

초기 state를 지연해서 생성할 수 있습니다. 

이를 위해서 `init`함수를 세 번째 인자로 전달합니다. 초기 state는 `init(initialArg)`에 의해 설정됩니다.

**이것은 reducer 외부에서 초기 state를 계산하는 로직을 추출할 수 있도록 합니다.**

**어떤 행동에 대한 대응으로 나중에 state를 재설정하는데도 유용합니다.**



### Dispatch의 전달

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

보통 상위 컴포넌트를 컨테이너 컴포넌트로 만들고 상탯값을 관리합니다.

이 때 자식 컴포넌트로부터 발생한 이벤트에서 상위 상탯값을 변경해야 하는 경우 `dispatch context`를 사용할 수 있습니다.

(다음 방식은 dispatch의 변경이 없기에 랜더링을 유발하지 않습니다.)