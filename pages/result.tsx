import InfiniteScroll from 'react-infinite-scroll-component'
import { Results } from '../components/results'

import { CircularProgress } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { isMobile as isMobileSize } from 'react-device-detect'
import { useDispatch } from 'react-redux'
import { setTotalFareAmounts } from '../airportsSlice'
import ResultMobile from '../components/mobile/result'
import usePostSearchResult from '../hooks/search/usePostSearchResult'
import { FrontDataSearchResultI } from '../types/search'

export default function Home() {
  const { t } = useTranslation('result')

  const [resultPage, setResultPage] = useState(5)
  const [pageNumber, setPageNumber] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const [data, setData] = useState<FrontDataSearchResultI>({
    flightGroups: [],
    searchID: '',
    searchType: '',
    total: 0,
    travelerAvailAdultCount: 0,
    travelerAvailChildCount: 0,
    travelerAvailInfantCount: 0,
    maxTotalFareAmount: 0,
    minTotalFareAmount: 0,
  })

  const { query, push } = useRouter()

  const dispatch = useDispatch()

  const {
    postSearchResultAction,
    searchResultData,
    postSearchResultLoading,
    searchResultIsError,
  } = usePostSearchResult({
    onSuccess: (newData) => {
      dispatch(
        setTotalFareAmounts([
          newData.minTotalFareAmount,
          newData.maxTotalFareAmount,
        ])
      )
    },
  })

  useEffect(() => {
    if (!postSearchResultLoading) {
      if (data.searchID !== searchResultData.searchID) {
        setData(searchResultData)
      } else {
        setData({
          searchID: data?.searchID,
          searchType: data?.searchType,
          total: data?.total,
          travelerAvailAdultCount: data?.travelerAvailAdultCount,
          travelerAvailChildCount: data?.travelerAvailChildCount,
          travelerAvailInfantCount: data?.travelerAvailInfantCount,
          maxTotalFareAmount: data?.maxTotalFareAmount,
          minTotalFareAmount: data?.minTotalFareAmount,
          flightGroups: [
            ...(data?.flightGroups?.length ? data?.flightGroups : []),
            ...(searchResultData?.flightGroups?.length
              ? searchResultData?.flightGroups
              : []),
          ].flat(),
        })
      }
    }
  }, [postSearchResultLoading])

  useEffect(() => {
    setIsMobile(isMobileSize)
  }, [isMobileSize])

  useEffect(() => {
    if (window.scrollY !== 0) {
      postSearchResultAction({
        page: pageNumber,
        pageSize: 10,
        searchId: localStorage.getItem('searchId') as string,
        airlines: query.airline as string,
        maxTotalFareAmount: query?.price?.[0] ? +query?.price?.[0] : undefined,
        minTotalFareAmount: query?.price?.[1] ? +query?.price?.[1] : undefined,
      })
    }
  }, [resultPage, query])

  useEffect(() => {
    postSearchResultAction({
      page: 1,
      pageSize: resultPage,
      searchId: localStorage.getItem('searchId') as string,
      airlines: query.airline as string,
      maxTotalFareAmount: query?.price?.[0] ? +query?.price?.[0] : undefined,
      minTotalFareAmount: query?.price?.[1] ? +query?.price?.[1] : undefined,
    })
  }, [])

  useEffect(() => {
    if (searchResultIsError) {
      push('/')
    }
  }, [searchResultIsError])

  return (
    <InfiniteScroll
      inverse={false}
      dataLength={resultPage}
      next={() => {
        setResultPage((pre) => pre + 5)
        setPageNumber((pre) => pre + 1)
      }}
      hasMore={(searchResultData?.remainingCountAfterFilter as number) > 0}
      loader={
        <div className="bg-gray-100 w-full flex justify-center pb-10">
          <CircularProgress />
        </div>
      }
    >
      {isMobile && (
        <>
          <ResultMobile
            data={data}
            searchResultData={data as FrontDataSearchResultI}
            postSearchResultLoading={postSearchResultLoading}
          />
          {postSearchResultLoading && (
            <div className="flex justify-center py-10 pb-20">
              <CircularProgress />
            </div>
          )}
          {!!((searchResultData?.remainingCountAfterFilter as number) <= 0) && (
            <div className="flex justify-center py-10 pb-16">
              <p>No More Result found</p>
            </div>
          )}
        </>
      )}
      {!isMobile && (
        <>
          <Results
            data={data}
            searchResultData={data}
            postSearchResultAction={postSearchResultAction}
            postSearchResultLoading={postSearchResultLoading}
            setData={setData}
            setPageNumber={setPageNumber}
            remainingData={
              searchResultData?.remainingCountAfterFilter as number
            }
          />
        </>
      )}
    </InfiniteScroll>
  )
}

//@ts-ignore
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
