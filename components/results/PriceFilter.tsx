import Slider from '@material-ui/core/Slider'
import { useRouter } from 'next/router'
import { useState, useEffect, ChangeEvent } from 'react'
import { useAppSelector } from '../../hooks'
import { useDispatch } from 'react-redux'
import { setPriceFilter } from '../../airportsSlice'

interface PriceFilterPropsI {
  currency?: string
  defaultValue?: [number, number]
  className?: string
}

function valuetext(value: number) {
  return `${value}°C`
}

export default function PriceFilter({
  className,
  currency,
}: PriceFilterPropsI) {
  const dispatch = useDispatch()
  const { totalFareAmounts, priceFilter, resultLoading } = useAppSelector(
    (state) => state.airportsInfo
  )
  const [value, setValue] = useState<number[]>([...totalFareAmounts])

  const handleChange = (_: ChangeEvent<{}>, newValue: number | number[]) => {
    setValue([...(newValue as number[])])
    // setTimeout(() => {
    dispatch(setPriceFilter([...(newValue as number[])]))
    // }, 500)
  }

  useEffect(() => {
    if (priceFilter?.[0]) {
      setValue([...priceFilter])
    } else {
      setValue([...totalFareAmounts])
    }
  }, [totalFareAmounts, priceFilter])

  return (
    <div className={className}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="off"
        min={totalFareAmounts?.[0]}
        max={totalFareAmounts?.[1]}
        getAriaValueText={valuetext}
        disabled={resultLoading}
      />
      <div className="flex justify-between">
        <span className="text-sm font-medium">
          {value?.[0]?.toLocaleString()} {currency}
        </span>
        <span className="text-sm font-medium">
          {value?.[1]?.toLocaleString()} {currency}
        </span>
      </div>
    </div>
  )
}
