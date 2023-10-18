import axios from 'axios'
import { SEARCH_URLS } from '../../constants/urls'
import { ApiResponseI } from '../../types/general'
import { PostPriceDetailsResultI } from '../../types/search'

interface PostPriceDetailsArgsI {
  searchId: string
  flightIds: string[]
}

const postPriceDetails = async ({
  flightIds,
  searchId,
}: PostPriceDetailsArgsI) => {
  const response = await axios.post<ApiResponseI<PostPriceDetailsResultI>>(
    SEARCH_URLS.POST_PRICE_DETAILS,
    {
      searchId,
      flightIds,
    }
  )
  return response?.data?.result
}

export default postPriceDetails
