export interface PlacesI {
  iataCode: string
  title: string
  isCity: boolean
}

export interface BankResultI {
  agencyBankId: number
  title: string
  agencyId: number
  bankId: number
  countryId: number
  shareTerminal: boolean
  internationalTerminal: boolean
  active: boolean
  currencyCode?: string
}

export interface CountryI {
  countryID: number
  title: string
  iataZoneID: number
  continentID: number
  countryCode: string
  phonePerfix: string
}
