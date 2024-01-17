import Cookies from 'js-cookie'
import { PROFILE_URLS } from '../../constants/urls'
import { axiosInstance } from '../../pages/_app'

export interface PostProfileSettingsArgsI {
  userId: string
  newPassword: string
  oldPassword: string
}

const postChangePassword = async ({
  newPassword,
  userId,
  oldPassword,
}: PostProfileSettingsArgsI) => {
  const response = await axiosInstance.post<boolean>(
    PROFILE_URLS.POST_CHANGE_PASSWORD,
    {
      newPassword,
      userId,
      oldPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userTokenFinotix')}`,
      },
    }
  )
  return response
}

export default postChangePassword
