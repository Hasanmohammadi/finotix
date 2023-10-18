import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Header from '../components/header/Header'
import Payment from '../components/payment/Payment'

export default function Home() {
  return (
    <>
      <Header />
      <Payment />
    </>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'navbar',
        'main-page',
        'result',
      ])),
      // Will be passed to the page component as props
    },
  }
}
