import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import StaysPage from '../components/stays/StaysPage'
import React from 'react'
import Header from '../components/header/Header'

import { isMobile } from 'react-device-detect'
import { MainPageStaysMobile } from '../components/mobile/mainPage/mainPageStays'

export default function Stays() {
  return (
    <>
      {isMobile && <MainPageStaysMobile />}
      {!isMobile && (
        <>
          <Header />
          <StaysPage />
        </>
      )}
    </>
  )
}
//@ts-ignore
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['navbar', 'stays'])),
      // Will be passed to the page component as props
    },
  }
}
