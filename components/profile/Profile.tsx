import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import HttpsIcon from '@mui/icons-material/Https'
import PaymentIcon from '@mui/icons-material/Payment'
import TuneIcon from '@mui/icons-material/Tune'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import PersonalInformation from './components/PersonalInformation'
import Preferences from './components/Preferences'
import Security from './components/Security'
import PaymentDetails from './components/PaymentDetails'
import { useAppSelector } from '../../hooks'
import { useGetProfileInformation } from '../../hooks/profile'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import Trips from './components/Trips'
import ListAltIcon from '@mui/icons-material/ListAlt'
export default function Profile() {
  const { profileInfoAction, getProfileInfoData } = useGetProfileInformation()

  const {
    brithDate,
    cardExpireMonth,
    cardExpireYear,
    cardHolderName,
    cardNumber,
    currencyCode,
    emailAddress,
    firstName,
    gender,
    language,
    lastName,
    mobileNo,
    nationality,
    mobileNoVerified,
    id,
    emailAddressVerified,
    userId,
  } = getProfileInfoData ?? {}

  const userInfo = useAppSelector((state) => state.userInfo)

  const router = useRouter()

  const changeQueryParams = (name: string) => {
    router.query.page = name
    router.push(router)
  }

  useEffect(() => {
    profileInfoAction()
  }, [])

  return (
    <div className="flex gap-4 w-full h-full mt-10 px-20">
      <div className="w-1/4">
        <div className="w-full flex gap-3 bg-white rounded-xl px-8 py-4 ">
          <div>
            <p className="font-semibold text-base">
              {firstName} {lastName}
            </p>
            <p className="font-normal text-xs text-gray-400 mt-1">
              {emailAddress}
            </p>
            <p
              className="mt-4 text-xs cursor-pointer text-blue-500"
              onClick={() => {
                Cookies.remove('userTokenFinotix')
                router.push('/')
              }}
            >
              Sign out
            </p>
          </div>
        </div>
        <div className="w-full  gap-3 bg-white rounded-xl px-4 py-1 mt-4">
          <div
            className={clsx(
              'px-2 py-3 rounded-md flex gap-3 my-4 items-center cursor-pointer',
              {
                'bg-blue-100': router.query.page === 'personal-information',
              }
            )}
            onClick={() => changeQueryParams('personal-information')}
          >
            <AccountCircleIcon
              htmlColor={
                router.query.page === 'personal-information'
                  ? '#2790C3'
                  : '#00000'
              }
            />
            <p
              className={clsx('font-semibold text-sm', {
                'text-blue-400': router.query.page === 'personal-information',
              })}
            >
              Personal information
            </p>
          </div>
          <div
            className={clsx(
              'px-2 py-3 rounded-md flex gap-3 my-4 items-center cursor-pointer',
              {
                'bg-blue-100': router.query.page === 'preferences',
              }
            )}
            onClick={() => changeQueryParams('preferences')}
          >
            <TuneIcon
              htmlColor={
                router.query.page === 'preferences' ? '#2790C3' : '#00000'
              }
            />
            <p
              className={clsx('font-semibold text-sm', {
                'text-blue-400': router.query.page === 'preferences',
              })}
            >
              Preferences
            </p>
          </div>
          <div
            className={clsx(
              'px-2 py-3 rounded-md flex gap-3 my-4 items-center cursor-pointer',
              {
                'bg-blue-100': router.query.page === 'security',
              }
            )}
            onClick={() => changeQueryParams('security')}
          >
            <HttpsIcon
              htmlColor={
                router.query.page === 'security' ? '#2790C3' : '#00000'
              }
            />
            <p
              className={clsx('font-semibold text-sm', {
                'text-blue-400': router.query.page === 'security',
              })}
            >
              Security
            </p>
          </div>
          <div
            className={clsx(
              'px-2 py-3 rounded-md flex gap-3 my-4 items-center cursor-pointer',
              {
                'bg-blue-100': router.query.page === 'payment-details',
              }
            )}
            onClick={() => changeQueryParams('payment-details')}
          >
            <PaymentIcon
              htmlColor={
                router.query.page === 'payment-details' ? '#2790C3' : '#00000'
              }
            />
            <p
              className={clsx('font-semibold text-sm', {
                'text-blue-400': router.query.page === 'payment-details',
              })}
            >
              Payment details
            </p>
          </div>
          <div
            className={clsx(
              'px-2 py-3 rounded-md flex gap-3 my-4 items-center cursor-pointer',
              {
                'bg-blue-100': router.query.page === 'payment-details',
              }
            )}
            onClick={() => changeQueryParams('trips')}
          >
            <ListAltIcon
              htmlColor={router.query.page === 'trips' ? '#2790C3' : '#00000'}
            />
            <p
              className={clsx('font-semibold text-sm', {
                'text-blue-400': router.query.page === 'payment-details',
              })}
            >
              Trips
            </p>
          </div>
        </div>
      </div>
      <div className="w-3/4 bg-white rounded-lg py-6 px-8 mb-10 h-fit">
        {router.query.page === 'personal-information' && (
          <PersonalInformation
            dateOfBirth={brithDate}
            email={emailAddress}
            gender={gender}
            lastName={lastName}
            name={firstName}
            nationality={nationality}
            phoneNumber={mobileNo}
            profileInfoAction={profileInfoAction}
          />
        )}
        {router.query.page === 'preferences' && (
          <Preferences
            profileInfoAction={profileInfoAction}
            currencyCode={currencyCode}
            language={language}
          />
        )}
        {router.query.page === 'security' && <Security userId={userId} />}
        {router.query.page === 'payment-details' && (
          <PaymentDetails
            cardExpireMonth={cardExpireMonth}
            cardExpireYear={cardExpireYear}
            cardHolderName={cardHolderName}
            cardNumber={cardNumber}
            profileInfoAction={profileInfoAction}
          />
        )}
        {router.query.page === 'trips' && <Trips />}
      </div>
    </div>
  )
}
