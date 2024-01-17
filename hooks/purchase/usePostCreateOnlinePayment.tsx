import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { postCreateOnlinePayment } from '../../services/purchase'
import { CreateOnlinePaymentResultI } from '../../types/payment'

interface UsePostCreateOnlinePaymentI {
  onSuccess?: (data: CreateOnlinePaymentResultI) => void
}

export default function usePostCreateOnlinePayment({
  onSuccess,
}: UsePostCreateOnlinePaymentI) {
  const { mutate, isLoading, data } = useMutation(postCreateOnlinePayment, {
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data)
    },
    onError(err) {
      const error = err as AxiosError
      toast.error(error.message)
    },
  })

  return {
    postCreateOnlinePaymentAction: mutate,
    postCreateOnlinePaymentLoading: isLoading,
    postCreateOnlinePaymentData: data,
  }
}
