---
title : redux > redux-toolkit > configureStore
---



## configureStore 

```react
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {}
})
```

- 만약, slice reducers(createSlice)를 사용하고 있다면 `combineReducers`를 자동으로 호출합니다.
  - if you want to nest reducers, you'll need to call `combineReducers` yourself to handle the nesting.
- middleware, enhancers를 제공하고 자동으로 applyMiddleware, compose를 호출합니다.
- `redux-thunk` middleware를 기본적으로 포함합니다.
- Redux DevTools extension을 자동으로 포함합니다.

## configureStore Option

```react
import { configureStore } from '@reduxjs/toolkit'

import monitorReducersEnhancer from './enhancers/monitorReducers'
import loggerMiddleware from './middleware/logger'
import rootReducer from './reducers'

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(loggerMiddleware),
    preloadedState,
    enhancers: [monitorReducersEnhancer]
  })

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }

  return store
}
```

## configureStore with type

```react
import { configureStore } from '@reduxjs/toolkit'
// ...

const store = configureStore({
  reducer: {
    one: oneSlice.reducer,
    two: twoSlice.reducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

다음과 같이 state, dispatch 타입을 구할 수 있습니다 



```react
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

Custom된 Hook를 사용해 state, dispatch 타입이 포함된 useSelector, useDispatch를 사용할 수 있습니다.

