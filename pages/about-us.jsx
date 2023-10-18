import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import AboutUs from '../components/aboutUs/AboutUs'
import Header from '../components/header/Header'

export default function Home() {
  return (
    <>
      <Header />
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
