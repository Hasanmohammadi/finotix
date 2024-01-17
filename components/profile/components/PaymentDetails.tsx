import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { usePostCardInformation } from '../../../hooks/profile'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const paymentSchema = yup.object().shape({
  cardNumber: yup.string().required('Card number is required !'),
  cardHolderName: yup.string().required('Card holder name is required !'),
  cardExpireMonth: yup
    .number()
    .required('Card expire month is required !')
    .typeError('')
    .max(12, 'Expire month must be between 1-12')
    .min(1, 'Expire month must be between 1-12'),
  cardExpireYear: yup
    .number()
    .required('Card expire year is required !')
    .typeError('')
    .min(
      new Date().getFullYear(),
      `Expire year must be greater than or equal to year ${new Date().getFullYear()}`
    ),
})

export interface PaymentDetailsI {
  cardExpireMonth: number
  cardExpireYear: number
  cardHolderName: string
  cardNumber: string
  profileInfoAction: () => void
}

export default function PaymentDetails({
  cardExpireMonth,
  cardExpireYear,
  cardHolderName,
  cardNumber,
  profileInfoAction,
}: PaymentDetailsI) {
  const [isEdit, setIsEdit] = useState(false)
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PaymentDetailsI>({
    defaultValues: {
      cardExpireMonth,
      cardExpireYear,
      cardHolderName,
      cardNumber,
    },
    //@ts-ignore
    resolver: yupResolver(paymentSchema),
  })
  const { postCardInformationAction, postCardInformationLoading } =
    usePostCardInformation({
      onSuccess: () => {
        profileInfoAction()
        setIsEdit(false)
      },
    })

  const onSave = (data: PaymentDetailsI) => {
    postCardInformationAction(data)
  }

  return (
    <>
      {!isEdit ? (
        <>
          <p className="font-semibold text-lg">Payment Details</p>
          <span className="text-gray-400 mt-2 text-sm">
            Change your payment details.
          </span>
          <div className="py-5 px-8 flex justify-between border-t border-t-gray-200 mt-5">
            <p className="font-semibold text-sm w-1/3">Payment cards</p>
            {cardHolderName && (
              <div className="w-full flex gap-10">
                <div className="">
                  <p className="font-medium">
                    Card holder name:{' '}
                    <span className="font-light"> {cardHolderName} </span>
                  </p>

                  <p className="font-medium">
                    Card expire month:{' '}
                    <span className="font-light"> {cardExpireMonth} </span>
                  </p>
                </div>
                <div className="">
                  <p className="font-medium">
                    Card number:{' '}
                    <span className="font-light"> {cardNumber} </span>
                  </p>
                  <p className="font-medium">
                    Card expire year:{' '}
                    <span className="font-light"> {cardExpireYear} </span>
                  </p>
                </div>
              </div>
            )}
            <div className="w-1/4 flex justify-end">
              <p
                className="text-blue-400 cursor-pointer w-fit"
                onClick={() => setIsEdit(true)}
              >
                {cardHolderName ? 'Edit' : 'Add'}
              </p>
            </div>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSave)}>
          <p className="font-semibold text-lg">PaymentDetails</p>
          <span className="text-gray-400 mt-2 text-sm">
            Change your payment details.
          </span>
          <div className="py-5 px-8 flex justify-between border-t border-t-gray-200 mt-5">
            <p className="font-semibold text-sm w-1/3">Payment cards</p>
            <div className="w-2/3 flex gap-4">
              <div>
                <p className="text-sm mt-2">Card Number</p>
                <input
                  className="border w-full border-gray-300 py-1 px-3 rounded-lg mt-2"
                  {...register('cardNumber')}
                />
                <p className="font-extralight text-xs text-red-500 mt-0.5">
                  {errors.cardNumber?.message}
                </p>

                <p className="text-sm mt-2">Expire month</p>
                <input
                  className="border w-full border-gray-300 py-1 px-3 rounded-lg mt-2"
                  {...register('cardExpireMonth')}
                  type="number"
                />
                <p className="font-extralight text-xs text-red-500 mt-0.5">
                  {errors.cardExpireMonth?.message}
                </p>
              </div>
              <div>
                <p className="text-sm mt-2">Cardholder’s Name</p>
                <input
                  className="border w-full border-gray-300 py-1 px-3 rounded-lg mt-2"
                  {...register('cardHolderName')}
                />
                <p className="font-extralight text-xs text-red-500 mt-0.5">
                  {errors.cardHolderName?.message}
                </p>
                <p className="text-sm mt-2">Expire year</p>
                <input
                  className="border w-full border-gray-300 py-1 px-3 rounded-lg mt-2"
                  {...register('cardExpireYear')}
                  type="number"
                />
                <p className="font-extralight text-xs text-red-500 mt-0.5">
                  {errors.cardExpireYear?.message}
                </p>
              </div>
            </div>
            <div className="w-1/4 flex justify-end">
              <p className="text-blue-400 cursor-pointer w-fit"> </p>
            </div>
          </div>
          <div className="flex justify-end mt-5 border-t border-t-gray-200 pt-4">
            <div className="flex gap-4 w-full justify-end">
              <button
                className="w-20 py-2 bg-blue-400 text-white rounded-lg"
                type="submit"
              >
                Save
              </button>
              <button
                className="w-20 py-2 bg-white border border-gray-300  rounded-lg"
                onClick={() => setIsEdit(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  )
}
