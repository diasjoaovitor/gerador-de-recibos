import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export const currentDate = dayjs().format('YYYY-MM-DD')

const formatDateToUTC = (date: string) => new Date(date).getTime()

export const endDateIsGreater = (date: string, endDate: string) => {
  return formatDateToUTC(date) < formatDateToUTC(endDate)
}

export const getYearMonth = (date: string) => dayjs(date).format('YYYY-MM')

export const getEndDate = (date: string) =>
  dayjs(date).add(30, 'days').format('YYYY-MM-DD')

export const getNumberOfMonths = (date: string, endDate: string) => {
  const start = dayjs(date)
  const end = dayjs(endDate)
  const numberOfMonths = end.diff(start, 'month')
  return numberOfMonths === 0 ? 1 : numberOfMonths + 1
}

export const getPeriod = (date: string, endDate: string) => {
  const numberOfMonths = getNumberOfMonths(date, endDate)
  return numberOfMonths === 1 ? '1 mês' : `${numberOfMonths} meses`
}
