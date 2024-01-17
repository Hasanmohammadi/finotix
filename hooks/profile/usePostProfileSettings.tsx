import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { postProfileSettings } from '../../services/profile'

interface UsePostProfileSettingsI {
  onSuccess?: () => void
}

export default function usePostProfileSettings({
  onSuccess,
}: UsePostProfileSettingsI) {
  const { mutate, isLoading } = useMutation(postProfileSettings, {
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
    postProfileSettingsAction: mutate,
    postProfileSettingsLoading: isLoading,
  }
}
