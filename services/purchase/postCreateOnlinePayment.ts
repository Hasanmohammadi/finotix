import Cookies from 'js-cookie'
import { PAYMENT_URL } from '../../constants/urls'
import { axiosInstance } from '../../pages/_app'
import { CreateOnlinePaymentResultI } from '../../types/payment'
import { ApiResponseI } from '../../types/general'

export interface PostCreateOnlinePaymentArgsI {
  invoiceCode: string
  callBackUrl: string
  agencyBankId: number
}

const postCreateOnlinePayment = async ({
  agencyBankId,
  invoiceCode,
  callBackUrl,
}: PostCreateOnlinePaymentArgsI) => {
  const response = await axiosInstance.post<
    ApiResponseI<CreateOnlinePaymentResultI>
  >(
    PAYMENT_URL.POST_CREATE_ONLINE_PAYMENT,
    {
      agencyBankId,
      invoiceCode,
      callBackUrl,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userTokenFinotix')}`,
      },
    }
  )
  return response?.data.result
}

export default postCreateOnlinePayment
