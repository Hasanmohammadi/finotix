interface TodayDateArgsI {
  calendarType: 'Gregorian'
}

const todayDate = ({ calendarType }: TodayDateArgsI) => {
  const today = new Date()

  let year, month, day

  if (calendarType === 'Gregorian') {
    year = today.getFullYear()
    month = today.getMonth() + 1 // JavaScript months are 0-based
    day = today.getDate()
  } else {
    throw new Error('Unsupported calendar type')
  }

  return { year, month, day }
}

export default todayDate
