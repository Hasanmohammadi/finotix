import Cookies from 'js-cookie'
import { PROFILE_URLS } from '../../constants/urls'
import { axiosInstance } from '../../pages/_app'
import { UserInfoI } from '../../userInfoSlice'
import { ApiResponseI } from '../../types/general'

const getPersonalInformation = async () => {
  const response = await axiosInstance.get<ApiResponseI<UserInfoI>>(
    PROFILE_URLS.GET_PROFILE_INFORMATION,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userTokenFinotix')}`,
      },
    }
  )

  return response?.data?.result
}

export default getPersonalInformation
