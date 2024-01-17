import { PassengerI } from '../../types/search'
import { AdultInformationI } from './PassengerInformation'

const changePassengerInformation = (
  data: AdultInformationI[],
  passengerTypeName?: 'child' | 'adult' | 'infant'
): PassengerI[] => {
  const passengerIndex = passengerTypeName === 'adult' ? 1 : 2
  return data.map((passenger) => ({
    gender: +passenger.gender,
    firstName: passenger.firstName,
    lastName: passenger.lastName,
    //@ts-ignore
    nationality: passenger.nationality.iataCode,
    birthDate: passenger.birthDate as string,
    passportId: passenger.passportNumber,
    passportExpireDate: passenger.passportExpiryDate as string,
    parentIndex: passengerIndex - 1,
    passengerIndex,
    passengerType: passengerIndex,
    nationalId: passenger.nationalId,
  }))
}

export default changePassengerInformation
