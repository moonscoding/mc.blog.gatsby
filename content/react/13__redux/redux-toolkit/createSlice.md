---
title : redux > redux-toolkit > createSlice
---



## createSlice

```react
const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    createPost(state, action) {},
    updatePost(state, action) {},
    deletePost(state, action) {}
  }
})

console.log(postsSlice)
/*
{
    name: 'posts',
    actions : {
        createPost,
        updatePost,
        deletePost,
    },
    reducer
}
*/

const { createPost } = postsSlice.actions

console.log(createPost({ id: 123, title: 'Hello World' }))
// {type : "posts/createPost", payload : {id : 123, title : "Hello World"}}

export default postsSlice.reducer
```

createSlice는 다음 요소를 포함합니다.

- name
- initialState
- reducer

createSlice는 reducer에 정의된 함수를 참조하여 

reducer 이름을 ActionType(posts/createPost)으로 하는 액션 생성자 함수를 제공합니다.

## createSlice State

```react
import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
```

Redux Toolkit의 createSlice 및 createReducer API는 

 `immer`를 사용하여 변경 불가능한 올바른 업데이트가 되는 "변이" 업데이트 로직을 작성할 수 있도록합니다.


