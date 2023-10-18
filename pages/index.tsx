import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import MainPage from '../components/flights/MainPage'
import Header from '../components/header/Header'

import { isMobile } from 'react-device-detect'
import { MainPageFlightsMobile } from '../components/mobile/mainPage/mainPageFlights'
import { usePostCreateSearch } from '../hooks/search'
import { useRouter } from 'next/router'

export default function Home() {
  const { pathname, push } = useRouter()
  const { postCreateSearchAction, postCreateSearchLoading } =
    usePostCreateSearch({
      onSuccess: (searchId) => {
        localStorage.setItem('searchId', searchId)
        pathname !== '/result' && push('result')
      },
    })

  return (
    <>
      {isMobile && (
        <div className="bg-gray-100 h-screen w-screen">
          <MainPageFlightsMobile
            postCreateSearchAction={postCreateSearchAction}
            postCreateSearchLoading={postCreateSearchLoading}
          />
        </div>
      )}
      {!isMobile && (
        <main>
          <Header />
          <MainPage
            postCreateSearchAction={postCreateSearchAction}
            postCreateSearchLoading={postCreateSearchLoading}
          />
        </main>
      )}
    </>
  )
}

//@ts-ignore
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'newsletter', // Add newsletter translations
        'built-in-demo', // Add the built-in demo translations
        'navbar',
        'main-page',
        'result',
      ])),
      // Will be passed to the page component as props
    },
  }
}
