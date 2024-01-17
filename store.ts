import { configureStore } from '@reduxjs/toolkit'
import airportReducer from './airportsSlice'
import userInfoReducer from './userInfoSlice'

export const store = configureStore({
  reducer: {
    airportsInfo: airportReducer,
    userInfo: userInfoReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
