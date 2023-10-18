import DateObject from 'react-date-object'

const convertDateObjectFormatToSimpleString = (date: DateObject): string =>
  `${date?.year}-${
    date?.month?.number < 10 ? `0${date?.month?.number}` : date?.month?.number
  }-${date?.day < 10 ? `0${date?.day}` : date?.day}`

export default convertDateObjectFormatToSimpleString
