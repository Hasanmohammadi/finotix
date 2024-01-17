import { Close } from '@mui/icons-material'
import { useAppSelector } from '../../../../hooks'
import { PriceFilter } from '../../../results'
import AirlineFilterBox from './AirlineFilterBox'
import StopFilterBox from './StopFilterBox'

export default function MobileFilter({
  setIsDrawerOpen,
}: {
  setIsDrawerOpen: (value: React.SetStateAction<boolean>) => void
}) {
  const { currencyCode } = useAppSelector((state) => state.airportsInfo)

  const handleFilterChange = (selectedOptions: string[]) => {}

  return (
    <div className="px-6">
      <div className="flex justify-between pt-8 fixed w-full pr-14 bg-white z-10 pb-6">
        <Close htmlColor="red" onClick={() => setIsDrawerOpen(false)} />
        <span className=" text-lg font-medium">Filters</span>
        <div> </div>
      </div>
      <div className="bg-white pb-4 rounded-lg mt-10 pt-10">
        <div>
          <p>
            Filter by <span className="font-bold text-base">Price</span>
          </p>
        </div>
        <div className="px-6 pt-4 rounded-lg">
          <PriceFilter currency={currencyCode} />
        </div>
      </div>
      <StopFilterBox />
      <div className="bg-white pb-4 rounded-lg mt-3">
        <div>
          <p>
            Filter by <span className="font-bold text-base">Airline</span>
          </p>
        </div>
        <div className="px-4 pt-4 rounded-lg">
          <AirlineFilterBox />
        </div>
      </div>
    </div>
  )
}
