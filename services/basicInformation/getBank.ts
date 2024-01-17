import Cookies from 'js-cookie'
import { BASIC_INFORMATION } from '../../constants/urls'
import { axiosInstance } from '../../pages/_app'
import { BankResultI } from '../../types/basicInformation'
import { ApiResponseI } from '../../types/general'

const getBank = async () => {
  const response = await axiosInstance.get<ApiResponseI<BankResultI[]>>(
    BASIC_INFORMATION.GET_BANK,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('userTokenFinotix')}`,
      },
    }
  )

  return response?.data?.result
}

export default getBank
