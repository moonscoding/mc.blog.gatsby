---
title : redux > redux-toolkit > createReducer
---



## createReducer

```react
const increment = createAction("increment");
const decrement = createAction("decrement");

const counterReducer = createReducer(0, {
  [increment]: (state, action) => state + action.payload,
  [decrement.type]: (state, action) => state - action.payload
});
```

Reducer의 Map 필드에 액션 생성자에 전달한 문자열을 넣어도 되나, 액션 생성자 함수를 직접 넣어도 됩니다 

이는 createAction이 리턴하는 액션 생성자 함수의 toString 메소드를 오버라이딩 했기에 가능합니다.



### immer

Reducer 함수는 내부적으로 immer의  produce를 사용합니다. 그래서 Reducer 함수에서 새로운 상태 state 객체를 리턴할 필요가 없습니다. 대신 상태값을 직접 변경하는 방식으로 코드를 작성합니다.

