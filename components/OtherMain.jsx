import * as React from 'react'
import { useTranslation } from 'next-i18next'
import Select from '@material-ui/core/Select'
import Link from 'next/link'
import DatePicker from 'react-multi-date-picker'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import FlightLandIcon from '@mui/icons-material/FlightLand'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled'
import { styled } from '@mui/material/styles'
import pageStyles from './sampleTicket.module.css'

import { autocompleteClasses } from '@mui/material/Autocomplete'
import styles from './LoadingResult/loadingResult.module.css'
import persian from 'react-date-object/calendars/persian'
import arabic from 'react-date-object/calendars/gregorian'
import gregorian from 'react-date-object/calendars/gregorian'

import persian_fa from 'react-date-object/locales/persian_fa'
import arabic_ar from 'react-date-object/locales/gregorian_ar'
import gregorian_en from 'react-date-object/locales/gregorian_en'
import { useEffect } from 'react'
import { useState } from 'react'

import './DatesConvert/JalaliDateConverterToGeorgian'
import './DatesConvert/DateConverterToJalali'
import './DatesConvert/toEnglishDigits'

import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TopBar from './LoadingResult/TopBar'
import SearchResult from './LoadingResult/SearchResult/SearchResult'
import Footer from './footer/Footer'
import FilterBy from './LoadingResult/filterBy/FilterBy'
import Button from '@mui/material/Button'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Menu from '@mui/material/Menu'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { red, grey } from '@material-ui/core/colors'

function valuetext(value) {
  return `${value}$`
}

let datePickerMood = 2
let pathUrl
let currentDate, backDateTrip

const Label = styled('label')({
  display: 'block',
})
let currentTimesTamp = Date.now()
let todayPersian = new Date().toLocaleDateString('fa-IR')
todayPersian = fixNumbers(todayPersian)
let today = new Date()
let dd = String(today.getDate()).padStart(2, '0')
let mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
let yyyy = today.getFullYear()
today = yyyy + '/' + mm + '/' + dd
// TODO: set persian date here
var myDate = '1401/03/31',
  dateSplitted = myDate.split('/'),
  jD = JalaliDate.jalaliToGregorian(
    dateSplitted[0],
    dateSplitted[1],
    dateSplitted[2]
  )
let jalaliToGeorgian = jD[0] + '/' + jD[1] + '/' + jD[2]
let todayArabic = new Date().toLocaleDateString('ar-SA')
todayArabic = todayArabic.split('ه')
todayArabic = todayArabic[0]
let arabicDateSplitted = todayArabic.split('/')
let arabicDD = fixNumbers(arabicDateSplitted[0])

const Input = styled('input')(({ theme }) => ({
  width: 200,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.getContrastText(theme.palette.background.paper),
}))

const Listbox = styled('ul')(({ theme }) => ({
  width: 200,
  margin: 0,
  padding: 0,
  zIndex: 1,
  position: 'absolute',
  listStyle: 'none',
  backgroundColor: theme.palette.background.paper,
  overflow: 'auto',
  maxHeight: 200,
  border: '1px solid rgba(0,0,0,.25)',
  [`& li.${autocompleteClasses.focused}`]: {
    backgroundColor: '#4a8df6',
    color: 'white',
    cursor: 'pointer',
  },
  '& li:active': {
    backgroundColor: '#2977f5',
    color: 'white',
  },
}))

const OtherMain = () => {
  //TODO: change loader
  //TODO: work filters
  //TODO: change ticket data with api data
  //TODO: work top tickets buttons
  //TODO: fix search new in top of page

  const { t } = useTranslation('main-page')
  let min = 0
  let max = 1000
  let [rangePicker, setRangePicker] = useState()
  let [pathName, setPathName] = useState('')
  let [wayTrip, setWayTrip] = useState('Round-trip')
  let [airplanClass, setAirplanClass] = useState('Economy')
  const dispatch = useDispatch()
  const { data, error } = useSelector((state) => state.cityList)
  useEffect((pathName) => {
    pathName = window.location.pathname
    setPathName(pathName)
  }, [])
  const handleWayTrip = (event) => {
    setWayTrip(event.target.value)
    if (event.target.value === 'Round-trip') {
      datePickerMood = 2
    } else {
      datePickerMood = 1
    }
  }

  const handleAirplanClass = async (event) => {
    setAirplanClass(await event.target.value)
  }

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'to-where',
    options: top100Films,
    getOptionLabel: (option) => option.title,
  })

  function handleKeyDown(e) {
    let runOnce = () =>
      setTimeout(() => {
        console.log('log')
      }, 1000)
    runOnce()
    console.log(e, 'e')
  }

  let [tripKind, setTripKind] = useState('economy')

  function handleTripKind(e) {
    setTripKind = e.target.value
    console.log(e.target.value, 'e')
  }

  let [values, setValues] = useState(null)
  let [singleDateValue, setSingleDateValue] = useState(new Date())
  const multiDateRef = useRef()
  const wayTripRef = useRef()
  console.log(wayTripRef.current, 'wayTripRef')

  function handleMultiDate(e) {
    console.log(e.length, 'ee')
    if (!e.length) {
      currentDate = e.year + '/' + e.month.number + '/' + e.day
      console.log(currentDate, 'currentDate')
    } else if (e.length === 2) {
      currentDate = e[0].year + '/' + e[0].month.number + '/' + e[0].day
      backDateTrip = e[1].year + '/' + e[1].month.number + '/' + e[1].day
      console.log(currentDate, 'currentDate')
      console.log(backDateTrip, 'backDateTrip')
    }
  }

  let [adult, setAdult] = useState(1)
  let [children, setChildren] = useState(0)
  let [infants, setInfants] = useState(0)
  let passengersDetails
  if (children !== 0 && infants !== 0) {
    passengersDetails =
      adult + ` Adult ` + children + ` Children ` + infants + ` Infants `
  } else {
    if (children === 0 && infants === 0 && adult !== 0) {
      passengersDetails = adult + ` Adult `
    } else if (children === 0 && infants !== 0 && adult !== 0) {
      passengersDetails = adult + ` Adult ` + infants + ` Infants `
    } else if (children !== 0 && infants === 0 && adult !== 0) {
      passengersDetails = adult + ` Adult ` + children + ` Children `
    } else if (children !== 0 && infants !== 0 && adult === 0) {
      passengersDetails = children + ` Children ` + infants + ` Infants `
    } else if (children === 0 && infants !== 0 && adult === 0) {
      passengersDetails = infants + ` Infants `
    } else if (children !== 0 && infants === 0 && adult === 0) {
      passengersDetails = children + ` Children `
    } else if (children !== 0 && infants !== 0 && adult !== 0) {
      passengersDetails =
        adult + ` Adult ` + children + ` Children ` + adult + ` Infants `
    } else {
      passengersDetails = 'null'
    }
  }
  const decAdualt = () => {
    if (adult > 1) setAdult(adult - 1)
  }
  const incAdualt = () => {
    if (adult >= 0) setAdult(adult + 1)
  }
  const incChildren = () => {
    if (children >= 0) setChildren(children + 1)
  }
  const decChildren = () => {
    if (children > 0) setChildren(children - 1)
  }
  const incInfants = () => {
    if (infants >= 0) {
      setInfants(infants + 1)
    }
  }
  const decInfants = () => {
    if (infants > 0) {
      setInfants(infants - 1)
    }
  }
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const sxStyle = {
    color: red[1000],
    '&.Mui-checked': {
      color: red[700],
    },
  }
  const testBardia = [
    { title: 'step1', value: 0 },
    { title: 'step2', value: 1 },
    { title: 'step3', value: 0 },
  ]
  const fakeData = [
    { title: 'Non-stop' },
    { title: 'One Stop' },
    { title: 'Two Stops' },
  ]
  const fakeAirplaneData = [
    { title: 'Pegasus' },
    { title: 'Air France' },
    { title: 'Air Serbia' },
    { title: 'Tunis Air' },
    { title: 'Turkish Airlines' },
  ]

  const handleChecked = (e) => {
    console.log(e.target.checked)
  }
  const [value, setValue] = React.useState([0, 100])

  const handleChangeSelect = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <div className="pick-ticket-container text-center m-auto pt-10">
        <div className="container ">
          <div className="flex py-5">
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
            <div className="px-4 self-center">
              <FormControl className="flex">
                <Select
                  id="travel-class-select"
                  label="travelMethod"
                  value={airplanClass}
                  onChange={handleAirplanClass}
                >
                  <MenuItem className="trip-kind" value="Economy">
                    {t('travelClass.economy')}
                  </MenuItem>
                  <MenuItem className="trip-kind" value="Business">
                    {t('travelClass.business')}
                  </MenuItem>
                  <MenuItem className="trip-kind" value="First">
                    {t('travelClass.first')}
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <Button
                className="text-black transform-none"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                {passengersDetails}
                <span>
                  <ArrowDropDownIcon />
                </span>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <div className="passenger-select-container">
                  <div className="columns-2">
                    <div className="w-full">
                      <p className="px-3">Adult</p>
                    </div>
                    <div className="passenger-numbers">
                      <div>
                        <button
                          className="btn-change-value dec"
                          onClick={decAdualt}
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
                          onClick={incAdualt}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="columns-2 py-5">
                    <div className="self-center">
                      <p className="px-3">Children</p>
                    </div>
                    <div className="passenger-numbers">
                      <div>
                        <button
                          className="btn-change-value"
                          onClick={decChildren}
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
                          onClick={incChildren}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="columns-2">
                    <div className="self-center">
                      <p className="px-3">Infants</p>
                    </div>
                    <div className="passenger-numbers">
                      <div>
                        <button
                          className="btn-change-value"
                          onClick={decInfants}
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
                          onClick={incInfants}
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
        </div>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="flex border custom-border md:col-span-3 w-full">
              <div className="self-center px-4">
                <FlightTakeoffIcon />
              </div>
              <div className="inline-grid w-full">
                <div className="self-center">
                  <div {...getRootProps()}>
                    <label className="block text-justify" htmlFor="ticket-from">
                      {t('from')}
                    </label>
                    <Input
                      className="block font-black placeholder-from-to"
                      {...getInputProps()}
                      placeholder={t('fromHintPoint')}
                    />
                  </div>
                  {groupedOptions.length > 0 ? (
                    <Listbox {...getListboxProps()}>
                      {groupedOptions.map((option, index) => (
                        <li
                          key={index}
                          className="items-list-show"
                          {...getOptionProps({
                            option,
                            index,
                          })}
                        >
                          {option.title}
                        </li>
                      ))}
                    </Listbox>
                  ) : null}
                </div>
              </div>
              <div className="px-3 self-center">
                <CompareArrowsIcon />
              </div>
              <div className="px-4 self-center">
                <FlightLandIcon />
              </div>
              <div className="w-full inline-grid self-center">
                <div>
                  <label className="block text-justify" htmlFor="to-where">
                    {t('to')}
                  </label>
                  <Input
                    className="block placeholder-from-to font-black"
                    placeholder={t('toHintPoint')}
                  />
                </div>
                {groupedOptions.length > 0 ? (
                  <Listbox>
                    {data &&
                      data.data.map((item) => {
                        ;<li className="items-list-show">{item.Title}</li>
                      })}
                  </Listbox>
                ) : null}
              </div>
            </div>
            <div className="flex border custom-border md:col-span-2">
              <div className="self-center px-4">
                <CalendarMonthIcon />
              </div>
              <div className="w-full inline-grid self-center">
                <label className="text-justify" htmlFor="date-picker">
                  {t('date')}
                </label>
                {datePickerMood && datePickerMood === 2 ? (
                  <DatePicker
                    className="red"
                    id="date-picker"
                    numberOfMonths={2}
                    range
                    ref={multiDateRef}
                    value={values}
                    onChange={handleMultiDate}
                    minDate={
                      (pathName && pathName === '') ||
                      (pathName && pathName === '/en')
                        ? today
                        : pathName && pathName === '/fa'
                        ? todayPersian
                        : pathName && pathName === '/ar'
                        ? new Date().setDate(parseInt(arabicDD) - 1)
                        : today
                    }
                    placeholder={t('dateHitPoint')}
                    calendarPosition="top-center"
                    calendar={
                      pathName && pathName === '/fa'
                        ? persian
                        : pathName && pathName === '/ar'
                        ? arabic
                        : gregorian
                    }
                    locale={
                      pathName && pathName === '/fa'
                        ? persian_fa
                        : pathName && pathName === '/ar'
                        ? arabic_ar
                        : gregorian_en
                    }
                  />
                ) : (
                  <DatePicker
                    numberOfMonths={2}
                    id="single-date-picker"
                    value={singleDateValue}
                    onChange={handleMultiDate}
                    minDate={
                      (pathName && pathName === '') ||
                      (pathName && pathName === '/en')
                        ? today
                        : pathName && pathName === '/fa'
                        ? todayPersian
                        : pathName && pathName === '/ar'
                        ? new Date().setDate(parseInt(arabicDD) - 1)
                        : today
                    }
                    placeholder={t('dateHitPoint')}
                    calendar={
                      pathName && pathName === '/fa'
                        ? persian
                        : pathName && pathName === '/ar'
                        ? arabic
                        : gregorian
                    }
                    locale={
                      pathName && pathName === '/fa'
                        ? persian_fa
                        : pathName && pathName === '/ar'
                        ? arabic_ar
                        : gregorian_en
                    }
                  />
                )}
              </div>
            </div>
            <div className="flex justify-end">
              <button className="search-btn w-full">{t('search')}</button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-200">
        <div className="container mx-auto">
          <div className="flex flex-row pt-10">
            <div className="w-3/12 sticky side-padding">
              <div>
                <FilterBy title="Filter by Price">
                  <div className="p-7 pb-0">
                    <Box>
                      <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={value}
                        onChange={handleChangeSelect}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                      />
                    </Box>
                  </div>
                  <div className="flex justify-between p-6 pt-0">
                    <span>{value[0]}$</span>
                    <span>{value[1]}$</span>
                  </div>
                </FilterBy>
              </div>
              <div className="py-3">
                <FilterBy title="Filter By Stop">
                  <div className="flex justify-start py-3">
                    <div className="px-8">
                      <button className={`${styles.link}`}>Select all</button>
                    </div>
                    <div className="px-8">
                      <button className={`${styles.link}`} disabled>
                        Deselect all
                      </button>
                    </div>
                  </div>
                  {fakeData &&
                    fakeData.map((item, index) => (
                      <div
                        className={`flex justify-between ${styles.linkStyles} ${styles.textMuted}`}
                        key={index}
                      >
                        <label className="self-center" htmlFor={item.title}>
                          {item.title}
                        </label>
                        <input
                          id={item.title}
                          className={`custom-checkbox-size ${pageStyles.checkBoxes}`}
                          type="checkbox"
                          onChange={handleChecked}
                        />
                      </div>
                    ))}
                </FilterBy>
              </div>
              <div className="pb-10">
                <FilterBy title="Filter by Airline">
                  <div className="flex justify-start py-3">
                    <div className="px-8">
                      <button className={`${styles.link}`}>Select all</button>
                    </div>
                    <div className="px-8">
                      <button className={`${styles.link} `} disabled>
                        Deselect all
                      </button>
                    </div>
                  </div>
                  {fakeAirplaneData &&
                    fakeAirplaneData.map((item, index) => (
                      <div
                        className={`flex justify-between ${styles.linkStyles}`}
                        key={index}
                      >
                        <label htmlFor={item.title}>{item.title}</label>
                        <input
                          id={item.title}
                          className="custom-checkbox-size"
                          type="checkbox"
                          onChange={handleChecked}
                        />
                      </div>
                    ))}
                </FilterBy>
              </div>
            </div>
            <div className="w-9/12">
              <TopBar />
              <SearchResult />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default OtherMain
