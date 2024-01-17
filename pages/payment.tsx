import Header from '../components/header/Header'
import MobilePayment from '../components/mobile/payment'
import PaymentCp from '../components/payment/Payment'
import { useEffect, useState } from 'react'
import { isMobile as isMobileSize } from 'react-device-detect'
import { useGetProduct } from '../hooks/purchase'
import { useAppSelector } from '../hooks'

export default function Payment() {
  const { invoiceCode } = useAppSelector((state) => state.airportsInfo)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(isMobileSize)
  }, [isMobileSize])

  const { getProductData } = useGetProduct({ invoiceCode })

  return (
    <div>
      {isMobile && <MobilePayment productData={getProductData} />}
      {!isMobile && (
        <div>
          <Header />
          <PaymentCp productData={getProductData} />
        </div>
      )}
    </div>
  )
}
