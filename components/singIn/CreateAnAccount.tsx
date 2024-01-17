import React, { useRef, useState } from 'react'
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
import clsx from 'clsx'
import { usePostRegister } from '../../hooks/auth'
import { CircularProgress } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

interface LoginI {
  email: string
  password: string
}

import * as yup from 'yup'

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required !')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])/,
      'Password must have at least one uppercase and one lowercase letter'
    )
    .matches(
      /[,.\/*$%#]/,
      'Password must contain at least one symbol like ,./*$%#'
    ),
})

const SingIn = () => {
  const { t } = useTranslation('create-account')
  const [isAgree, setIsAgree] = useState(false)
  const [passVisible, setPassVisible] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginI>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema),
  })

  const sxNewStyle = {
    color: red[700],
    '&.Mui-checked': {
      color: red[700],
    },
  }

  const { postRegisterAction, postRegisterLoading } = usePostRegister()

  const handleCreateAnAccount = ({ email, password }: LoginI) => {
    postRegisterAction({
      userName: email,
      password: password,
    })
  }

  // const handleFacebookLogin = (e) => {
  //   e.preventDefault()
  // }

  return (
    <div className="container p-5 md:p-0 md:pb-10">
      <div className="m-auto md:w-1/4 w-full">
        <p className={`pt-5 pb-10 ${styles.signIn} `}>{t('createAnAccount')}</p>
        <form onSubmit={handleSubmit(handleCreateAnAccount)}>
          {/* <div>
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
          </div> */}
          <div>
            <p className={styles.inputTitle}>Email</p>
            <input
              className={`${styles.inputStyles} ${styles.emailAndPasswordDir} `}
              {...register('email')}
            />
            <p className="text-red-600 text-xs mt-1">
              {errors?.email?.message}
            </p>
          </div>
          <div className="pt-2">
            <p className={styles.inputTitle}>{t('password')}</p>
            <div
              className={`flex py-4 ${styles.inputStyles} ${styles.emailAndPasswordDir}`}
            >
              <input
                className={`w-full ${styles.noBorder} ${styles.customWhite}`}
                type={passVisible ? 'text' : 'password'}
                placeholder={t('passwordPlaceholder')}
                {...register('password')}
              />

              <div
                className="cursor-pointer"
                onClick={() => setPassVisible((pre) => !pre)}
              >
                <VisibilityIcon
                  className={`pr-2 ${styles.passwordShowStyle}`}
                />
              </div>
            </div>
            <p className="text-red-600 text-xs mt-1">
              {errors?.password?.message}
            </p>
          </div>
          {/* <div className="py-5">
            <p className={styles.warning}>
              <WarningAmberIcon className={styles.warnIconSize} />
              <span className={styles.textWarn}>{t('warnText')}</span>
            </p>
          </div> */}
          <div className="flex justify-center mt-5">
            {postRegisterLoading && <CircularProgress />}
            {!postRegisterLoading && (
              <button
                disabled={!isAgree}
                className={clsx(
                  'w-full text-sm  py-2 text-white text-center rounded-lg',
                  {
                    'bg-[#2790C3]': isAgree,
                    'bg-gray-300': !isAgree,
                  }
                )}
                type="submit"
              >
                {t('createAccountBtn')}
              </button>
            )}
          </div>
          <div className="pt-3">
            <FormGroup>
              <FormControlLabel
                className={styles.agreeTerms}
                control={
                  <Checkbox
                    defaultChecked
                    sx={sxNewStyle}
                    onChange={(e) => setIsAgree(e.target.checked)}
                    checked={isAgree}
                  />
                }
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
          {/* <div className="flex flex-row justify-center py-3">
            <div className={styles.customLineStyle}>
              <hr />
            </div>
            <div className={`text-center ${styles.orStyle}`}> {t('or')} </div>
            <div className={styles.customLineStyle}>
              <hr />
            </div>
          </div> */}
          {/* <div className="grid grid-cols-2 gap-2">
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
          </div> */}
        </form>
      </div>
    </div>
  )
}

export default SingIn
