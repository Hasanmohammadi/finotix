import React, { SetStateAction, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import finotixLogo from '../../styles/images/finotix-logo.svg'
import LanguageIcon from '@mui/icons-material/Language'
import Image from 'next/image'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Buttons from '@mui/material/Button'
import Menu from '@mui/material/Menu'

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  //---------------------------
  const { push, asPath, locale } = useRouter()
  const route = useRouter()

  const handleLocaleChange = (event: { target: { value: string } }) => {
    localStorage.setItem('langue', event.target.value)
    console.log(
      '🚀 ~ file: Header.jsx:27 ~ handleLocaleChange ~  event.target.value:',
      event.target.value
    )
    push(route, asPath, {
      locale: event.target.value,
    })
  }
  //---------------------------------
  const { t } = useTranslation('navbar')

  return (
    // TODO: fix responsive this section in mobile screen
    <header>
      <nav className="navbar">
        <div className="navbar-container nav-container">
          <input type="checkbox" name="" id="" />
          <div className="hamburger-lines">
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
          </div>
          <ul className="menu-items">
            <div>
              <Link href="/about-us">
                <a
                  className={`${
                    asPath === '/about-us' ? 'active' : ''
                  } link-padding justify-center relative`}
                >
                  {t('aboutus')}
                </a>
              </Link>
              <Link href="/contact-us">
                <a
                  className={`${
                    asPath === '/contact-us' ? 'active' : ''
                  } link-padding justify-center relative mx-5`}
                >
                  {t('contact')}
                </a>
              </Link>
              <div className="self-center inline-block">
                <div className="login-sing-up-btn">
                  <Buttons
                    className="login-sing-up-btn"
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    {t('signin')}
                  </Buttons>
                </div>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <Link href="/sign-in">
                    <a>
                      <div className="p-2">
                        <button className="sing-in-btn" onClick={handleClose}>
                          {t('signin')}
                        </button>
                      </div>
                    </a>
                  </Link>
                  <Link href="/create-account">
                    <a>
                      <div className="p-2">
                        <button
                          className="create-account w-full"
                          onClick={handleClose}
                        >
                          {t('CreateAnAccount')}
                        </button>
                      </div>
                    </a>
                  </Link>
                </Menu>
              </div>
            </div>
            <div className="px-1 language-border">
              <LanguageIcon className="text-3xl" fontSize="small" />
            </div>
            <div className="self-center">
              <FormControl variant="standard">
                <Select
                  id="demo-simple-select"
                  value={locale}
                  label="Language"
                  onChange={handleLocaleChange}
                >
                  <MenuItem className="px-30" value={'en'}>
                    English
                  </MenuItem>
                  <MenuItem className="px-30" value={'tr'}>
                    Turkish
                  </MenuItem>
                  <MenuItem className="px-30" value={'ar'}>
                    Arabic
                  </MenuItem>
                  <MenuItem className="px-30" value={'fa'}>
                    Farsi
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </ul>
          <div className="logo">
            <Link href="/">
              <a className="d-flex">
                <Image
                  src={finotixLogo}
                  alt="FINOTIX logo"
                  height="36px"
                  width="36px"
                  draggable="false"
                />
                <div className="px-1.5">
                  <p className="finotix">FINOTIX</p>
                  <p className="finotix-title">Online Travel Solution</p>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
