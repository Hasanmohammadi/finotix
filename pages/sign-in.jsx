import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import SingInUser from '../components/singIn/SingInUser'
import SignInHeader from '../components/header/SignInHeader'

export default function Home() {
  return (
    <>
      <SignInHeader />
      <SingInUser />
    </>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['navbar', 'sign-in'])),
      // Will be passed to the page component as props
    },
  }
}
