import { yupResolver } from '@hookform/resolvers/yup'
import { Box, CircularProgress, MenuItem, Select } from '@mui/material'
import clsx from 'clsx'
import { useState } from 'react'
import DateObject from 'react-date-object'
import { Controller, useForm } from 'react-hook-form'
import DatePicker from 'react-multi-date-picker'
import PhoneInputWithCountrySelect from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import * as yup from 'yup'
import { usePostPersonalInformation } from '../../../hooks/profile'
import { PostPersonalInformationArgsI } from '../../../services/profile/postPersonalInformation'

const userInformationSchema = yup.object<PersonalInfoI>().shape({
  birthDate: yup.string().required('Date of birth is required !'),
  emailAddress: yup
    .string()
    .email('Invalid email address')
    .required('Email Address is required !'),
  firstName: yup.string().required('First Name is required !'),
  lastName: yup.string().required('Last Name is required !'),
  nationality: yup.string().required('Nationality is required !'),
  mobileNo: yup.string().required('Mobile Number is required !'),
  gender: yup.number().required('Gender is required !'),
})

export interface PersonalInfoI
  extends Omit<PostPersonalInformationArgsI, 'brithDate'> {
  birthDate: DateObject
}

export interface PersonalInformationI {
  name: string
  lastName: string
  email: string
  phoneNumber: string
  dateOfBirth: Date
  nationality: string
  gender: number
  profileInfoAction: () => {}
}

export default function PersonalInformation({
  dateOfBirth,
  email,
  gender = 0,
  lastName,
  name,
  nationality,
  phoneNumber,
  profileInfoAction,
}: PersonalInformationI) {
  const [editMode, setEditMode] = useState(false)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoI>({
    defaultValues: {
      birthDate: String(dateOfBirth).slice(0, 10),
      emailAddress: email,
      firstName: name,
      lastName,
      nationality,
      mobileNo: phoneNumber,
      gender,
    },
    //@ts-ignore
    resolver: yupResolver(userInformationSchema),
  })

  const { postPersonalInformationAction, postPersonalInformationLoading } =
    usePostPersonalInformation({
      onSuccess: () => {
        setEditMode(false)
        profileInfoAction()
      },
    })

  const onSave = (data: PersonalInfoI) => {
    postPersonalInformationAction({
      ...data,
      brithDate:
        typeof data.birthDate === 'string'
          ? //@ts-ignore
            data.birthDate.replaceAll('/', '-')
          : `${data.birthDate?.year}-${data.birthDate?.month?.number}-${
              data.birthDate?.day < 10
                ? `0${data.birthDate?.day}`
                : data.birthDate?.day
            }`,
    })
  }

  const onCancel = () => {
    setEditMode(false)
  }

  return (
    <div>
      <p className="font-semibold text-lg">Personal Information</p>
      <span className="text-gray-400 mt-2 text-sm">
        Here you can change personal information details
      </span>
      <hr className="mt-6" />
      {!editMode ? (
        <>
          <div className="py-5 px-8 flex justify-between">
            <p className="font-semibold text-sm w-1/3">Name</p>
            <p className="text-gray-500 w-2/3">
              {name} {lastName}
            </p>
            <div className="w-1/4 flex justify-end">
              <p
                className="text-blue-400 cursor-pointer w-fit"
                onClick={() => setEditMode(true)}
              >
                Edit
              </p>
            </div>
          </div>
          <div className="py-5 px-8 flex justify-between border-t border-t-gray-200">
            <p className="font-semibold text-sm w-1/3">Email address</p>
            <div className="w-2/3">
              <p className="text-gray-500">{email}</p>
              <p className="text-gray-400 mt-4">
                This is the email address you use to sign in.
                <br />
                It's also where we send your booking confirmations.
              </p>
            </div>
            <div className="w-1/4 flex justify-end">
              <p
                className="text-blue-400 cursor-pointer w-fit"
                onClick={() => setEditMode(true)}
              >
                Edit
              </p>
            </div>
          </div>
          <div className="py-5 px-8 flex justify-between border-t border-t-gray-200">
            <p className="font-semibold text-sm w-1/3">Phone number</p>
            <div className="w-2/3">
              <p className="text-gray-500">{phoneNumber}</p>
              <p className="text-gray-400 mt-4">
                Properties you book can use this number to contact you. you can
                also use it to sign in.
              </p>
            </div>
            <div className="w-1/4 flex justify-end">
              <p
                className="text-blue-400 cursor-pointer w-fit"
                onClick={() => setEditMode(true)}
              >
                Edit
              </p>
            </div>
          </div>
          <div className="py-5 px-8 flex justify-between border-t border-t-gray-200">
            <p className="font-semibold text-sm w-1/3">Date of birth</p>
            <div className="w-2/3">
              <p className="text-gray-500">
                {String(dateOfBirth).slice(0, 10)}
              </p>
            </div>
            <div className="w-1/4 flex justify-end">
              <p
                className="text-blue-400 cursor-pointer w-fit"
                onClick={() => setEditMode(true)}
              >
                Edit
              </p>
            </div>
          </div>
          <div className="py-5 px-8 flex justify-between border-t border-t-gray-200">
            <p className="font-semibold text-sm w-1/3">Nationality</p>
            <div className="w-2/3">
              <p className="text-gray-500">{nationality}</p>
            </div>
            <div className="w-1/4 flex justify-end">
              <p
                className="text-blue-400 cursor-pointer w-fit"
                onClick={() => setEditMode(true)}
              >
                Edit
              </p>
            </div>
          </div>
          <div className="py-5 px-8 flex justify-between border-t border-t-gray-200">
            <p className="font-semibold text-sm w-1/3">Gender</p>
            <div className="w-2/3">
              <p className="text-gray-500">{gender ? 'Male' : 'Female'}</p>
            </div>
            <div className="w-1/4 flex justify-end">
              <p
                className="text-blue-400 cursor-pointer w-fit"
                onClick={() => setEditMode(true)}
              >
                Edit
              </p>
            </div>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSave)}>
          <div className="py-5 px-8 flex justify-between">
            <p className="font-semibold text-sm w-1/3">Name</p>
            <div className="w-2/3">
              <p className="text-sm mt-2">First Name</p>
              <input
                className="border border-gray-300 py-1.5 px-2 rounded-lg mt-2 w-60"
                {...register('firstName')}
              />
              <p className="font-extralight text-xs text-red-500 mt-0.5">
                {errors.firstName?.message}
              </p>
              <p className="text-sm mt-2">Last Name</p>
              <input
                className="border border-gray-300 py-1.5 px-2 rounded-lg mt-2 w-60"
                {...register('lastName')}
              />
              <p className="font-extralight text-xs text-red-500 mt-0.5">
                {errors.lastName?.message}
              </p>
            </div>
            <div className="w-1/4 flex justify-end">
              <p className="text-blue-400 cursor-pointer w-fit"></p>
            </div>
          </div>
          <div className="py-5 px-8 flex justify-between border-t border-t-gray-200">
            <p className="font-semibold text-sm w-1/3">Email address</p>
            <div className="w-2/3">
              <p className="text-sm mt-2">Your email address</p>
              <input
                className="border border-gray-300 py-1.5 px-2 rounded-lg mt-2 w-60"
                {...register('emailAddress')}
              />
              <p className="font-extralight text-xs text-red-500 mt-0.5">
                {errors.emailAddress?.message}
              </p>
            </div>
            <div className="w-1/4 flex justify-end">
              <p className="text-blue-400 cursor-pointer w-fit"></p>
            </div>
          </div>
          <div className="py-5 px-8 flex justify-between border-t border-t-gray-200">
            <p className="font-semibold text-sm w-1/3">Phone number</p>
            <div className="w-2/3">
              <label className="font-normal text-gray-500 text-sm">
                Mobile Number
              </label>
              <Controller
                name="mobileNo"
                control={control}
                render={({ field }) => (
                  <>
                    <PhoneInputWithCountrySelect
                      placeholder="Enter phone number"
                      className={clsx(
                        'w-60 rounded-lg border border-gray-300 p-2 mt-2 outline-none'
                        //   {
                        //     'border border-red-600':
                        //       errors.contactInformation?.mobileNumber?.message,
                        //   }
                      )}
                      defaultCountry="TR"
                      {...field}
                    />
                    <p className="font-extralight text-xs text-red-500 mt-0.5">
                      {errors.mobileNo?.message}
                    </p>
                  </>
                )}
              />
            </div>

            <div className="w-1/4 flex justify-end">
              <p className="text-blue-400 cursor-pointer w-fit"></p>
            </div>
          </div>
          <div className="py-5 px-8 flex justify-between border-t border-t-gray-200">
            <p className="font-semibold text-sm w-1/3">Date of birth</p>
            <div className="w-2/3">
              <Box
                sx={{
                  '.rmdp-input': {
                    textAlign: 'center',
                    outline: 'none',
                    fontSize: '500',
                  },
                  border: '1px solid #d1d5db',
                  width: '240px',
                  borderRadius: '8px',
                  padding: '6px 0px',
                  textAlign: 'center',
                }}
              >
                <Controller
                  control={control}
                  name="birthDate"
                  render={({ field }) => (
                    <DatePicker
                      className=" border border-gray-200 cursor-pointer"
                      onChange={(date) => field.onChange(date)}
                      value={field.value}
                    />
                  )}
                />
              </Box>
              <p className="font-extralight text-xs text-red-500 mt-0.5">
                {errors.birthDate?.message}
              </p>
            </div>
            <div className="w-1/4 flex justify-end">
              <p className="text-blue-400 cursor-pointer w-fit"></p>
            </div>
          </div>
          <div className="py-5 px-8 flex justify-between border-t border-t-gray-200">
            <p className="font-semibold text-sm w-1/3">Nationality</p>
            <div className="w-2/3">
              <p className="text-sm mt-2">Nationality</p>
              <input
                className="border border-gray-300 py-1.5 px-2 rounded-lg mt-2 w-60"
                {...register('nationality')}
              />{' '}
              <p className="font-extralight text-xs text-red-500 mt-0.5">
                {errors.nationality?.message}
              </p>
            </div>
            <div className="w-1/4 flex justify-end">
              <p className="text-blue-400 cursor-pointer w-fit"></p>
            </div>
          </div>
          <div className="py-5 px-8 flex justify-between border-t border-t-gray-200">
            <p className="font-semibold text-sm w-1/3">Gender</p>
            <div className="w-2/3">
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Select
                    defaultValue={0}
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                    className="h-10 w-60 "
                  >
                    <MenuItem value={0}>Male</MenuItem>
                    <MenuItem value={1}>Female</MenuItem>
                  </Select>
                )}
                name="gender"
              />
            </div>
            <div className="w-1/4 flex justify-end">
              <p className="text-blue-400 cursor-pointer w-fit"></p>
            </div>
          </div>
          <div className="flex justify-end mt-5 border-t border-t-gray-200 pt-4 gap-4">
            {postPersonalInformationLoading && <CircularProgress />}
            {!postPersonalInformationLoading && (
              <>
                <button
                  className="w-20 py-2 bg-blue-400 text-white rounded-lg"
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="w-20 py-2 bg-white-400 border border-gray-300 rounded-lg"
                  onClick={onCancel}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </form>
      )}
    </div>
  )
}
