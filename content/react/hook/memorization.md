---
title : react > hook > memorization
---



## useCallback

memoization된 콜백을 반환합니다.



```react
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

1. memorization 함수
2. 다음 배열내 값이 변경되어야 memorization된 함수가 변경



>  `useCallback(fn, deps)`은 `useMemo(() => fn, deps)`와 같습니다.

## useMemo

memorization된 값을 반환합니다.



```react
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

1. 생성자 함수
2. 다음 배열내 값이 변경되어야 memorization된 생성자 함수가 변경 (배열이 없을 경우 매 랜더링마다 계산)



`useMemo`는 의존성이 변경됐을 때만 memorization된 생성자 함수의 값을 다시 계산하고 이 최적화는 모든 렌더링에서 고비용 계산을 방지합니다.

useMemo로 전달된 생성자 함수는 rendering중에 실행됩니다. 그렇기에 rendering 중에 처리되는 일을 이 곳에 넣지 말아야 합니다.



> [lint] [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) 패키지의 일부로써 [`exhaustive-deps`](https://github.com/facebook/react/issues/14920) 규칙을 사용하기를 권장합니다.