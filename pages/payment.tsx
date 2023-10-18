import Header from '../components/header/Header'
import MobilePayment from '../components/mobile/payment'
import PaymentCp from '../components/payment/Payment'
import { useEffect, useState } from 'react'
import { isMobile as isMobileSize } from 'react-device-detect'

export default function Payment() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(isMobileSize)
  }, [isMobileSize])

  return (
    <div>
      {isMobile && <MobilePayment />}
      {!isMobile && (
        <div>
          <Header />
          <PaymentCp />
        </div>
      )}
    </div>
  )
}
