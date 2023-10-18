import {
  setDepartureFlightInfo,
  setFare,
  setReturnFlightInfo,
} from '../../../../airportsSlice'
import convertSecondToMinute from '../../../../helper/date/convertSecondToMinute'
import { useAppDispatch } from '../../../../hooks'
import AirplaneIcon from '../../../../styles/images/airplane'
import { FrontDataFlightsI, GroupFareI } from '../../../../types/search'
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

export default function TicketCardMobile({
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
        legs: departureFlight?.legs,
        cabinClass: departureFlight?.cabinClass,
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
    <div className="bg-white mt-3 rounded-lg w-11/12" onClick={onBook}>
      <div className="flex px-4 py-3 items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            alt="airline logo"
            src={departureFlight?.legs?.[0]?.airLineLogoUrl}
            width={32}
            height={32}
          />
          <p className="font-normal text-xs">
            {departureFlight?.legs?.[0]?.marketerName}
          </p>
        </div>
        <p className="font-medium text-xs">
          {departureFlight?.legs?.[0]?.flightNumberDisplay}
        </p>
      </div>
      <div className="flex px-4 py-2 justify-between items-center">
        <div className="text-center">
          <p className="text-base font-semibold">
            {departureFlight?.legs?.[0]?.departureTimeTimeOnly}
          </p>
          <p className="text-base font-normal text-gray-900">
            {departureFlight?.legs?.[0]?.departureAirport}
          </p>
        </div>
        <div>
          <div className="flex h-5 items-center">
            <div className="bg-red-500 rounded-full w-2 h-2"></div>
            <div className="border-b border-b-gray-100 w-28 relative">
              <AirplaneIcon className="absolute left-0 right-0 m-auto w-fit -top-1.5" />
            </div>
            <div className="border-red-300 border rounded-full w-3.5 h-3.5 relative">
              <div className="bg-red-500 rounded-full w-2 h-2 absolute left-0 right-0 m-auto top-0.5"></div>
            </div>
          </div>
          <p className="font-medium text-xs w-fit m-auto mt-2">
            {convertSecondToMinute(departureFlight.totalFlightDuration)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-base font-semibold">
            {
              departureFlight.legs[departureFlight.legs.length - 1]
                .arrivalTimeTimeOnly
            }
          </p>
          <p className="text-base font-normal text-gray-900">
            {
              departureFlight.legs[departureFlight.legs.length - 1]
                .arrivalAirport
            }
          </p>
        </div>
      </div>
      {!returnFlight?.legs?.[0] && (
        <div className="flex justify-between px-4 py-3 border-t-gray-100 border-t mt-1 border-dashed">
          <span className="font-medium text-gray-500"></span>
          <div className="flex gap-2 items-center">
            <p>{currencyCode}</p>
            <p className="font-bold text-lg">
              {oneAdultTotalFare?.toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {!!returnFlight?.legs?.length && (
        <>
          <div className="flex px-4 py-3 items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <img
                alt="airline logo"
                src={returnFlight?.legs?.[0]?.airLineLogoUrl}
                width={32}
                height={32}
              />
              <p className="font-normal text-xs">
                {returnFlight?.legs?.[0]?.marketerName}
              </p>
            </div>
            <p className="font-medium text-xs">
              {returnFlight?.legs?.[0]?.flightNumberDisplay}
            </p>
          </div>
          <div className="flex px-4 py-2 justify-between items-center">
            <div className="text-center">
              <p className="text-base font-semibold">
                {returnFlight?.legs?.[0]?.departureTimeTimeOnly}
              </p>
              <p className="text-base font-normal text-gray-900">
                {returnFlight?.legs?.[0]?.departureAirport}
              </p>
            </div>
            <div>
              <div className="flex h-5 items-center">
                <div className="bg-red-500 rounded-full w-2 h-2"></div>
                <div className="border-b border-b-gray-100 w-28 relative">
                  <AirplaneIcon className="absolute left-0 right-0 m-auto w-fit -top-1.5" />
                </div>
                <div className="border-red-300 border rounded-full w-3.5 h-3.5 relative">
                  <div className="bg-red-500 rounded-full w-2 h-2 absolute left-0 right-0 m-auto top-0.5"></div>
                </div>
              </div>
              <p className="font-medium text-xs w-fit m-auto mt-2">
                {convertSecondToMinute(returnFlight.totalFlightDuration)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-base font-semibold">
                {
                  returnFlight.legs[returnFlight.legs.length - 1]
                    .arrivalTimeTimeOnly
                }
              </p>
              <p className="text-base font-normal text-gray-900">
                {returnFlight.legs[returnFlight.legs.length - 1].arrivalAirport}
              </p>
            </div>
          </div>
          <div className="flex justify-between px-4 py-3 border-t-gray-100 border-t mt-1 border-dashed">
            <span className="font-medium text-gray-500"></span>
            <div className="flex gap-2 items-center">
              <p>{currencyCode}</p>
              <p className="font-bold text-lg">
                {oneAdultTotalFare?.toLocaleString()}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
