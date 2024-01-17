import Drawer from '@mui/material/Drawer'
import Cookies from 'js-cookie'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { useGetProfileInformation } from '../../../../hooks/profile'
import Menu from '@mui/material/Menu'
import Link from 'next/link'

import { useRouter } from 'next/router'
import Buttons from 'react-multi-date-picker/components/button'
import { AccountCircleOutlined, Close, MenuOutlined } from '@mui/icons-material'
import { ArrowDropDown } from '@mui/icons-material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Box } from '@mui/material'

export default function SidebarMenu() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const { getProfileInfoData, profileInfoAction } = useGetProfileInformation()

  useEffect(() => {
    profileInfoAction()
  }, [Cookies.get('userTokenFinotix')])

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const { push } = useRouter()

  return (
    <div>
      <MenuOutlined
        onClick={() => setIsOpen(true)}
        htmlColor="white"
        fontSize="large"
      />
      <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="ml-2 mt-2" onClick={() => setIsOpen(false)}>
          <Close htmlColor="red" />
        </div>
        <div className="">
          <div className="flex gap-4 mt-6 mx-4">
            {Cookies.get('userTokenFinotix') && (
              <div className="self-center inline-block">
                <Buttons
                  className=""
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <div className="flex gap-2 border border-gray-500 px-2 py-2 rounded-md">
                    <AccountCircleIcon />
                    <p className="text-gray-500 normal-case">
                      {`${getProfileInfoData?.firstName} ${getProfileInfoData?.lastName}`.slice(
                        0,
                        7
                      )}
                      ...
                    </p>
                    <ArrowDropDown />
                  </div>
                </Buttons>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <Link href="/profile">
                    <a>
                      <div className="p-2">
                        <button className="px-4" onClick={handleClose}>
                          Account Management
                        </button>
                      </div>
                    </a>
                  </Link>
                  <Link href="/trip">
                    <a>
                      <div className="p-2 px-6">
                        <button
                          className="w-full text-start"
                          onClick={handleClose}
                        >
                          Trip
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
            {!Cookies.get('userTokenFinotix') && (
              <div onClick={() => push('/sign-in')}>
                <AccountCircleOutlined fontSize="large" />
              </div>
            )}
          </div>

          <div className="my-8 px-2 text-center">
            <Link href="about-us">
              <p className="text-gray-400 font-semibold">About us</p>
            </Link>
          </div>
          <div className="my-8 px-2 text-center">
            <Link href="contact-us">
              <p className="text-gray-400 font-semibold">Contact us</p>
            </Link>
          </div>
        </div>
      </Drawer>
    </div>
  )
}
