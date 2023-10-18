import styles from './payment.module.css'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import red from '@material-ui/core/colors/red'
import percent from '../../styles/images/percent.png'
import Image from 'next/image'
import clsx from 'clsx'
import Link from 'next/link'
import { useAppSelector } from '../../hooks'

import { SetStateAction, useState, useEffect } from 'react'
import { isMobile as isMobileSize } from 'react-device-detect'

const AgreeWithPayment = () => {
  const sxStyle = {
    '&.Mui-checked': {
      color: red[700],
    },
  }

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(isMobileSize)
  }, [isMobileSize])

  const { fare } = useAppSelector((state) => state.airportsInfo)

  const [isAgree, setIsAgree] = useState(false)
  return (
    <div className={`${styles.whiteBox}`}>
      <div className="flex px-4 py-3">
        <div className="px-2">
          <Image src={percent} alt="" />
        </div>
        <span
          className={clsx({
            [styles.paymentTermsTitle]: !isMobile,
            'text-sm': isMobile,
          })}
        >
          Want to add a discount voucher? {isMobile && <br />}
          <Link href="#">
            <span className="text-blue-500 cursor-pointer underline">
              Click here
            </span>
          </Link>{' '}
        </span>
      </div>

      <hr />
      <div className=" py-4 px-6">
        <div className="">
          <p className={styles.totalAmount}>Total Amount</p>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{`${fare?.totalFareAmount?.toLocaleString()}`}</span>
          </div>
          <div className="flex justify-between pt-5">
            <span>Amount to pay</span>
            <span className="font-bold">{`${fare?.totalFareAmount?.toLocaleString()}`}</span>
          </div>
        </div>
        <div
          className={clsx({
            block: isMobile,
            'flex items-center': !isMobile,
          })}
        >
          <div className="pt-10">
            <div className="self-center w-5/6">
              <FormGroup className="flex" style={{ flexFlow: 'row' }}>
                <FormControlLabel
                  label=""
                  control={
                    <Checkbox
                      defaultChecked={isAgree}
                      className={styles.checkBox}
                      sx={sxStyle}
                      onChange={(e) => setIsAgree(e.target.checked)}
                    />
                  }
                />
                <p
                  className={clsx('mt-5 text-sm', {
                    'text-sm': isMobile,
                  })}
                >
                  I have read and accept Finotix{' '}
                  <Link href="#">
                    <span className="text-blue-500 cursor-pointer underline">
                      travel conditions
                    </span>
                  </Link>{' '}
                  ,{' '}
                  <Link href="#">
                    <span className="text-blue-500 cursor-pointer underline">
                      Fare Rules
                    </span>
                  </Link>{' '}
                  , the airline's{' '}
                  <Link href="#">
                    <span className="text-blue-500 cursor-pointer underline">
                      general terms and conditions
                    </span>
                  </Link>{' '}
                  , and I have verified that I have entered my booking
                  information correctly. You can read our Privacy policy. here.
                </p>
              </FormGroup>
            </div>
          </div>
          <div className={clsx('text-center pt-10', { 'pb-6 ': isMobile })}>
            <button
              type="submit"
              disabled={!isAgree}
              className={clsx(
                'py-3 px-24 bg-blue-600 rounded-lg text-white text-xl font-semibold',
                { 'bg-gray-400': !isAgree, 'pb-4': isMobile }
              )}
            >
              Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgreeWithPayment
