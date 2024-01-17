import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import postPersonalInformation from '../../services/profile/postPersonalInformation'

interface UsePostPersonalInformationI {
  onSuccess?: () => void
}

export default function usePostPersonalInformation({
  onSuccess,
}: UsePostPersonalInformationI) {
  const { mutate, isLoading } = useMutation(postPersonalInformation, {
    onSuccess: () => {
      toast.success('Your information saved successfully')
      if (onSuccess) onSuccess()
    },
    onError(err) {
      const error = err as AxiosError
      toast.error(error.message)
    },
  })

  return {
    postPersonalInformationAction: mutate,
    postPersonalInformationLoading: isLoading,
  }
}
