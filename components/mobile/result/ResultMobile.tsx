import { FilterList, KeyboardArrowLeft, Person } from '@mui/icons-material'
import { Drawer, Skeleton } from '@mui/material'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../hooks'
import { FrontDataSearchResultI } from '../../../types/search'
import MobileFilter from './components/Filter'
import TicketCardMobile from './components/TicketCardMobile'
import TopBarMobile from './components/TopBarMobile'
import { useRouter } from 'next/router'
import { setCurrencyCode } from '../../../airportsSlice'
import { useDispatch } from 'react-redux'
import SidebarMenu from '../header/components/SidebarMenu'
import ExpireTimeResult from '../../results/ExpireTimeResult'
import TicketCardLoading from '../../results/TicketCardLoading'
import EmptyState from '../../results/EmptyState'

interface ResultMobilePropsI {
  searchResultData: FrontDataSearchResultI
  postSearchResultLoading: boolean
  data: FrontDataSearchResultI
  searchResultStatus: 'error' | 'idle' | 'loading' | 'success'
  remainingData: number
}
export default function ResultMobile({
  searchResultData,
  postSearchResultLoading,
  data,
  searchResultStatus,
  remainingData,
}: ResultMobilePropsI) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [searchIdExpire, setSearchIdExpire] = useState(false)

  const { push } = useRouter()

  const {
    passengerCount,
    destination,
    origin,
    departureDate,
    returnDate,
    tripType,
    resultLoading,
  } = useAppSelector((state) => state.airportsInfo)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCurrencyCode(data?.flightGroups?.[0]?.currencyCode))
  }, [data?.flightGroups?.[0]?.currencyCode])

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
      <div className="w-full relative h-1/6 bg-[#F00] text-white py-8">
        <div className="flex items-center justify-between">
          <KeyboardArrowLeft
            fontSize="large"
            className="w-1/5"
            onClick={() => push('/')}
          />
          <div className="w-3/5">
            <div className="flex justify-center">
              <p>{origin.iataCode}</p> <p className="mx-1">to</p>{' '}
              <p>{destination.iataCode}</p>
            </div>
            <div className="flex justify-center ">
              {!!departureDate.day && (
                <p>
                  {departureDate.day}{' '}
                  {new Date(
                    departureDate.year,
                    departureDate.month - 1,
                    departureDate.day
                  ).toLocaleDateString('default', { month: 'short' })}{' '}
                  {departureDate.year}
                </p>
              )}
              {tripType === 'Round-trip' && (
                <>
                  <span className="px-2">~</span>
                  <p>
                    {returnDate?.day}{' '}
                    {new Date(
                      returnDate?.year,
                      returnDate?.month - 1,
                      returnDate?.day
                    ).toLocaleDateString('default', { month: 'short' })}{' '}
                    {returnDate?.year}
                  </p>
                </>
              )}
            </div>
            <div className="flex gap-2 justify-center">
              <div className="flex gap-1 items-center">
                <Person />
                <span>{passengerCount.adult}</span>
              </div>
              {!!passengerCount.child && (
                <div className="flex gap-1 items-center">
                  <Person fontSize="inherit" />
                  <span>{passengerCount.child}</span>
                </div>
              )}
            </div>
          </div>
          <div className="w-[19%]">
            <SidebarMenu />
          </div>
        </div>
        <TopBarMobile />
      </div>
      {/* {postSearchResultLoading ? (
        <Skeleton variant="rectangular" />
      ) : ( */}
      <>
        <div className="flex items-center flex-col pt-5">
          {!resultLoading &&
            data?.flightGroups?.map(
              ({
                flights,
                groupFares,
                groupId,
                id,
                currencyCode,
                oneAdultTotalFare,
                totalFareAmount,
              }) => (
                <TicketCardMobile
                  departureFlight={flights[0]}
                  currencyCode={currencyCode}
                  returnFlight={flights[1]}
                  groupFares={groupFares}
                  groupId={groupId}
                  id={id}
                  passengersCount={{
                    adult: searchResultData?.travelerAvailAdultCount,
                    child: searchResultData?.travelerAvailChildCount,
                    infant: searchResultData?.travelerAvailInfantCount,
                  }}
                  oneAdultTotalFare={oneAdultTotalFare}
                  totalFareAmount={totalFareAmount}
                />
              )
            )}

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
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="fixed bottom-0 w-full text-sm text-white bg-[#2790C3] px-8 py-2 right-0 left-0 m-auto"
        >
          <FilterList fontSize="medium" /> Filter
        </button>
        <Drawer
          anchor="bottom"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          sx={{
            ['.MuiPaper-root']: {
              height: '80%',
            },
          }}
        >
          <MobileFilter setIsDrawerOpen={setIsDrawerOpen} />
        </Drawer>
      </>
    </>
  )
}
