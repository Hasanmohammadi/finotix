import { PassengerI } from '../../types/search'
import { AdultInformationI } from './PassengerInformation'

const changePassengerInformation = (
  data: AdultInformationI[],
  startIndexForChild?: number
): PassengerI[] => {
  return data.map((passenger, index) => ({
    gender: +passenger.gender,
    firstName: passenger.firstName,
    lastName: passenger.lastName,
    nationality: passenger.nationality,
    birthDate: passenger.birthDate as string,
    passportId: passenger.passportNumber,
    passportExpireDate: passenger.passportExpiryDate as string,
    parentIndex: 1,
    passengerIndex: startIndexForChild || index,
    passengerType: startIndexForChild ? 2 : 1,
    nationalId: passenger.nationalId,
  }))
}

export default changePassengerInformation
