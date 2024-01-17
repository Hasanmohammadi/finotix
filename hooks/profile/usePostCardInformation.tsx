import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { postCardInformation } from '../../services/profile'

interface UsePostCardInformationI {
  onSuccess?: () => void
}

export default function usePostCardInformation({
  onSuccess,
}: UsePostCardInformationI) {
  const { mutate, isLoading } = useMutation(postCardInformation, {
    onSuccess: () => {
      toast.success('Your card information saved successfully')
      if (onSuccess) onSuccess()
    },
    onError(err) {
      const error = err as AxiosError
      toast.error(error.message)
    },
  })

  return {
    postCardInformationAction: mutate,
    postCardInformationLoading: isLoading,
  }
}
