import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FilterState {
  date?: string
  time?: string
  numberOfPeople: number
}

export const initialState: FilterState = {
  date: undefined,
  time: undefined,
  numberOfPeople: 0,
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<FilterState>) {
      state.date = action.payload.date
      state.time = action.payload.time
      state.numberOfPeople = action.payload.numberOfPeople
    },
  },
})
