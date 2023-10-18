import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import { PlacesI } from './types/basicInformation'
import { todayDate } from './helper'
import { DateI, DatesI } from './components/flights/FlightSearch'
import {
  FrontDataLegI,
  FrontDataSearchResultI,
  GroupFareI,
} from './types/search'
import { PassengerInformationI } from './components/travelerInformation/PassengerInformation'

export interface FlightInfoI {
  departureTime: string
  departureDate: string
  arrivalTime: string
  returnDate: string
  arrivalCity: string
  durationTime: number
  departureAirport: string
  departureCity: string
  arrivalAirport: string
  airlineLogo: string
  flightId: string
  marketerName: string
  flightNumberDisplay: string
  cabinClass: string
  legs: FrontDataLegI[]
}
export interface PriceSummaryI {
  pricePerAdult: number
}

export interface AirportsState {
  origin: PlacesI
  destination: PlacesI
  returnDate: DateI
  departureDate: DateI
  departureFlightInfo: FlightInfoI
  returnFlightInfo: FlightInfoI
  fare: {
    groupFareI: GroupFareI[]
    totalFareAmount: number
    oneAdultTotalFare: number
  }
  passengerCount: PassengerCountI
  passengersInfo: PassengerInformationI
  priceDetailIds: string[]
  invoiceCode: string
  totalFareAmounts: [number, number]
  currencyCode: string
  ticketsResult: FrontDataSearchResultI
  tripType: 'Round-trip' | 'One Way'
}

export interface PassengerCountI {
  adult: number
  child: number
  infant: number
}

const initialState: AirportsState = {
  destination: { iataCode: '', isCity: false, title: '' },
  origin: { iataCode: '', isCity: false, title: '' },
  returnDate: { day: 0, month: 0, year: 0 },
  departureDate: todayDate({ calendarType: 'Gregorian' }),
  ticketsResult: {
    flightGroups: [],
    searchID: '',
    searchType: '',
    total: 0,
    travelerAvailAdultCount: 0,
    travelerAvailChildCount: 0,
    travelerAvailInfantCount: 0,
    maxTotalFareAmount: 0,
    minTotalFareAmount: 0,
  },
  departureFlightInfo: {
    airlineLogo: '',
    arrivalTime: '',
    arrivalCity: '',
    departureCity: '',
    departureAirport: '',
    departureTime: '',
    durationTime: 0,
    arrivalAirport: '',
    returnDate: '',
    departureDate: '',
    flightId: '',
    marketerName: '',
    flightNumberDisplay: '',
    cabinClass: '',
    legs: [],
  },
  returnFlightInfo: {
    airlineLogo: '',
    arrivalTime: '',
    arrivalCity: '',
    departureCity: '',
    departureAirport: '',
    departureTime: '',
    durationTime: 0,
    arrivalAirport: '',
    returnDate: '',
    departureDate: '',
    flightId: '',
    marketerName: '',
    flightNumberDisplay: '',
    cabinClass: '',
    legs: [],
  },
  fare: { groupFareI: [], oneAdultTotalFare: 0, totalFareAmount: 0 },
  passengerCount: { adult: 0, child: 0, infant: 0 },
  passengersInfo: {
    adults: [],
    children: [],
    contactInformation: { emailAddress: '', mobileNumber: '' },
  },
  priceDetailIds: [],
  invoiceCode: '',
  totalFareAmounts: [0, 1000],
  currencyCode: '',
  tripType: 'One Way',
}

export const airportSlice = createSlice({
  name: 'airports',
  initialState,
  reducers: {
    setOriginAirport: (state, action: PayloadAction<PlacesI>) => {
      state.origin = action.payload
    },
    setDestinationAirport: (state, action: PayloadAction<PlacesI>) => {
      state.destination = action.payload
    },
    setDepartureDate: (state, action: PayloadAction<DateI>) => {
      state.departureDate = action.payload
    },
    setReturnDate: (state, action: PayloadAction<DateI>) => {
      state.returnDate = action.payload
    },
    setDepartureFlightInfo: (state, action: PayloadAction<FlightInfoI>) => {
      state.departureFlightInfo = action.payload
    },
    setReturnFlightInfo: (state, action: PayloadAction<FlightInfoI>) => {
      state.returnFlightInfo = action.payload
    },
    setFare: (
      state,
      action: PayloadAction<{
        groupFareI: GroupFareI[]
        totalFareAmount: number
        oneAdultTotalFare: number
      }>
    ) => {
      state.fare = action.payload
    },
    setPassengersCount: (state, action: PayloadAction<PassengerCountI>) => {
      state.passengerCount = action.payload
    },
    setPriceDetailIds: (state, action: PayloadAction<string[]>) => {
      state.priceDetailIds = action.payload
    },
    setPassengersInfo: (
      state,
      action: PayloadAction<PassengerInformationI>
    ) => {
      state.passengersInfo = action.payload
    },
    setInvoiceCode: (state, action: PayloadAction<string>) => {
      state.invoiceCode = action.payload
    },
    setTotalFareAmounts: (state, action: PayloadAction<[number, number]>) => {
      state.totalFareAmounts = action.payload
    },
    setCurrencyCode: (state, action: PayloadAction<string>) => {
      state.currencyCode = action.payload
    },
    setTicketsResult: (
      state,
      action: PayloadAction<FrontDataSearchResultI>
    ) => {
      state.ticketsResult = action.payload
    },
    setTripType: (state, action: PayloadAction<'Round-trip' | 'One Way'>) => {
      console.log('🚀 ~ file: airportsSlice.ts:186 ~ action:', state.tripType)
      state.tripType = action.payload
    },
  },
})

export const {
  setDestinationAirport,
  setOriginAirport,
  setReturnDate,
  setDepartureDate,
  setDepartureFlightInfo,
  setReturnFlightInfo,
  setFare,
  setPassengersCount,
  setPassengersInfo,
  setPriceDetailIds,
  setInvoiceCode,
  setTotalFareAmounts,
  setCurrencyCode,
  setTicketsResult,
  setTripType,
} = airportSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.airportsInfo

export default airportSlice.reducer
