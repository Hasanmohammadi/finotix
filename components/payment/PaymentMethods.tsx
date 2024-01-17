import CreditCardIcon from '@mui/icons-material/CreditCard'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import clsx from 'clsx'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { isMobile as isMobileSize } from 'react-device-detect'
import { UseFormRegister } from 'react-hook-form'
import useGetBank from '../../hooks/bank/useGetBank'
import { PayWithCardI } from './Payment'
import styles from './payment.module.css'

const PaymentMethods = ({
  register,
  bankInfo,
  setBankInfo,
}: {
  register: UseFormRegister<PayWithCardI>
  bankInfo:
    | {
        bankId: number
        internationalTerminal: boolean
      }
    | undefined
  setBankInfo: Dispatch<
    SetStateAction<
      | {
          bankId: number
          internationalTerminal: boolean
        }
      | undefined
    >
  >
}) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(isMobileSize)
  }, [isMobileSize])

  const handleSelect = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setBankInfo((pre) => ({
      internationalTerminal: pre?.internationalTerminal as boolean,
      bankId: +event.target.value as number,
    }))
  }

  const { getBankData } = useGetBank()

  return (
    <div
      className={clsx('bg-white rounded-lg py-3 px-4 ', {
        'flex justify-between gap-8': !isMobile,
        block: isMobile,
      })}
    >
      <div className="lg:w-1/3 sm:w-full">
        <p className=" font-bold">Payment method</p>
        <FormControl className="w-full">
          <RadioGroup
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={bankInfo?.bankId}
            onChange={handleSelect}
          >
            {getBankData?.map(
              ({ active, title, agencyBankId, internationalTerminal }) =>
                internationalTerminal && (
                  <div
                    className={clsx(
                      'flex justify-between mt-5  border border-gray-400  rounded-lg px-4 ',
                      { 'border-red-500': agencyBankId === bankInfo?.bankId },
                      { 'h-10': !isMobile }
                    )}
                  >
                    <FormControlLabel
                      value={agencyBankId}
                      control={
                        <Radio
                          sx={{
                            color: '#a4a4a4',
                            '&.Mui-checked': {
                              color: '#FF6B6B',
                            },
                          }}
                          disabled={!active}
                        />
                      }
                      label={<span>{title}</span>}
                      className="flex gap-2"
                    />
                    <div className="self-center">
                      <CreditCardIcon className={styles.cardStyle} />
                    </div>
                  </div>
                )
            )}
          </RadioGroup>
        </FormControl>
      </div>

      <div
        className={clsx({
          'grid grid-cols-3 gap-3': !isMobile,
          'grid mt-2': isMobile,
        })}
      >
        <div>
          <label className="block text-sm" htmlFor="card-number">
            Card Holder Name
          </label>
          <input
            className="w-full border-gray-300 border rounded-md px-3 py-1 mt-2 bg-white outline-none"
            type="text"
            {...register('CardHolderName')}
          />
        </div>
        <div>
          <label className="block text-sm" htmlFor="card-card-holder-last-name">
            Card Number
          </label>
          <input
            className="w-full border-gray-300 border rounded-md px-3 py-1 mt-2 bg-white outline-none"
            type="number"
            {...register('CardNumber')}
          />
        </div>

        <div>
          <label className="block text-sm" htmlFor="card-expiration-date">
            CVV Number
          </label>
          <input
            type="number"
            className="w-full border-gray-300 border rounded-md px-3 py-1 mt-2 bg-white outline-none"
            {...register('CVVNumber')}
          />
        </div>
        <div>
          <label className="block text-sm" htmlFor="card-cvv-code">
            Expire Year
          </label>
          <input
            className="w-full border-gray-300 border rounded-md px-3 py-1 mt-2 bg-white outline-none"
            type="number"
            {...register('ExpireYear')}
          />
        </div>
        <div>
          <label className="block text-sm" htmlFor="card-cvv-code">
            Expire Month
          </label>
          <input
            className="w-full border-gray-300 border rounded-md px-3 py-1 mt-2 bg-white outline-none"
            type="number"
            {...register('ExpireMonth')}
          />
        </div>
      </div>
    </div>
  )
}

export default PaymentMethods
