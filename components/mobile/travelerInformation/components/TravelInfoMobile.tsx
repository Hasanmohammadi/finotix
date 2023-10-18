import { useEffect } from 'react'
import convertSecondToMinute from '../../../../helper/date/convertSecondToMinute'
import { useAppSelector } from '../../../../hooks'
import usePostPriceDetail from '../../../../hooks/search/usePostPriceDetail'
import AirplaneIcon from '../../../../styles/images/airplane'
import CollapseItemMobile from './CollapseItemMobile'
import { setPriceDetailIds } from '../../../../airportsSlice'
import { useDispatch } from 'react-redux'

export default function TravelInfoMobile() {
  const { departureFlightInfo, returnFlightInfo, fare } = useAppSelector(
    (state) => state.airportsInfo
  )
  const dispatch = useDispatch()
  const { postPriceDetailsAction, priceDetailsData } = usePostPriceDetail()

  useEffect(() => {
    postPriceDetailsAction({
      searchId: localStorage.getItem('searchId') as string,
      flightIds: returnFlightInfo.flightId
        ? [departureFlightInfo.flightId, returnFlightInfo.flightId]
        : [departureFlightInfo.flightId],
    })
  }, [])

  useEffect(() => {
    dispatch(
      setPriceDetailIds(
        priceDetailsData?.priceDetails.map(({ priceDetailID }) => priceDetailID)
      )
    )
  }, [priceDetailsData?.priceDetails])
  return (
    <div className="bg-white mt-9 rounded-lg w-11/12 m-auto">
      <div className="flex px-4 py-3 items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            alt="airline logo"
            src={departureFlightInfo.airlineLogo}
            width={32}
            height={32}
          />
          <p className="font-normal text-xs">
            {departureFlightInfo.marketerName}
          </p>
        </div>
        <p className="font-medium text-xs">
          {departureFlightInfo?.flightNumberDisplay}
        </p>
      </div>
      <div className="flex px-4 py-2 justify-between items-center">
        <div className="text-center">
          <p className="text-base font-semibold">
            {departureFlightInfo.departureTime}
          </p>
          <p className="text-base font-normal text-gray-900">
            {departureFlightInfo.departureAirport}
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
            {convertSecondToMinute(departureFlightInfo.durationTime)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-base font-semibold">
            {departureFlightInfo.arrivalTime}
          </p>
          <p className="text-base font-normal text-gray-900">
            {departureFlightInfo.arrivalAirport}
          </p>
        </div>
      </div>
      {returnFlightInfo?.flightId && (
        <>
          <div className="flex px-4 py-3 items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                alt="airline logo"
                src={returnFlightInfo.airlineLogo}
                width={32}
                height={32}
              />
              <p className="font-normal text-xs">
                {returnFlightInfo.marketerName}
              </p>
            </div>
            <p className="font-medium text-xs">
              {returnFlightInfo?.flightNumberDisplay}
            </p>
          </div>
          <div className="flex px-4 py-2 justify-between items-center">
            <div className="text-center">
              <p className="text-base font-semibold">
                {returnFlightInfo.departureTime}
              </p>
              <p className="text-base font-normal text-gray-900">
                {returnFlightInfo.departureAirport}
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
                {convertSecondToMinute(returnFlightInfo.durationTime)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-base font-semibold">
                {returnFlightInfo.arrivalTime}
              </p>
              <p className="text-base font-normal text-gray-900">
                {returnFlightInfo.arrivalAirport}
              </p>
            </div>
          </div>
        </>
      )}
      <CollapseItemMobile />
    </div>
  )
}
