import { configureStore } from '@reduxjs/toolkit'
import airportReducer from './airportsSlice'

export const store = configureStore({
  reducer: {
    airportsInfo: airportReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
