import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { postCreateSearch } from '../../services/search'
import { useAppContext } from '../../context/Context'

export interface usePostCreateSearchArgsI {
  onSuccess?: (searchId: string) => void
}

export default function usePostCreateSearch({
  onSuccess,
}: usePostCreateSearchArgsI) {
  const { setSearchResultId } = useAppContext()
  const { mutate, isLoading, data } = useMutation(postCreateSearch, {
    onSuccess: ({ searchId, noResultFound }) => {
      if (noResultFound) {
        toast.warning('No result found', {
          style: {
            border: '3px solid yellow',
            borderRadius: '8px',
            background: 'white',
          },
        })
      } else {
        if (onSuccess) onSuccess(searchId)
      }
    },
    onError(err) {
      const error = err as AxiosError
      toast.error(error.message)
    },
  })

  return {
    postCreateSearchAction: mutate,
    postCreateSearchLoading: isLoading,
    createSearchData: data,
  }
}
