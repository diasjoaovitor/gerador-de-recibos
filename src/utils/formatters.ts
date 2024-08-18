import dayjs from 'dayjs'
import extenso from 'extenso'

export const formatCurrency = (value: number) =>
  Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)

export const formatToExtensive = (value: number) => {
  const sentence = extenso(Number(value), { mode: 'currency' })
  return sentence.slice(0, 3) === 'mil' ? `um ${sentence}` : sentence
}

export const formatDate = (date: string) => {
  return dayjs(date).format('DD/MM/YYYY')
}
