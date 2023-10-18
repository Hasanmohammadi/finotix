import { useTranslation } from 'next-i18next'
import Link from 'next/link'

import Head from 'next/head'
import '../DatesConvert/DateConverterToJalali'
import '../DatesConvert/JalaliDateConverterToGeorgian'
import '../DatesConvert/toEnglishDigits'
import FlightSearch from './FlightSearch'
import { usePostCreateSearch } from '../../hooks/search'
import { useRouter } from 'next/router'
import { PlacesI } from '../../types/basicInformation'
import { UseMutateFunction } from 'react-query'
import { PostCreateSearchResultI } from '../../types/search'
import { CreateSearchArgsI } from '../../services/search/postCreateSearch'

interface MainPageProps {
  defaultOriginValue?: PlacesI
  defaultDestinationValue?: PlacesI
  postCreateSearchAction: UseMutateFunction<
    PostCreateSearchResultI,
    unknown,
    CreateSearchArgsI,
    unknown
  >
  postCreateSearchLoading: boolean
  onSearchClick?: () => void
  isStickyPosition?: boolean
}

const MainPage = ({
  postCreateSearchAction,
  postCreateSearchLoading,
  onSearchClick,
  isStickyPosition,
}: MainPageProps) => {
  const { t } = useTranslation('main-page')
  const { pathname, push } = useRouter()

  return (
    <>
      <Head>
        <title>FINOTIX Flights</title>
      </Head>
      <div className="main-container">
        <div className="main-page-style">
          <div className="block text-center mobile-view">
            <h1 className="f-51 font-medium">
              <span className="text-red-500">{t('h1Text.cityName')}</span>
              {t('h1Text.mainText')}
            </h1>
            <h3 className="pt-3.5 text-4xl custom-gray font-thin leading-8">
              {t('titleText')}
            </h3>
          </div>
          <div className="container  box-place pt-36">
            <div className="pick-ticket-container text-center m-auto pt-6">
              <div className="columns-auto w-full" id="flights-or-stays">
                <button className="pick-ticket active">
                  <Link href="/" passHref>
                    <a>
                      <h2>{t('flights')}</h2>
                    </a>
                  </Link>
                </button>
                <button className="pick-ticket">
                  <Link href="/stays">
                    <a>{t('stays')}</a>
                  </Link>
                </button>
                <hr />
              </div>
              <FlightSearch
                postCreateSearchAction={postCreateSearchAction}
                postCreateSearchLoading={postCreateSearchLoading}
              />
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .active:after {
            border: none;
          }
        `}
      </style>
    </>
  )
}

export default MainPage
