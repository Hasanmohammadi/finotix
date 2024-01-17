import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { postCompletePayment } from '../../services/purchase'
import { CompletePaymentResultI } from '../../types/payment'

interface usePostCompletePaymentI {
  onSuccess?: (data: CompletePaymentResultI) => void
}

export default function usePostCompletePayment({
  onSuccess,
}: usePostCompletePaymentI) {
  const { mutate, isLoading, data } = useMutation(postCompletePayment, {
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError(err) {
      const error = err as AxiosError
      toast.error(error.message)
    },
  })

  return {
    postCompletePaymentAction: mutate,
    postCompletePaymentLoading: isLoading,
    postCompletePaymentData: data,
  }
}
