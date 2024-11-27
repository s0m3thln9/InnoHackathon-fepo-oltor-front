import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { userSlice } from '@/entities/user'

export const mainStore = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
  },
})

export type AppState = ReturnType<typeof mainStore.getState>
export type AppDispatch = typeof mainStore.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
