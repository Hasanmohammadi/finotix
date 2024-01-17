import { KeyboardArrowLeft } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAppSelector } from '../../../hooks'
import usePostPayment from '../../../hooks/search/usePostPayment'
import AgreeWithPayment from '../../payment/AgreeWithPayment'
import { PayWithCardI } from '../../payment/Payment'
import PaymentMethods from '../../payment/PaymentMethods'
import TravelInfoMobile from '../travelerInformation/components/TravelInfoMobile'
import { ProductResultI } from '../../../types/payment'
import { usePostCreateOnlinePayment } from '../../../hooks/purchase'

interface MobilePaymentI {
  productData: ProductResultI
}

export default function MobilePayment({ productData }: MobilePaymentI) {
  const { invoiceCode } = useAppSelector((state) => state.airportsInfo)

  const [bankSelectedId, setBankSelectedId] = useState<number>()

  const { register, handleSubmit, watch } = useForm<PayWithCardI>({
    defaultValues: {
      CardHolderName: '',
      CardNumber: '',
      CVVNumber: '',
      ExpireMonth: '',
      ExpireYear: '',
    },
  })

  const [bankInfo, setBankInfo] = useState<{
    bankId: number
    internationalTerminal: boolean
  }>()
  const {
    postCreateOnlinePaymentAction,
    postCreateOnlinePaymentLoading,
    postCreateOnlinePaymentData,
  } = usePostCreateOnlinePayment({
    onSuccess: ({ bankURL }) => {},
  })

  const router = useRouter()
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
      <div className="w-full relative h-1/6 bg-[#F00] text-white py-8">
        <div className="flex items-center justify-between">
          <KeyboardArrowLeft
            fontSize="large"
            className="w-1/5"
            onClick={() => router.back()}
          />
          <p className="w-3/5 text-center">Payment</p>
          <div className="w-[19%]"> </div>
        </div>
      </div>
      <TravelInfoMobile />
      <form
        className="bg-gray-200 w-full "
        action={postCreateOnlinePaymentData?.bankURL}
        name="bankForm"
        method="POST"
      >
        <div className="container flex py-5 gap-4">
          <div className="">
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
        </div>
      </form>
    </>
  )
}
