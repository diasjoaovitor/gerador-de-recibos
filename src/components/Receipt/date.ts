import dayjs from 'dayjs'

export const currentDate = dayjs().format('YYYY-MM-DD')

export const getYearMonth = (date: string) => dayjs(date).format('YYYY-MM')
