import { CircularProgress } from '@material-ui/core'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { usePostLogin } from '../../hooks/auth'
import styles from './signin.module.css'

import { yupResolver } from '@hookform/resolvers/yup'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

interface LoginI {
  email: string
  password: string
}

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

const SingIn = ({
  inModal,
  setModalIsOpen,
}: {
  inModal?: boolean
  setModalIsOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const { t } = useTranslation('sign-in')
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [passVisible, setPassVisible] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginI>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema),
  })
  const { push } = useRouter()

  const { postLoginAction, postLoginLoading } = usePostLogin({
    onSuccess: () => {
      if (!inModal) {
        push('/')
      } else {
        setModalIsOpen(false)
      }
    },
  })

  const handleLogIn = (data: LoginI) => {
    postLoginAction({
      userName: data.email,
      password: data.password,
    })
  }

  return (
    <form onSubmit={handleSubmit(handleLogIn)} className="container p-5 md:p-0">
      <div
        className={clsx('m-auto w-full', {
          'md:w-1/4': !inModal,
        })}
      >
        <>
          <p className={`pt-5 pb-10 ${styles.signIn} `}>{t('signIn')}</p>
          <div>
            <p className={styles.inputTitle}>Email</p>
            <input
              className={`${styles.inputStyles} ${styles.emailAndPasswordDir}`}
              {...register('email')}
            />
            <p className="text-red-600 text-xs mt-1">
              {errors?.email?.message}
            </p>
          </div>
          <div className="pt-2">
            <p className={styles.inputTitle}>{t('password')}</p>
            <div
              className={`flex pt-3 ${styles.inputStyles} ${styles.emailAndPasswordDir}`}
            >
              <input
                className={`w-full ${styles.noBorder}`}
                type={passVisible ? 'text' : 'password'}
                placeholder={t('passwordPlaceholder')}
                {...register('password')}
              />
              <div
                className="cursor-pointer"
                onClick={() => setPassVisible((pre) => !pre)}
              >
                <VisibilityIcon
                  className={` pr-2 ${styles.passwordShowStyle} `}
                />{' '}
              </div>
            </div>
            <p className="text-red-600 text-xs mt-1">
              {errors?.password?.message}
            </p>
          </div>
          {/* <div className="py-5">
            <p className={styles.warning}>
              <WarningAmberIcon className={styles.warnIconSize} />
              <span className={`font-medium ${styles.textWarn}`}>
                {t('warnText')}
              </span>
            </p>
          </div> */}
          <div className="flex justify-center my-5">
            {postLoginLoading && <CircularProgress />}
            {!postLoginLoading && (
              <button className={styles.logIn} type="submit">
                {t('logIn')}
              </button>
            )}
          </div>
          <div className="flex justify-end w-full py-4">
            <Button className={`${styles.ForgotPassword}`} onClick={handleOpen}>
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
                      className={styles.inputStyles}
                      placeholder="User Name"
                      name="userName"
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

          <div className="flex flex-row justify-center pb-5">
            <div className={styles.customLineStyle}>
              <hr />
            </div>
            <div className={`text-center ${styles.orStyle}`}> {t('or')} </div>
            <div className={styles.customLineStyle}>
              <hr />
            </div>
          </div>

          <div className={` text-center ${styles.f14}`}>
            <span className="px-2">{t('dontHaveAccount')}</span>
            <Link href="/create-account">
              <a className={styles.customLink}>{t('createOne')}</a>
            </Link>
          </div>
        </>
      </div>
    </form>
  )
}

export default SingIn
