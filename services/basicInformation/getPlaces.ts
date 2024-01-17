import Cookies from 'js-cookie'
import { BASIC_INFORMATION } from '../../constants/urls'
import { axiosInstance } from '../../pages/_app'
import { PlacesI } from '../../types/basicInformation'
import { ApiResponseI } from '../../types/general'

interface PostAirportListI {
  name: string
  count: number
}

const getPlaces = async ({ name, count }: PostAirportListI) => {
  const response = await axiosInstance.get<ApiResponseI<PlacesI[]>>(
    BASIC_INFORMATION.GET_PLACES(name || 'a'),
    {
      params: {
        count,
      },
    }
  )

  return response?.data?.result
}

export default getPlaces
