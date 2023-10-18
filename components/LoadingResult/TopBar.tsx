import React from 'react'
import styles from './loadingResult.module.css'
import { useRouter } from 'next/router'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { SortOutlined } from '@mui/icons-material'

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
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

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
          router.query.sort === 'nonstop' && styles.active
        }`}
        onClick={() => changeParams('nonstop')}
      >
        <button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          className={styles.btnStyles}
        >
          <SortOutlined /> Other Sort
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
            <MenuItem onClick={handleClose}>{filter}</MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  )
}

export default TopBar
