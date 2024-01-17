import Cookies from 'js-cookie'
import { PROFILE_URLS } from '../../constants/urls'
import { axiosInstance } from '../../pages/_app'

export interface PostProfileSettingsArgsI {
  language: string
  currencyCode: string
}

const postProfileSettings = async ({
  currencyCode,
  language,
}: PostProfileSettingsArgsI) => {
  const response = await axiosInstance.post<boolean>(
    PROFILE_URLS.POST_PROFILE_SETTINGS,
    {
      currencyCode,
      language,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userTokenFinotix')}`,
      },
    }
  )
  return response
}

export default postProfileSettings
