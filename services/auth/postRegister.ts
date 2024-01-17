import axios from 'axios'
import { AUTHENTICATION_URLS } from '../../constants/urls'
import { ApiResponseI } from '../../types/general'
import { axiosInstance } from '../../pages/_app'

export interface PostRegisterArgsI {
  userName: string
  password: string
}

const postRegister = async ({ password, userName }: PostRegisterArgsI) => {
  const response = await axiosInstance.post<ApiResponseI<Boolean>>(
    AUTHENTICATION_URLS.POST_REGISTER,
    {
      password,
      userName,
    }
  )

  return response?.data?.result
}

export default postRegister
