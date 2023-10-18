import { getPlaces } from '../../services/basicInformation'
import { useQuery } from 'react-query'
import { PlacesI } from '../../types/basicInformation'
import { useEffect } from 'react'

interface GetPlacesArgsI {
  name: string
  count: number
  queryKey?: string
}

export default function useGetPlaces({
  name,
  count,
  queryKey,
}: GetPlacesArgsI) {
  const { data, isLoading, refetch, isFetching } = useQuery<PlacesI[]>(
    queryKey || 'getPlaces',
    () =>
      getPlaces({
        count,
        name,
      }),
    {
      cacheTime: 0,
      enabled: false,
    }
  )

  useEffect(() => {
    if (name?.length > 0) {
      setTimeout(refetch, 1000)
    }
  }, [name])

  return {
    getPlacesData: data as PlacesI[],
    placesLoading: isFetching,
    getPlacesAction: refetch,
  }
}
