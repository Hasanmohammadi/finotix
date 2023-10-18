import clsx from 'clsx'
import { useRouter } from 'next/router'
import React from 'react'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Check, Close, SortOutlined } from '@mui/icons-material'
import { Drawer } from '@material-ui/core'

const otherFilters = [
  'Earliest take-off',
  'Earliest landing',
  'Latest landing',
  'Latest take-off',
  'Highest price',
  'Slowest',
]

export default function TopBarMobile() {
  const router = useRouter()
  const changeParams = (queryParam: string) => {
    router.query.sort = queryParam
    router.push(router)
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
  const [activeFilter, setActiveFilter] = React.useState('')

  return (
    <div className="absolute flex justify-between -bottom-6 h-12 bg-white w-11/12 m-auto left-0 right-0 rounded-lg">
      <div
        className={clsx('py-3 rounded-bl-lg', {
          'border-b-2 border-b-[#F00]': router.query.sort === 'best',
        })}
      >
        <div
          onClick={() => changeParams('best')}
          className={clsx(
            'text-gray-900 px-4 self-center font-normal text-sm border-r border-r-gray-300 h-full'
          )}
        >
          <p>Best</p>
        </div>
      </div>
      <div
        className={clsx('py-3', {
          'border-b-2 border-b-[#F00]': router.query.sort === 'cheapest',
        })}
      >
        <div
          onClick={() => changeParams('cheapest')}
          className={clsx(
            'text-gray-900 px-4 self-center font-normal text-sm border-r border-r-gray-300 h-full'
          )}
        >
          <p>Cheapest</p>
        </div>
      </div>
      <div
        className={clsx('py-3', {
          'border-b-2 border-b-[#F00]': router.query.sort === 'quickest',
        })}
      >
        <div
          onClick={() => changeParams('quickest')}
          className="text-gray-900 px-4 self-center font-normal text-sm border-r border-r-gray-300 h-full"
        >
          <p>Quickest</p>
        </div>
      </div>
      <div
        className={clsx('py-3 rounded-br-lg', {
          'border-b-2 border-b-[#F00]': activeFilter,
        })}
      >
        <div className="text-gray-900 px-4 self-center font-normal text-sm border-r border-r-gray-300 h-full">
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
            {activeFilter ? (
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
      </div>
    </div>
  )
}
