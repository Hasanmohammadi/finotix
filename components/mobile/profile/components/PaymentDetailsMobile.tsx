import { useState } from 'react'
import { useForm } from 'react-hook-form'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { usePostCardInformation } from '../../../../hooks/profile'
import { CircularProgress } from '@material-ui/core'

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

export default function PaymentDetailsMobile({
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
    <div className="px-4">
      {!isEdit ? (
        <>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-lg">Payment Details</p>
            </div>
            {!isEdit && (
              <div className="w-1/4 flex justify-end">
                <p
                  className="text-blue-400 cursor-pointer w-fit text-lg"
                  onClick={() => setIsEdit(true)}
                >
                  Edit
                </p>
              </div>
            )}
          </div>
          <div className="py-5  border-t border-t-gray-200 mt-5">
            <p className="font-semibold">Payment cards</p>
            <div className="w-full  gap-10">
              <div className="mt-4">
                <div className="flex justify-between my-4">
                  <p className="font-medium">Card holder name: </p>
                  <p className="font-light"> {cardHolderName} </p>
                </div>
                <div className="flex justify-between my-4">
                  <p className="font-medium">Card number:</p>
                  <p className="font-light"> {cardNumber} </p>
                </div>
              </div>
              <div className="flex justify-between my-4">
                <p className="font-medium">Card expire month:</p>
                <p className="font-light"> {cardExpireMonth} </p>
              </div>
              <div className="flex justify-between my-4">
                <p className="font-medium">Card expire year:</p>
                <p className="font-light"> {cardExpireYear} </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSave)}>
          <p className="font-semibold text-lg">PaymentDetails</p>
          <span className="text-gray-400 mt-2 text-sm">
            Change your payment details.
          </span>
          <div className="py-5 border-t border-t-gray-200 mt-5">
            <p className="font-semibold text-sm">Payment cards</p>
            <div className="gap-4">
              <div>
                <p className="text-sm mt-2">Card Number</p>
                <input
                  className="border w-full border-gray-300 py-1 px-3 rounded-lg mt-2"
                  {...register('cardNumber')}
                />
                <p className="font-extralight text-xs text-red-500 mt-0.5">
                  {errors.cardNumber?.message}
                </p>
                <p className="text-sm mt-2">Cardholder’s Name</p>
                <input
                  className="border w-full border-gray-300 py-1 px-3 rounded-lg mt-2"
                  {...register('cardHolderName')}
                />
                <p className="font-extralight text-xs text-red-500 mt-0.5">
                  {errors.cardHolderName?.message}
                </p>
              </div>
              <div>
                <p className="text-sm mt-2">Expire month</p>
                <input
                  className="border w-full border-gray-300 py-1 px-3 rounded-lg mt-2"
                  {...register('cardExpireMonth')}
                  type="number"
                />
                <p className="font-extralight text-xs text-red-500 mt-0.5">
                  {errors.cardExpireMonth?.message}
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
          <div className="flex justify-end mt-5 border-t border-t-gray-200 pt-6 gap-4 w-full">
            {postCardInformationLoading && (
              <div className="flex justify-center w-full">
                <CircularProgress />
              </div>
            )}
            {!postCardInformationLoading && (
              <div className="px-4 flex w-full justify-between gap-4">
                <button
                  className="w-1/2 py-2 bg-blue-400 text-white rounded-lg"
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="w-1/2 py-2 bg-white-400 border border-gray-300 rounded-lg"
                  onClick={() => setIsEdit(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  )
}
