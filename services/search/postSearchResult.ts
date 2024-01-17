import { SEARCH_URLS } from '../../constants/urls'
import calculateSkip from '../../helper/calculateSkip'
import { axiosInstance } from '../../pages/_app'
import { ApiResponseI } from '../../types/general'
import { GetSearchResultResultI } from '../../types/search'

interface PostSearchResultArgsI {
  searchId: string
  pageSize: number
  page: number
  orderBy?: string
  orderByDesc?: boolean
  airlines?: string[]
  departureStops?: number[]
  arrivalStops?: number[]
  minTotalFareAmount?: number
  maxTotalFareAmount?: number
  systemFlight?: boolean | null
}

const postSearchResult = async ({
  pageSize,
  orderBy,
  orderByDesc = false,
  searchId,
  page,
  airlines,
  maxTotalFareAmount,
  minTotalFareAmount,
  departureStops,
  arrivalStops,
  systemFlight,
}: PostSearchResultArgsI) => {
  const response = await axiosInstance.post<
    ApiResponseI<GetSearchResultResultI>
  >(SEARCH_URLS.POST_SEARCH_RESULT, {
    searchId,
    skip: calculateSkip({ page, pageSize }),
    count: pageSize,
    orderBy: orderBy ? orderBy : 'OneAdultTotalFare',
    orderByDesc,
    searchFilter: {
      ...(airlines && { airlines }),
      ...(departureStops && { departureLegsCounts: departureStops }),
      ...(arrivalStops && { arrivalLegsCounts: arrivalStops }),
      ...(minTotalFareAmount && { minTotalFareAmount }),
      ...(maxTotalFareAmount && { maxTotalFareAmount }),
      ...(systemFlight !== null && { systemFlight }),
    },
  })

  return response?.data?.result
}

export default postSearchResult
