import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { usePostChangePassword } from '../../../hooks/profile'
import { CircularProgress } from '@mui/material'
import Link from 'next/link'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export interface SecurityI {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export const userSecuritySchema = yup.object().shape({
  oldPassword: yup
    .string()
    .required('Old Password is required !')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])/,
      'Password must have at least one uppercase and one lowercase letter'
    )
    .matches(
      /[,.\/*$%#]/,
      'Password must contain at least one symbol like ,./*$%#'
    ),
  newPassword: yup
    .string()
    .required('New Password is required !')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])/,
      'Password must have at least one uppercase and one lowercase letter'
    )
    .matches(
      /[,.\/*$%#]/,
      'Password must contain at least one symbol like ,./*$%#'
    ),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required !')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])/,
      'Password must have at least one uppercase and one lowercase letter'
    )
    .matches(
      /[,.\/*$%#]/,
      'Password must contain at least one symbol like ,./*$%#'
    ),
})

export default function Security({ userId }: { userId: string }) {
  const [isEdit, setIsEdit] = useState(false)
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<SecurityI>({
    resolver: yupResolver(userSecuritySchema),
  })

  const { confirmPassword, newPassword } = watch()
  const { postChangePasswordAction, postChangePasswordLoading } =
    usePostChangePassword({
      onSuccess: () => {
        setIsEdit(false)
      },
    })

  const onSave = (data: SecurityI) => {
    if (newPassword !== confirmPassword) {
      toast.error("your new password & confirm password aren't equal")
    } else {
      postChangePasswordAction({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        userId,
      })
    }
  }

  return (
    <>
      {!isEdit ? (
        <>
          <p className="font-semibold text-lg">Security</p>
          <span className="text-gray-400 mt-2 text-sm">
            Change your password.
          </span>
          <div className="py-5 px-8 flex justify-between border-t border-t-gray-200 mt-5">
            <p className="font-semibold text-sm w-1/3">Password</p>
            <div className="w-2/3">
              <p className="text-gray-500">
                Reset your password regularly to keep your account secure
              </p>
            </div>
            <div
              className="w-1/4 flex justify-end"
              onClick={() => setIsEdit(true)}
            >
              <p className="text-blue-400 cursor-pointer w-fit">Reset</p>
            </div>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSave)}>
          <p className="font-semibold text-lg">Security</p>
          <span className="text-gray-400 mt-2 text-sm">
            Change your password.
          </span>
          <div className="py-5 px-8 flex justify-between border-t border-t-gray-200 mt-5">
            <p className="font-semibold text-sm w-1/3">Password</p>
            <div className="w-2/3">
              <p className="text-base mt-2">Old Password</p>
              <input
                type="password"
                className="border w-1/2 border-gray-300 py-1 px-1 rounded-lg mt-2"
                {...register('oldPassword')}
              />
              <p className="text-red-500 font-light text-xs mt-2">
                {errors.oldPassword?.message}
              </p>
              <p className="font-normal text-xs mt-1">
                Don’t remember your password?
                <Link href="/forgot-password">
                  <a className="text-blue-400 ml-1">Reset via Email</a>
                </Link>
              </p>
              <p className="text-base mt-6">New Password</p>
              <input
                type="password"
                className="border w-1/2 border-gray-300 py-1 px-1 rounded-lg mt-2"
                {...register('newPassword')}
              />
              <p className="text-red-500 font-light text-xs mt-2">
                {errors.newPassword?.message}
              </p>
              <p className="text-base mt-2">Confirm Password</p>
              <input
                type="password"
                className="border w-1/2 border-gray-300 py-1 px-1 rounded-lg mt-2"
                {...register('confirmPassword')}
              />
              <p className="text-red-500 font-light text-xs mt-2">
                {errors.confirmPassword?.message}
              </p>
            </div>
            <div className="w-1/4 flex justify-end">
              <p className="text-blue-400 cursor-pointer w-fit"> </p>
            </div>
          </div>
          <div className="flex justify-end mt-5 border-t border-t-gray-200 pt-4">
            {postChangePasswordLoading && <CircularProgress />}
            {!postChangePasswordLoading && (
              <div className="flex gap-4 w-full justify-end">
                <button
                  className="w-20 py-2 bg-blue-400 text-white rounded-lg"
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="w-20 py-2 bg-white border border-gray-300  rounded-lg"
                  onClick={() => setIsEdit(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </form>
      )}
    </>
  )
}
