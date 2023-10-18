const BASE_URL = 'http://172.31.30.228:8006/api/'

const AUTHENTICATION_URLS = {
  POST_LOGIN: `${BASE_URL}Authentication/Login`,
}

const SEARCH_URLS = {
  POST_CREATE_SEARCH: `${BASE_URL}Flight/Search/CreateSearch`,
  POST_SEARCH_RESULT: `${BASE_URL}Flight/Search/GetSearchResult`,
  POST_PRICE_DETAILS: `${BASE_URL}Flight/Search/GetPriceDetails`,
  POST_ADD_TO_CARD: `${BASE_URL}Flight/Search/AddToCard`,
  POST_PAYMENT: (invoiceCode: string) =>
    `${BASE_URL}Flight/Search/Payment?invoiceCode=${invoiceCode}`,
}

const AIRLINE_URLS = {
  GET_LIST: `${BASE_URL}FlightStuff/AirlineList`,
}

const AIRPORT_URLS = {
  POST_AIRPORT_LIST: `${BASE_URL}FlightStuff/AirportList`,
}

const PAYMENT_URL = {
  POST_CREATE_PAYMENT: `${BASE_URL}Financial/CreatePayment`,
}

const BASIC_INFORMATION = {
  GET_PLACES: (name: string) => `${BASE_URL}BasicInformation/Place/${name}`,
}

export {
  AUTHENTICATION_URLS,
  SEARCH_URLS,
  AIRLINE_URLS,
  AIRPORT_URLS,
  PAYMENT_URL,
  BASIC_INFORMATION,
}
