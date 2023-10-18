import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import DateObject from 'react-date-object'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import DatePicker from 'react-multi-date-picker'
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useDispatch } from 'react-redux'
import { setInvoiceCode, setPassengersInfo } from '../../../../airportsSlice'
import convertDateObjectFormatToSimpleString from '../../../../helper/date/convertDateObjectFormatToSimpleString'
import { useAppSelector } from '../../../../hooks'
import { usePostAddToCard } from '../../../../hooks/search'
import { PassengerInformationI } from '../../../travelerInformation/PassengerInformation'
import changePassengerInformation from '../../../travelerInformation/changePassengerInformation'
import styles from '../../../../components/travelerInformation/travelerInformation.module.css'
import ConfirmInformation from '../../../travelerInformation/ConfirmInformation'
import { CircularProgress } from '@mui/material'

import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'

const adultInformationSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required !'),
  lastName: yup.string().required('Last Name is required !'),
  nationality: yup.string().required('Nationality is required !'),
  nationalId: yup.string().required('National ID is required !'),
  birthDate: yup.mixed().required('Birth Date is required !'), // Accepts both string and Date
  passportNumber: yup.string().required('Passport Number is required !'),
  passportExpiryDate: yup
    .mixed()
    .required('Passport Expiry Date is required !'), // Accepts both string and Date
  gender: yup.number().required('Gender is required !'),
})

const passengerInformationSchema = yup.object().shape({
  contactInformation: yup.object().shape({
    mobileNumber: yup.string().required('Mobile Number is required !'),
    emailAddress: yup
      .string()
      .email('Invalid email address')
      .required('Email Address is required !'),
  }),
  adults: yup.array().of(adultInformationSchema),
  children: yup.array().of(adultInformationSchema),
})

export default function PassengerInformation() {
  const datePickerRef = useRef(null)

  const { fare, passengersInfo, priceDetailIds } = useAppSelector(
    (state) => state.airportsInfo
  )
  const dispatch = useDispatch()
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PassengerInformationI>({
    defaultValues: {
      contactInformation: { emailAddress: '', mobileNumber: '' },
      adults: [],
      children: [],
    },
    resolver: yupResolver(passengerInformationSchema),
  })

  const { fields: adultsFields, append: adultAppend } =
    useFieldArray<PassengerInformationI>({
      name: 'adults',
      control,
    })

  const { fields: childFields, append: childAppend } =
    useFieldArray<PassengerInformationI>({
      name: 'children',
      control,
    })

  useEffect(() => {
    if (fare?.groupFareI[0]?.quantity) {
      ;[...Array(fare?.groupFareI[0]?.quantity)].map(() => {
        return adultAppend({
          firstName: '',
          lastName: '',
          birthDate: '',
          nationality: '',
          passportExpiryDate: '',
          passportNumber: '',
          nationalId: '',
          gender: 1,
        })
      })
    }
  }, [])

  useEffect(() => {
    if (fare?.groupFareI[1]?.quantity) {
      ;[...Array(fare?.groupFareI[1]?.quantity)].map(() => {
        return childAppend({
          firstName: '',
          lastName: '',
          birthDate: '',
          nationality: '',
          passportExpiryDate: '',
          passportNumber: '',
          nationalId: '',
          gender: 1,
        })
      })
    }
  }, [])

  const { push, asPath } = useRouter()

  const { postAddToCardAction, postAddToCardLoading } = usePostAddToCard({
    onSuccess: ({ invoiceCode }) => {
      dispatch(setInvoiceCode(invoiceCode))
      push('/payment')
    },
  })

  const onConfirm = (data: PassengerInformationI) => {
    console.log(
      '🚀 ~ file: PassengerInformation.tsx:192 ~ onConfirm ~ data:',
      data
    )
    const adultsInfo = changePassengerInformation(
      data.adults
        .map((adult) => ({
          ...adult,
          birthDate: convertDateObjectFormatToSimpleString(
            adult?.birthDate as DateObject
          ),
          passportExpiryDate: convertDateObjectFormatToSimpleString(
            adult?.passportExpiryDate as DateObject
          ),
        }))
        .filter(({ firstName }) => !!firstName)
    )
    const childrenInfo = data?.children.length
      ? changePassengerInformation(
          data.children
            .map((child) => ({
              ...child,
              birthDate: convertDateObjectFormatToSimpleString(
                child?.birthDate as DateObject
              ),
              passportExpiryDate: convertDateObjectFormatToSimpleString(
                child?.passportExpiryDate as DateObject
              ),
            }))
            .filter(({ firstName }) => !!firstName),
          data?.adults.length - 1
        )
      : []
    postAddToCardAction({
      searchId: localStorage.getItem('searchId') as string,
      passengersInfo: {
        emailAddess: data?.contactInformation?.emailAddress,
        telephoneNo: data?.contactInformation?.mobileNumber,
        mobileNo: {
          cellPhoneNumber: parsePhoneNumber(
            data?.contactInformation?.mobileNumber
          )?.nationalNumber as string,
          countryCode: `+${
            parsePhoneNumber(data?.contactInformation?.mobileNumber)
              ?.countryCallingCode as string
          }`,
        },
        passengers: [...adultsInfo, ...childrenInfo],
      },
      priceDetailIds,
    })
  }

  return (
    <div className="mt-9 w-full m-auto">
      <form className="pb-3" onSubmit={handleSubmit(onConfirm)}>
        {asPath.includes('role=preview') ? (
          <ConfirmInformation />
        ) : (
          <>
            <div className="mt-6 bg-white p-5">
              <p className={styles.contactInformation}>Passenger Information</p>
              <div className="">
                {adultsFields.map(({ id }, index) => {
                  return (
                    <div
                      className="py-3 mt-6 bg-gray-50  border border-gray-200 rounded-lg"
                      key={id}
                    >
                      <div className=" items-center">
                        <div className="border-b border-b-gray-200 pb-3 px-4">
                          <span>{index + 1}.</span>
                          <span className="px-1 ">Adult</span>
                        </div>
                      </div>
                      <div className="px-5">
                        <div className="mt-5">
                          <div className="block">
                            <label
                              className={styles.passengerTitles}
                              htmlFor="FirstName"
                            >
                              First Name
                            </label>
                          </div>
                          <input
                            className="w-full border-gray-300 border rounded-md px-4 py-1 mt-2 bg-white"
                            type="text"
                            id="FirstName"
                            {...register(`adults.${index}.firstName` as const)}
                          />
                          <p className="text-red-600 text-xs mt-1">
                            {errors.adults?.[index]?.firstName?.message}
                          </p>
                        </div>
                        <div className="mt-5">
                          <div className="block">
                            <label
                              className={styles.passengerTitles}
                              htmlFor="lastName"
                            >
                              Last Name
                            </label>
                          </div>
                          <input
                            className="w-full border-gray-300 border rounded-md px-4 py-1 mt-2 bg-white"
                            type="text"
                            id="LastName"
                            {...register(`adults.${index}.lastName` as const)}
                          />
                          <p className="text-red-600 text-xs mt-1">
                            {errors.adults?.[index]?.lastName?.message}
                          </p>
                        </div>
                        <div className="mt-4 justify-between flex">
                          <span className="self-center px-2 w-28">
                            Gender :
                          </span>
                          <div>
                            <FormControl component="fieldset">
                              <Controller
                                name={`adults.${index}.gender`}
                                control={control}
                                render={({ field }) => (
                                  <RadioGroup {...field}>
                                    <div>
                                      <FormControlLabel
                                        value={1}
                                        control={<Radio size="small" />}
                                        label="Male"
                                      />
                                      <FormControlLabel
                                        value={2}
                                        control={<Radio size="small" />}
                                        label="Female"
                                      />
                                    </div>
                                  </RadioGroup>
                                )}
                              />
                            </FormControl>
                            <span className="text-red-600 text-xs mt-1 ml-4">
                              {errors.adults?.[index]?.gender?.message}
                            </span>
                          </div>
                        </div>
                        <div className="mt-5">
                          <div className="block">
                            <label
                              className={styles.passengerTitles}
                              htmlFor="nationalId"
                            >
                              National Id
                            </label>
                          </div>
                          <input
                            className="w-full border-gray-300 border rounded-md px-4 py-1 mt-2 bg-white"
                            type="text"
                            id="nationalId"
                            {...register(`adults.${index}.nationalId` as const)}
                          />
                          <p className="text-red-600 text-xs mt-1">
                            {errors.adults?.[index]?.nationalId?.message}
                          </p>
                        </div>
                        <div className="mt-5">
                          <div className="block">
                            <label
                              className={styles.passengerTitles}
                              htmlFor="FirstName"
                            >
                              Nationality
                            </label>
                          </div>
                          <input
                            className="w-full border-gray-300 border rounded-md px-4 py-1 mt-2 bg-white"
                            type="text"
                            id="Nationality"
                            {...register(
                              `adults.${index}.nationality` as const
                            )}
                          />
                          <p className="text-red-600 text-xs mt-1">
                            {errors.adults?.[index]?.nationality?.message}
                          </p>
                        </div>

                        <div className="mt-5">
                          <div className="block">
                            <label
                              className={styles.passengerTitles}
                              htmlFor="BirthDate"
                            >
                              Birth Date
                            </label>
                          </div>
                          <div className="w-full border-gray-300 border rounded-md px-4 py-1 mt-2 bg-white">
                            <Controller
                              name={`adults.${index}.birthDate`}
                              control={control}
                              render={({ field }) => (
                                <DatePicker
                                  {...field}
                                  ref={datePickerRef}
                                  value={field.value}
                                  onChange={(value) => field.onChange(value)}
                                />
                              )}
                            />
                          </div>
                          <p className="text-red-600 text-xs mt-1">
                            {errors.adults?.[index]?.birthDate?.message}
                          </p>
                        </div>
                        <div className="mt-5">
                          <div className="block">
                            <label
                              className={styles.passengerTitles}
                              htmlFor="PassportNumber"
                            >
                              Passport Number
                            </label>
                          </div>
                          <input
                            className="w-full border-gray-300 border rounded-md px-4 py-1 mt-2 bg-white"
                            type="text"
                            id="PassportNumber"
                            {...register(
                              `adults.${index}.passportNumber` as const
                            )}
                          />
                          <p className="text-red-600 text-xs mt-1">
                            {errors.adults?.[index]?.passportNumber?.message}
                          </p>{' '}
                        </div>
                        <div className="mt-5">
                          <div className="block">
                            <label
                              className={styles.passengerTitles}
                              htmlFor="PassportExpiryDate"
                            >
                              Passport Expiry Date
                            </label>
                          </div>
                          <div className="w-full border-gray-300 border rounded-md px-4 py-1 mt-2 bg-white">
                            <Controller
                              name={`adults.${index}.passportExpiryDate`}
                              control={control}
                              render={({ field }) => (
                                <DatePicker
                                  {...field}
                                  ref={datePickerRef}
                                  value={field.value}
                                  onChange={(value) => field.onChange(value)}
                                />
                              )}
                            />
                          </div>
                          <p className="text-red-600 text-xs mt-1">
                            {
                              errors.adults?.[index]?.passportExpiryDate
                                ?.message
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}

                {childFields.map(({ id }, index) => {
                  return (
                    <div
                      className="py-3 mt-6 bg-gray-50  border border-gray-200 rounded-lg"
                      key={id}
                    >
                      <div className=" items-center">
                        <div className="border-b border-b-gray-200 pb-3 px-4">
                          <span>{index + 1}.</span>
                          <span className="px-1 ">Child</span>
                        </div>
                      </div>
                      <div className="px-5">
                        <div className="mt-5">
                          <div className="block">
                            <label
                              className={styles.passengerTitles}
                              htmlFor="FirstName"
                            >
                              First Name
                            </label>
                          </div>
                          <input
                            className="w-full border-gray-300 border rounded-md px-4 py-1 mt-2 bg-white"
                            type="text"
                            id="FirstName"
                            {...register(
                              `children.${index}.firstName` as const
                            )}
                          />
                          <p className="text-red-600 text-xs mt-1">
                            {errors.children?.[index]?.firstName?.message}
                          </p>
                        </div>
                        <div className="mt-5">
                          <div className="block">
                            <label
                              className={styles.passengerTitles}
                              htmlFor="lastName"
                            >
                              Last Name
                            </label>
                          </div>
                          <input
                            className="w-full border-gray-300 border rounded-md px-4 py-1 mt-2 bg-white"
                            type="text"
                            id="LastName"
                            {...register(`children.${index}.lastName` as const)}
                          />
                          <p className="text-red-600 text-xs mt-1">
                            {errors.children?.[index]?.lastName?.message}
                          </p>
                        </div>
                        <div className="mt-4 justify-between flex">
                          <span className="self-center px-2 w-28">
                            Gender :
                          </span>
                          <div>
                            <FormControl component="fieldset">
                              <Controller
                                name={`children.${index}.gender`}
                                control={control}
                                render={({ field }) => (
                                  <RadioGroup {...field}>
                                    <div>
                                      <FormControlLabel
                                        value={1}
                                        control={<Radio size="small" />}
                                        label="Male"
                                      />
                                      <FormControlLabel
                                        value={2}
                                        control={<Radio size="small" />}
                                        label="Female"
                                      />
                                    </div>
                                  </RadioGroup>
                                )}
                              />
                            </FormControl>
                            <span className="text-red-600 text-xs mt-1 ml-4">
                              {errors.children?.[index]?.gender?.message}
                            </span>
                          </div>
                        </div>
                        <div className="mt-5">
                          <div className="block">
                            <label
                              className={styles.passengerTitles}
                              htmlFor="nationalId"
                            >
                              National Id
                            </label>
                          </div>
                          <input
                            className="w-full border-gray-300 border rounded-md px-4 py-1 mt-2 bg-white"
                            type="text"
                            id="nationalId"
                            {...register(
                              `children.${index}.nationalId` as const
                            )}
                          />
                          <p className="text-red-600 text-xs mt-1">
                            {errors.children?.[index]?.nationalId?.message}
                          </p>
                        </div>
                        <div className="mt-5">
                          <div className="block">
                            <label
                              className={styles.passengerTitles}
                              htmlFor="FirstName"
                            >
                              Nationality
                            </label>
                          </div>
                          <input
                            className="w-full border-gray-300 border rounded-md px-4 py-1 mt-2 bg-white"
                            type="text"
                            id="Nationality"
                            {...register(
                              `children.${index}.nationality` as const
                            )}
                          />
                          <p className="text-red-600 text-xs mt-1">
                            {errors.children?.[index]?.nationality?.message}
                          </p>
                        </div>

                        <div className="mt-5">
                          <div className="block">
                            <label
                              className={styles.passengerTitles}
                              htmlFor="BirthDate"
                            >
                              Birth Date
                            </label>
                          </div>
                          <div className="w-full border-gray-300 border rounded-md px-4 py-1 mt-2 bg-white">
                            <Controller
                              name={`children.${index}.birthDate`}
                              control={control}
                              render={({ field }) => (
                                <DatePicker
                                  {...field}
                                  ref={datePickerRef}
                                  value={field.value}
                                  onChange={(value) => field.onChange(value)}
                                />
                              )}
                            />
                          </div>
                          <p className="text-red-600 text-xs mt-1">
                            {errors.children?.[index]?.birthDate?.message}
                          </p>
                        </div>
                        <div className="mt-5">
                          <div className="block">
                            <label
                              className={styles.passengerTitles}
                              htmlFor="PassportNumber"
                            >
                              Passport Number
                            </label>
                          </div>
                          <input
                            className="w-full border-gray-300 border rounded-md px-4 py-1 mt-2 bg-white"
                            type="text"
                            id="PassportNumber"
                            {...register(
                              `children.${index}.passportNumber` as const
                            )}
                          />
                          <p className="text-red-600 text-xs mt-1">
                            {errors.children?.[index]?.passportNumber?.message}
                          </p>{' '}
                        </div>
                        <div className="mt-5">
                          <div className="block">
                            <label
                              className={styles.passengerTitles}
                              htmlFor="PassportExpiryDate"
                            >
                              Passport Expiry Date
                            </label>
                          </div>
                          <div className="w-full border-gray-300 border rounded-md px-4 py-1 mt-2 bg-white">
                            <Controller
                              name={`children.${index}.passportExpiryDate`}
                              control={control}
                              render={({ field }) => (
                                <DatePicker
                                  {...field}
                                  ref={datePickerRef}
                                  value={field.value}
                                  onChange={(value) => field.onChange(value)}
                                />
                              )}
                            />
                          </div>
                          <p className="text-red-600 text-xs mt-1">
                            {
                              errors.children?.[index]?.passportExpiryDate
                                ?.message
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="bg-white p-5">
              <p className={styles.contactInformation}>Contact Information</p>
              <div className="pt-5">
                <div>
                  <label className="font-normal text-gray-500 text-sm">
                    Mobile Number
                  </label>
                  <Controller
                    name="contactInformation.mobileNumber"
                    control={control}
                    render={({ field }) => (
                      <>
                        <PhoneInput
                          placeholder="Enter phone number"
                          className="border border-gray-300 rounded-lg p-2 mt-2"
                          defaultCountry="TR"
                          onCountryChange={(country) => console.log(country)}
                          {...field}
                        />
                        <span className="text-red-600 text-xs w-full text-center">
                          {errors.contactInformation?.mobileNumber?.message}
                        </span>
                      </>
                    )}
                  />
                </div>
                <div className="mt-6">
                  <p className="font-normal text-gray-500 text-sm">
                    Email Address
                  </p>
                  <input
                    className="border border-gray-300 rounded-lg p-2 mt-2 w-full"
                    type="email"
                    placeholder="Enter Email Address"
                    {...register(`contactInformation.emailAddress`)}
                  />
                  <span className="text-red-600 text-xs w-full text-center">
                    {errors.contactInformation?.emailAddress?.message}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        <div>
          <p className="font-normal text-xs my-8 text-center">
            By booking you confirm that the names on the booking match those on
            the passports of those travelling.
          </p>
          <div className="text-center pb-5">
            <button
              className="w-11/12 bg-[#F00] py-4 text-white rounded-lg"
              type="submit"
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
