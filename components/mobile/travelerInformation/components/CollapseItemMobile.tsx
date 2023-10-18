import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import AirplaneIcon from '../../../../styles/images/airplane'
import SuitcaseOutline from '../../../../styles/images/suitcase-outline'
import { useState } from 'react'
import { useAppSelector } from '../../../../hooks'
import FlightIcon from '@mui/icons-material/Flight'

import styles from '../../../../components/travelerInformation/travelerInformation.module.css'
import convertSecondToMinute from '../../../../helper/date/convertSecondToMinute'

export default function CollapseItemMobile() {
  const [open, setOpen] = useState(false)

  const { departureFlightInfo, returnFlightInfo, fare } = useAppSelector(
    (state) => state.airportsInfo
  )
  return (
    <>
      <Card
        sx={{
          minWidth: 300,
          '.MuiCardHeader-root ': {
            padding: 0,
          },
        }}
      >
        <CardHeader
          title={
            <div className="flex px-2 justify-between">
              <div
                className="flex items-center cursor-pointer w-fit"
                onClick={() => setOpen(!open)}
              >
                <p className="font-normal text-base">Details</p>
                <IconButton aria-label="expand" size="medium">
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </div>
            </div>
          }
        ></CardHeader>
        <div>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            className="border-t-2 border-t-gray-100"
            sx={{ padding: '0', '.MuiCardContent-root': { padding: '0' } }}
          >
            <CardContent className="">
              <div className={styles.yourOrderContainer}>
                <div className="gap-3">
                  <div>
                    <div className="flex justify-between">
                      <p>
                        <FlightIcon className={styles.planeDeparture} />
                        <span className="font-semibold px-2">
                          Departure flight
                        </span>
                      </p>
                      <img
                        src={departureFlightInfo.airlineLogo}
                        alt=""
                        width={40}
                        height={40}
                      />
                    </div>
                    <p className={styles.orderText}>
                      {departureFlightInfo.flightNumberDisplay}
                    </p>
                    <p className={styles.orderText}>
                      {departureFlightInfo.cabinClass}
                    </p>
                    <p className={styles.orderText}>
                      {departureFlightInfo?.legs?.length - 1}{' '}
                      {departureFlightInfo?.legs?.length - 1 > 1
                        ? 'stops'
                        : 'stop'}
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
                    <p className={styles.orderText}>
                      {departureFlightInfo.departureDate}
                    </p>
                    <p className={styles.orderText}>{`${
                      departureFlightInfo.departureTime
                    } - ${
                      departureFlightInfo.arrivalTime
                    } (${convertSecondToMinute(
                      departureFlightInfo.durationTime
                    )}) `}</p>
                    <p
                      className={styles.orderText}
                    >{`${departureFlightInfo.departureAirport} (${departureFlightInfo.departureCity}) - ${departureFlightInfo.arrivalAirport} (${departureFlightInfo.arrivalCity})`}</p>
                  </div>
                </div>
                {!!returnFlightInfo.departureDate && (
                  <div className="pt-6">
                    <div className="flex justify-between">
                      <div>
                        <FlightIcon className={styles.planeReturn} />
                        <span className="font-semibold px-2 mt-2">
                          Return flight
                        </span>
                      </div>
                      <img
                        src={returnFlightInfo.airlineLogo}
                        alt=""
                        width={40}
                        height={40}
                      />
                    </div>
                    <p className={styles.orderText}>
                      {returnFlightInfo.flightNumberDisplay}
                    </p>
                    <p className={styles.orderText}>
                      {returnFlightInfo.cabinClass}
                    </p>
                    <p className={styles.orderText}>
                      {returnFlightInfo?.legs?.length - 1}{' '}
                      {returnFlightInfo?.legs?.length - 1 > 1
                        ? 'stops'
                        : 'stop'}
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
                      {
                        returnFlightInfo?.legs?.[0]?.baggageItems?.[0]
                          .displayText_Short
                      }
                    </p>
                    <p className={styles.orderText}>
                      {returnFlightInfo.departureDate}
                    </p>
                    <p className={styles.orderText}>{`${
                      returnFlightInfo.departureTime
                    } - ${
                      returnFlightInfo.arrivalTime
                    } (${convertSecondToMinute(
                      returnFlightInfo.durationTime
                    )}) `}</p>
                    <p
                      className={styles.orderText}
                    >{`${returnFlightInfo.departureAirport} (${returnFlightInfo.departureCity}) - ${returnFlightInfo.arrivalAirport} (${returnFlightInfo.arrivalCity})`}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Collapse>
        </div>
      </Card>
    </>
  )
}
