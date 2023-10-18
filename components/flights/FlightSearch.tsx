import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import FlightLandIcon from '@mui/icons-material/FlightLand'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import { autocompleteClasses } from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import { createTheme, styled } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import DatePicker from 'react-multi-date-picker'

import {
  default as arabic,
  default as gregorian,
} from 'react-date-object/calendars/gregorian'
import persian from 'react-date-object/calendars/persian'

import { useRef, useState } from 'react'
import arabic_ar from 'react-date-object/locales/gregorian_ar'
import gregorian_en from 'react-date-object/locales/gregorian_en'
import persian_fa from 'react-date-object/locales/persian_fa'

import { Box, CircularProgress } from '@mui/material'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { UseMutateFunction } from 'react-query'
import {
  setDepartureDate,
  setDestinationAirport,
  setOriginAirport,
  setPassengersCount,
  setReturnDate,
  setTripType,
} from '../../airportsSlice'
import convertDateToUtc from '../../helper/date/convertDateToUtc'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useGetPlaces } from '../../hooks/airport'
import { CreateSearchArgsI } from '../../services/search/postCreateSearch'
import { PlacesI } from '../../types/basicInformation'
import { PostCreateSearchResultI } from '../../types/search'
import '../DatesConvert/DateConverterToJalali'
import '../DatesConvert/JalaliDateConverterToGeorgian'
import '../DatesConvert/toEnglishDigits'
import SelectSearch from '../SelectSearch'

interface DateInput {
  year: number
  month: number
  day: number
}

function formatDate({ year, month, day }: DateInput) {
  const formattedMonth = String(month).padStart(2, '0')
  const formattedDay = String(day).padStart(2, '0')

  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`

  return formattedDate
}

const today = new Date()

const year = today.getFullYear()
const month = String(today.getMonth() + 1).padStart(2, '0') // Months are zero-based, so we add 1 and format it.
const day = String(today.getDate()).padStart(2, '0')

const todayDate = `${year}-${month}-${day}`

export interface DatesI {
  returnDate: {
    from: DateI
    to: DateI
  }
  departureDate: {
    from: DateI
    to: DateI
  }
}

export interface DateI {
  year: number
  month: number
  day: number
}

interface FlightSearchPropsI {
  defaultOriginValue?: PlacesI
  defaultDestinationValue?: PlacesI
  postCreateSearchAction: UseMutateFunction<
    PostCreateSearchResultI,
    unknown,
    CreateSearchArgsI,
    unknown
  >
  postCreateSearchLoading: boolean
  onSearchClick?: () => void
  isStickyPosition?: boolean
}

export default function FlightSearch({
  postCreateSearchAction,
  postCreateSearchLoading,
  onSearchClick,
  isStickyPosition,
}: FlightSearchPropsI) {
  const { t } = useTranslation('main-page')

  const { pathname, route } = useRouter()
  const dispatch = useAppDispatch()
  const {
    passengerCount,
    destination: destinationAirport,
    origin: originAirport,
    departureDate,
    returnDate,
    tripType,
  } = useAppSelector((state) => state.airportsInfo)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [departureDateInput, setDepartureDateInput] =
    useState<DateI>(departureDate)
  const [returnDateInput, setReturnDateInput] = useState<DateI>(returnDate)
  const [wayTrip, setWayTrip] = useState(tripType)
  const [airplaneClass, setAirplaneClass] = useState('ECONOMY')
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [adult, setAdult] = useState(passengerCount.adult || 1)
  const [children, setChildren] = useState(passengerCount.child)
  const [infants, setInfants] = useState(passengerCount.infant)

  const { getPlacesData: originPlaces, placesLoading: originLoading } =
    useGetPlaces({
      count: 10,
      name: origin,
      queryKey: 'originPlaces',
    })

  const {
    getPlacesData: destinationPlaces,
    placesLoading: destinationLoading,
  } = useGetPlaces({
    count: 10,
    name: destination,
    queryKey: 'destinationPlaces',
  })

  const { control, watch, setValue } = useForm({
    defaultValues: {
      originValue: {
        label: originAirport.title,
        iataCode: originAirport.iataCode,
        isCity: originAirport.isCity,
      },
      destinationValue: {
        label: destinationAirport.title,
        iataCode: destinationAirport.iataCode,
        isCity: destinationAirport.isCity,
      },
    },
  })

  const { destinationValue, originValue } = watch()

  useEffect(() => {
    dispatch(
      setOriginAirport({
        iataCode: originValue.iataCode,
        isCity: originValue.isCity,
        title: originValue.label,
      } as PlacesI)
    )
  }, [originValue])

  useEffect(() => {
    dispatch(
      setDestinationAirport({
        iataCode: destinationValue.iataCode,
        isCity: destinationValue.isCity,
        title: destinationValue.label,
      } as PlacesI)
    )
  }, [destinationValue])

  useEffect(() => {
    dispatch(setDepartureDate(departureDateInput))
  }, [departureDateInput])

  useEffect(() => {
    dispatch(setReturnDate(returnDateInput))
  }, [returnDateInput])

  const handleWayTrip = (event: any) => {
    setWayTrip(event.target.value)
  }

  const handleAirplaneClass = (event: any) => {
    setAirplaneClass(event.target.value)
  }

  function handleDepartureDate({ day, year, month }: any) {
    setDepartureDateInput({
      day,
      month: month?.number,
      year,
    })
  }

  const datePickerRef = useRef(null)

  function handleReturnDate(data: any[]) {
    setReturnDateInput({
      day: data?.[1]?.day || data?.[0]?.day,
      month: data?.[1]?.month?.number || data?.[0]?.month?.number,
      year: data?.[1]?.year || data?.[0]?.year,
    })
  }

  const onSearch = () => {
    scrollToTop()

    if (onSearchClick) {
      onSearchClick()
    }

    dispatch(
      setPassengersCount({
        adult,
        child: children,
        infant: infants,
      })
    )

    postCreateSearchAction({
      departureDate: convertDateToUtc(departureDateInput) as string,
      returnDate:
        wayTrip === 'Round-trip'
          ? (convertDateToUtc(returnDateInput) as string)
          : '',
      origin: originValue?.iataCode as string,
      allAirportsOrigin: originValue?.isCity as boolean,
      allAirportsDestination: destinationValue?.isCity as boolean,
      destination: destinationValue?.iataCode as string,
      hasReturnFlight: wayTrip === 'Round-trip',
      travelerAvailAdultCount: adult,
      travelerAvailChildCount: children,
      travelerAvailInfantCount: infants,
      cabinClass: airplaneClass,
    })
  }

  const switchAirport = () => {
    dispatch(
      setOriginAirport({
        iataCode: destinationValue.iataCode,
        isCity: destinationValue.isCity,
        title: destinationValue.label,
      } as PlacesI)
    )
    dispatch(
      setDestinationAirport({
        iataCode: originValue.iataCode,
        isCity: originValue.isCity,
        title: originValue.label,
      } as PlacesI)
    )

    setValue('destinationValue', originValue)
    setValue('originValue', destinationValue)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    dispatch(setTripType(wayTrip))
    if (wayTrip === 'Round-trip' && !route.includes('/result')) {
      datePickerRef?.current?.openCalendar()
    }
  }, [wayTrip])

  return (
    <div className={clsx({ 'py-4': isStickyPosition })}>
      <div
        className={clsx(
          'flex h-10 w-32 transition-height duration-300 ease-in-out',
          {
            'h-0 hidden': isStickyPosition,
          }
        )}
      >
        <div className="self-center">
          <FormControl className="flex">
            <Select
              id="travel-way-select"
              label="travelWay"
              value={wayTrip}
              onChange={handleWayTrip}
            >
              <MenuItem className="trip-kind" value="Round-trip">
                {t('travelWay.roundTrip')}
              </MenuItem>
              <MenuItem className="trip-kind" value="One Way">
                {t('travelWay.oneWay')}
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="px-3 self-center">
          <FormControl className="flex" component={Box}>
            <Select
              id="travel-class-select"
              label="travelMethod"
              value={airplaneClass}
              onChange={handleAirplaneClass}
            >
              <MenuItem className="trip-kind" value="ECONOMY">
                {t('travelClass.economy')}
              </MenuItem>
              <MenuItem className="trip-kind" value="BUSINESS">
                {t('travelClass.business')}
              </MenuItem>
              <MenuItem className="trip-kind" value="FIRSTCLASS">
                {t('travelClass.firstClass')}
              </MenuItem>
              <MenuItem className="trip-kind" value="PROMO">
                {t('travelClass.promo')}
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="flex justify-between">
          <div className="flex border custom-border w-[44%] bg-white justify-between">
            <div className="self-center pl-4">
              <FlightTakeoffIcon />
            </div>
            <div className=" self-center w-44">
              <SelectSearch
                control={control}
                name="originValue"
                items={originPlaces?.map(({ iataCode, isCity, title }) => ({
                  label: title,
                  iataCode,
                  isCity,
                }))}
                className="w-full"
                setTextSearched={
                  setOrigin as React.Dispatch<React.SetStateAction<string>>
                }
                textSearched={origin as string}
                loading={originLoading}
                placeholder="From"
              />
            </div>
            <div
              className="self-center pr-4 cursor-pointer"
              onClick={switchAirport}
            >
              <CompareArrowsIcon />
            </div>
            <div className="pr-2 self-center">
              <FlightLandIcon />
            </div>
            <div className=" self-center bg-white">
              <div className=" self-center w-44">
                <SelectSearch
                  control={control}
                  name="destinationValue"
                  items={destinationPlaces?.map(
                    ({ iataCode, isCity, title }) => ({
                      label: title,
                      iataCode,
                      isCity,
                    })
                  )}
                  className="w-full"
                  setTextSearched={
                    setDestination as React.Dispatch<
                      React.SetStateAction<string>
                    >
                  }
                  textSearched={destination as string}
                  loading={destinationLoading}
                  placeholder="To"
                />
              </div>
            </div>
          </div>
          <div className="flex w-1/3 gap-2">
            <div className="flex border custom-border bg-white w-1/2">
              <div className="self-center px-2">
                <CalendarMonthIcon />
              </div>
              <div className="w-full inline-grid self-center">
                <label className="text-justify text-sm" htmlFor="date-picker">
                  {t('departureDate')}
                </label>

                <DatePicker
                  minDate={todayDate}
                  value={
                    new Date(
                      departureDateInput.year,
                      departureDateInput.month - 1,
                      departureDateInput.day
                    )
                  }
                  onChange={handleDepartureDate}
                  numberOfMonths={1}
                  inputMode="text"
                  range={false}
                  placeholder={t('dateHitPoint')}
                  calendar={
                    pathname && pathname === '/fa'
                      ? persian
                      : pathname && pathname === '/ar'
                      ? arabic
                      : gregorian
                  }
                  locale={
                    pathname && pathname === '/fa'
                      ? persian_fa
                      : pathname && pathname === '/ar'
                      ? arabic_ar
                      : gregorian_en
                  }
                />
              </div>
            </div>
            <div
              className={clsx('flex border custom-border bg-white w-1/2', {
                'text-gray-300 cursor-pointer': wayTrip === 'One Way',
              })}
              onClick={() => {
                setWayTrip('Round-trip')
              }}
            >
              <div
                className="self-center px-2"
                onClick={() => {
                  setWayTrip('Round-trip')
                }}
              >
                <CalendarMonthIcon />
              </div>
              <div
                className="w-full inline-grid self-center"
                onClick={() => {
                  setWayTrip('Round-trip')
                }}
              >
                <label
                  className="text-justify text-sm"
                  htmlFor="date-picker"
                  onClick={() => {
                    setWayTrip('Round-trip')
                  }}
                >
                  {t('returnDate')}
                </label>

                {wayTrip === 'One Way' ? (
                  <p className="mr-20 text-sm">
                    {returnDate.day
                      ? `${returnDate.year}/${returnDate.month}/${returnDate.day}`
                      : `${departureDate.year}/${departureDate.month}/${departureDate.day}`}
                  </p>
                ) : (
                  <DatePicker
                    minDate={`${departureDate.year}-${departureDate.month}-${departureDate.day}`}
                    disabled={wayTrip === 'One Way'}
                    ref={datePickerRef}
                    rangeHover
                    render={() => (
                      <div
                        className="cursor-pointer text-start"
                        onClick={() => datePickerRef?.current?.openCalendar()}
                      >
                        {returnDate.day
                          ? `${returnDate.year}/${returnDate.month}/${returnDate.day}`
                          : `${departureDate.year}/${departureDate.month}/${departureDate.day}`}{' '}
                      </div>
                    )}
                    value={[
                      new Date(
                        departureDateInput.year,
                        departureDateInput.month - 1,
                        departureDateInput.day
                      ),
                      returnDate.day
                        ? new Date(
                            returnDate.year,
                            returnDate.month - 1,
                            returnDate.day
                          )
                        : '',
                    ]}
                    onChange={handleReturnDate}
                    numberOfMonths={1}
                    inputMode="text"
                    range
                    placeholder={t('dateHitPoint')}
                    calendar={
                      pathname && pathname === '/fa'
                        ? persian
                        : pathname && pathname === '/ar'
                        ? arabic
                        : gregorian
                    }
                    locale={
                      pathname && pathname === '/fa'
                        ? persian_fa
                        : pathname && pathname === '/ar'
                        ? arabic_ar
                        : gregorian_en
                    }
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex w-[21%] justify-between">
            <div>
              <Button
                // theme={theme}
                className="black transform-none"
                id="basic-button"
                aria-controls={!!anchorEl ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={!!anchorEl ? 'true' : undefined}
                onClick={(e: any) => setAnchorEl(e.currentTarget)}
              >
                {/* <div className="flex flex-col">
                  <p className="light-gray">{`Adult ${adult}`}</p>
                  {!!children && (
                    <p className="light-gray">Children {children}</p>
                  )}
                  {!!infants && <p className="light-gray">Infants {infants}</p>}
                </div> */}
                <div className="">
                  <p className="light-gray">
                    {adult + children + infants} <br />
                    {adult + children + infants > 1
                      ? 'Passengers'
                      : 'Passenger'}
                  </p>
                </div>

                <span>
                  <ArrowDropDownIcon />
                </span>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                className="mt-4"
              >
                <div className="passenger-select-container">
                  <div className="columns-2">
                    <div className="w-full">
                      {/*TODO: change Adult with i18n for multi language pages*/}
                      <p className="px-3">Adult</p>
                    </div>
                    <div className="passenger-numbers">
                      <div>
                        <button
                          className="btn-change-value dec"
                          onClick={() => {
                            if (adult > 1) setAdult((pre) => pre - 1)
                          }}
                        >
                          -
                        </button>
                      </div>
                      <div className="self-center number-value px-2">
                        <span className="valueNumber">{adult}</span>
                      </div>
                      <div>
                        <button
                          className="btn-change-value inc"
                          onClick={() => {
                            if (adult >= 0) setAdult((pre) => pre + 1)
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="columns-2 py-5">
                    <div className="self-center">
                      <p className="px-3">Child</p>
                    </div>
                    <div className="passenger-numbers">
                      <div>
                        <button
                          className="btn-change-value"
                          onClick={() => {
                            if (children > 0) setChildren((pre) => pre - 1)
                          }}
                        >
                          -
                        </button>
                      </div>
                      <div className="self-center px-2">
                        <span>{children}</span>
                      </div>
                      <div>
                        <button
                          className="btn-change-value"
                          onClick={() => {
                            if (children >= 0) setChildren((pre) => pre + 1)
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="columns-2">
                    <div className="self-center">
                      <p className="px-3">Infant</p>
                    </div>
                    <div className="passenger-numbers">
                      <div>
                        <button
                          className="btn-change-value"
                          onClick={() => {
                            if (infants > 0) {
                              setInfants(infants - 1)
                            }
                          }}
                        >
                          -
                        </button>
                      </div>
                      <div className="self-center px-2">
                        <span>{infants}</span>
                      </div>
                      <div>
                        <button
                          className="btn-change-value"
                          onClick={() => {
                            if (infants >= 0) {
                              setInfants((pre) => pre + 1)
                            }
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Menu>
            </div>
            {postCreateSearchLoading ? (
              <CircularProgress className="mt-2" />
            ) : (
              <button
                className="search-btn"
                onClick={onSearch}
                disabled={postCreateSearchLoading}
              >
                {t('search')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
