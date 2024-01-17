import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import TankYou from '../components/tankYou/tankYou'
import React from 'react'
import { useRouter } from 'next/router'

export default function thankYou() {
  const { query } = useRouter()

  return <TankYou />
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['tank-you'])),
      // Will be passed to the page component as props
    },
  }
}
