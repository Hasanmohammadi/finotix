import clsx from 'clsx'
import React from 'react'

import { ArrowDownward } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { setFilter } from '../../../../airportsSlice'
import { useAppSelector } from '../../../../hooks'

const otherFilters = [
  'Earliest take-off',
  'Earliest landing',
  'Latest landing',
  'Latest take-off',
  'Highest price',
  'Slowest',
]

export default function TopBarMobile() {
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  // const open = Boolean(anchorEl)
  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget)
  // }
  // const handleClose = () => {
  //   setAnchorEl(null)
  // }

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
  // const [activeFilter, setActiveFilter] = React.useState('')

  const { filter } = useAppSelector((state) => state.airportsInfo)

  const dispatch = useDispatch()

  const onFilterClick = (value: string) => {
    if (filter.name === value && !filter.orderByDesc) {
      dispatch(setFilter({ name: value, orderByDesc: true }))
    } else if (filter.name === value && filter.orderByDesc) {
      dispatch(setFilter({ name: '', orderByDesc: false }))
    } else {
      dispatch(setFilter({ name: value, orderByDesc: false }))
    }
  }

  return (
    <div className="absolute flex justify-between -bottom-6 h-12 bg-white w-11/12 m-auto left-0 right-0 rounded-lg">
      <div
        className={clsx('py-3 w-1/4 rounded-bl-lg', {
          'border-b-2 border-b-[#F00]': filter.name === 'OneAdultTotalFare',
        })}
      >
        <div
          onClick={() => onFilterClick('OneAdultTotalFare')}
          className={clsx(
            'flex gap-1 text-gray-900 justify-center self-center font-normal text-sm border-r border-r-gray-300 h-full'
          )}
        >
          {filter.name === 'OneAdultTotalFare' && (
            <div
              className={clsx({
                'rotate-180':
                  filter.name === 'OneAdultTotalFare' && filter.orderByDesc,
              })}
            >
              <ArrowDownward fontSize="small" />
            </div>
          )}
          <p>Price</p>
        </div>
      </div>
      <div
        className={clsx('py-3 w-1/4', {
          'border-b-2 border-b-[#F00]': filter.name === 'DepartureTimes',
        })}
      >
        <div
          onClick={() => onFilterClick('DepartureTimes')}
          className={clsx(
            'flex text-gray-900 justify-center self-center font-normal text-sm border-r border-r-gray-300 h-full'
          )}
        >
          {filter.name === 'DepartureTimes' && (
            <div
              className={clsx({
                'rotate-180':
                  filter.name === 'DepartureTimes' && filter.orderByDesc,
              })}
            >
              <ArrowDownward fontSize="small" />
            </div>
          )}
          <p>Time</p>
        </div>
      </div>

      <div
        className={clsx('py-3 w-1/4', {
          'border-b-2 border-b-[#F00]': filter.name === 'TotalFlightDuration',
        })}
      >
        <div
          onClick={() => onFilterClick('TotalFlightDuration')}
          className="flex text-gray-900 justify-center self-center font-normal text-sm border-r border-r-gray-300 h-full"
        >
          {filter.name === 'TotalFlightDuration' && (
            <div
              className={clsx({
                'rotate-180':
                  filter.name === 'TotalFlightDuration' && filter.orderByDesc,
              })}
            >
              <ArrowDownward fontSize="small" />
            </div>
          )}
          Duration
        </div>
      </div>
      <div
        className={clsx('py-3 w-1/4', {
          'border-b-2 border-b-[#F00]': filter.name === 'stops',
        })}
      >
        <div
          onClick={() => onFilterClick('stops')}
          className="flex text-gray-900 justify-center self-center font-normal text-sm border-r border-r-gray-300 h-full"
        >
          {filter.name === 'stops' && (
            <div
              className={clsx({
                'rotate-180': filter.name === 'stops' && filter.orderByDesc,
              })}
            >
              <ArrowDownward fontSize="small" />
            </div>
          )}
          Stops
        </div>
      </div>
      {/* <div
        className={clsx('py-3 w-1/4 rounded-br-lg', {
          'border-b-2 border-b-[#F00]': router.query.sort === activeFilter,
        })}
      >
        <div className="text-gray-900 justify-center self-center font-normal text-sm border-r border-r-gray-300 h-full">
          <button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            className="flex"
            onClick={(e) => {
              handleClick(e)
              setIsDrawerOpen(true)
            }}
          >
            {router.query.sort === activeFilter ? (
              <span className="text-xs">{activeFilter}</span>
            ) : (
              <>
                <SortOutlined fontSize="small" />{' '}
                <span className="text-xs">Other Sort</span>
              </>
            )}
          </button>

          <Drawer
            anchor="bottom"
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          >
            <Close
              htmlColor="red"
              className="my-4 ml-4"
              onClick={() => {
                setIsDrawerOpen(false)
              }}
            />
            {otherFilters.map((filter) => (
              <MenuItem
                onClick={() => {
                  handleClose
                  setIsDrawerOpen(false)
                  if (filter === activeFilter) {
                    setActiveFilter('')
                    router.replace('/result', undefined, { shallow: true })
                  } else {
                    changeParams(filter)
                    setActiveFilter(filter)
                  }
                }}
              >
                <div className="flex justify-between w-full px-4">
                  {filter}
                  {activeFilter === filter && <Check htmlColor="red" />}
                </div>
              </MenuItem>
            ))}
          </Drawer>
        </div>
      </div> */}
    </div>
  )
}
