/* eslint-disable react/jsx-props-no-spreading */
import { Box } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import clsx from 'clsx'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

import SelectSearchContainerStyled from './SelectSearch.style'

interface SelectSearchPropsI<T extends FieldValues> {
  className?: string
  containerClassName?: string
  label?: string
  placeholder?: string
  items?: { label: string; iataCode: string; isCity: boolean }[]
  name: Path<T>
  control: Control<T>
  setTextSearched: React.Dispatch<React.SetStateAction<string>>
  textSearched: string
  loading?: boolean
  disabled?: boolean
  errorMessage?: string
}

export default function SelectSearch<T extends FieldValues>({
  className,
  label,
  placeholder,
  items,
  name,
  control,
  setTextSearched,
  loading,
  errorMessage,
  disabled,
  textSearched,
  containerClassName,
}: SelectSearchPropsI<T>) {
  return (
    <Box className={containerClassName}>
      {!!label && (
        <p className="text-sm font-medium mb-2 text-gray-700">{label}</p>
      )}
      <SelectSearchContainerStyled
        className={clsx('cursor-pointer rounded-lg', className, {
          disabled,
        })}
      >
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Autocomplete
              disabled={disabled}
              {...field}
              placeholder={placeholder}
              id="combo-box-demo"
              options={items || [{ iataCode: '', label: '', isCity: false }]}
              sx={{
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '.MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={placeholder}
                  onChange={(e) => setTextSearched(e.target.value)}
                  value={textSearched}
                />
              )}
              // popupIcon={
              //   <ChevronDown
              //     className="mt-0.5 cursor-pointer text-gray-500"
              //     size={20}
              //   />
              // }
              popupIcon={false}
              loading={loading as boolean}
              onChange={(e, data) => {
                if (data) {
                  field.onChange(data)
                } else {
                  field.onChange({ iataCode: '', label: '', isCity: false })
                }
              }}
            />
          )}
        />
      </SelectSearchContainerStyled>
      <p className="w-full text-center text-red-600 text-sm">{errorMessage}</p>
    </Box>
  )
}
