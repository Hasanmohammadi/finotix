import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ContactUs from '../components/contactUs/ContactUs'
import HeaderMobile from '../components/mobile/header/HeaderMobile'
import Header from '../components/header/Header'
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
      <ContactUs />
    </>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'navbar',
        'contact-us',
        'footer',
      ])),
      // Will be passed to the page component as props
    },
  }
}
