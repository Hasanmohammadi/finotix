import { Close } from '@mui/icons-material'
import { PriceFilter } from '../../../results'
import FilterBox from '../../../results/Filter'

export default function MobileFilter({
  setIsDrawerOpen,
}: {
  setIsDrawerOpen: (value: React.SetStateAction<boolean>) => void
}) {
  const filterOptions = [
    { label: 'Non-stop', value: 'non-stop' },
    { label: 'One Stop', value: 'one-stop' },
    { label: 'Two Stops', value: 'two-stops' },
  ]
  const airLineOptions = [
    { label: 'Pegasus', value: 'pegasus' },
    { label: 'Air France', value: 'airFrance' },
    { label: 'Air Serbia', value: 'airSerbia' },
  ]

  const handleFilterChange = (selectedOptions: string[]) => {}

  return (
    <div className="px-10">
      <div className="flex center justify-between mt-8">
        <Close htmlColor="red" onClick={() => setIsDrawerOpen(false)} />
        <span className=" text-lg font-medium">filter</span>
        <div> </div>
      </div>
      <div className="bg-white pb-4 rounded-lg mt-8">
        <div>
          <p>
            Filter by <span className="font-bold text-base">Price</span>
          </p>
        </div>
        <div className="px-6 pt-4 rounded-lg">
          <PriceFilter currency="$" />
        </div>
      </div>
      <div className="bg-white pb-4 rounded-lg mt-3">
        <div>
          <p>
            Filter by <span className="font-bold text-base">Stop</span>
          </p>
        </div>
        <div className="px-6 pt-4 rounded-lg">
          <FilterBox
            options={filterOptions}
            onFilterChange={handleFilterChange}
            filterName="stops"
          />
        </div>
      </div>
      <div className="bg-white pb-4 rounded-lg mt-3">
        <div>
          <p>
            Filter by <span className="font-bold text-base">Airline</span>
          </p>
        </div>
        <div className="px-6 pt-4 rounded-lg">
          <FilterBox
            options={airLineOptions}
            onFilterChange={handleFilterChange}
            filterName="airline"
          />
        </div>
      </div>
    </div>
  )
}
