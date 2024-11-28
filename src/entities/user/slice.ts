import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  user: {
    name: string
    email: string
  } | null
  error: string | null
}

export const initialState: UserState = {
  user: null,
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
      state.error = null
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
    loadUser(state, action: PayloadAction<{ name: string; email: string }>) {
      state.user = action.payload
    },
    logout(state) {
      state.user = null
    },
  },
})
