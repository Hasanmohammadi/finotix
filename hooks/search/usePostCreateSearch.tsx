import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { postCreateSearch } from '../../services/search'
import { useAppContext } from '../../context/Context'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setResultLoading } from '../../airportsSlice'

export interface usePostCreateSearchArgsI {
  onSuccess?: (searchId: string) => void
}

export default function usePostCreateSearch({
  onSuccess,
}: usePostCreateSearchArgsI) {
  const dispatch = useDispatch()
  const { setSearchResultId } = useAppContext()
  const { mutate, isLoading, data } = useMutation(postCreateSearch, {
    onSuccess: ({ searchId }) => {
      if (onSuccess) onSuccess(searchId)
    },
    onError(err) {
      const error = err as AxiosError
      toast.error(error.message)
    },
  })

  useEffect(() => {
    dispatch(setResultLoading(isLoading))
  }, [isLoading])

  return {
    postCreateSearchAction: mutate,
    postCreateSearchLoading: isLoading,
    createSearchData: data,
  }
}
