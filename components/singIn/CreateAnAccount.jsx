import React, { useRef } from 'react'
import styles from './signin.module.css'
import VisibilityIcon from '@mui/icons-material/Visibility'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from 'next/link'
import { red } from '@material-ui/core/colors'
import Image from 'next/image'
import googleIcon from '../../styles/images/google-icon.svg'
import facebookIcon from '../../styles/images/facbook-icon.svg'
import { useTranslation } from 'next-i18next'

const SingIn = () => {
  const { t } = useTranslation('create-account')
  const passRef = useRef()

  const handleGoogleLogin = (e) => {
    e.preventDefault()
  }

  const handlePasswordVisibility = (e) => {
    e.preventDefault()
    if (passRef.current.type === 'password') {
      passRef.current.type = 'text'
    } else {
      passRef.current.type = 'password'
    }
  }

  const sxNewStyle = {
    color: red[700],
    '&.Mui-checked': {
      color: red[700],
    },
  }

  const handleCreateAnAccount = (e) => {
    e.preventDefault()
  }

  const handleFacebookLogin = (e) => {
    e.preventDefault()
  }

  return (
    <div className="container p-5 md:p-0 md:pb-10">
      <div className="m-auto md:w-1/4 w-full">
        <p className={`pt-5 pb-10 ${styles.signIn} `}>{t('createAnAccount')}</p>
        <form action="createAnAccount" method="post">
          <div>
            <p className={styles.inputTitle}>{t('name')}</p>
            <input
              className={styles.inputStyles}
              type="text"
              autoComplete="off"
            />
          </div>
          <div className="py-4">
            <p className={styles.inputTitle}>{t('lastName')}</p>
            <input
              className={styles.inputStyles}
              type="text"
              autoComplete="off"
            />
          </div>
          <div>
            <p className={styles.inputTitle}>{t('email')}</p>
            <input
              className={`${styles.inputStyles} ${styles.emailAndPasswordDir} `}
              type="email"
              autoComplete="off"
            />
          </div>
          <div className="pt-2">
            <p className={styles.inputTitle}>{t('password')}</p>
            <div
              className={`flex py-4 ${styles.inputStyles} ${styles.emailAndPasswordDir}`}
            >
              <input
                ref={passRef}
                className={`w-full ${styles.noBorder} ${styles.customWhite}`}
                type="password"
                placeholder={t('passwordPlaceholder')}
                autoComplete="off"
              />
              <button onClick={handlePasswordVisibility}>
                {' '}
                <VisibilityIcon
                  className={` pr-2 ${styles.passwordShowStyle}`}
                />{' '}
              </button>
            </div>
          </div>
          <div className="py-5">
            <p className={styles.warning}>
              <WarningAmberIcon className={styles.warnIconSize} />
              <span className={styles.textWarn}>{t('warnText')}</span>
            </p>
          </div>
          <div>
            <button className={styles.logIn} onClick={handleCreateAnAccount}>
              {t('createAccountBtn')}
            </button>
          </div>
          <div className="pt-3">
            <FormGroup>
              <FormControlLabel
                className={styles.agreeTerms}
                control={<Checkbox defaultChecked sx={sxNewStyle} />}
                label={t('agreeTerms')}
              />
            </FormGroup>
          </div>
          <div className={`pt-3 text-center ${styles.f14}`}>
            <span className="px-3">{t('alreadyMember')}</span>
            <Link href="/sign-in">
              <a className={styles.customLink}>{t('signIn')}</a>
            </Link>
          </div>
          <div className="flex flex-row justify-center py-3">
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
        </form>
      </div>
    </div>
  )
}

export default SingIn
