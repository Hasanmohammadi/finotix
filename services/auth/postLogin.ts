import { AUTHENTICATION_URLS } from '../../constants/urls'
import { axiosInstance } from '../../pages/_app'
import { LoginResultI } from '../../types/auth'
import { ApiResponseI } from '../../types/general'

export interface PostLoginArgsI {
  userName: string
  password: string
}

const postLogin = async ({ password, userName }: PostLoginArgsI) => {
  const response = await axiosInstance.post<ApiResponseI<LoginResultI>>(
    AUTHENTICATION_URLS.POST_LOGIN,
    {
      password,
      userName,
    }
  )

  return response?.data?.result
}

export default postLogin
