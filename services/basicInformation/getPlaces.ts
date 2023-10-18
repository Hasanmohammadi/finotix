import axios from 'axios'
import { BASIC_INFORMATION } from '../../constants/urls'
import { PlacesI } from '../../types/basicInformation'
import { ApiResponseI } from '../../types/general'

interface PostAirportListI {
  name: string
  count: number
}

const getPlaces = async ({ name, count }: PostAirportListI) => {
  const response = await axios.get<ApiResponseI<PlacesI[]>>(
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
