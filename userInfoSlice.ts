import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

export interface UserInfoI {
  id: string
  userId: string
  firstName: string
  lastName: string
  emailAddress: string
  emailAddressVerified: boolean
  mobileNo: string
  mobileNoVerified: boolean
  brithDate: Date
  nationality: string
  gender: number
  language: string
  currencyCode: string
  cardNumber: string
  cardHolderName: string
  cardExpireYear: number
  cardExpireMonth: number
}

const initialState: UserInfoI = {
  id: '',
  userId: '',
  firstName: '',
  lastName: '',
  emailAddress: '',
  emailAddressVerified: true,
  mobileNo: '',
  mobileNoVerified: true,
  brithDate: new Date(),
  nationality: '',
  gender: 0,
  language: '',
  currencyCode: '',
  cardNumber: '',
  cardHolderName: '',
  cardExpireYear: 0,
  cardExpireMonth: 0,
}

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInformation: (state, action: PayloadAction<UserInfoI>) => {
      state = action.payload
    },
  },
})

export const { setUserInformation } = userInfoSlice.actions

export const selectCount = (state: RootState) => state.userInfo

export default userInfoSlice.reducer
