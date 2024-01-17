import { MenuItem, Select } from '@material-ui/core'
import { SelectChangeEvent } from '@mui/material'
import { useState } from 'react'
export default function Trips() {
  const [age, setAge] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string)
  }

  return (
    <div className="">
      <div className="flex justify-between gap-10">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          //@ts-ignore
          onChange={handleChange}
          defaultValue={10}
          className="border w-1/3 border-gray-300 rounded-md py-2 px-6"
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <div className="py-2 px-6 flex border border-gray-300 rounded-md w-2/3 justify-between items-center">
          <p className="w-1/3">Search by:</p>
          <div className="flex justify-end gap-4">
            <input className="border border-gray-300 rounded-md w-2/5 h-8" />
            <input className="border border-gray-300 rounded-md w-2/5 h-8" />
            <input className="border border-gray-300 rounded-md w-2/5 h-8" />
          </div>
        </div>
      </div>
    </div>
  )
}
