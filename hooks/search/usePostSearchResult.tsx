import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { postSearchResult } from '../../services/search'
import convertApiToFrontData from '../../components/results/convertApiToFrontData'
import {
  FrontDataSearchResultI,
  GetSearchResultResultI,
} from '../../types/search'

export default function usePostSearchResult({
  onSuccess,
}: {
  onSuccess?: (newData: FrontDataSearchResultI) => void
}) {
  const { mutate, isLoading, data, isError, status } = useMutation(
    postSearchResult,
    {
      onSuccess: () => {
        if (onSuccess)
          onSuccess(convertApiToFrontData(data as GetSearchResultResultI))
      },
      onError(err) {
        const error = err as AxiosError
        toast.error(error.message)
      },
    }
  )

  return {
    postSearchResultAction: mutate,
    postSearchResultLoading: isLoading,
    searchResultData: convertApiToFrontData(data as GetSearchResultResultI),
    searchResultIsError: isError,
  }
}
