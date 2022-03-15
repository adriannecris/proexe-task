import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import API from '../../service/API'
import { IUsers } from './types/Users'

export interface UsersState {
  users: Array<IUsers>
  isFetching: boolean
}

const initialState: UsersState = {
  users: [],
  isFetching: false,
}

export const fetchUsers = createAsyncThunk(
  'fetch/users',
  async (_, { dispatch }) => {
    dispatch(setIsFetching(true))
    const response = await API.get(
      `${process.env.REACT_APP_BASE_URL}/jsonplaceholderdb/data`,
    )
    dispatch(setIsFetching(false))
    return response.data
  },
)

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload
    },
    addUser: (state, action: PayloadAction<IUsers>) => {
      state.users.push(action.payload)
    },
    editUser: (state, action: PayloadAction<IUsers>) => {
      state.users = state.users.map(user => {
        if (user.id !== action.payload.id) return user

        return action.payload
      })
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(user => user.id !== action.payload)
    },
  },
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUsers.fulfilled, (state, { payload: users }) => {
      state.users = users
    })
  },
})

export const { setIsFetching, addUser, removeUser, editUser } =
  counterSlice.actions

export default counterSlice.reducer
