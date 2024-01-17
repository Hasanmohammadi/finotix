const BASE_URL = 'http://172.31.30.228:8006/api/'

const AUTHENTICATION_URLS = {
  POST_LOGIN: `${BASE_URL}Authentication/Login`,
  POST_REGISTER: `${BASE_URL}Authentication/Register`,
}

const SEARCH_URLS = {
  POST_CREATE_SEARCH: `${BASE_URL}Flight/Search/CreateSearch`,
  POST_SEARCH_RESULT: `${BASE_URL}Flight/Search/GetSearchResult`,
  POST_PRICE_DETAILS: `${BASE_URL}Flight/Search/GetPriceDetails`,
  POST_ADD_TO_CARD: `${BASE_URL}Purchase/AddToCard`,
  POST_PAYMENT: (invoiceCode: string) =>
    `${BASE_URL}Purchase/Payment?invoiceCode=${invoiceCode}`,
}

const AIRLINE_URLS = {
  GET_LIST: `${BASE_URL}FlightStuff/AirlineList`,
}

const AIRPORT_URLS = {
  POST_AIRPORT_LIST: `${BASE_URL}FlightStuff/AirportList`,
}

const PAYMENT_URL = {
  POST_CREATE_PAYMENT: `${BASE_URL}Financial/CreatePayment`,
  POST_CREATE_ONLINE_PAYMENT: `${BASE_URL}Purchase/CreateOnlinePayment`,
  POST_COMPLETE_PAYMENT: `${BASE_URL}Purchase/CompletePayment`,
}

const BASIC_INFORMATION = {
  GET_PLACES: (name: string) => `${BASE_URL}BasicInformation/Place/${name}`,
  GET_BANK: `${BASE_URL}BasicInformation/Bank`,
  GET_COUNTRY: (name: string) => `${BASE_URL}BasicInformation/Country/${name}`,
}

const PROFILE_URLS = {
  POST_PERSONAL_INFORMATION: `${BASE_URL}Profile/PersonalInformation`,
  GET_PROFILE_INFORMATION: `${BASE_URL}Profile/ProfileInformation`,
  POST_PROFILE_SETTINGS: `${BASE_URL}Profile/ProfileSettings`,
  POST_CARD_INFORMATION: `${BASE_URL}Profile/CardInformation`,
  POST_CHANGE_PASSWORD: `${BASE_URL}Authentication/ChangePassword`,
}

const PURCHASE_URLS = {
  GET_PRODUCT: (invoiceCode: string) =>
    `${BASE_URL}Purchase/Product/${invoiceCode}`,
}

export {
  AUTHENTICATION_URLS,
  SEARCH_URLS,
  AIRLINE_URLS,
  AIRPORT_URLS,
  PAYMENT_URL,
  BASIC_INFORMATION,
  PROFILE_URLS,
  PURCHASE_URLS,
}
