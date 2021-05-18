---
index : 1
title : useState
---



```react 
const [state, setState] = useState(initialState);
```

- state - 상태값
- setState - 상태값을 갱신하는 함수 (다음 함수는 리랜더링에도 변하지 않습니다.



`useState`는 state를 함수 컴포넌트 안에서 사용할 수 있게 해줍니다.

## useState



### 함수적 갱신

```react
function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  );
}
```

다음 계산기는 `이전 state`를 기준으로 값을 더하거나 뺍니다.

업데이트 함수가 현재 state와 정확히 동일한 값을 반환하면, 바로 뒤에 일어날 리랜더링은 건너뛰게 됩니다.



### state 초기화  지연

```react
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

초기 state가 고비용 계산의 결과라면 초기 랜더링에만 실행할 함수를 설정할 수 있습니다.



### state 갱신 취소

만약 state를 현재와 동일한 값으로 갱신하면 
React는 자식을 랜더링 한다거나 무엇을 실행하는 것을 회피하고 그 처리를 종료합니다.

