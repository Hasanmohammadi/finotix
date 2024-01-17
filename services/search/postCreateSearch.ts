import { SEARCH_URLS } from '../../constants/urls'
import { axiosInstance } from '../../pages/_app'
import { ApiResponseI } from '../../types/general'
import { PostCreateSearchResultI } from '../../types/search'

export interface CreateSearchArgsI {
  departureDate: string
  returnDate: string
  origin: string
  allAirportsOrigin: boolean
  destination: string
  allAirportsDestination: boolean
  hasReturnFlight: boolean
  travelerAvailAdultCount: number
  travelerAvailChildCount: number
  travelerAvailInfantCount: number
  cabinClass: string
}

const postCreateSearch = async (createSearchInfo: CreateSearchArgsI) => {
  const response = await axiosInstance.post<
    ApiResponseI<PostCreateSearchResultI>
  >(SEARCH_URLS.POST_CREATE_SEARCH, {
    ...createSearchInfo,
  })

  return response?.data?.result
}

export default postCreateSearch
