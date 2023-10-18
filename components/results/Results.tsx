import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'
import { setCurrencyCode, setTotalFareAmounts } from '../../airportsSlice'
import { useAppSelector } from '../../hooks'
import { usePostCreateSearch } from '../../hooks/search'
import usePostSearchResult from '../../hooks/search/usePostSearchResult'
import {
  FrontDataSearchResultI,
  GetSearchResultResultI,
} from '../../types/search'
import TopBar from '../LoadingResult/TopBar'
import FlightSearch from '../flights/FlightSearch'
import Header from '../header/Header'
import FilterBox from './Filter'
import PriceFilter from './PriceFilter'
import TicketsResult from './TicketsResult'
import { UseMutateFunction } from 'react-query'
import { CircularProgress, Skeleton } from '@mui/material'
import clsx from 'clsx'

interface ResultPropsI {
  searchResultData: FrontDataSearchResultI
  postSearchResultAction: UseMutateFunction<
    GetSearchResultResultI,
    unknown,
    any,
    unknown
  >
  data: FrontDataSearchResultI
  postSearchResultLoading: boolean
  remainingData: number
  setData: Dispatch<SetStateAction<FrontDataSearchResultI>>
  setPageNumber: Dispatch<SetStateAction<number>>
}

export default function Results({
  searchResultData,
  postSearchResultAction,
  data,
  postSearchResultLoading,
  setData,
  setPageNumber,
  remainingData,
}: ResultPropsI) {
  const [small, setSmall] = useState(false)

  const { t } = useTranslation('result')

  const { currencyCode } = useAppSelector((state) => state.airportsInfo)

  const { pathname, push, query } = useRouter()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCurrencyCode(data?.flightGroups?.[0]?.currencyCode))
  }, [data?.flightGroups?.[0]?.currencyCode])

  const filterOptions = [
    { label: 'Non-stop', value: 'non-stop' },
    { label: 'One Stop', value: 'one-stop' },
    { label: 'Two Stops', value: 'two-stops' },
  ]
  const airLineOptions = [
    { label: 'Pegasus', value: 'pegasus' },
    { label: 'Air France', value: 'airFrance' },
    { label: 'Air Serbia', value: 'airSerbia' },
  ]

  const handleFilterChange = (selectedOptions: string[]) => {}

  const { postCreateSearchAction, postCreateSearchLoading } =
    usePostCreateSearch({
      onSuccess: (searchId) => {
        postSearchResultAction({
          page: 1,
          pageSize: 5,
          searchId,
        })
        localStorage.setItem('searchId', searchId)
        pathname !== '/result' && push('result')
      },
    })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => setSmall(window.pageYOffset > 20))
    }
  }, [])
  console.log(
    '🚀 ~ file: Results.tsx:92 ~ searchResultData?.remainingCountAfterFilter :',
    data
  )

  return (
    <>
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
            postCreateSearchLoading={postCreateSearchLoading}
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
                <div className="px-6 pt-4 rounded-lg">
                  <PriceFilter currency={currencyCode} />
                </div>
              </div>
              <div className="bg-white pb-8 rounded-lg mt-3">
                <div className="border-b-2 py-3.5 border-b-gray-300 px-5">
                  <p>
                    Filter by <span className="font-bold text-base">Stop</span>
                  </p>
                </div>
                <div className="px-6 pt-4 rounded-lg">
                  <FilterBox
                    options={filterOptions}
                    onFilterChange={handleFilterChange}
                    filterName="stops"
                  />
                </div>
              </div>
              <div className="bg-white pb-8 rounded-lg mt-3">
                <div className="border-b-2 py-3.5 border-b-gray-300 px-5">
                  <p>
                    Filter by{' '}
                    <span className="font-bold text-base">Airline</span>
                  </p>
                </div>
                <div className="px-6 pt-4 rounded-lg">
                  <FilterBox
                    options={airLineOptions}
                    onFilterChange={handleFilterChange}
                    filterName="airline"
                  />
                </div>
              </div>
            </div>

            <div className="w-4/5">
              <TopBar />
              {data?.flightGroups?.map((flightGroup) => (
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
              {postSearchResultLoading && (
                <div className="flex justify-center mt-10 mb-5 ">
                  <CircularProgress />
                </div>
              )}
              {!!(remainingData <= 0) && !postSearchResultLoading && (
                <div className="flex justify-center mt-10">
                  <p>Done</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
