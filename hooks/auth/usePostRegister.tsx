import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { postRegister } from '../../services/auth'
import { useRouter } from 'next/router'

export default function usePostRegister() {
  const { push } = useRouter()
  const { mutate, isLoading, data } = useMutation(postRegister, {
    onSuccess: () => {
      toast.success('User create successfully')
      push('/sign-in')
    },
    onError(err) {
      const error = err as AxiosError
      toast.error(error.message)
    },
  })

  return {
    postRegisterAction: mutate,
    postRegisterLoading: isLoading,
    paymentData: data,
  }
}
