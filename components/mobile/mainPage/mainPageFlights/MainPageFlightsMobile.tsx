import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled'
import { Box, CircularProgress } from '@mui/material'
import { autocompleteClasses } from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import DatePicker from 'react-multi-date-picker'
import { useForm } from 'react-hook-form'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import FlightLandIcon from '@mui/icons-material/FlightLand'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'

import { styled } from '@mui/material/styles'
import {
  default as arabic,
  default as gregorian,
} from 'react-date-object/calendars/gregorian'
import persian from 'react-date-object/calendars/persian'
import arabic_ar from 'react-date-object/locales/gregorian_ar'
import gregorian_en from 'react-date-object/locales/gregorian_en'
import persian_fa from 'react-date-object/locales/persian_fa'

import { MenuItem } from '@material-ui/core'
import {
  AccountCircleOutlined,
  AirlineSeatReclineNormal,
  ArrowDropDown,
  BedOutlined,
  CalendarMonth,
  FlightLand,
  FlightTakeoff,
  MenuOutlined,
  PersonRounded,
} from '@mui/icons-material'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import convertDateToUtc from '../../../../helper/date/convertDateToUtc'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { useGetPlaces } from '../../../../hooks/airport'
import { usePostCreateSearch } from '../../../../hooks/search'
import FinotixMobileLogo from '../../../../styles/images/finotixMobileLogo'
import { PlacesI } from '../../../../types/basicInformation'
import { DateI } from '../../../flights/FlightSearch'
import {
  setDepartureDate,
  setDestinationAirport,
  setOriginAirport,
  setPassengersCount,
  setReturnDate,
  setTripType,
} from '../../../../airportsSlice'
import { UseMutateFunction } from 'react-query'
import { PostCreateSearchResultI } from '../../../../types/search'
import { CreateSearchArgsI } from '../../../../services/search/postCreateSearch'
import SelectSearch from '../../../SelectSearch'

const today = new Date()

const year = today.getFullYear()
const month = String(today.getMonth() + 1).padStart(2, '0') // Months are zero-based, so we add 1 and format it.
const day = String(today.getDate()).padStart(2, '0')

const todayDate = `${year}-${month}-${day}`

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

export default function MainPageFlightsMobile({
  postCreateSearchAction,
  postCreateSearchLoading,
  onSearchClick,
  isStickyPosition,
}: FlightSearchPropsI) {
  const { t } = useTranslation('main-page')

  const { pathname, route, push } = useRouter()
  console.log('🚀 ~ file: FlightSearch.tsx:116 ~ useRouter():', useRouter())
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
      console.log('open')
    }
  }, [wayTrip])

  return (
    <>
      <div className="pt-8 bg-[#F00]">
        <div className="flex justify-between px-6">
          <FinotixMobileLogo />
          <div className="flex gap-4">
            <div onClick={() => push('/sign-in')}>
              <AccountCircleOutlined htmlColor="white" fontSize="large" />
            </div>
            {/* <MenuOutlined htmlColor="white" fontSize="large" /> */}
          </div>
        </div>
        <div className="mt-10 flex text-white w-full h-full">
          <div className="flex gap-2 w-1/2 justify-center pb-4 border-b-4 border-b-white">
            <FlightTakeoff />
            <span>Flights</span>
          </div>
          <div
            className="flex gap-2 w-1/2 justify-center pb-4"
            onClick={() => push('/stays')}
          >
            <BedOutlined />
            <span>Stays</span>
          </div>
        </div>
      </div>
      <div className="mt-5 px-4">
        <div className="bg-gray-200 flex w-full p-1 rounded-md">
          <div
            className={clsx('w-1/2 py-1 px-10 rounded-md flex justify-center', {
              'bg-white': wayTrip === 'One Way',
            })}
            onClick={() => setWayTrip('One Way')}
          >
            <p>One-way</p>
          </div>
          <div
            className={clsx('w-1/2 py-1 px-10 rounded-md flex justify-center', {
              'bg-white': wayTrip === 'Round-trip',
            })}
            onClick={() => setWayTrip('Round-trip')}
          >
            <p>Round Trip</p>
          </div>
        </div>
      </div>

      <div className="mt-5 px-4">
        <div className="">
          <div className=" self-center flex bg-white rounded-lg">
            <div className="self-center px-2">
              <FlightTakeoffIcon htmlColor="#A9B4C1" />
            </div>
            <div className=" self-center w-full">
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
          </div>

          <div className=" self-center flex bg-white mt-4 rounded-lg">
            <div className="px-2 self-center">
              <FlightLandIcon htmlColor="#A9B4C1" />
            </div>
            <div className=" self-center w-full">
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
                  setDestination as React.Dispatch<React.SetStateAction<string>>
                }
                textSearched={destination as string}
                loading={destinationLoading}
                placeholder="To"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-11/12 bg-white items-center mt-6 px-2 py-2 rounded-md">
            <p className="text-sm ">{t('departureDate')}</p>
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
          <div
            className={clsx(
              'w-11/12 bg-white  items-center mt-6 px-2 py-2 rounded-md',
              {
                'opacity-40': wayTrip === 'One Way',
              }
            )}
            onClick={() => {
              setWayTrip('Round-trip')
            }}
          >
            <p className="text-sm">{t('returnDate')}</p>
            {wayTrip === 'One Way' ? (
              <p className="mr-20 text-sm">
                {returnDate.day
                  ? `${returnDate.year}/${returnDate.month}/${returnDate.day}`
                  : `${departureDate.year}/${departureDate.month}/${departureDate.day}`}
              </p>
            ) : (
              <>
                <DatePicker
                  minDate={`${departureDate.year}-${departureDate.month}-${departureDate.day}`}
                  disabled={wayTrip === 'One Way'}
                  ref={datePickerRef}
                  rangeHover
                  render={() => (
                    <div
                      className="cursor-pointer text-start text-sm"
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
              </>
            )}
          </div>
        </div>
        <div className="w-full bg-white flex gap-3 items-center mt-6 px-2 py-2 rounded-md">
          <PersonRounded htmlColor="#A9B4C1" />
          <div className="w-full">
            <Button
              className="black transform-none flex  justify-between w-full "
              id="basic-button"
              aria-controls={!!anchorEl ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={!!anchorEl ? 'true' : undefined}
              onClick={(e: any) => setAnchorEl(e.currentTarget)}
              sx={{
                ['&.MuiButtonBase-root']: {
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.2rem 0',
                },
              }}
            >
              <span className="light-gray">{`Adult ${adult} ${
                children ? `- Children ${children}` : ''
              } ${infants ? `- Infants  ${infants}` : ''}`}</span>
              <span>
                <ArrowDropDown htmlColor="#757575" />
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
        </div>
        <div className="w-full bg-white flex gap-3 items-center mt-6 px-2 py-2 rounded-md">
          <AirlineSeatReclineNormal htmlColor="#A9B4C1" />
          <FormControl className="flex w-full" component={Box}>
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

      <div className="mt-5 px-4 w-full flex">
        {postCreateSearchLoading ? (
          <CircularProgress className="mt-2 m-auto" />
        ) : (
          <button
            onClick={onSearch}
            className="py-3 bg-[#F00] text-white rounded-md w-full"
          >
            {t('search')}
          </button>
        )}
      </div>
    </>
  )
}
