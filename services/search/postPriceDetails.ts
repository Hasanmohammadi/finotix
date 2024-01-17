import { SEARCH_URLS } from '../../constants/urls'
import { axiosInstance } from '../../pages/_app'
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
  const response = await axiosInstance.post<
    ApiResponseI<PostPriceDetailsResultI>
  >(SEARCH_URLS.POST_PRICE_DETAILS, {
    searchId,
    flightIds,
  })
  return response?.data?.result
}

export default postPriceDetails
