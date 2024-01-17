import Cookies from 'js-cookie'
import { PURCHASE_URLS } from '../../constants/urls'
import { axiosInstance } from '../../pages/_app'
import { ApiResponseI } from '../../types/general'
import { ProductResultI } from '../../types/payment'

const getProduct = async ({ invoiceCode }: { invoiceCode: string }) => {
  const response = await axiosInstance.get<ApiResponseI<ProductResultI>>(
    PURCHASE_URLS.GET_PRODUCT(invoiceCode),
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userTokenFinotix')}`,
      },
    }
  )

  return response?.data?.result
}

export default getProduct
