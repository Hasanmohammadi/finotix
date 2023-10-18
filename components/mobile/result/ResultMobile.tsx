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

interface ResultMobilePropsI {
  searchResultData: FrontDataSearchResultI
  postSearchResultLoading: boolean
  data: FrontDataSearchResultI
}
export default function ResultMobile({
  searchResultData,
  postSearchResultLoading,
  data,
}: ResultMobilePropsI) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { push } = useRouter()

  const { passengerCount, destination, origin, departureDate, returnDate } =
    useAppSelector((state) => state.airportsInfo)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCurrencyCode(data?.flightGroups?.[0]?.currencyCode))
  }, [data?.flightGroups?.[0]?.currencyCode])

  return (
    <>
      <div className="w-full relative h-1/6 bg-[#F00] text-white py-8">
        <div className="flex items-center justify-between">
          <KeyboardArrowLeft
            fontSize="large"
            className="w-1/5"
            onClick={() => push('/')}
          />
          <div className="w-3/5">
            <div className="flex justify-center">
              <p>{origin.title.slice(0, 10)}...</p> <p className="mx-1">-</p>{' '}
              <p>{destination.title.slice(0, 10)}...</p>
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
              {!!returnDate?.day && (
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
          <div className="w-1/5"> </div>
        </div>
        <TopBarMobile />
      </div>
      {/* {postSearchResultLoading ? (
        <Skeleton variant="rectangular" />
      ) : ( */}
      <>
        <div className="flex items-center flex-col pt-5">
          {data?.flightGroups?.map(
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
