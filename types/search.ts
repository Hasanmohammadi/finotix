export interface PostCreateSearchResultI {
  searchId: string
  searchTimeSeconds: number
  noResultFound: boolean
}

export interface GetSearchResultArgsI {
  searchId: string
  searchFilter: {
    airlines_Departure: string[]
    airlines_Return: string[]
    airlines: string[]
    flightNumbers_text: string
    airports: string[]
    aircrafts: string[]
    departureLegsCounts: number[]
    arrivalLegsCounts: number[]
    minDepartureTakeoffTime: number
    maxDepartureTakeoffTime: number
    minDepartureLandingffTime: number
    maxDepartureLandingTime: number
    minArrivalTakeoffTime: number
    maxArrivalTakeoffTime: number
    minArrivalLandingTime: number
    maxArrivalLandingTime: number
    minLayoverDuration: number
    maxLayoverDuration: number
    minFlightDuration: number
    maxFlightDuration: number
    minTotalFareAmount: number
    maxTotalFareAmount: number
  }
  count: number
  skip: number
  orderBy: string
  orderByDesc: boolean
  pinnedFlightGroupId: string
}

export interface GetSearchResultResultI {
  searchResult: SearchResultI
  totalCounntAfterFilter: number
  remainingCountAfterFilter: number
}

export interface SearchResultI {
  searchID: string
  searchTimeSeconds: number
  responseTime: number
  finalResponseTime: number
  currencyCode: string
  searchType: string
  domesticFlight: boolean
  domesticCountryID: number
  isDomestic: boolean
  countryId: any
  hasMoreResult: boolean
  allFlightsCount: number
  allFlightGroupsCount: number
  allAirlineCount: number
  flightGroups: FlightGroupI[]
  travelerAvailAdultCount: number
  travelerAvailChildCount: number
  travelerAvailInfantCount: number
  departureDate: string
  arrivalDate: any
  airportDetails: AirportDetailI[]
  aircraftDetails: AircraftDetailI[]
  opratorDetails: OpratorDetailI[]
  marketingAirlines: string[]
  operatingAirlines: string[]
  flightNumbers: string[]
  maxTotalFareAmount: number
  minTotalFareAmount: number
  totalFareAmountFilterSteps: number
  passengerCount: number
}

export interface FlightGroupI {
  id: string
  groupId: string
  type: number
  flights: FlightI[]
  showInFirstResult: boolean
  searchID: string
  travelerAvailAdultCount: number
  travelerAvailChildCount: number
  travelerAvailInfantCount: number
  currency: string
  groupFares: GroupFareI[]
  totalFareAmount: number
  departureTime: string
  arrivalTime: string
  totalFlightDuration: number
  totalLayoverDuration: number
  isPinned: boolean
  stops: number
  marketingAirline: string
  marketerName: string
  flightNumbers: string
  marketingAirlines: string
  departureTimes: string
  passengerCount: number
  oneAdultTotalFare: number
}

export interface FlightI {
  id: string
  flightID: string
  pricingType: string
  packageID: number
  providerCode: string
  providerTitle: string
  providerDisplayName: string
  connectionID: number
  systemFlight: boolean
  canBook: boolean
  canReserve: boolean
  cabinClass: string
  stops: number
  totalFlightDuration: number
  totalFareAmount: number
  fares: FareI[]
  legs: LegI[]
  departureDate: string
}

export interface FareI {
  passengerType: string
  quantity: number
  quantityText: string
  displayedFare: number
  displayedTaxAndOther: number
  displayedFuelAndOther: number
  displayedMarkup: number
  displayedMarkDown: number
  displayedPerPax: number
  displayedCommision: number
  displayedDiscount: number
  displayedTotal: number
}

export interface LegI {
  flightNumber: string
  flightNumber_Display: string
  aircraftCode: string
  marketingAirline: string
  operatingAirline: string
  fareClass: string
  departureTime: string
  arrivalTime: string
  departureAirport: string
  arrivalAirport: string
  flightDurationMinutes: number
  layoverDurationMinutes: number
  seatCount: number
  baggageItems: BaggageItemI[]
  departureTerminal: string
  arrivalTerminal: string
  airLineLogoUrl: string
  arrivalTime_TimeOnly: string
  departureTime_TimeOnly: string
  arrivalTime_DateOnly: string
  departureTime_DateOnly: string
  flightDurationText: string
  layoverDurationText: string
  aircraftName: string
  departureAirportName: string
  departureCityName: string
  departureCountryName: string
  arrivalAirportName: string
  arrivalCityName: string
  arrivalCountryName: string
  opratorName: string
  marketerName: string
  stopTimeToNextLegMinute: number
  stopTimeToNextLegText: string
}

export interface BaggageItemI {
  baggageDetailID: number
  passengerType: string
  amount: number
  unit: string
  displayText: string
  displayText_Short: string
  unitText: string
}

export interface GroupFareI {
  passengerType: string
  quantity: number
  quantityText: string
  displayedFare: number
  displayedTaxAndOther: number
  displayedFuelAndOther: number
  displayedMarkup: number
  displayedMarkDown: number
  displayedPerPax: number
  displayedCommision: number
  displayedDiscount: number
  displayedTotal: number
}

export interface AirportDetailI {
  airportCode: string
  airportName: string
  cityName: string
  countryName: string
  latitude: string
  longitude: string
  languageCode: string
}

export interface AircraftDetailI {
  aircraftCode: string
  aircraftName: string
}

export interface OpratorDetailI {
  opratorCode: string
  opratorName: string
  countryCode: string
  languageCode: string
}

export interface FrontDataSearchResultI {
  remainingCountAfterFilter?: number
  total: number
  searchID: string
  searchType: string
  travelerAvailAdultCount: number
  travelerAvailChildCount: number
  travelerAvailInfantCount: number
  maxTotalFareAmount: number
  minTotalFareAmount: number
  flightGroups: FrontDataFlightGroupsI[]
}

export interface FrontDataFlightGroupsI {
  id: string
  groupId: string
  currencyCode: string
  oneAdultTotalFare: number
  totalFareAmount: number
  groupFares: GroupFareI[]
  flights: FrontDataFlightsI[]
}

export interface FrontDataFlightsI {
  id: string
  flightId: string
  provider: {
    code: string
    title: string
    displayName: string
  }
  connectionId: number
  canBook: boolean
  canReserve: boolean
  cabinClass: string
  stops: number
  totalFlightDuration: number
  totalFareAmount: number
  departureDate: string
  legs: FrontDataLegI[]
}

export interface FrontDataLegI {
  flightNumberDisplay: string
  departureTime: string
  arrivalTime: string
  departureAirport: string
  arrivalAirport: string
  flightDurationMinutes: number
  baggageItems: BaggageItemI[]
  airLineLogoUrl: string
  arrivalTimeTimeOnly: string
  departureTimeTimeOnly: string
  arrivalTimeDateOnly: string
  departureTimeDateOnly: string
  flightDurationText: string
  layoverDurationText: string
  departureAirportName: string
  arrivalAirportName: string
  departureCityName: string
  departureCountryName: string
  arrivalCityName: string
  arrivalCountryName: string
  opratorName: string
  marketerName: string
  stopTimeToNextLegMinute: number
  stopTimeToNextLegText: string
}

export interface PostPriceDetailsResultI {
  priceDetails: PriceDetail[]
  totalFareAmount: number
  currencyCode: string
  type: number
}

export interface PriceDetail {
  priceDetailID: string
  currencyCode: string
  totalFareAmount: number
  fareFamilyAmount: number
  priceChanged: boolean
  changePaxCount: boolean
  canReserve: boolean
  passengerCount: number
  flights: Flight[]
  freeBaggageDetails: FreeBaggageDetail[]
  purchaseNotAvailable: boolean
  message: string
  airportDetails: AirportDetail[]
  opratorDetails: OpratorDetail[]
  aircraftDetails: AircraftDetail[]
}

export interface AircraftDetail {
  aircraftCode: string
  aircraftName: string
}

export interface AirportDetail {
  airportCode: string
  airportName: string
  cityName: string
  countryName: string
  latitude: string
  longitude: string
  languageCode: string
}

export interface Flight {
  id: string
  flightID: string
  pricingType: string
  packageID: number
  providerCode: string
  providerTitle: string
  providerDisplayName: string
  connectionID: number
  systemFlight: boolean
  canBook: boolean
  canReserve: boolean
  cabinClass: string
  stops: number
  totalFlightDuration: number
  totalFareAmount: number
  legs: Leg[]
  departureDate: Date
}

export interface Leg {
  flightNumber: string
  flightNumber_Display: string
  aircraftCode: string
  marketingAirline: string
  operatingAirline: string
  fareClass: string
  departureTime: string
  arrivalTime: string
  departureAirport: string
  arrivalAirport: string
  flightDurationMinutes: number
  layoverDurationMinutes: number
  seatCount: number
  baggageItems: BaggageItem[]
  departureTerminal: string
  arrivalTerminal: string
  airLineLogoUrl: string
  arrivalTime_TimeOnly: string
  departureTime_TimeOnly: string
  arrivalTime_DateOnly: string
  departureTime_DateOnly: string
  flightDurationText: string
  layoverDurationText: string
  aircraftName: string
  departureAirportName: string
  departureCityName: string
  departureCountryName: string
  arrivalAirportName: string
  arrivalCityName: string
  arrivalCountryName: string
  opratorName: string
  marketerName: string
  stopTimeToNextLegMinute: number
  stopTimeToNextLegText: string
}

export interface BaggageItem {
  baggageDetailID: number
  passengerType: string
  amount: number
  unit: string
  displayText: string
  displayText_Short: string
  unitText: string
}

export interface FreeBaggageDetail {
  amount: number
  baggageCode: string
  passengerType: string
  itineraryReference: number
  segmentReference: number
}

export interface OpratorDetail {
  opratorCode: string
  opratorName: string
  countryCode: string
  languageCode: string
}

export interface PassengersInfoI {
  emailAddess: string
  telephoneNo: string
  mobileNo: MobileNoI
  passengers: PassengerI[]
}

export interface MobileNoI {
  countryCode: string
  cellPhoneNumber: string
}

export interface PassengerI {
  gender: number
  firstName: string
  lastName: string
  birthDate: string
  nationality: string
  passportExpireDate: string
  passportId: string
  passengerIndex: number
  passengerType: number
  nationalId: string
  parentIndex: number
}

export interface AddToCartResultI {
  invoiceCode: string
  fullPaymentAmount: number
  currencyCode: string
  addToCartDetail: AddToCartDetail[]
  warning: Warning[]
  paymentType: number
  notEnoughtCredit: boolean
}

export interface AddToCartDetail {
  priceDetailID: string
  fullTotalAmount: number
  currencyCode: string
  priceChanged: boolean
  flightReserveDetail: FlightReserveDetail
  invoiceReserveDetail: InvoiceReserveDetail
  invoiceContactList: InvoiceContactList
  warning: Warning
  finalServicePrice: number
  orginalPrices: OrginalPrice[]
}

export interface FlightReserveDetail {
  mainPNR: string
  reservedItem: boolean
  maxReserveDate: string
}

export interface InvoiceContactList {
  contactOwnerTypeID: number
  address: string
  emailAddress: string
  cellphoneNumber: string
  phoneNumber: string
}

export interface InvoiceReserveDetail {
  finalReserveOject: string
  providerID: number
}

export interface OrginalPrice {
  passengerType: number
  passengerIndex: number
  travelerCode: string
  orginalAmount: number
}

export interface Warning {
  warningCode: string
  warningMessage: string
}

export interface PaymentResultI {
  invoiceCode: string
  paymentedAmount: number
  totalAmount: number
  currencyCode: string
  paymentItemsResult: PaymentItemsResultI[]
  errorException: ErrorExceptionI
}

export interface PaymentItemsResultI {
  paymentCode: string
  paymentStatusID: number
  paymentTypeID: number
  amount: number
  paymentGateway: string
  couponCode: string
}

export interface ErrorExceptionI {
  errorCode: string
  exceptionMessage: string
  errorMessage: string
  modelStateErrors: ModelStateErrorI[]
}

export interface ModelStateErrorI {
  paramName: string
  paramErrors: string[]
}
