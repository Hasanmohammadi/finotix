import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import clsx from 'clsx'
import { UseMutateFunction } from 'react-query'
import { useDispatch } from 'react-redux'
import { setCurrencyCode } from '../../airportsSlice'
import { useAppSelector } from '../../hooks'
import { usePostCreateSearch } from '../../hooks/search'
import {
  FrontDataSearchResultI,
  GetSearchResultResultI,
} from '../../types/search'
import TopBar from '../LoadingResult/TopBar'
import FlightSearch from '../flights/FlightSearch'
import Header from '../header/Header'
import AirlineFilterBox from './AirlineFilterBox'
import EmptyState from './EmptyState'
import PriceFilter from './PriceFilter'
import StopFilterBox from './StopFilterBox'
import TicketCardLoading from './TicketCardLoading'
import TicketsResult from './TicketsResult'
import ExpireTimeResult from './ExpireTimeResult'

interface ResultPropsI {
  searchResultData: FrontDataSearchResultI
  postSearchResultAction: UseMutateFunction<
    GetSearchResultResultI,
    unknown,
    any,
    unknown
  >
  data: FrontDataSearchResultI
  remainingData: number
  setData: Dispatch<SetStateAction<FrontDataSearchResultI>>
  setPageNumber: Dispatch<SetStateAction<number>>
  searchResultStatus: 'error' | 'idle' | 'loading' | 'success'
}

export default function Results({
  searchResultData,
  postSearchResultAction,
  data,
  setData,
  setPageNumber,
  remainingData,
  searchResultStatus,
}: ResultPropsI) {
  const { t } = useTranslation('result')
  const [small, setSmall] = useState(false)
  const [searchIdExpire, setSearchIdExpire] = useState(false)

  const {
    currencyCode,
    airlineSelectedFilter,
    departureStops,
    arrivalStops,
    filter,
    resultLoading,
  } = useAppSelector((state) => state.airportsInfo)

  const { pathname, push } = useRouter()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCurrencyCode(data?.flightGroups?.[0]?.currencyCode))
  }, [data?.flightGroups?.[0]?.currencyCode])

  const { postCreateSearchAction } = usePostCreateSearch({
    onSuccess: (searchId) => {
      postSearchResultAction({
        page: 1,
        pageSize: 5,
        searchId,
        departureStops,
        arrivalStops,
        airlines: airlineSelectedFilter,
        orderBy: filter.name,
        orderByDesc: filter.orderByDesc,
      })
      localStorage.setItem('searchId', searchId)
      localStorage.setItem(
        'finotixSearchIdTime',
        JSON.stringify(new Date().getTime())
      )
      pathname !== '/result' && push('result')
    },
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => setSmall(window.pageYOffset > 20))
    }
  }, [])

  const checkExpiration = () => {
    const savedData = localStorage.getItem('finotixSearchIdTime')
    if (savedData) {
      const timestamp = JSON.parse(savedData)

      const currentTime = new Date().getTime()
      const elapsedMinutes = (currentTime - timestamp) / (1000 * 60)

      if (elapsedMinutes >= 9) {
        setSearchIdExpire(true)
        localStorage.removeItem('finotixSearchIdTime')
      }
    }
  }

  useEffect(() => {
    const expirationInterval = setInterval(() => {
      checkExpiration()
    }, 60 * 100)

    return () => clearInterval(expirationInterval)
  }, [])

  return (
    <>
      {searchIdExpire && (
        <ExpireTimeResult setSearchIdExpire={setSearchIdExpire} />
      )}
      <Header />
      <div className="absolute w-full ">
        <div
          className={clsx(
            'flex flex-col justify-center w-full px-40 m-auto pt-0 bg-white top-0 left-0 right-0 p-6 sticky z-10',
            { 'py-1 shadow-xl': small }
          )}
        >
          <FlightSearch
            postCreateSearchAction={postCreateSearchAction}
            isStickyPosition={small}
            onSearchClick={() => {
              setPageNumber(0)
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
            }}
          />
        </div>
        <div className="bg-gray-100 pb-10  w-full">
          <div className="flex w-4/5 m-auto pt-8 gap-7">
            <div className="w-1/5 sticky top-0">
              <div className="bg-white pb-8 rounded-lg">
                <div className="border-b-2 py-3.5 border-b-gray-300 px-5">
                  <p>
                    Filter by <span className="font-bold text-base">Price</span>
                  </p>
                </div>
                <div className=" pt-4 rounded-lg px-6">
                  <PriceFilter currency={currencyCode} />
                </div>
              </div>
              <div className="bg-white pb-4 rounded-lg mt-3">
                <div className="border-b-2 py-3.5 border-b-gray-300 px-5">
                  <p>
                    Filter by <span className="font-bold text-base">Stop</span>
                  </p>
                </div>
                <div className=" pt-4 rounded-lg">
                  <StopFilterBox />
                </div>
              </div>
              <div className="bg-white pb-0 rounded-lg mt-3">
                <div className="border-b-2 py-3.5 border-b-gray-300 px-5">
                  <p>
                    Filter by{' '}
                    <span className="font-bold text-base">Airline</span>
                  </p>
                </div>
                <div className="pl-6 pt-4 rounded-lg h-60 overflow-auto">
                  <AirlineFilterBox />
                </div>
              </div>
            </div>

            <div className="w-4/5">
              <TopBar />
              {!resultLoading &&
                data?.flightGroups?.map((flightGroup) => (
                  <>
                    <TicketsResult
                      departureFlight={flightGroup?.flights?.[0]}
                      currencyCode={flightGroup?.currencyCode}
                      returnFlight={flightGroup?.flights?.[1]}
                      groupFares={flightGroup?.groupFares}
                      groupId={flightGroup?.groupId}
                      id={flightGroup?.id}
                      passengersCount={{
                        adult: searchResultData.travelerAvailAdultCount,
                        child: searchResultData.travelerAvailChildCount,
                        infant: searchResultData.travelerAvailInfantCount,
                      }}
                      oneAdultTotalFare={flightGroup?.oneAdultTotalFare}
                      totalFareAmount={flightGroup?.totalFareAmount}
                    />
                  </>
                ))}

              {resultLoading ? (
                <>
                  <TicketCardLoading />
                  <TicketCardLoading />
                  <TicketCardLoading />
                  <TicketCardLoading />
                </>
              ) : searchResultStatus === 'error' ? (
                <EmptyState />
              ) : (
                <>
                  {!!(remainingData <= 0) &&
                    !resultLoading &&
                    !!data?.flightGroups?.length && (
                      <div className="flex justify-center mt-10">
                        <p>No more result found !</p>
                      </div>
                    )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
