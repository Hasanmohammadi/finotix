import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { usePostChangePassword } from '../../../../hooks/profile'
import { CircularProgress } from '@material-ui/core'
import Link from 'next/link'
import { yupResolver } from '@hookform/resolvers/yup'
import { userSecuritySchema } from '../../../profile/components/Security'

export interface SecurityI {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export default function SecurityMobile({ userId }: { userId: string }) {
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
    usePostChangePassword({})

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
    <div className="px-4">
      {!isEdit ? (
        <>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-lg">Security</p>
            </div>
            {!isEdit && (
              <div className="w-1/4 flex justify-end">
                <p
                  className="text-blue-400 cursor-pointer w-fit text-lg"
                  onClick={() => setIsEdit(true)}
                >
                  Edit
                </p>
              </div>
            )}
          </div>
          <div className="items-center py-5  flex justify-between border-t border-t-gray-200 mt-5">
            <p className="font-semibold text-sm w-1/3">Password:</p>
            <div className="w-2/3 flex justify-center mt-2">
              <p className="text-gray-500">********</p>
            </div>
            <div> </div>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSave)}>
          <p className="font-semibold text-lg">Security</p>
          <span className="text-gray-400 mt-2 text-sm">
            Change your password.
          </span>
          <div className="py-5 border-t border-t-gray-200 mt-5">
            <p className="font-semibold text-sm w-1/3">Password:</p>
            <div>
              <div>
                <p className="text-base mt-2">Old Password</p>
                <input
                  type="password"
                  className="border border-gray-300 py-1 px-1 rounded-lg mt-2"
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
              </div>
              <div>
                <p className="text-base mt-6">New Password</p>
                <input
                  type="password"
                  className="border border-gray-300 py-1 px-1 rounded-lg mt-2"
                  {...register('newPassword')}
                />
                <p className="text-red-500 font-light text-xs mt-2">
                  {errors.newPassword?.message}
                </p>
              </div>
              <div>
                <p className="text-base mt-2">Confirm Password</p>
                <input
                  type="password"
                  className="border border-gray-300 py-1 px-1 rounded-lg mt-2"
                  {...register('confirmPassword')}
                />
                <p className="text-red-500 font-light text-xs mt-2">
                  {errors.confirmPassword?.message}
                </p>
              </div>
            </div>
            <div className="w-1/4 flex justify-end">
              <p className="text-blue-400 cursor-pointer w-fit"> </p>
            </div>
          </div>
          <div className="flex justify-end mt-5 border-t border-t-gray-200 pt-6 gap-4 w-full">
            {postChangePasswordLoading && (
              <div className="flex justify-center w-full">
                <CircularProgress />
              </div>
            )}
            {!postChangePasswordLoading && (
              <div className="px-4 flex w-full justify-between gap-4">
                <button
                  className="w-1/2 py-2 bg-blue-400 text-white rounded-lg"
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="w-1/2 py-2 bg-white-400 border border-gray-300 rounded-lg"
                  onClick={() => setIsEdit(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  )
}
