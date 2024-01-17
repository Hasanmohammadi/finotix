import { useQuery } from 'react-query'
import { getProduct } from '../../services/purchase'
import { ProductResultI } from '../../types/payment'

interface UseGetProductI {
  invoiceCode: string
}

export default function useGetProduct({ invoiceCode }: UseGetProductI) {
  const { data, isLoading, refetch } = useQuery<ProductResultI>(
    'getProduct',
    () =>
      getProduct({
        invoiceCode,
      })
  )

  return {
    getProductData: data as ProductResultI,
    productLoading: isLoading,
    getProductAction: refetch,
  }
}
