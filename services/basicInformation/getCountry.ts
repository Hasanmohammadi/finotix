import { BASIC_INFORMATION } from '../../constants/urls'
import { axiosInstance } from '../../pages/_app'
import { CountryI } from '../../types/basicInformation'
import { ApiResponseI } from '../../types/general'

interface GetCountryListI {
  name: string
  count: number
}

const getCountry = async ({ name, count }: GetCountryListI) => {
  const response = await axiosInstance.get<ApiResponseI<CountryI[]>>(
    BASIC_INFORMATION.GET_COUNTRY(name || 'a'),
    {
      params: {
        count,
      },
      headers: {
        InstanceId: 'C50EEE38-DE25-40CA-A05F-8186ACDEDD9D',
      },
    }
  )

  return response?.data?.result
}

export default getCountry
