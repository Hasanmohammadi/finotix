import Header from '../components/header/Header'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Profile from '../components/profile'
import { useRouter } from 'next/router'

import { isMobile as isMobileSize } from 'react-device-detect'
import { useEffect, useState } from 'react'
import { ProfileMobile } from '../components/mobile/profile'

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)
  const { push } = useRouter()

  useEffect(() => {
    setIsMobile(isMobileSize)
  }, [isMobileSize])

  useEffect(() => {
    push('?page=personal-information')
  }, [])

  return (
    <>
      {!isMobile && (
        <>
          <Header />
          <Profile />
        </>
      )}
      {isMobile && <ProfileMobile />}
    </>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['navbar', 'page-not-found'])),
      // Will be passed to the page component as props
    },
  }
}
