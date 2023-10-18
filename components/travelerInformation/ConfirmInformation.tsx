import clsx from 'clsx'
import { useAppSelector } from '../../hooks'
import { useEffect, useState } from 'react'

import { isMobile as isMobileSize } from 'react-device-detect'

export default function ConfirmInformation() {
  const { passengersInfo } = useAppSelector((state) => state.airportsInfo)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(isMobileSize)
  }, [isMobileSize])

  return (
    <>
      <div className="bg-white py-6 px-8 rounded-lg">
        <h1 className="text-gray-900 font-semibold text-lg">
          Contact Information
        </h1>
        <div className="flex mt-8">
          <div className="w-1/2">
            <p className="text-gray-400 font-normal text-sm">Mobile Number</p>
            <p className="text-gray-900 font-semibold text-sm mt-3">
              {passengersInfo.contactInformation.mobileNumber}
            </p>
          </div>
          <div className="w-1/2">
            <p className="text-gray-400 font-normal text-sm">Email Address</p>
            <p className="text-gray-900 font-semibold text-sm mt-3">
              {passengersInfo.contactInformation.emailAddress}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white mt-6 py-6 px-8 rounded-lg">
        <h1 className="text-gray-900 font-semibold text-lg">
          Passenger Information
        </h1>
        {passengersInfo.adults.map(
          (
            {
              birthDate,
              firstName,
              gender,
              lastName,
              nationality,
              passportExpiryDate,
              passportNumber,
              nationalId,
            },
            index
          ) => (
            <div className="mt-10" key={nationalId}>
              <p>
                {index + 1}. Adult{' '}
                <span className="text-gray-500">
                  ({gender === 1 ? 'Male' : 'Female'}){' '}
                </span>
              </p>
              <div
                className={clsx({
                  'grid grid-cols-3': !isMobile,
                  'grid grid-cols-2': isMobile,
                })}
              >
                <div className="mt-6">
                  <p className="text-gray-400 font-normal text-sm">
                    First Name
                  </p>
                  <p className="text-gray-900 font-medium mt-2">{firstName}</p>
                </div>
                <div className="mt-6">
                  <p className="text-gray-400 font-normal text-sm">Last Name</p>
                  <p className="text-gray-900 font-medium mt-2">{lastName}</p>
                </div>
                <div className="mt-6">
                  <p className="text-gray-400 font-normal text-sm">
                    Nationality
                  </p>
                  <p className="text-gray-900 font-medium mt-2">
                    {nationality}
                  </p>
                </div>
                <div className="mt-6">
                  <p className="text-gray-400 font-normal text-sm">
                    National Id
                  </p>
                  <p className="text-gray-900 font-medium mt-2">{nationalId}</p>
                </div>
                {/* </div> */}
                {/* <div className="mt-6 flex"> */}
                <div className="mt-6">
                  <p className="text-gray-400 font-normal text-sm">
                    Birth Date
                  </p>
                  <p className="text-gray-900 font-medium mt-2">
                    {birthDate as string}
                  </p>
                </div>
                <div className="mt-6">
                  <p className="text-gray-400 font-normal text-sm">
                    Passport Number
                  </p>
                  <p className="text-gray-900 font-medium mt-2">
                    {passportNumber}
                  </p>
                </div>
                <div className="mt-6">
                  <p className="text-gray-400 font-normal text-sm">
                    Passport Expiry Date
                  </p>
                  <p className="text-gray-900 font-medium mt-2">
                    {passportExpiryDate as string}
                  </p>
                </div>
              </div>
            </div>
          )
        )}
        {passengersInfo.children.map(
          (
            {
              birthDate,
              firstName,
              gender,
              lastName,
              nationality,
              passportExpiryDate,
              passportNumber,
              nationalId,
            },
            index
          ) => (
            <div className="mt-10" key={nationalId}>
              <p>
                {index + 1}. Children{' '}
                <span className="text-gray-500">
                  ({gender === 1 ? 'Male' : 'Female'}){' '}
                </span>
              </p>

              <div className="mt-8 flex">
                <div className="mt-6">
                  <p className="text-gray-400 font-normal text-sm">
                    First Name
                  </p>
                  <p className="text-gray-900 font-medium mt-2">{firstName}</p>
                </div>
                <div className="mt-6">
                  <p className="text-gray-400 font-normal text-sm">Last Name</p>
                  <p className="text-gray-900 font-medium mt-2">{lastName}</p>
                </div>
                <div className="mt-6">
                  <p className="text-gray-400 font-normal text-sm">
                    Nationality
                  </p>
                  <p className="text-gray-900 font-medium mt-2">
                    {nationality}
                  </p>
                </div>
                <div className="mt-6">
                  <p className="text-gray-400 font-normal text-sm">
                    National Id
                  </p>
                  <p className="text-gray-900 font-medium mt-2">{nationalId}</p>
                </div>
              </div>
              <div className="mt-6 flex">
                <div className="mt-6">
                  <p className="text-gray-400 font-normal text-sm">
                    Birth Date
                  </p>
                  <p className="text-gray-900 font-medium mt-2">
                    {birthDate as string}
                  </p>
                </div>
                <div className="mt-6">
                  <p className="text-gray-400 font-normal text-sm">
                    Passport Number
                  </p>
                  <p className="text-gray-900 font-medium mt-2">
                    {passportNumber}
                  </p>
                </div>
                <div className="mt-6">
                  <p className="text-gray-400 font-normal text-sm">
                    Passport Expiry Date
                  </p>
                  <p className="text-gray-900 font-medium mt-2">
                    {passportExpiryDate as string}
                  </p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </>
  )
}
