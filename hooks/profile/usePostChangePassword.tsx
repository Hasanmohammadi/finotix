import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { postChangePassword } from '../../services/profile'

interface UsePostChangePasswordI {
  onSuccess?: () => void
}

export default function usePostChangePassword({
  onSuccess,
}: UsePostChangePasswordI) {
  const { mutate, isLoading } = useMutation(postChangePassword, {
    onSuccess: () => {
      toast.success('Your successfully has changed')
      if (onSuccess) onSuccess()
    },
    onError(err) {
      const error = err as AxiosError
      toast.error(error.message)
    },
  })

  return {
    postChangePasswordAction: mutate,
    postChangePasswordLoading: isLoading,
  }
}
