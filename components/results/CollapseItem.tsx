import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import { useState } from 'react'
import AirplaneIcon from '../../styles/images/airplane'
import SuitcaseOutline from '../../styles/images/suitcase-outline'
import { FrontDataFlightsI, GroupFareI } from '../../types/search'

interface TicketResultPropsI {
  departureFlight: FrontDataFlightsI
  returnFlight: FrontDataFlightsI
  groupFares: GroupFareI[]
  totalFareAmount: number
  onBook: () => void
  oneAdultTotalFare: number
}

export default function CollapseItem({
  departureFlight,
  returnFlight,
  groupFares,
  oneAdultTotalFare,
  totalFareAmount,
  onBook,
}: TicketResultPropsI) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Card
        sx={{
          minWidth: 300,
          boxShadow: 'none',
          margin: '0',
          padding: '0',
        }}
      >
        <CardHeader
          title={
            <div className="flex px-4 justify-between">
              <div
                className="flex items-center cursor-pointer w-fit"
                onClick={() => setOpen(!open)}
              >
                <p className="font-light text-sm">Details</p>
                <IconButton aria-label="expand" size="medium">
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </div>
              {!returnFlight?.legs?.[0] && (
                <button
                  className="bg-[#F00] self-end px-8 text-white rounded-lg h-7 text-sm font-semibold"
                  onClick={onBook}
                >
                  Book
                </button>
              )}
            </div>
          }
          sx={{ padding: '4px 0', border: 'none', boxShadow: 'none' }}
        ></CardHeader>
        <div>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            className=" px-2 bg-gray-200"
          >
            <CardContent className="border-b border-b-gray-500">
              <div className="flex items-center gap-3">
                <AirplaneIcon color="#1e1e1e" />
                <p className="font-semibold">
                  Departure flight
                  <span className="text-sm font-normal ml-2">
                    {`( ${departureFlight?.legs?.[0]?.arrivalTimeDateOnly} )`}
                  </span>
                </p>
              </div>

              {departureFlight?.legs.map((leg) => {
                return (
                  <>
                    <div className="mt-3 flex justify-between">
                      <div className="flex gap-2 w-1/4">
                        <img
                          src={leg.airLineLogoUrl}
                          width={40}
                          height={35}
                          className="mr-2"
                        />
                        <div>
                          <p className="text-gray-900 font-medium text-sm w-52">
                            {leg?.marketerName}
                          </p>
                          <p className="text-gray-900 font-normal text-xs my-0.5">
                            {leg?.flightNumberDisplay}
                          </p>
                          <p className="text-gray-400 font-normal text-sm">
                            {departureFlight?.cabinClass}
                          </p>
                        </div>
                      </div>
                      <div className="text-center w-1/4">
                        <p className="font-semibold text-base">
                          {leg?.departureTimeTimeOnly}
                        </p>
                        <p>
                          <span className="font-semibold text-xs">
                            {leg?.departureAirport} ,
                          </span>
                          <span className="font-normal text-xs">
                            {leg?.departureAirportName}
                          </span>
                        </p>
                        <p className="font-normal text-sm text-gray-400">
                          {leg?.departureCityName}
                        </p>
                      </div>
                      <p className="self-center font-normal text-center w-1/4">
                        {leg?.flightDurationText}
                      </p>
                      <div className="text-center w-1/4">
                        <p className="font-semibold text-base">
                          {leg?.arrivalTimeTimeOnly}
                        </p>
                        <p>
                          <span className="font-semibold text-xs">
                            {leg?.arrivalAirport} ,
                          </span>
                          <span className="font-normal text-xs">
                            {leg?.arrivalAirportName}
                          </span>
                        </p>
                        <p className="font-normal text-sm text-gray-400">
                          {leg?.arrivalCityName}
                        </p>
                      </div>
                      <div className="self-center flex items-center gap-1 w-1/4 justify-end">
                        <SuitcaseOutline />
                        <div>
                          <p className="font-normal text-xs text-gray-600">
                            Baggage:
                          </p>
                          <p className="font-normal text-xs text-gray-600">
                            {' '}
                            {leg?.baggageItems?.[0].displayText_Short}
                          </p>
                        </div>
                      </div>
                    </div>
                    {!!leg?.stopTimeToNextLegMinute && (
                      <div className=" py-1 my-2 border-t border-t-gray-400 text-center ml-14 w-28  border-b border-b-gray-400 bg-gray-100  rounded-md ">
                        <p className="font-medium text-xs">
                          Stop: {leg?.stopTimeToNextLegText}
                        </p>
                      </div>
                    )}
                  </>
                )
              })}
            </CardContent>
            {!!returnFlight?.legs?.[0] && (
              <CardContent className="">
                <div className="flex items-center gap-3 mt-5">
                  <AirplaneIcon className="rotate-180" color="#1e1e1e" />
                  <p className=" font-semibold">
                    Return flight
                    <span className="text-sm font-normal ml-2">
                      {`( ${returnFlight?.legs?.[0]?.arrivalTimeDateOnly} )`}
                    </span>
                  </p>
                </div>
                {returnFlight?.legs?.map((leg) => {
                  return (
                    <>
                      <div className="mt-3 flex justify-between">
                        <div className="flex gap-2 w-1/4">
                          <img
                            src={leg.airLineLogoUrl}
                            width={40}
                            height={35}
                            className="mr-2"
                          />
                          <div>
                            <p className="text-gray-900 font-medium text-sm w-52">
                              {leg?.marketerName}
                            </p>
                            <p className="text-gray-900 font-normal text-xs my-0.5">
                              {leg?.flightNumberDisplay}
                            </p>
                            <p className="text-gray-400 font-normal text-sm">
                              {departureFlight?.cabinClass}
                            </p>
                          </div>
                        </div>
                        <div className="text-center w-1/4">
                          <p className="font-semibold text-base">
                            {leg?.departureTimeTimeOnly}
                          </p>
                          <p>
                            <span className="font-semibold text-xs">
                              {leg?.departureAirport} ,
                            </span>
                            <span className="font-normal text-xs">
                              {leg?.departureAirportName}
                            </span>
                          </p>
                          <p className="font-normal text-sm text-gray-400">
                            {leg?.departureCityName}
                          </p>
                        </div>
                        <p className="self-center font-normal w-1/4 text-center">
                          {leg?.flightDurationText}
                        </p>
                        <div className="text-center w-1/4">
                          <p className="font-semibold text-base">
                            {leg?.arrivalTimeTimeOnly}
                          </p>
                          <p>
                            <span className="font-semibold text-xs">
                              {leg?.arrivalAirport} ,
                            </span>
                            <span className="font-normal text-xs">
                              {leg?.arrivalAirportName}
                            </span>
                          </p>
                          <p className="font-normal text-sm text-gray-400">
                            {leg?.arrivalCityName}
                          </p>
                        </div>
                        <div className="self-center flex items-center gap-1 w-1/4 justify-end">
                          <SuitcaseOutline />
                          <div>
                            <p className="font-normal text-xs text-gray-600">
                              Baggage:
                            </p>
                            <p className="font-normal text-xs text-gray-600">
                              {' '}
                              {leg?.baggageItems?.[0].displayText_Short}
                            </p>
                          </div>
                        </div>
                      </div>

                      {!!leg?.stopTimeToNextLegMinute && (
                        <div className="px-4 py-1 my-2 border-t border-t-gray-400  border-b border-b-gray-400 bg-gray-100 text-center ml-14 w-28 rounded-md ">
                          <p className="font-medium text-xs">
                            Stop: {leg?.stopTimeToNextLegText}
                          </p>
                        </div>
                      )}
                    </>
                  )
                })}
              </CardContent>
            )}
          </Collapse>
        </div>
      </Card>
    </>
  )
}
