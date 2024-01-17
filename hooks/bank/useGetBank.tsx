import { useQuery } from 'react-query'
import { getBank } from '../../services/basicInformation'
import { BankResultI } from '../../types/basicInformation'

export default function useGetBank() {
  const { data, isLoading, refetch } = useQuery<BankResultI[]>(
    'getBanks',
    getBank
  )

  return {
    getBankData: data as BankResultI[],
    bankLoading: isLoading,
    getBankAction: refetch,
  }
}
