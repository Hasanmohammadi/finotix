import {
  setDepartureFlightInfo,
  setFare,
  setReturnFlightInfo,
} from '../../airportsSlice'
import convertSecondToMinute from '../../helper/date/convertSecondToMinute'
import { useAppDispatch } from '../../hooks'
import AirplaneIcon from '../../styles/images/airplane'
import SuitcaseOutline from '../../styles/images/suitcase-outline'
import { FrontDataFlightsI, GroupFareI } from '../../types/search'
import CollapseItem from './CollapseItem'
import { useRouter } from 'next/router'

interface TicketResultPropsI {
  departureFlight: FrontDataFlightsI
  returnFlight: FrontDataFlightsI
  groupFares: GroupFareI[]
  groupId: string
  id: string
  oneAdultTotalFare: number
  totalFareAmount: number
  currencyCode: string
  passengersCount: {
    adult: number
    child: number
    infant: number
  }
}

export default function TicketsResult({
  departureFlight,
  returnFlight,
  currencyCode,
  groupFares,
  groupId,
  id,
  passengersCount,
  oneAdultTotalFare,
  totalFareAmount,
}: TicketResultPropsI) {
  const dispatch = useAppDispatch()

  const { push } = useRouter()
  const onBook = () => {
    dispatch(
      setDepartureFlightInfo({
        departureTime: departureFlight?.legs[0].departureTimeTimeOnly,
        airlineLogo: departureFlight?.legs[0].airLineLogoUrl,
        arrivalTime:
          departureFlight?.legs[departureFlight?.legs.length - 1]
            .arrivalTimeTimeOnly,
        departureDate: departureFlight?.legs[0].departureTimeDateOnly,
        returnDate:
          departureFlight?.legs[departureFlight?.legs.length - 1]
            .arrivalTimeDateOnly,
        departureAirport: departureFlight?.legs[0].departureAirport,
        durationTime: departureFlight?.totalFlightDuration,
        arrivalAirport:
          departureFlight?.legs[departureFlight?.legs.length - 1]
            .arrivalAirport,
        arrivalCity:
          departureFlight?.legs[departureFlight?.legs.length - 1]
            .arrivalCityName,
        departureCity: departureFlight?.legs[0].departureCityName,
        flightId: departureFlight?.flightId,
        marketerName: departureFlight?.legs[0].marketerName,
        flightNumberDisplay: departureFlight?.legs[0].flightNumberDisplay,
        legs: departureFlight.legs,
        cabinClass: departureFlight.cabinClass,
      })
    )

    dispatch(
      setReturnFlightInfo({
        departureTime: returnFlight?.legs[0].departureTimeTimeOnly,
        airlineLogo: returnFlight?.legs[0].airLineLogoUrl,
        arrivalTime:
          returnFlight?.legs[returnFlight?.legs.length - 1].arrivalTimeTimeOnly,
        departureAirport: returnFlight?.legs[0].departureAirport,
        durationTime: returnFlight?.totalFlightDuration,
        arrivalAirport:
          returnFlight?.legs[returnFlight?.legs.length - 1].arrivalAirport,
        departureDate: returnFlight?.legs[0].departureTimeDateOnly,
        returnDate:
          returnFlight?.legs[returnFlight?.legs.length - 1].arrivalTimeDateOnly,
        arrivalCity:
          returnFlight?.legs[returnFlight?.legs.length - 1]?.arrivalCityName,
        departureCity: returnFlight?.legs[0]?.departureCityName,
        flightId: returnFlight?.flightId,
        marketerName: returnFlight?.legs[0].marketerName,
        flightNumberDisplay: returnFlight?.legs[0].flightNumberDisplay,
        legs: returnFlight?.legs,
        cabinClass: returnFlight?.cabinClass,
      })
    )

    dispatch(
      setFare({
        groupFareI: groupFares,
        totalFareAmount,
        oneAdultTotalFare,
      })
    )

    push('/travel-Information')
  }
  return (
    <div className="mt-4 bg-white rounded-lg">
      <div className="flex p-4 pb-0 justify-between items-center">
        <div className="flex gap-2">
          <img
            src={departureFlight?.legs?.[0]?.airLineLogoUrl}
            width={40}
            height={35}
          />
          <div>
            <p className="text-gray-900 font-normal text-sm w-32">
              {departureFlight?.legs?.[0]?.marketerName}
            </p>
            <p className="text-gray-400 font-normal text-xs w-24">
              {departureFlight?.legs?.[0]?.flightNumberDisplay}
            </p>
            <p className="text-gray-400 font-normal text-xs w-24">
              {departureFlight?.cabinClass}
            </p>
          </div>
        </div>
        <div className="">
          <p className="text-base font-semibold">
            {departureFlight?.legs?.[0]?.departureTimeTimeOnly}
          </p>
          <p className="text-base font-normal text-gray-400">
            {departureFlight?.legs?.[0]?.departureAirport}
          </p>
        </div>
        <div>
          <p className="font-medium text-xs w-fit m-auto">
            {convertSecondToMinute(departureFlight?.totalFlightDuration)}
          </p>
          <div className="flex h-5 items-center">
            <div className="bg-red-500 rounded-full w-2 h-2"></div>
            <div className="border-b border-b-gray-200 w-28 relative">
              <AirplaneIcon className="absolute left-0 right-0 m-auto w-fit -top-1.5" />
            </div>
            <div className="border-red-300 border rounded-full w-3.5 h-3.5 relative">
              <div className="bg-red-500 rounded-full w-2 h-2 absolute left-0 right-0 m-auto top-0.5"></div>
            </div>
          </div>
        </div>
        <div className="">
          <p className="text-base font-semibold">
            {
              departureFlight?.legs[departureFlight?.legs.length - 1]
                .arrivalTimeTimeOnly
            }
          </p>
          <p className="text-base font-normal text-gray-400">
            {' '}
            {
              departureFlight?.legs[departureFlight?.legs.length - 1]
                .arrivalAirport
            }
          </p>
        </div>
        <div className="w-24 text-center">
          <p className="font-normal text-xs text-gray-600">
            {departureFlight?.stops} stops
          </p>
          <p>
            {departureFlight?.legs.map(({ departureAirport }, index) => {
              if (index) {
                return (
                  <span className="font-normal text-xs text-gray-600">
                    {departureAirport}{' '}
                    {departureFlight?.legs.length - 1 !== index && ','}
                  </span>
                )
              }
            })}
          </p>
        </div>
        <div className="self-center flex items-center gap-1">
          <SuitcaseOutline />
          <div>
            <p className="font-normal text-xs text-gray-600">
              {' '}
              {departureFlight?.legs?.[0].baggageItems?.[0].displayText_Short}
            </p>
          </div>
        </div>
        <div className="w-32">
          <p>{currencyCode}</p>
          <p className="font-bold text-lg">
            {oneAdultTotalFare?.toLocaleString()}
          </p>
        </div>
      </div>
      {!!returnFlight?.legs?.[0] && (
        <div className="flex p-4 pb-0 justify-between items-center ">
          <div className="flex gap-2">
            <img
              src={returnFlight?.legs?.[0]?.airLineLogoUrl}
              width={40}
              height={35}
            />
            <div>
              <p className="text-gray-900 font-normal text-sm w-32">
                {returnFlight?.legs?.[0]?.marketerName}
              </p>
              <p className="text-gray-400 font-normal text-xs w-24">
                {returnFlight?.legs?.[0]?.flightNumberDisplay}
              </p>
              <p className="text-gray-400 font-normal text-xs w-24">
                {returnFlight?.cabinClass}
              </p>
            </div>
          </div>
          <div className="">
            <p className="text-base font-semibold">
              {returnFlight?.legs?.[0]?.departureTimeTimeOnly}
            </p>
            <p className="text-base font-normal text-gray-400">
              {returnFlight?.legs?.[0]?.departureAirport}
            </p>
          </div>
          <div>
            <p className="font-medium text-xs w-fit m-auto">
              {convertSecondToMinute(returnFlight?.totalFlightDuration)}
            </p>
            <div className="flex h-5 items-center">
              <div className="bg-red-500 rounded-full w-2 h-2"></div>
              <div className="border-b border-b-gray-200 w-28 relative">
                <AirplaneIcon className="absolute left-0 right-0 m-auto w-fit -top-1.5" />
              </div>
              <div className="border-red-300 border rounded-full w-3.5 h-3.5 relative">
                <div className="bg-red-500 rounded-full w-2 h-2 absolute left-0 right-0 m-auto top-0.5"></div>
              </div>
            </div>
          </div>
          <div className="">
            <p className="text-base font-semibold">
              {
                returnFlight?.legs[returnFlight?.legs.length - 1]
                  .arrivalTimeTimeOnly
              }
            </p>
            <p className="text-base font-normal text-gray-400">
              {' '}
              {returnFlight?.legs[returnFlight?.legs.length - 1].arrivalAirport}
            </p>
          </div>
          <div className="w-24 text-center">
            <p className="font-normal text-xs text-gray-600">
              {returnFlight?.stops} stops
            </p>
            <p>
              {returnFlight?.legs.map(({ departureAirport }, index) => {
                if (index) {
                  return (
                    <span className="font-normal text-xs text-gray-600">
                      {departureAirport}{' '}
                      {returnFlight?.legs.length - 1 !== index && ','}
                    </span>
                  )
                }
              })}
            </p>
          </div>
          <div className="self-center flex items-center gap-1">
            <SuitcaseOutline />
            <div>
              <p className="font-normal text-xs text-gray-600">
                {' '}
                {returnFlight?.legs?.[0].baggageItems?.[0].displayText_Short}
              </p>
            </div>
          </div>
          <div className="w-32">
            <button
              className="bg-[#F00] self-center px-8 text-white rounded-lg h-8 text-sm font-semibold"
              onClick={onBook}
            >
              Book
            </button>
          </div>
        </div>
      )}

      <CollapseItem
        departureFlight={departureFlight}
        returnFlight={returnFlight}
        groupFares={groupFares}
        oneAdultTotalFare={oneAdultTotalFare}
        totalFareAmount={totalFareAmount}
        onBook={onBook}
      />
    </div>
  )
}
