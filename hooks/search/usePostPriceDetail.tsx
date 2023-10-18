import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { postPriceDetails } from '../../services/search'
import { PostPriceDetailsResultI } from '../../types/search'

export default function usePostPriceDetail() {
  const { mutate, isLoading, data } = useMutation(postPriceDetails, {
    onSuccess: () => {},
    onError(err) {
      const error = err as AxiosError
      toast.error(error.message)
    },
  })

  return {
    postPriceDetailsAction: mutate,
    postPriceDetailsLoading: isLoading,
    priceDetailsData: data as PostPriceDetailsResultI,
  }
}
