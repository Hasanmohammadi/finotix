import React, { useState } from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'

interface FilterOption {
  label: string
  value: string
}

interface Props {
  options: FilterOption[]
  onFilterChange?: (selectedOptions: string[]) => void
  filterName: string
}

const FilterBox: React.FC<Props> = ({
  options,
  onFilterChange,
  filterName,
}) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([])

  const router = useRouter()
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target
    const updatedCheckedItems = checkedItems.includes(name)
      ? checkedItems.filter((item) => item !== name)
      : [...checkedItems, name]

    setCheckedItems(updatedCheckedItems)
    if (onFilterChange) onFilterChange(updatedCheckedItems)
  }

  return (
    <Box
      sx={{
        ['.MuiFormControlLabel-root']: {
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row-reverse',
        },
      }}
    >
      <FormGroup>
        {options.map((option) => (
          <FormControlLabel
            onClick={() => {
              router.query[filterName] = [option.value]
              router.push(router)
            }}
            key={option.value}
            control={
              <Checkbox
                checked={router.asPath.includes(option.value)}
                onChange={handleCheckboxChange}
                name={option.value}
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
    </Box>
  )
}

export default FilterBox
