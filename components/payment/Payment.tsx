import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAppSelector } from '../../hooks'
import { usePostCreateOnlinePayment } from '../../hooks/purchase'
import { ProductResultI } from '../../types/payment'
import TravelerHeader from '../travelerInformation/TravelerHeader'
import YourOrder from '../travelerInformation/YourOrder'
import AgreeWithPayment from './AgreeWithPayment'
import PaymentMethods from './PaymentMethods'

export interface PayWithCardI {
  CardHolderName: string
  CardNumber: string
  CVVNumber: string
  ExpireMonth: string
  ExpireYear: string
}

interface PaymentI {
  productData: ProductResultI
}

const Payment = ({ productData }: PaymentI) => {
  const { invoiceCode } = useAppSelector((state) => state.airportsInfo)
  const [bankInfo, setBankInfo] = useState<{
    bankId: number
    internationalTerminal: boolean
  }>()
  const [bankUrl, setBankUrl] = useState<string>()

  const { register } = useForm<PayWithCardI>({
    defaultValues: {
      CardHolderName: '',
      CardNumber: '',
      CVVNumber: '',
      ExpireMonth: '',
      ExpireYear: '',
    },
  })

  const {
    postCreateOnlinePaymentAction,
    postCreateOnlinePaymentLoading,
    postCreateOnlinePaymentData,
  } = usePostCreateOnlinePayment({
    onSuccess: ({ bankURL }) => {
      setBankUrl(bankURL)
    },
  })

  useEffect(() => {
    if (bankInfo?.bankId) {
      postCreateOnlinePaymentAction({
        agencyBankId: bankInfo?.bankId as number,
        callBackUrl: 'http://localhost:3000/purchase-result',
        invoiceCode,
      })
    }
  }, [bankInfo?.bankId])

  return (
    <>
      <TravelerHeader />
      <form
        className="bg-gray-200 w-full overflow-hidden px-16"
        action={postCreateOnlinePaymentData?.bankURL}
        name="bankForm"
        method="POST"
      >
        <div className="container flex py-5 gap-4">
          <div className="w-9/12">
            <PaymentMethods
              register={register}
              bankInfo={bankInfo}
              setBankInfo={setBankInfo}
            />
            <div className="pt-5">
              <AgreeWithPayment
                totalAmount={productData?.totalAmount}
                bankInfo={bankInfo}
                paymentLoading={postCreateOnlinePaymentLoading}
              />
            </div>
          </div>
          <div className="w-3/12">
            <YourOrder isPaymentPage />
          </div>
        </div>
      </form>
    </>
  )
}

export default Payment
