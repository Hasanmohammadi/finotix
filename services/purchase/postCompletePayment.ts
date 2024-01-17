import Cookies from 'js-cookie'
import { PAYMENT_URL } from '../../constants/urls'
import { axiosInstance } from '../../pages/_app'
import { ApiResponseI } from '../../types/general'
import { CompletePaymentResultI } from '../../types/payment'

export interface postCompletePaymentArgsI {
  paymentCode: string
  invoiceCode: string
}

const postCompletePayment = async ({
  invoiceCode,
  paymentCode,
}: postCompletePaymentArgsI) => {
  const response = await axiosInstance.post<
    ApiResponseI<CompletePaymentResultI>
  >(
    PAYMENT_URL.POST_COMPLETE_PAYMENT,
    {
      paymentCode,
      invoiceCode,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userTokenFinotix')}`,
      },
    }
  )
  return response?.data.result
}

export default postCompletePayment
