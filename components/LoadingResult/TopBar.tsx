import { ArrowDownward } from '@mui/icons-material'
import clsx from 'clsx'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../../airportsSlice'
import { useAppSelector } from '../../hooks'
import styles from './loadingResult.module.css'

const otherFilters = [
  'Earliest take-off',
  'Earliest landing',
  'Latest landing',
  'Latest take-off',
  'Highest price',
  'Slowest',
]

const TopBar = () => {
  const { filter, lang } = useAppSelector((state) => state.airportsInfo)
  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  // const [activeFilter, setActiveFilter] = React.useState('')

  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    dispatch(setFilter({ name: '', orderByDesc: false }))
  }, [])

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
    <div className={`grid grid-cols-4 ${styles.navParent}`}>
      <div
        className={clsx('parentButton', {
          [styles.active]: filter.name === 'OneAdultTotalFare',
        })}
        onClick={() => onFilterClick('OneAdultTotalFare')}
      >
        <button className={styles.btnStyles}>
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
          Price
        </button>
      </div>
      <div
        className={clsx('parentButton', {
          [styles.active]: filter.name === 'DepartureTimes',
        })}
        onClick={() => onFilterClick('DepartureTimes')}
      >
        <button className={styles.btnStyles}>
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
          Departure time
        </button>
      </div>
      <div
        className={clsx('parentButton', {
          [styles.active]: filter.name === 'TotalFlightDuration',
        })}
        onClick={() => onFilterClick('TotalFlightDuration')}
      >
        <button className={styles.btnStyles}>
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
          Flight duration
        </button>
      </div>
      <div
        className={clsx('parentButton', {
          [styles.active]: filter.name === 'stops',
        })}
        onClick={() => onFilterClick('stops')}
      >
        <button className={styles.btnStyles}>
          {filter.name === 'stops' && (
            <div
              className={clsx({
                'rotate-180': filter.name === 'stops' && filter.orderByDesc,
              })}
            >
              <ArrowDownward fontSize="small" />
            </div>
          )}
          {lang.stops}
        </button>
      </div>
      {/* <div
        className={`parentButton flex justify-center ${
          router.query.sort === activeFilter && styles.active
        }`}
      >
        <button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          className={styles.btnStyles}
        >
          {router.query.sort === activeFilter ? (
            <>
              <span className="">{activeFilter}</span>
              <ArrowDropDown className="ml-2" />
            </>
          ) : (
            <div className="flex gap-3 justify-center">
              <SortOutlined fontSize="small" /> <span>Other Sort</span>
            </div>
          )}
        </button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          sx={{ height: '300px' }}
        >
          {otherFilters.map((filter) => (
            <MenuItem
              onClick={() => {
                handleClose
                if (filter === activeFilter) {
                  setActiveFilter('')
                  router.replace('/result', undefined, { shallow: true })
                } else {
                  onFilterClick(filter)
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
        </Menu>
      </div> */}
    </div>
  )
}

export default TopBar
