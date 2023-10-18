import styles from './payment.module.css'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import FormControl from '@mui/material/FormControl'
import { SetStateAction, useState, useEffect } from 'react'
import { isMobile as isMobileSize } from 'react-device-detect'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import paypal from '../../styles/images/paypal.png'
import Image from 'next/image'
import clsx from 'clsx'
import { PayWithCardI } from './Payment'
import { UseFormRegister } from 'react-hook-form'

const PaymentMethods = ({
  register,
}: {
  register: UseFormRegister<PayWithCardI>
}) => {
  const [paymentMethod, setPaymentMethod] = useState('paypal')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(isMobileSize)
  }, [isMobileSize])

  const handleSelect = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setPaymentMethod(event.target.value)
  }

  return (
    <div
      className={clsx('bg-white rounded-lg py-3 px-4 ', {
        'flex justify-between': !isMobile,
        block: isMobile,
      })}
    >
      <div className="lg:w-1/3 sm:w-full">
        <p className=" font-bold">Payment method</p>
        <FormControl className="w-full">
          <RadioGroup
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={paymentMethod}
            onChange={handleSelect}
          >
            <div
              className={clsx(
                'flex justify-between mt-5  border border-gray-400  rounded-lg px-4 ',
                { 'border-red-500': paymentMethod !== 'paypal' }
              )}
            >
              <FormControlLabel
                value="Credit"
                control={
                  <Radio
                    sx={{
                      color: '#a4a4a4',
                      '&.Mui-checked': {
                        color: '#FF6B6B',
                      },
                    }}
                  />
                }
                label="Credit or debit card"
              />
              <div className="self-center">
                <CreditCardIcon className={styles.cardStyle} />
              </div>
            </div>
            <div
              className={clsx(
                'flex justify-between mt-5  border border-gray-400  rounded-lg px-4 ',
                { 'border-red-500': paymentMethod === 'paypal' }
              )}
            >
              <FormControlLabel
                value="paypal"
                control={
                  <Radio
                    sx={{
                      color: '#a4a4a4',
                      '&.Mui-checked': {
                        color: '#FF6B6B',
                      },
                    }}
                  />
                }
                label="Paypal"
              />
              <div className="self-center mt-1.5">
                <Image src={paypal} alt="" />
              </div>
            </div>
          </RadioGroup>
        </FormControl>
      </div>

      <div
        className={clsx('mt-4', {
          'opacity-40': paymentMethod !== 'Credit',
          hidden: paymentMethod !== 'Credit' && isMobile,
        })}
      >
        <div
          className={clsx({
            'flex justify-between gap-3': !isMobile,
          })}
        >
          <div
            className={clsx({
              'w-1/2': !isMobile,
            })}
          >
            <label className="block text-sm" htmlFor="card-number">
              Card Number
            </label>
            <input
              className="w-full border-gray-300 border rounded-md px-3 py-1 mt-2 bg-white outline-none"
              disabled={paymentMethod !== 'Credit'}
              type="number"
              {...register('cardNumber')}
            />
          </div>
          <div
            className={clsx({
              'w-1/2': !isMobile,
              'mt-2': isMobile,
            })}
          >
            <label
              className="block text-sm"
              htmlFor="card-card-holder-last-name"
            >
              Cardholder's Name
            </label>
            <input
              className="w-full border-gray-300 border rounded-md px-3 py-1 mt-2 bg-white outline-none"
              disabled={paymentMethod !== 'Credit'}
              type="text"
              {...register('cardholderName')}
            />
          </div>
        </div>
        <div className="flex justify-between gap-3 mt-2">
          <div className="w-1/2">
            <label className="block text-sm" htmlFor="card-expiration-date">
              Expiration Date
            </label>
            <input
              className="w-full border-gray-300 border rounded-md px-3 py-1 mt-2 bg-white outline-none"
              disabled={paymentMethod !== 'Credit'}
              type="date"
              {...register('expirationDate')}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm" htmlFor="card-cvv-code">
              CVV Code
            </label>
            <input
              className="w-full border-gray-300 border rounded-md px-3 py-1 mt-2 bg-white outline-none"
              disabled={paymentMethod !== 'Credit'}
              type="number"
              {...register('cvvCode')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentMethods
