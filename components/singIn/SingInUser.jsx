import React, { useRef, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import Box from '@mui/material/Box'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Link from 'next/link'
import facebookIcon from '../../styles/images/facbook-icon.svg'
import googleIcon from '../../styles/images/google-icon.svg'
import styles from './signin.module.css'
import { red } from '@material-ui/core/colors'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

const SingIn = () => {
  const { t } = useTranslation('sign-in')
  const [open, setOpen] = React.useState(false)
  const [userInfo, setUserInfo] = useState({ email: '', password: '' })
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const passRef = useRef()

  const handlePasswordVisibility = (e) => {
    e.preventDefault()
    if (passRef.current.type === 'password') {
      passRef.current.type = 'text'
    } else {
      passRef.current.type = 'password'
    }
  }

  const sxStyle = {
    color: red[700],
    '&.Mui-checked': {
      color: red[700],
    },
  }

  const handleGoogleLogin = (e) => {
    e.preventDefault()
  }
  const handleFacebookLogin = (e) => {
    e.preventDefault()
  }

  const handleLogIn = (e) => {
    e.preventDefault()
    loginAction({ emailAddress: userInfo.email, password: userInfo.password })
  }

  return (
    <div className="container p-5 md:p-0">
      <div className="m-auto md:w-1/4 w-full">
        <form action="">
          <p className={`pt-5 pb-10 ${styles.signIn} `}>{t('signIn')}</p>
          <div>
            <p className={styles.inputTitle}>{t('email')}</p>
            <input
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo((pre) => ({ ...pre, email: e.target.value }))
              }
              className={`${styles.inputStyles} ${styles.emailAndPasswordDir}`}
              type="email"
              autoComplete="off"
            />
          </div>
          <div className="pt-2">
            <p className={styles.inputTitle}>{t('password')}</p>
            <div
              className={`flex pt-3 ${styles.inputStyles} ${styles.emailAndPasswordDir}`}
            >
              <input
                value={userInfo.password}
                onChange={(e) =>
                  setUserInfo((pre) => ({ ...pre, password: e.target.value }))
                }
                ref={passRef}
                className={`w-full ${styles.noBorder}`}
                type="password"
                placeholder={t('passwordPlaceholder')}
                autoComplete="off"
              />
              <button onClick={handlePasswordVisibility}>
                {' '}
                <VisibilityIcon
                  className={` pr-2 ${styles.passwordShowStyle} `}
                />{' '}
              </button>
            </div>
          </div>
          <div className="py-5">
            <p className={styles.warning}>
              <WarningAmberIcon className={styles.warnIconSize} />
              <span className={`font-medium ${styles.textWarn}`}>
                {t('warnText')}
              </span>
            </p>
          </div>
          <div>
            <button className={styles.logIn} onClick={handleLogIn}>
              {t('logIn')}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-1 pt-2">
            <div className="self-center">
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked sx={sxStyle} />}
                  label={t('keepMe')}
                />
              </FormGroup>
            </div>
            <div className="self-center forgot">
              <Button
                className={`${styles.ForgotPassword}`}
                onClick={handleOpen}
              >
                <div className={styles.f12}>{t('forgotPassword')}</div>
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <form action="forgotPassword" method="post">
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      {t('modalForgotPass')}
                    </Typography>
                    <div className="py-3">
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {t('modalText')}
                      </Typography>
                    </div>
                    <div>
                      <input
                        type="email"
                        className={styles.inputStyles}
                        placeholder={t('modalEmail')}
                        name="email"
                      />
                    </div>
                    <div className="pt-5">
                      <button
                        className={styles.logIn}
                        onClick={(e) => e.preventDefault()}
                      >
                        {t('modalSubmit')}
                      </button>
                    </div>
                  </form>
                </Box>
              </Modal>
            </div>
          </div>
          <div className="flex flex-row justify-center pb-5">
            <div className={styles.customLineStyle}>
              <hr />
            </div>
            <div className={`text-center ${styles.orStyle}`}> {t('or')} </div>
            <div className={styles.customLineStyle}>
              <hr />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button className={styles.customBtn} onClick={handleGoogleLogin}>
              <span className=" flex text-center justify-center">
                <Image alt="Google icon" draggable="false" src={googleIcon} />
                <span className={styles.btnFont}>{t('googleLogIn')}</span>
              </span>
            </button>
            <button className={styles.customBtn} onClick={handleFacebookLogin}>
              <span className="flex text-center justify-center">
                <Image
                  alt="facebook icon"
                  draggable="false"
                  src={facebookIcon}
                />
                <span className={styles.btnFont}>{t('facebookLogIn')}</span>
              </span>
            </button>
          </div>
          <div className={`pt-8 text-center ${styles.f14}`}>
            <span className="px-2">{t('dontHaveAccount')}</span>
            <Link href="/create-account">
              <a className={styles.customLink}>{t('createOne')}</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SingIn
