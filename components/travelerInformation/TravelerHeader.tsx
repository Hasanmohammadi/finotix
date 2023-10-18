import clsx from 'clsx'
import styles from './travelerInformation.module.css'
import { useRouter } from 'next/router'

const TravelerHeader = () => {
  const { asPath } = useRouter()

  return (
    <>
      <div className="container flex justify-between">
        <div className="border-b-4 w-1/3 py-5 border-b-red-600 text-center h-full">
          <span>Flight Selection</span>
        </div>
        <div className="w-1/3 flex flex-col justify-between pt-5 text-center">
          <span>Traveler Information</span>
          <div
            className={clsx('border-b-4 border-b-red-600', {
              'w-1/2': asPath === '/travel-Information',
              'w-full': asPath !== '/travel-Information',
            })}
          ></div>
        </div>
        <div className="w-1/3 flex flex-col justify-between pt-5 text-center">
          <span>Payment</span>
          <div
            className={clsx('border-b-4 border-b-red-600', {
              'w-1/2': asPath === '/payment',
              'w-0': asPath !== '/payment',
            })}
          ></div>
        </div>
      </div>
    </>
  )
}

export default TravelerHeader
