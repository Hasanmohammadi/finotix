import { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { postLogin } from '../../services/auth'

export default function usePostLogin({
  onSuccess,
}: {
  onSuccess?: () => void
}) {
  const { mutate, isLoading, data } = useMutation(postLogin, {
    onSuccess: ({ tokenDetail }) => {
      Cookies.set('userTokenFinotix', tokenDetail.token)
      if (onSuccess) onSuccess()
      toast.success('Welcome')
    },
    onError(err) {
      const error = err as AxiosError
      toast.error(error.message)
    },
  })

  return {
    postLoginAction: mutate,
    postLoginLoading: isLoading,
    paymentData: data,
  }
}
