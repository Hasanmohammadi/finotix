import { CircularProgress } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import ExpireTimeIcon from '../../styles/images/ExpireTimeIcon'
import usePostSearchResult from '../../hooks/search/usePostSearchResult'
import { usePostCreateSearch } from '../../hooks/search'
import { useDispatch } from 'react-redux'
import { setOpratorDetails, setTotalFareAmounts } from '../../airportsSlice'
import convertDateToUtc from '../../helper/date/convertDateToUtc'
import { useAppSelector } from '../../hooks'

interface ExpireTimeResultI {
  setSearchIdExpire: Dispatch<SetStateAction<boolean>>
}
export default function ExpireTimeResult({
  setSearchIdExpire,
}: ExpireTimeResultI) {
  const {
    passengerCount,
    destination: destinationAirport,
    origin: originAirport,
    departureDate,
    returnDate,
    tripType,
    departureFlightInfo,
    resultLoading,
  } = useAppSelector((state) => state.airportsInfo)

  const dispatch = useDispatch()

  const { postSearchResultAction } = usePostSearchResult({
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

  const { postCreateSearchAction } = usePostCreateSearch({
    onSuccess: (searchId) => {
      postSearchResultAction({ searchId, page: 1, pageSize: 10 })
      localStorage.setItem('searchId', searchId)
      localStorage.setItem(
        'finotixSearchIdTime',
        JSON.stringify(new Date().getTime())
      )
    },
  })

  const onSubmit = () => {
    postCreateSearchAction({
      departureDate: convertDateToUtc(departureDate) as string,
      returnDate:
        tripType === 'Round-trip'
          ? (convertDateToUtc(returnDate) as string)
          : '',
      origin: originAirport?.iataCode as string,
      allAirportsOrigin: originAirport?.isCity as boolean,
      allAirportsDestination: destinationAirport?.isCity as boolean,
      destination: destinationAirport?.iataCode as string,
      hasReturnFlight: tripType === 'Round-trip',
      travelerAvailAdultCount: passengerCount.adult,
      travelerAvailChildCount: passengerCount.child,
      travelerAvailInfantCount: passengerCount.infant,
      cabinClass: departureFlightInfo.cabinClass,
    })
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      setSearchIdExpire(false)
      localStorage.removeItem('searchId')
    }, 0)
  }

  return (
    <>
      ]{' '}
      <div
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[60] expire-time-result"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      >
        <div className="w-[700px] px-4 lg:px-0 h-screen lg:h-fit my-4 bg-white m-auto rounded-lg py-11 flex flex-col items-center gap-8 place-content-center">
          <ExpireTimeIcon />
          <div className="text-center">
            <p className="my-4">
              The information on this page was last updated a few moments ago.
            </p>
            <p className="my-4">Please search again.</p>
          </div>
          {resultLoading ? (
            <CircularProgress size={40} />
          ) : (
            <div
              className="bg-[#F00] text-white py-4 w-52 rounded-lg flex justify-center cursor-pointer"
              onClick={onSubmit}
            >
              <p className="font-bold">Search Again</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
