import axios from 'axios'
import { SEARCH_URLS } from '../../constants/urls'
import { ApiResponseI } from '../../types/general'
import { AddToCartResultI, PassengersInfoI } from '../../types/search'

interface PostAddToCardArgsI {
  searchId: string
  passengersInfo: PassengersInfoI
  priceDetailIds: string[]
}

const postAddToCard = async ({
  passengersInfo,
  priceDetailIds,
  searchId,
}: PostAddToCardArgsI) => {
  const response = await axios.post<ApiResponseI<AddToCartResultI>>(
    SEARCH_URLS.POST_ADD_TO_CARD,
    {
      passengersInfo,
      priceDetailIds,
      searchId,
    }
  )
  return response?.data?.result
}

export default postAddToCard
