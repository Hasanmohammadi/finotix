import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Header from '../components/header/Header'
import TravelerInformation from '../components/travelerInformation/TravelerInformation'

export default function Home() {
  return (
    <>
      <Header />
      <TravelerInformation />
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
