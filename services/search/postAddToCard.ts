import Cookies from 'js-cookie'
import { SEARCH_URLS } from '../../constants/urls'
import { axiosInstance } from '../../pages/_app'
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
  const response = await axiosInstance.post<ApiResponseI<AddToCartResultI>>(
    SEARCH_URLS.POST_ADD_TO_CARD,
    {
      passengersInfo,
      priceDetailIds,
      searchId,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userTokenFinotix')}`,
      },
    }
  )
  return response?.data?.result
}

export default postAddToCard
