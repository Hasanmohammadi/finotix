import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { CountryI } from '../../types/basicInformation'
import { getCountry } from '../../services/basicInformation'

interface GetCountryArgsI {
  name: string
  count: number
  form?: string
}

export default function useGetCountry({ name, count, form }: GetCountryArgsI) {
  const { data, isFetching, refetch } = useQuery<CountryI[]>({
    queryKey: ['country', { form }],
    queryFn: () =>
      getCountry({
        count,
        name,
      }),
    enabled: false,
  })

  useEffect(() => {
    if (name?.length > 0) {
      setTimeout(() => {
        refetch().catch((err) => console.log(err))
      }, 1000)
    }
  }, [name])

  return {
    getCountriesData: data as CountryI[],
    countriesLoading: isFetching,
    getCountriesAction: refetch,
  }
}
