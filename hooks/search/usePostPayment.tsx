import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import postPayment from '../../services/search/postPayment'
import { PaymentResultI } from '../../types/search'

export default function usePostPayment() {
  const { mutate, isLoading, data } = useMutation(postPayment, {
    onSuccess: () => {},
    onError(err) {
      const error = err as AxiosError
      toast.error(error.message)
    },
  })

  return {
    postPaymentAction: mutate,
    postPaymentLoading: isLoading,
    paymentData: data as PaymentResultI,
  }
}
