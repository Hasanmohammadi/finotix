import axios from 'axios'
import { SEARCH_URLS } from '../../constants/urls'
import calculateSkip from '../../helper/calculateSkip'
import { ApiResponseI } from '../../types/general'
import { GetSearchResultResultI } from '../../types/search'

interface PostSearchResultArgsI {
  searchId: string
  pageSize: number
  page: number
  orderBy?: string
  orderByDesc?: true
  airlines?: string
  minTotalFareAmount?: number
  maxTotalFareAmount?: number
}

const postSearchResult = async ({
  pageSize,
  orderBy = 'OneAdultTotalFare',
  orderByDesc = true,
  searchId,
  page,
  airlines,
  maxTotalFareAmount,
  minTotalFareAmount,
}: PostSearchResultArgsI) => {
  const response = await axios.post<ApiResponseI<GetSearchResultResultI>>(
    SEARCH_URLS.POST_SEARCH_RESULT,
    {
      searchId,
      skip: calculateSkip({ page, pageSize }),
      count: pageSize,
      orderBy,
      orderByDesc,
      ...(airlines && { airlines: [airlines] }),
      ...(minTotalFareAmount && { minTotalFareAmount }),
      ...(maxTotalFareAmount && { maxTotalFareAmount }),
    }
  )

  return response?.data?.result
}

export default postSearchResult
