import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { postSearchResult } from '../../services/search'
import convertApiToFrontData from '../../components/results/convertApiToFrontData'
import {
  FrontDataSearchResultI,
  GetSearchResultResultI,
} from '../../types/search'
import { OpratorDetailI, setResultLoading } from '../../airportsSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function usePostSearchResult({
  onSuccess,
}: {
  onSuccess?: (
    newData: FrontDataSearchResultI,
    opratorDetails: OpratorDetailI[]
  ) => void
}) {
  const dispatch = useDispatch()
  const { mutate, isLoading, data, isError, status } = useMutation(
    postSearchResult,
    {
      onSuccess: (newData) => {
        if (onSuccess)
          onSuccess(
            convertApiToFrontData(newData as GetSearchResultResultI),
            newData.searchResult.opratorDetails
          )
      },
    }
  )

  // useEffect(() => {
  //   dispatch(setResultLoading(isLoading))
  // }, [isLoading])

  return {
    postSearchResultAction: mutate,
    postSearchResultLoading: isLoading,
    searchResultData: convertApiToFrontData(data as GetSearchResultResultI),
    searchResultStatus: status,
  }
}
