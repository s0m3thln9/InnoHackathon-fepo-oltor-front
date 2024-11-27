import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

export interface UserState {
  user: {
    name: string
    email: string
  } | null
  isAuth: boolean
  error: string | null
}

export const initialState: UserState = {
  user: null,
  isAuth: false,
  error: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{ name: string; email: string }>,
    ) {
      state.user = action.payload
      state.isAuth = true
      state.error = null
      Cookies.set('user', JSON.stringify(action.payload), { expires: 7 })
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
  },
})
