import { ArrowDropDown } from '@mui/icons-material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LanguageIcon from '@mui/icons-material/Language'
import Buttons from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Cookies from 'js-cookie'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useAppSelector } from '../../hooks'
import finotixLogo from '../../styles/images/finotix-logo.svg'
import { useGetProfileInformation } from '../../hooks/profile'
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setLang } from '../../airportsSlice'

const en = { hello: 'Hello', stops: 'Stops' }
const tr = { hello: 'Turkeeeeeeeeeeeeeey', stops: 'turkey StOp' }

const Header = () => {
  const { lang } = useAppSelector((state) => state.airportsInfo)

  const [anchorEl, setAnchorEl] = useState(null)
  const [defaultLangName, setDefaultLangName] = useState('en')
  useEffect(() => {
    setDefaultLangName(localStorage.getItem('lang') as string)
  }, [lang])

  const open = Boolean(anchorEl)

  const { getProfileInfoData, profileInfoAction } = useGetProfileInformation()

  useEffect(() => {
    profileInfoAction()
  }, [Cookies.get('userTokenFinotix')])

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  //---------------------------
  const { push, asPath } = useRouter()

  //---------------------------------
  const { t } = useTranslation('navbar')
  const dispatch = useDispatch()

  const changeLang = () => {
    if (localStorage.getItem('lang') === 'en') {
      localStorage.setItem('lang', 'tr')
      dispatch(setLang(tr))
    } else {
      localStorage.setItem('lang', 'en')
      dispatch(setLang(en))
    }
  }

  return (
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
              {!Cookies.get('userTokenFinotix') ? (
                <div className="self-center inline-block">
                  <div className=" rounded-md px-3 normal-case">
                    <Buttons
                      className="normal-case"
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
                        <div className="p-2 normal-case">
                          <button
                            className="sing-in-btn normal-case"
                            onClick={handleClose}
                          >
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
              ) : (
                <div className="self-center inline-block">
                  <Box className="bg-white normal-case">
                    <Buttons
                      className="bg-white normal-case"
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                    >
                      <div className="flex gap-4 bg-gray-200 px-4 py-2 rounded-md normal-case">
                        <AccountCircleIcon />
                        {getProfileInfoData?.firstName && (
                          <p className="normal-case">
                            {`${getProfileInfoData?.firstName} ${getProfileInfoData?.lastName}`.slice(
                              0,
                              10
                            )}
                            ...
                          </p>
                        )}
                        <ArrowDropDown />
                      </div>
                    </Buttons>
                  </Box>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                    sx={{
                      '.MuiMenu-paper': {
                        boxShadow:
                          '1px -2px 13px 7px rgba(0,0,0,0.26) !important',
                        '-webkit-box-shadow':
                          '1px -2px 13px 7px rgba(0,0,0,0.26) !important',
                        '-moz-box-shadow':
                          '1px -2px 13px 7px rgba(0,0,0,0.26) !important',
                        left: '1082px !important',
                      },
                    }}
                  >
                    <Link href="/profile">
                      <a>
                        <div className="p-2 px-6">
                          <button
                            className="w-full text-start"
                            onClick={handleClose}
                          >
                            Account Management
                          </button>
                        </div>
                      </a>
                    </Link>
                    <Link href="/profile?page=trips">
                      <a>
                        <div className="p-2 px-6">
                          <button
                            className="w-full text-start"
                            onClick={handleClose}
                          >
                            Trips
                          </button>
                        </div>
                      </a>
                    </Link>
                    <Link href="/">
                      <a>
                        <div className="p-2 px-6">
                          <button
                            className="w-full text-start"
                            onClick={() => {
                              handleClose()
                              Cookies.remove('userTokenFinotix')
                              push('/')
                            }}
                          >
                            Sign out
                          </button>
                        </div>
                      </a>
                    </Link>
                  </Menu>
                </div>
              )}
            </div>
            <div className="px-1 language-border">
              <LanguageIcon className="text-3xl" fontSize="small" />
            </div>
            <div className="self-center">
              <FormControl variant="standard">
                <Select
                  id="demo-simple-select"
                  value={defaultLangName}
                  label="Language"
                  onChange={changeLang}
                >
                  <MenuItem className="px-30" value={'en'}>
                    English
                  </MenuItem>
                  <MenuItem className="px-30" value={'tr'}>
                    Turkish
                  </MenuItem>
                  {/* <MenuItem className="px-30" value={'ar'}>
                    Arabic
                  </MenuItem>
                  <MenuItem className="px-30" value={'fa'}>
                    Farsi
                  </MenuItem> */}
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
