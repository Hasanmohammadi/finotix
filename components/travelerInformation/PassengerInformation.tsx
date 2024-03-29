import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import DateObject from 'react-date-object'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import DatePicker from 'react-multi-date-picker'
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useDispatch } from 'react-redux'
import { setInvoiceCode } from '../../airportsSlice'
import convertDateObjectFormatToSimpleString from '../../helper/date/convertDateObjectFormatToSimpleString'
import { useAppSelector } from '../../hooks'
import { usePostAddToCard } from '../../hooks/search'
import ConfirmInformation from './ConfirmInformation'
import changePassengerInformation from './changePassengerInformation'
import styles from './travelerInformation.module.css'

import { yupResolver } from '@hookform/resolvers/yup'

import { Modal } from '@material-ui/core'
import { Box, CircularProgress } from '@mui/material'
import Cookies from 'js-cookie'
import * as yup from 'yup'
import SingInUser from '../../components/singIn/SingInUser'
import useGetCountry from '../../hooks/country'
import { useGetProfileInformation } from '../../hooks/profile'
import SelectSearch from '../SelectSearch'

const currentDate = new Date()

currentDate.setDate(currentDate.getDate() + 1)

const tomorrowDate = currentDate.toISOString().split('T')[0]

const adultInformationSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required !'),
  lastName: yup.string().required('Last Name is required !'),
  nationality: yup
    .object()
    .shape({
      id: yup.string(),
      label: yup.string(),
      isCity: yup.boolean(),
    })
    .required('Nationality is required !')
    .typeError('Search Country Name'),
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

export interface AdultInformationI {
  firstName: string
  lastName: string
  nationality: string
  nationalId: string
  birthDate: DateObject | string
  passportNumber: string
  passportExpiryDate: DateObject | string
  gender: number
}

interface ChildInformationI extends AdultInformationI {}

export interface PassengerInformationI {
  contactInformation: {
    mobileNumber: string
    emailAddress: string
  }
  adults: AdultInformationI[]
  children: ChildInformationI[]
}

const PassengerInformation = () => {
  const datePickerRef = useRef(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const { fare, priceDetailIds } = useAppSelector((state) => state.airportsInfo)
  const dispatch = useDispatch()

  const { getProfileInfoData, profileInfoAction } = useGetProfileInformation()

  useEffect(() => {
    profileInfoAction()
  }, [Cookies.get('userTokenFinotix')])

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PassengerInformationI>({
    defaultValues: {
      contactInformation: {
        emailAddress: getProfileInfoData?.emailAddress,
        mobileNumber: getProfileInfoData?.mobileNo,
      },
      adults: [],
      children: [],
    },
    //@ts-ignore
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
    if (fare?.groupFareI[1]?.quantity) {
      ;[...Array(fare?.groupFareI[1]?.quantity)].map(() => {
        return childAppend({
          firstName: '',
          lastName: '',
          birthDate: '2012-01-01',
          nationality: '',
          passportExpiryDate: tomorrowDate,
          passportNumber: '',
          nationalId: '',
          gender: 1,
        })
      })
    }
  }, [])

  useEffect(() => {
    if (fare?.groupFareI[0]?.quantity) {
      ;[...Array(fare?.groupFareI[0]?.quantity)].map(() => {
        return adultAppend({
          firstName: '',
          lastName: '',
          birthDate: '2000-01-01',
          nationality: '',
          passportExpiryDate: tomorrowDate,
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
    if (Cookies.get('userTokenFinotix')) {
      const adultsInfo = changePassengerInformation(
        data.adults
          .map((adult) => ({
            ...adult,
            birthDate:
              typeof adult?.birthDate === 'string'
                ? adult?.birthDate
                : convertDateObjectFormatToSimpleString(
                    adult?.birthDate as DateObject
                  ),
            passportExpiryDate:
              typeof adult?.passportExpiryDate === 'string'
                ? adult?.passportExpiryDate
                : convertDateObjectFormatToSimpleString(
                    adult?.passportExpiryDate as DateObject
                  ),
          }))
          .filter(({ firstName }) => !!firstName),
        'adult'
      )
      const childrenInfo = data?.children.length
        ? changePassengerInformation(
            data.children
              .map((child) => ({
                ...child,
                birthDate:
                  typeof child?.birthDate === 'string'
                    ? child?.birthDate
                    : convertDateObjectFormatToSimpleString(
                        child?.birthDate as DateObject
                      ),
                passportExpiryDate:
                  typeof child?.passportExpiryDate === 'string'
                    ? child?.passportExpiryDate
                    : convertDateObjectFormatToSimpleString(
                        child?.passportExpiryDate as DateObject
                      ),
              }))
              .filter(({ firstName }) => !!firstName),
            'child'
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
    } else {
      setModalIsOpen(true)
    }
  }

  const [adultCountrySearched, setAdultCountrySearched] = useState<string>('')

  const { countriesLoading, getCountriesData } = useGetCountry({
    count: 10,
    name: adultCountrySearched,
    form: 'adultPassengerCountry',
  })

  return (
    <form className="pb-3" onSubmit={handleSubmit(onConfirm)}>
      {asPath.includes('role=preview') ? (
        <ConfirmInformation />
      ) : (
        <>
          <div className={styles.whiteBox}>
            <p className={styles.contactInformation}>Travelers Information</p>
            {adultsFields.map(({ id }, index) => {
              return (
                <div className="pb-3 mt-6" key={id}>
                  <div className="flex items-center">
                    <div>
                      <span>{index + 1}.</span>
                      <span className="px-1">Adult</span>
                    </div>
                    <div>
                      <div className="ml-4 flex items-center">
                        <div className="block">
                          <span className="text-red-600 text-xs mt-1 ml-4">
                            {errors.adults?.[index]?.gender?.message}
                          </span>
                        </div>
                        <div className="flex">
                          <div>
                            <FormControl component="fieldset">
                              <Controller
                                name={`adults.${index}.gender`}
                                control={control}
                                render={({ field }) => (
                                  <RadioGroup {...field}>
                                    <div className="flex">
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4  mt-1">
                    <div>
                      <div className="block">
                        <label
                          className={styles.passengerTitles}
                          htmlFor="FirstName"
                        >
                          First Name
                        </label>
                      </div>
                      <input
                        className={clsx(
                          'w-10/12 rounded-lg border border-gray-400 py-1 px-3 outline-none',
                          {
                            'border border-red-600':
                              errors.adults?.[index]?.firstName?.message,
                          }
                        )}
                        type="text"
                        id="FirstName"
                        {...register(`adults.${index}.firstName` as const)}
                      />
                      <p className="text-red-600 text-xs mt-1">
                        {errors.adults?.[index]?.firstName?.message}
                      </p>
                    </div>
                    <div>
                      <div className="block">
                        <label
                          className={styles.passengerTitles}
                          htmlFor="lastName"
                        >
                          Last Name
                        </label>
                      </div>
                      <input
                        className={clsx(
                          'w-10/12 rounded-lg border border-gray-400 py-1 px-3 outline-none',
                          {
                            'border border-red-600':
                              errors.adults?.[index]?.lastName?.message,
                          }
                        )}
                        type="text"
                        id="LastName"
                        {...register(`adults.${index}.lastName` as const)}
                      />
                      <p className="text-red-600 text-xs mt-1">
                        {errors.adults?.[index]?.lastName?.message}
                      </p>
                    </div>
                    <div>
                      <div className="block">
                        <label
                          className={styles.passengerTitles}
                          htmlFor="birthDate"
                        >
                          Birth Date
                        </label>
                      </div>
                      <div>
                        <div
                          className={clsx(
                            'w-10/12 rounded-lg border border-gray-400 py-1 px-3 outline-none',
                            {
                              'border border-red-600':
                                errors.adults?.[index]?.birthDate?.message,
                            }
                          )}
                        >
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
                    </div>
                    <div>
                      <div className="block">
                        <label
                          className={styles.passengerTitles}
                          htmlFor="FirstName"
                        >
                          Nationality
                        </label>
                      </div>
                      <Box
                        sx={{
                          '.MuiOutlinedInput-root': {
                            height: '32px',
                            padding: '0',
                            marginTop: '-2px',
                          },
                          '.MuiButtonBase-root': {
                            marginTop: '2px',
                          },
                        }}
                      >
                        <SelectSearch
                          loading={countriesLoading}
                          className={clsx(
                            'lg:w-10/12 w-full lg:h-8 rounded-lg border border-gray-400 outline-none mt-1',
                            {
                              'border border-red-600':
                                errors.adults?.[index]?.nationality?.message,
                            }
                          )}
                          control={control}
                          name={`adults.${index}.nationality`}
                          textSearched={adultCountrySearched}
                          setTextSearched={setAdultCountrySearched}
                          items={getCountriesData?.map(
                            ({ title, countryCode }) => ({
                              iataCode: countryCode,
                              isCity: false,
                              label: title,
                            })
                          )}
                        />
                      </Box>
                      <p className="text-red-600 text-xs mt-1">
                        {errors.adults?.[index]?.nationality?.message}
                      </p>
                    </div>
                    <div>
                      <div className="block">
                        <label
                          className={styles.passengerTitles}
                          htmlFor="lastName"
                        >
                          National Id
                        </label>
                      </div>
                      <input
                        className={clsx(
                          'w-10/12 rounded-lg border border-gray-400 py-1 px-3 outline-none',
                          {
                            'border border-red-600':
                              errors.adults?.[index]?.nationalId?.message,
                          }
                        )}
                        type="text"
                        id="nationalId"
                        {...register(`adults.${index}.nationalId` as const)}
                      />
                      <p className="text-red-600 text-xs mt-1">
                        {errors.adults?.[index]?.nationalId?.message}
                      </p>
                    </div>

                    <div>
                      <div className="block">
                        <label
                          className={styles.passengerTitles}
                          htmlFor="PassportNumber"
                        >
                          Passport Number
                        </label>
                      </div>
                      <input
                        className={clsx(
                          'w-10/12 rounded-lg border border-gray-400 py-1 px-3 outline-none',
                          {
                            'border border-red-600':
                              errors.adults?.[index]?.passportNumber?.message,
                          }
                        )}
                        type="text"
                        id="PassportNumber"
                        {...register(`adults.${index}.passportNumber` as const)}
                      />
                      <p className="text-red-600 text-xs mt-1">
                        {errors.adults?.[index]?.passportNumber?.message}
                      </p>
                    </div>
                    <div>
                      <div className="block">
                        <label
                          className={styles.passengerTitles}
                          htmlFor="PassportExpiryDate"
                        >
                          Passport Expiry Date
                        </label>
                      </div>
                      <div>
                        <div
                          className={clsx(
                            'w-10/12 rounded-lg border border-gray-400 py-1 px-3 outline-none',
                            {
                              'border border-red-600':
                                errors.adults?.[index]?.passportExpiryDate
                                  ?.message,
                            }
                          )}
                        >
                          <Controller
                            name={`adults.${index}.passportExpiryDate`}
                            control={control}
                            render={({ field }) => (
                              <DatePicker
                                {...field}
                                minDate={tomorrowDate}
                                ref={datePickerRef}
                                value={field.value}
                                onChange={(value) => field.onChange(value)}
                              />
                            )}
                          />
                        </div>
                        <p className="text-red-600 text-xs mt-1">
                          {errors.adults?.[index]?.passportExpiryDate?.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            {childFields.map(({ id }, index) => {
              return (
                <div className="pb-3 mt-6" key={id}>
                  <div className="flex items-center">
                    <div>
                      <span>{index + 1}.</span>
                      <span className="px-1">Child</span>
                    </div>
                    <div className="flex items-center ml-5">
                      <div className="block">
                        <span className="text-red-600 text-xs mt-1 ml-4">
                          {errors.children?.[index]?.gender?.message}
                        </span>
                      </div>
                      <div className="px-10 flex">
                        <div>
                          <FormControl component="fieldset">
                            <Controller
                              name={`children.${index}.gender`}
                              control={control}
                              render={({ field }) => (
                                <RadioGroup {...field}>
                                  <div className="flex">
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
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 ">
                    <div>
                      <div className="block">
                        <label
                          className={styles.passengerTitles}
                          htmlFor="FirstName"
                        >
                          First Name
                        </label>
                      </div>
                      <input
                        className={clsx(
                          'w-10/12 rounded-lg border border-gray-400 py-1 px-3 outline-none',
                          {
                            'border border-red-600':
                              errors.children?.[index]?.firstName?.message,
                          }
                        )}
                        type="text"
                        id="FirstName"
                        {...register(`children.${index}.firstName` as const)}
                      />
                      <p className="text-red-600 text-xs mt-1">
                        {errors.children?.[index]?.firstName?.message}
                      </p>
                    </div>
                    <div>
                      <div className="block">
                        <label
                          className={styles.passengerTitles}
                          htmlFor="lastName"
                        >
                          Last Name
                        </label>
                      </div>
                      <input
                        className={clsx(
                          'w-10/12 rounded-lg border border-gray-400 py-1 px-3 outline-none',
                          {
                            'border border-red-600':
                              errors.children?.[index]?.lastName?.message,
                          }
                        )}
                        type="text"
                        id="LastName"
                        {...register(`children.${index}.lastName` as const)}
                      />
                      <p className="text-red-600 text-xs mt-1">
                        {errors.children?.[index]?.lastName?.message}
                      </p>
                    </div>
                    <div>
                      <div className="block">
                        <label
                          className={styles.passengerTitles}
                          htmlFor="birthDate"
                        >
                          Birth Date
                        </label>
                      </div>
                      <div>
                        <div
                          className={clsx(
                            'w-10/12 rounded-lg border border-gray-400 py-1 px-3 outline-none',
                            {
                              'border border-red-600':
                                errors.children?.[index]?.birthDate?.message,
                            }
                          )}
                        >
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
                    </div>
                    <div>
                      <div className="block">
                        <label
                          className={styles.passengerTitles}
                          htmlFor="FirstName"
                        >
                          Nationality
                        </label>
                      </div>
                      <Box
                        sx={{
                          '.MuiOutlinedInput-root': {
                            height: '32px',
                            padding: '0',
                            marginTop: '-2px',
                          },
                          '.MuiButtonBase-root': {
                            marginTop: '2px',
                          },
                        }}
                      >
                        <SelectSearch
                          loading={countriesLoading}
                          className={clsx(
                            'lg:w-10/12 w-full lg:h-8 rounded-lg border border-gray-400 outline-none mt-1',
                            {
                              'border border-red-600':
                                errors.children?.[index]?.nationality?.message,
                            }
                          )}
                          control={control}
                          name={`children.${index}.nationality`}
                          textSearched={adultCountrySearched}
                          setTextSearched={setAdultCountrySearched}
                          items={getCountriesData?.map(
                            ({ title, countryCode }) => ({
                              iataCode: countryCode,
                              isCity: false,
                              label: title,
                            })
                          )}
                        />
                      </Box>
                      <p className="text-red-600 text-xs mt-1">
                        {errors.children?.[index]?.nationality?.message}
                      </p>
                    </div>
                    <div>
                      <div className="block">
                        <label
                          className={styles.passengerTitles}
                          htmlFor="lastName"
                        >
                          National Id
                        </label>
                      </div>
                      <input
                        className={clsx(
                          'w-10/12 rounded-lg border border-gray-400 py-1 px-3 outline-none',
                          {
                            'border border-red-600':
                              errors.children?.[index]?.nationalId?.message,
                          }
                        )}
                        type="text"
                        id="nationalId"
                        {...register(`children.${index}.nationalId` as const)}
                      />
                      <p className="text-red-600 text-xs mt-1">
                        {errors.children?.[index]?.nationalId?.message}
                      </p>
                    </div>

                    <div>
                      <div className="block">
                        <label
                          className={styles.passengerTitles}
                          htmlFor="PassportNumber"
                        >
                          Passport Number
                        </label>
                      </div>
                      <input
                        className={clsx(
                          'w-10/12 rounded-lg border border-gray-400 py-1 px-3 outline-none',
                          {
                            'border border-red-600':
                              errors.children?.[index]?.passportNumber?.message,
                          }
                        )}
                        type="text"
                        id="PassportNumber"
                        {...register(
                          `children.${index}.passportNumber` as const
                        )}
                      />
                      <p className="text-red-600 text-xs mt-1">
                        {errors.children?.[index]?.passportNumber?.message}
                      </p>
                    </div>
                    <div>
                      <div className="block">
                        <label
                          className={styles.passengerTitles}
                          htmlFor="PassportExpiryDate"
                        >
                          Passport Expiry Date
                        </label>
                      </div>
                      <div>
                        <div
                          className={clsx(
                            'w-10/12 rounded-lg border border-gray-400 py-1 px-3 outline-none',
                            {
                              'border border-red-600':
                                errors.children?.[index]?.birthDate?.message,
                            }
                          )}
                        >
                          <Controller
                            name={`children.${index}.passportExpiryDate`}
                            control={control}
                            render={({ field }) => (
                              <DatePicker
                                {...field}
                                ref={datePickerRef}
                                value={field.value}
                                onChange={(value) => field.onChange(value)}
                                minDate={tomorrowDate}
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
                </div>
              )
            })}
          </div>
          <div className="mt-6 bg-white py-5 px-4 rounded-lg">
            <p className={styles.contactInformation}>Contact Information</p>
            <div className="flex gap-5 pt-5">
              <div className="w-1/3">
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
                        className={clsx(
                          'w-10/12 rounded-lg border border-gray-400 p-2 mt-2 outline-none',
                          {
                            'border border-red-600':
                              errors.contactInformation?.mobileNumber?.message,
                          }
                        )}
                        defaultCountry="TR"
                        {...field}
                      />
                      <span className="text-red-600 text-xs w-full text-center">
                        {errors.contactInformation?.mobileNumber?.message}
                      </span>
                    </>
                  )}
                />
              </div>
              <div className="w-1/3">
                <p className="font-normal text-gray-500 text-sm">
                  Email Address
                </p>
                <input
                  className={clsx(
                    'w-10/12 rounded-lg border border-gray-400 p-2 mt-3 outline-none',
                    {
                      'border border-red-600':
                        errors.contactInformation?.mobileNumber?.message,
                    }
                  )}
                  type="email"
                  placeholder="Enter Email Address"
                  {...register('contactInformation.emailAddress')}
                />

                <p className="text-red-600 text-xs w-full mt-1">
                  {errors.contactInformation?.emailAddress?.message}
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      <div>
        <p className={styles.confirmBookingText}>
          By booking you confirm that the names on the booking match those on
          the passports of those travelling.
        </p>
        <div className="text-center pb-5">
          {postAddToCardLoading ? (
            <CircularProgress />
          ) : (
            <button className={styles.continueBtn} type="submit">
              Continue
            </button>
          )}
        </div>
      </div>
      <Modal
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        className="flex"
      >
        <div className="m-auto bg-white rounded-lg p-6">
          <SingInUser inModal setModalIsOpen={setModalIsOpen} />
        </div>
      </Modal>
    </form>
  )
}

export default PassengerInformation
