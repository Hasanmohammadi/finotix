import TravelerHeader from '../travelerInformation/TravelerHeader'
import YourOrder from '../travelerInformation/YourOrder'
import PaymentMethods from './PaymentMethods'
import AgreeWithPayment from './AgreeWithPayment'
import { useForm } from 'react-hook-form'

export interface PayWithCardI {
  cardNumber: string
  cardholderName: string
  expirationDate: string
  cvvCode: string
}

const Payment = () => {
  const { register, handleSubmit } = useForm<PayWithCardI>({
    defaultValues: {
      cardNumber: '',
      cardholderName: '',
      expirationDate: '',
      cvvCode: '',
    },
  })

  const onSubmit = (data: PayWithCardI) => {
    console.log('🚀 ~ file: PaymentMethods.jsx:30 ~ onSubmit ~ data:', data)
  }
  return (
    <>
      <TravelerHeader />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-200 w-full overflow-hidden px-16"
      >
        <div className="container flex py-5 gap-4">
          <div className="w-9/12">
            <PaymentMethods register={register} />
            <div className="pt-5">
              <AgreeWithPayment />
            </div>
          </div>
          <div className="w-3/12">
            <YourOrder />
          </div>
        </div>
      </form>
    </>
  )
}

export default Payment
