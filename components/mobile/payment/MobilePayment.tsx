import { KeyboardArrowLeft } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import AgreeWithPayment from '../../payment/AgreeWithPayment'
import { PayWithCardI } from '../../payment/Payment'
import PaymentMethods from '../../payment/PaymentMethods'
import TravelInfoMobile from '../travelerInformation/components/TravelInfoMobile'
import usePostPayment from '../../../hooks/search/usePostPayment'
import { useSelector } from 'react-redux'
import { useAppSelector } from '../../../hooks'

export default function MobilePayment() {
  const { invoiceCode } = useAppSelector((state) => state.airportsInfo)
  const { register, handleSubmit } = useForm<PayWithCardI>({
    defaultValues: {
      cardNumber: '',
      cardholderName: '',
      expirationDate: '',
      cvvCode: '',
    },
  })
  const router = useRouter()

  const { paymentData, postPaymentAction } = usePostPayment()
  console.log(
    '🚀 ~ file: MobilePayment.tsx:26 ~ MobilePayment ~ paymentData:',
    paymentData
  )

  useEffect(() => {
    if (invoiceCode) {
      postPaymentAction({ invoiceCode })
    }
  }, [invoiceCode])
  console.log(
    '🚀 ~ file: MobilePayment.tsx:36 ~ MobilePayment ~ invoiceCode:',
    invoiceCode
  )

  const onSubmit = (data: PayWithCardI) => {
    console.log('🚀 ~ file: PaymentMethods.jsx:30 ~ onSubmit ~ data:', data)
  }

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
          <div className="w-1/5"> </div>
        </div>
      </div>
      <TravelInfoMobile />
      <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-200 w-full ">
        <div className="container flex py-5 gap-4">
          <div className="">
            <PaymentMethods register={register} />
            <div className="pt-5">
              <AgreeWithPayment />
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
