import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import { UserInfoI, setUserInformation } from '../../userInfoSlice'
import { getPersonalInformation } from '../../services/profile'
import { ApiResponseI } from '../../types/general'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'

export default function useGetProfileInformation() {
  const dispatch = useDispatch()

  const { data, isLoading, refetch } = useQuery<UserInfoI>(
    'profileInformation',
    () => getPersonalInformation(),
    {
      onSuccess: (data) => {
        dispatch(setUserInformation(data))
      },
      //@ts-ignore
      onError: (err: AxiosError) => {
        if (err.response?.status === 401) {
          Cookies.remove('userTokenFinotix')
        }
      },
      enabled: false,
      cacheTime: 0,
    }
  )

  return {
    getProfileInfoData: data as UserInfoI,
    profileInfoLoading: isLoading,
    profileInfoAction: refetch,
  }
}
