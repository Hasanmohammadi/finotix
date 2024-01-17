import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import AboutUs from '../components/aboutUs/AboutUs'
import Header from '../components/header/Header'
import HeaderMobile from '../components/mobile/header/HeaderMobile'

import { isMobile as isMobileSize } from 'react-device-detect'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(isMobileSize)
  }, [isMobileSize])
  return (
    <>
      {isMobile ? <HeaderMobile /> : <Header />}
      <AboutUs />
    </>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'navbar',
        'about-us',
        'footer',
      ])),
      // Will be passed to the page component as props
    },
  }
}
