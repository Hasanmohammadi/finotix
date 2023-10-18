import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import OtherMain from '../components/OtherMain'
import Header from '../components/header/Header'
import StaysTicket from '../components/staysTicket/StaysTicket'

export default function Home() {
  return (
    <>
      <Header />
      <StaysTicket />
    </>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'navbar',
        'main-page',
        'footer',
        'result',
      ])),
      // Will be passed to the page component as props
    },
  }
}
