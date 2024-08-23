import dayjs from 'dayjs'
import extenso from 'extenso'

export const formatCurrency = (value: number) =>
  Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)

export const formatCurrencyToNumber = (value: string) => {
  return Number(value.replace('R$', '').replace(',', '.'))
}

export const formatToExtensive = (value: number) => {
  const sentence = extenso(String(value.toFixed(2)).replace('.', ','), {
    mode: 'currency'
  })
  return sentence.slice(0, 3) === 'mil' ? `um ${sentence}` : sentence
}

export const formatDate = (date: string) => {
  return dayjs(date).format('DD/MM/YYYY')
}
