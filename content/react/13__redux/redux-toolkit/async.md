---
title : redux > redux-toolkit > async
---



RTK 비동기 활용 방식

## redux-thunk

RTK은 `redux-thunk` middleware를 포함합니다. createSlice내에서 호출할 수 없고 redux와 같이 reducer와 분리된 로직에서 작성해야 합니다.

```react
// First, define the reducer and action creators via `createSlice`
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    loading: 'idle',
    users: []
  },
  reducers: {
    usersLoading(state, action) {
      // Use a "state machine" approach for loading state instead of booleans
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    usersReceived(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.users = action.payload
      }
    }
  }
})

// Destructure and export the plain action creators
export const { usersLoading, usersReceived } = usersSlice.actions

// Define a thunk that dispatches those action creators
const fetchUsers = () => async dispatch => {
  dispatch(usersLoading())
  const response = await usersAPI.fetchAll()
  dispatch(usersReceived(response.data))
}
```



## createAsyncThunk



### type

pending, fulfilled, rejected

```react
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userAPI } from './userAPI'

// First, create the thunk
const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId, thunkAPI) => {
    const response = await userAPI.fetchById(userId)
    return response.data
  }
)

// Then, handle actions in your reducers:
const usersSlice = createSlice({
  name: 'users',
  initialState: { entities: [], loading: 'idle' },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchUserById.fulfilled]: (state, action) => {
      // Add user to the state array
      state.entities.push(action.payload)
    }
  }
})

// Later, dispatch the thunk as needed in the app
dispatch(fetchUserById(123))
```

