import Slider from '@material-ui/core/Slider'
import { useRouter } from 'next/router'
import { useState, useEffect, ChangeEvent } from 'react'
import { useAppSelector } from '../../hooks'

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
  const router = useRouter()
  const { totalFareAmounts } = useAppSelector((state) => state.airportsInfo)
  // const [value, setValue] = useState<string[]>([
  //   totalFareAmounts[0]?.toString(),
  //   totalFareAmounts[1]?.toString(),
  // ])

  // const rangeSelector = (event: any, newValue: any) => {
  //   router.query.price = newValue
  //   router.push(router)
  //   setValue(newValue)
  // }
  // useEffect(() => {
  //   setValue(router.query.price as string[])
  // }, [router.query.price?.[0]])

  const [value, setValue] = useState<number[]>(totalFareAmounts)

  const handleChange = (_: ChangeEvent<{}>, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  useEffect(() => {
    setValue(totalFareAmounts)
  }, [totalFareAmounts])

  return (
    <div className={className}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={totalFareAmounts?.[0]}
        max={totalFareAmounts?.[1]}
        getAriaValueText={valuetext}
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
