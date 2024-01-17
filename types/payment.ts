export interface PostCreatePaymentI {
  InvoiceCode: string
  PaymentItems: PaymentItem[]
}

export interface PaymentItem {
  PaymentTypeID: number
  Amount: number
  PaymentProps?: PaymentProps
}

export interface PaymentProps {
  CallbackURL?: string
  AgencyBankID?: number
  CouponCode?: string
  OrganizationCode: any
  AdditionalData: any
}

export interface CreatePaymentDataI {
  InvoiceCode: string
  PaymentedAmount: number
  TotalAmount: number
  CurrencyCode: string
  PaymentItemsResult: []
}

export interface ProductResultI {
  invoiceID: number
  invoiceCode: string
  totalAmount: number
  paymentedAmount: number
  currencyCode: string
  issueDetail: IssueDetail2I[]
  paymentDetail: any[]
  parentAgenciesDetail: ParentAgenciesDetailI[]
}

export interface ParentAgenciesDetailI {
  agencyID: number
  parentID: number
  depth: number
  agencyTypeID: number
  agencyName: string
  tradeName: string
}

export interface IssueDetail2I {
  processStatusID: number
  productTypeID: number
  invoiceItemID: number
  issueDetail: IssueDetailI
  contactDetail: ContactDetailI
  reserveDetail: ReserveDetailI
  invoiceIssuanceTime: string
  productIssuanceTime?: any
  requestorAgencyID: number
  requestorAgencyName: string
  requestorAgencyTradeName: string
  requestorMemberID: number
  requestorGivenname: string
  requestorSurname: string
  emailInvoice: boolean
  smsInvoice: boolean
  sendInfoLanguageCode: string
  extraAgency?: any
}

export interface ReserveDetailI {
  mainPNR: string
  reservedItem: boolean
  maxReserveDate: string
}

export interface ContactDetailI {
  emails: string[]
  cellphones: CellphoneI[]
  phoneNumber: string
  address: string
  agencyPhone?: any
  agencyEmail?: any
}

export interface CellphoneI {
  countryCode: string
  areaCode: string
  phoneNumber: string
}

export interface IssueDetailI {
  invoiceItemID: number
  voidPermission: boolean
  pnrDetail: PnrDetailI[]
  opratorOrderID?: any
  pnrCode: string
  travelers: TravelerI[]
  issueDetail: any[]
  flightDetail: FlightDetailI
  processStatusID: number
  productTypeID: number
  contactDetail?: any
  invoiceIssuanceTime?: any
  requestorAgencyID: number
  requestorAgencyName?: any
  requestorAgencyTradeName?: any
  requestorMemberID: number
  requestorGivenname?: any
  requestorSurname?: any
  emailInvoice: boolean
  smsInvoice: boolean
  sendInfoLanguageCode?: any
}

export interface FlightDetailI {
  searchID: string
  priceDetailID: string
  currencyCode: string
  domesticCountryID: number
  domesticFlight: boolean
  flightItems: FlightItemsI
}

export interface FlightItemsI {
  flights: FlightI[]
  airportDetails: AirportDetailI[]
  opratorDetails: OpratorDetailI[]
  aircraftDetails: AircraftDetailI[]
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

export interface AirportDetailI {
  airportCode: string
  airportName: string
  cityName: string
  countryName: string
  latitude: string
  longitude: string
  languageCode: string
}

export interface FlightI {
  flightID: string
  pricingType: string
  packageID: number
  providerCode: string
  providerDisplayName: string
  providerTitle: string
  connectionID: number
  systemFlight: boolean
  canBook: boolean
  canReserve: boolean
  isVoidable: boolean
  cabinClass: string
  stops: number
  totalFlightDuration: number
  totalFareAmount: number
  fares: FareI[]
  legs: LegI[]
  serviceProviderID: number
  reserveHelper: string
  reserveLoginCode: string
  currencyCode: string
  sellExchangeRate: number
  currencyROEID: number
  defaultROE: boolean
}

export interface LegI {
  flightNumber: string
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
}

export interface BaggageItemI {
  baggageDetailID: number
  passengerType: string
}

export interface FareI {
  passengerType: string
  quantity: number
  baseFare: number
  tax: number
  serviceCommission: number
  serviceCommissionOnFare: boolean
  serviceProviderCost: number
  serviceFee: number
  apiCost: number
  commission: number
  supplement: number
  fuel: number
  discount: number
  agencyCommission: number
  calculationsAmount: number
  markup: number
  markdown: number
  originalBaseFare: number
  originalTax: number
  originalTotalAmount: number
  fareCalculationSettings: FareCalculationSettingI[]
}

export interface FareCalculationSettingI {
  priceRuleID: number
  calculationRuleCode: string
  amount: number
  priceRuleTypeID: number
  fromAgencyID: number
  receiverAgencyID: number
  orginalAmount: number
  orginalCurrencyCode: string
  refundable: boolean
  description: string
}

export interface TravelerI {
  passengerIndex: number
  passengerType: string
  gender: string
  birthDate: string
  nationality: string
  travelerName: TravelerNameI[]
  documentsDetail: DocumentsDetailI[]
  specialRequests: any[]
  flightEtickets: any[]
  travelerCode: string
  ticketStatusID: number
}

export interface DocumentsDetailI {
  docType: string
  docID: string
  docIssueCountry: string
  expireDate?: string
  issueLocation?: string
  birthCountry?: string
}

export interface TravelerNameI {
  givenName: string
  surname: string
  languageCode: string
}

export interface PnrDetailI {
  pnrCode: string
  airlineCode: string
  flightCode: string
  flightID: number
  etickets: any[]
}

export interface CreateOnlinePaymentResultI {
  paymentCode: string
  addToCardInvoiceCode: string
  bankURL: string
  amount: number
  currencyCode: string
  mandatoryCardInformation: boolean
  cardInfromationData?: any
}

export interface CompletePaymentResultI {
  onlinePaymentSucceed: boolean
  onlinePaymentResult: OnlinePaymentResult
  productPaymentResult: ProductPaymentResult
}

export interface ProductPaymentResult {
  invoiceCode: string
  paymentedAmount: number
  totalAmount: number
  currencyCode: string
  paymentItemsResult: PaymentItemsResult[]
  errorException: ErrorException
}

export interface ErrorException {
  errorCode: string
  exceptionMessage: string
  errorMessage: string
  modelStateErrors: ModelStateError[]
}

export interface ModelStateError {
  paramName: string
  paramErrors: string[]
}

export interface PaymentItemsResult {
  paymentCode: string
  paymentStatusID: number
  paymentTypeID: number
  amount: number
  paymentGateway: string
  couponCode: string
}

export interface OnlinePaymentResult {
  agencyID: number
  currencyCode: string
  totalAmount: number
  paymentedAmount: number
  invoiceTime: string
  invoiceCode: string
  paymentDetail: PaymentDetail[]
  paymentSucceed: boolean
}

export interface PaymentDetail {
  paymentCode: string
  paymentTime: string
  activePayment: boolean
  paymentAmount: number
  paymentStatusID: number
  paymentTypeID: number
  bankAction: string
  refrenceNumber: string
  transactionNumber: string
  cardHolderPan: string
  agencyBankOnlineID: number
  onlineBankTitle: string
  bankName: string
}
