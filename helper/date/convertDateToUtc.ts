interface ConvertDateToUtcI {
  day: number
  month: number
  year: number
}

const convertDateToUtc = ({
  day,
  month,
  year,
}: ConvertDateToUtcI): Date | string =>
  `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`

export default convertDateToUtc
