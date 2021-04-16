---
title : redux > redux-toolkit > createReducer
---



## immer (불변객체를 관리하는 방식)

Reducer 함수는 내부적으로 `immer`의  `produce`를 사용합니다.

 그래서 Reducer 함수에서 새로운 상태 state 객체를 리턴할 필요가 없습니다. 

대신 상태값을 직접 변경하는 방식으로 코드를 작성합니다.

## map object

```react
const increment = createAction("increment");
const decrement = createAction("decrement");

const counterReducer = createReducer(0, {
  [increment]: (state, action) => state + action.payload,
  [decrement.type]: (state, action) => state - action.payload
});
```

Reducer의 Map 필드에 액션 생성자에 전달한 문자열을 넣어도 되나, 액션 생성자 함수를 직접 넣어도 됩니다.

이는 createAction이 리턴하는 액션 생성자 함수의 toString 메소드를 오버라이딩 했기에 가능합니다.

## builder callback

The `createReducer` helper streamlines the implementation of such reducers. It supports two different forms of defining case reducers to handle actions: a "builder callback" notation and a "map object" notation. Both are equivalent, but the "builder callback" notation is preferred.

map object와 builder callback 모두 기능은 동일하지만 `builder callback`이 더 선호됨



This overload accepts a callback function that receives a `builder` object as its argument. That builder provides `addCase`, `addMatcher` and `addDefaultCase` functions that may be called to define what actions this reducer will handle.

builder는 addCase, addMatcher, addDefaultCase 기능을 제공하며 이를 사용해서 reducer를 컨트롤



```react
import { createAction, createReducer } from '@reduxjs/toolkit'

interface CounterState {
  value: number
}

const increment = createAction('counter/increment')
const decrement = createAction('counter/decrement')
const incrementByAmount = createAction<number>('counter/incrementByAmount')

const initialState = { value: 0 } as CounterState

const counterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(increment, (state, action) => {
      state.value++
    })
    .addCase(decrement, (state, action) => {
      state.value--
    })
    .addCase(incrementByAmount, (state, action) => {
      state.value += action.payload
    })
})
```



### addCasse

Adds a case reducer to handle a single exact action type. 

All calls to `builder.addCase` must come before any calls to `builder.addMatcher` or `builder.addDefaultCase`.



### addMatcher

Allows you to match your incoming actions against your own filter function instead of only the `action.type` property.

action.type 속성 만이 아니라 자신의 필터 함수에 대해 들어오는 작업을 일치시킬 수 있습니다.



If multiple matcher reducers match, all of them will be executed in the order they were defined in - even if a case reducer already matched. All calls to `builder.addMatcher` must come after any calls to `builder.addCase` and before any calls to `builder.addDefaultCase`.

여러 matcher reducer가 일치하면 case reducer가 이미 일치하더라도 정의 된 순서대로 모두 실행됩니다.

builder.addMatcher에 대한 모든 호출은 builder.addCase 호출 후와 builder.addDefaultCase 호출 이전에 와야합니다.



### addDefaultCase

Adds a "default case" reducer that is executed if no case reducer and no matcher reducer was executed for this action



```react
import {
  createAction,
  createReducer,
  AnyAction,
  PayloadAction,
} from '@reduxjs/toolkit'

const increment = createAction<number>('increment')
const decrement = createAction<number>('decrement')

function isActionWithNumberPayload(
  action: AnyAction
): action is PayloadAction<number> {
  return typeof action.payload === 'number'
}

createReducer(
  {
    counter: 0,
    sumOfNumberPayloads: 0,
    unhandledActions: 0,
  },
  (builder) => {
    builder
      .addCase(increment, (state, action) => {
        // action is inferred correctly here
        state.counter += action.payload
      })
      // You can chain calls, or have separate `builder.addCase()` lines each time
      .addCase(decrement, (state, action) => {
        state.counter -= action.payload
      })
      // You can apply a "matcher function" to incoming actions
      .addMatcher(isActionWithNumberPayload, (state, action) => {})
      // and provide a default case if no other handlers matched
      .addDefaultCase((state, action) => {})
  }
)
```

