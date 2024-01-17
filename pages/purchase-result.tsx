import { useRouter } from 'next/router'
import { usePostCompletePayment } from '../hooks/purchase'
import { useEffect } from 'react'
import TankYou from '../components/tankYou/tankYou'
import Failed from '../components/failedPurchase/failedPurchase'
import { CircularProgress } from '@mui/material'

interface PurchaseResultPropsI {
  query: {
    invoicecode: string
    paymentcode: string
  }
}

export default function Home() {
  const { query } = useRouter()

  const {
    postCompletePaymentData,
    postCompletePaymentAction,
    postCompletePaymentLoading,
  } = usePostCompletePayment({})

  useEffect(() => {
    if (query.invoicecode) {
      postCompletePaymentAction({
        invoiceCode: query.invoicecode as string,
        paymentCode: query.paymentcode as string,
      })
    }
  }, [query])

  return (
    <div>
      {postCompletePaymentLoading ? (
        <div className="w-screen h-screen flex">
          <CircularProgress className="m-auto" size={100} />
        </div>
      ) : (
        <>
          {postCompletePaymentData?.onlinePaymentResult.agencyID &&
            postCompletePaymentData?.onlinePaymentSucceed === true && (
              <TankYou />
            )}
          {postCompletePaymentData?.onlinePaymentSucceed === false && (
            <Failed />
          )}
        </>
      )}
    </div>
  )
}
