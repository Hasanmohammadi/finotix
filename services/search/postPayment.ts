import axios from 'axios'
import { SEARCH_URLS } from '../../constants/urls'
import { ApiResponseI } from '../../types/general'
import { PaymentResultI } from '../../types/search'

interface PostPaymentArgsI {
  invoiceCode: string
}

const postPayment = async ({ invoiceCode }: PostPaymentArgsI) => {
  const response = await axios.post<ApiResponseI<PaymentResultI>>(
    SEARCH_URLS.POST_PAYMENT(invoiceCode)
  )
  return response?.data?.result
}

export default postPayment
