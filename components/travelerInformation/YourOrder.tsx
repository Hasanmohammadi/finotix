import FlightIcon from '@mui/icons-material/Flight'
import convertSecondToMinute from '../../helper/date/convertSecondToMinute'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useEffect } from 'react'
import styles from './travelerInformation.module.css'
import usePostPriceDetail from '../../hooks/search/usePostPriceDetail'
import { CircularProgress } from '@mui/material'
import { setPriceDetailIds } from '../../airportsSlice'
import SuitcaseOutline from '../../styles/images/suitcase-outline'
import {
  ArrowLeft,
  ArrowRight,
  ArrowRightAlt,
  ArrowRightAltOutlined,
  ArrowRightAltSharp,
} from '@mui/icons-material'
import AirplaneIcon from '../../styles/images/airplane'

const YourOrder = () => {
  const { departureFlightInfo, returnFlightInfo, fare, currencyCode } =
    useAppSelector((state) => state.airportsInfo)

  const dispatch = useAppDispatch()

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
    <div className={styles.whiteBoxYourOrder}>
      <p className={styles.yourOrderTitle}>Your Order</p>
      <div className={styles.yourOrderContainer}>
        <div className="flex gap-3">
          <div className="w-full">
            <p>
              <FlightIcon className={styles.planeDeparture} />
              <span className="font-semibold px-2">Departure flight</span>
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {departureFlightInfo.marketerName}
              </span>
              <img
                src={departureFlightInfo.airlineLogo}
                alt="airlinePhoto"
                width={35}
                height={35}
              />
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {departureFlightInfo.flightNumberDisplay}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              {departureFlightInfo.cabinClass}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {departureFlightInfo?.legs?.length - 1}{' '}
              {departureFlightInfo?.legs?.length - 1 > 1 ? 'stops' : 'stop'}
            </p>
            <div>
              {departureFlightInfo?.legs?.map((leg, index) => (
                <div className="my-2">
                  <div className="flex gap-2">
                    <span className="font-semibold text-xs w-7">
                      {leg?.departureAirport}
                    </span>
                    <AirplaneIcon color="black" />
                    <span className="font-semibold text-xs ">
                      {leg?.arrivalAirport}
                    </span>
                  </div>
                  {index !== departureFlightInfo?.legs.length - 1 && (
                    <div className="px-2 py-1 my-1 border-t border-t-gray-400  border-b border-b-gray-400 bg-gray-50 w-full rounded-md ">
                      <p className="font-medium text-xs">
                        Stop: {leg?.stopTimeToNextLegText}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm gap-1 text-gray-600 mt-1 flex">
              <span className="flex">
                <SuitcaseOutline />:
              </span>
              {
                departureFlightInfo?.legs?.[0]?.baggageItems?.[0]
                  .displayText_Short
              }
            </p>
            <p className="text-sm text-gray-600 mt-2">
              {departureFlightInfo.departureDate}
            </p>
            <p className="text-sm text-gray-600 mt-1">{`${
              departureFlightInfo.departureTime
            } - ${departureFlightInfo.arrivalTime} (${convertSecondToMinute(
              departureFlightInfo.durationTime
            )}) `}</p>
            <p
              className={styles.orderText}
            >{`${departureFlightInfo.departureAirport} (${departureFlightInfo.departureCity}) - ${departureFlightInfo.arrivalAirport} (${departureFlightInfo.arrivalCity})`}</p>
          </div>
        </div>
        {!!returnFlightInfo.departureDate && (
          <div className="pt-4">
            <p>
              <FlightIcon className={styles.planeReturn} />
              <span className="font-semibold px-2">Return flight</span>
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {returnFlightInfo.marketerName}
              </span>
              <img
                src={returnFlightInfo.airlineLogo}
                alt="airlinePhoto"
                width={35}
                height={35}
              />
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {returnFlightInfo.flightNumberDisplay}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              {returnFlightInfo.cabinClass}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {returnFlightInfo?.legs?.length - 1}{' '}
              {returnFlightInfo?.legs?.length - 1 > 1 ? 'stops' : 'stop'}
            </p>
            <div>
              {returnFlightInfo?.legs?.map((leg, index) => (
                <div className="my-2">
                  <div className="flex gap-2">
                    <span className="font-semibold text-xs w-7">
                      {leg?.departureAirport}
                    </span>
                    <AirplaneIcon color="black" />
                    <span className="font-semibold text-xs ">
                      {leg?.arrivalAirport}
                    </span>
                  </div>
                  {index !== returnFlightInfo?.legs.length - 1 && (
                    <div className="px-2 py-1 my-1 border-t border-t-gray-400  border-b border-b-gray-400 bg-gray-50 w-full rounded-md ">
                      <p className="font-medium text-xs">
                        Stop: {leg?.stopTimeToNextLegText}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm gap-1 text-gray-600 mt-1 flex">
              <span className="flex">
                <SuitcaseOutline />:
              </span>
              {returnFlightInfo?.legs?.[0].baggageItems?.[0].displayText_Short}
            </p>
            <p className="text-base text-gray-600 mt-2">
              {returnFlightInfo.departureDate}
            </p>
            <p className="text-base text-gray-600 mt-1">{`${
              returnFlightInfo.departureTime
            } - ${returnFlightInfo.arrivalTime} (${convertSecondToMinute(
              returnFlightInfo.durationTime
            )}) `}</p>
            <p className="text-base text-gray-600 mt-1">{`${returnFlightInfo.departureAirport} (${returnFlightInfo.departureCity}) - ${returnFlightInfo.arrivalAirport} (${returnFlightInfo.arrivalCity})`}</p>
          </div>
        )}

        <div className={styles.centerOfCircle}>
          <div className={`${styles.circleShape} ${styles.leftCircle}`}></div>
          <div className={`${styles.circleShape} ${styles.rightCircle}`}></div>
        </div>
        <div className="pt-5">
          <p>Price summary</p>
          <div className="flex justify-between pt-5">
            <div>
              <p className="font-semibold">{`${fare?.groupFareI?.[0]?.quantity}x Adult`}</p>
              <p className={styles.orderText}>Price per adult</p>
              <p className={styles.orderText}>Taxes</p>
            </div>
            <div>
              <p className="font-semibold">
                {`${fare?.groupFareI?.[0]?.displayedTotal?.toLocaleString()}`}{' '}
                {currencyCode}
              </p>
              <p className={styles.orderText}>
                {`${fare?.oneAdultTotalFare?.toLocaleString()}`} {currencyCode}
              </p>
              <p className={styles.orderText}>
                {`${fare?.groupFareI?.[0]?.displayedTaxAndOther?.toLocaleString()}`}{' '}
                {currencyCode}
              </p>
            </div>
          </div>
          {!!fare?.groupFareI?.[1] && (
            <div className={`flex justify-between pt-8`}>
              <div>
                <p className="font-semibold">{`${fare?.groupFareI?.[1]?.quantity}x Child`}</p>
                <p className={styles.orderText}>Price per child</p>
                <p className={styles.orderText}>Taxes</p>
              </div>
              <div>
                <p className="font-semibold">
                  {`${fare?.groupFareI?.[1]?.displayedTotal?.toLocaleString()}`}{' '}
                  {currencyCode}
                </p>
                <p className={styles.orderText}>
                  {`${(
                    fare?.groupFareI?.[1]?.displayedTotal /
                    fare?.groupFareI?.[1]?.quantity
                  )?.toLocaleString()}`}{' '}
                  {currencyCode}
                </p>
                <p className={styles.orderText}>
                  {`${fare?.groupFareI?.[1]?.displayedTaxAndOther?.toLocaleString()}`}{' '}
                  {currencyCode}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={` ${styles.borderBottom}`}></div>
      <div className={styles.bottomTicketContainer}>
        <div className="pt-1">
          <p className="font-semibold">Total Amount</p>
          <div className="flex justify-between mt-3">
            <span>Subtotal</span>
            {!priceDetailsData?.totalFareAmount ? (
              <CircularProgress size={24} className="mr-4" />
            ) : (
              <span className="font-semibold">
                {`${priceDetailsData?.totalFareAmount?.toLocaleString()}`}{' '}
                {currencyCode}
              </span>
            )}
          </div>
        </div>
      </div>
      {/* <p className="font-semibold">{`${fare?.totalFareAmount?.toLocaleString()}`}</p> */}
    </div>
  )
}

export default YourOrder
