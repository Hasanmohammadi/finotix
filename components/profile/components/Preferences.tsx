import { CircularProgress, MenuItem, Select } from '@mui/material'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { usePostProfileSettings } from '../../../hooks/profile'

export interface PreferencesI {
  currencyCode: string
  language: string
}

export default function Preferences({
  profileInfoAction,
  currencyCode,
  language,
}: {
  profileInfoAction: () => void
  currencyCode: string
  language: string
}) {
  const [isEdit, setIsEdit] = useState(false)
  const { control, handleSubmit } = useForm<PreferencesI>({
    defaultValues: {
      currencyCode,
      language,
    },
  })

  const { postProfileSettingsAction, postProfileSettingsLoading } =
    usePostProfileSettings({
      onSuccess: () => {
        profileInfoAction()
        setIsEdit(false)
      },
    })

  const onSave = (data: PreferencesI) => {
    postProfileSettingsAction(data)
  }

  return (
    <>
      {!isEdit ? (
        <>
          <p className="font-semibold text-lg">Preferences</p>
          <span className="text-gray-400 mt-2 text-sm">
            Change your language and currency.
          </span>
          <div className="py-5 px-8 flex justify-between border-t border-t-gray-200 mt-5">
            <p className="font-semibold text-sm w-1/3">Currency</p>
            <div className="w-2/3">
              <p className="text-gray-500">{currencyCode}</p>
            </div>
            <div className="w-1/4 flex justify-end">
              <p
                className="text-blue-400 cursor-pointer w-fit"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </p>
            </div>
          </div>
          <div className="py-5 px-8 flex justify-between border-t border-t-gray-200 mt-5">
            <p className="font-semibold text-sm w-1/3">Language</p>
            <div className="w-2/3">
              <p className="text-gray-500">{language}</p>
            </div>
            <div className="w-1/4 flex justify-end">
              <p
                className="text-blue-400 cursor-pointer w-fit"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </p>
            </div>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSave)}>
          <p className="font-semibold text-lg">Preferences</p>
          <span className="text-gray-400 mt-2 text-sm">
            Change your language and currency.
          </span>
          <div className="py-5 px-8 flex justify-between border-t border-t-gray-200 mt-5">
            <p className="font-semibold text-sm w-1/3">Currency</p>
            <div className="w-2/3">
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Select
                    defaultValue="us"
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                    className="h-11 w-32"
                  >
                    <MenuItem value="USD">US Dollar</MenuItem>
                    <MenuItem value="Rial">Rial</MenuItem>
                  </Select>
                )}
                name="currencyCode"
              />
            </div>
            <div className="w-1/4 flex justify-end">
              <p className="text-blue-400 cursor-pointer w-fit"> </p>
            </div>
          </div>
          <div className="py-5 px-8 flex justify-between border-t border-t-gray-200 mt-5">
            <p className="font-semibold text-sm w-1/3">Language</p>
            <div className="w-2/3">
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Select
                    defaultValue="en"
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                    className="h-11 w-32"
                  >
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Turkey">Turkey</MenuItem>
                  </Select>
                )}
                name="language"
              />
            </div>
            <div className="w-1/4 flex justify-end">
              <p className="text-blue-400 cursor-pointer w-fit"> </p>
            </div>
          </div>
          <div className="flex justify-end mt-5 border-t border-t-gray-200 pt-4">
            {postProfileSettingsLoading ? (
              <CircularProgress />
            ) : (
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
