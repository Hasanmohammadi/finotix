import { ArrowDropDown, Check, SortOutlined } from '@mui/icons-material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
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
  const router = useRouter()
  const changeParams = (queryParam: string) => {
    router.query.sort = queryParam
    router.push(router)
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [activeFilter, setActiveFilter] = React.useState('')

  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    if (router.query.sort !== activeFilter) {
      setActiveFilter('')
      otherFilters.forEach((filter) => {
        if (router.query.sort === filter) {
          setActiveFilter(filter)
        }
      })
    }
  }, [router.query.sort])

  return (
    <div className={`grid grid-cols-4 ${styles.navParent}`}>
      <div
        className={`parentButton ${
          router.query.sort === 'best' && styles.active
        }`}
        onClick={() => changeParams('best')}
      >
        <button className={styles.btnStyles}>Best</button>
      </div>
      <div
        className={`parentButton ${
          router.query.sort === 'cheapest' && styles.active
        }`}
        onClick={() => changeParams('cheapest')}
      >
        <button className={`${styles.btnStyles}`}>Cheapest</button>
      </div>
      <div
        className={`parentButton ${
          router.query.sort === 'quickest' && styles.active
        }`}
        onClick={() => changeParams('quickest')}
      >
        <button className={styles.btnStyles}>Quickest</button>
      </div>
      <div
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
        </Menu>
      </div>
    </div>
  )
}

export default TopBar
