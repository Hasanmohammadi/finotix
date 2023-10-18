import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { postAddToCard } from '../../services/search'
import { AddToCartResultI } from '../../types/search'

export default function usePostAddToCard({
  onSuccess,
}: {
  onSuccess: ({ invoiceCode }: { invoiceCode: string }) => void
}) {
  const { mutate, isLoading, data } = useMutation(postAddToCard, {
    onSuccess: ({ invoiceCode }) => {
      if (onSuccess) onSuccess({ invoiceCode })
    },
    onError(err) {
      const error = err as AxiosError
      toast.error(error.message)
    },
  })

  return {
    postAddToCardAction: mutate,
    postAddToCardLoading: isLoading,
    addToCardData: data as AddToCartResultI,
  }
}
