import InfiniteScroll from 'react-infinite-scroll-component'
import { Results } from '../components/results'

import { CircularProgress } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { isMobile as isMobileSize } from 'react-device-detect'
import { useDispatch } from 'react-redux'
import {
  setAirlineSelectedFilter,
  setDepartureStops,
  setOpratorDetails,
  setTotalFareAmounts,
  setArrivalStops,
  setFilter,
  setPriceFilter,
} from '../airportsSlice'
import ResultMobile from '../components/mobile/result'
import usePostSearchResult from '../hooks/search/usePostSearchResult'
import { FrontDataSearchResultI } from '../types/search'
import { useAppSelector } from '../hooks'

export default function Home() {
  const { t } = useTranslation('result')

  const {
    airlineSelectedFilter,
    departureStops,
    arrivalStops,
    filter,
    priceFilter,
  } = useAppSelector((state) => state.airportsInfo)

  const [pageNumber, setPageNumber] = useState(1)
  const [searchId, setSearchId] = useState<string>()
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
    searchResultStatus,
  } = usePostSearchResult({
    onSuccess: (newData, opratorDetails) => {
      dispatch(setOpratorDetails(opratorDetails))
      dispatch(
        setTotalFareAmounts([
          newData.minTotalFareAmount,
          newData.maxTotalFareAmount,
        ])
      )
    },
  })

  const [localStorageData, setLocalStorageData] = useState<string | null>()

  useEffect(() => {
    const handleStorageChange = () => {
      setLocalStorageData(localStorage.getItem('searchId'))
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    setPageNumber(1)
    setData({
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
  }, [
    airlineSelectedFilter,
    departureStops,
    arrivalStops,
    filter,
    priceFilter,
    localStorageData,
  ])

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
    if (localStorage.getItem('searchId')) {
      postSearchResultAction({
        page: pageNumber,
        pageSize: 10,
        searchId: localStorage.getItem('searchId') as string,
        airlines: airlineSelectedFilter,
        minTotalFareAmount: priceFilter?.[0],
        maxTotalFareAmount: priceFilter?.[1],
        departureStops,
        arrivalStops,
        orderBy: filter.name,
        orderByDesc: filter.orderByDesc,
      })
    }
  }, [
    pageNumber,
    localStorageData,
    airlineSelectedFilter,
    departureStops,
    filter,
    priceFilter,
  ])

  useEffect(() => {
    postSearchResultAction({
      page: 1,
      pageSize: 10,
      searchId: localStorage.getItem('searchId') as string,
      airlines: airlineSelectedFilter,
      minTotalFareAmount: priceFilter?.[0],
      maxTotalFareAmount: priceFilter?.[1],
      departureStops,
      arrivalStops,
      orderBy: filter.name,
      orderByDesc: filter.orderByDesc,
    })
    return () => {
      dispatch(setDepartureStops([]))
      dispatch(setArrivalStops([]))
      dispatch(setAirlineSelectedFilter([]))
      dispatch(setPriceFilter([]))
      dispatch(setFilter({ name: '', orderByDesc: false }))
    }
  }, [])

  return (
    <InfiniteScroll
      inverse={false}
      dataLength={data?.flightGroups?.length}
      next={() => {
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
            remainingData={
              searchResultData?.remainingCountAfterFilter as number
            }
            searchResultStatus={searchResultStatus}
          />
          {postSearchResultLoading && (
            <div className="flex justify-center py-10 pb-20">
              <CircularProgress />
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
            setData={setData}
            setPageNumber={setPageNumber}
            remainingData={
              searchResultData?.remainingCountAfterFilter as number
            }
            searchResultStatus={searchResultStatus}
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
