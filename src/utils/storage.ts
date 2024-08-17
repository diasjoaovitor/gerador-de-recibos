import { TCompany, TEmployee } from '@/types'

type TStorageKey = 'company' | 'employee'

type TStorageData = TCompany | TEmployee

export const getStorage = (key: TStorageKey) =>
  JSON.parse(localStorage.getItem(key) || 'null')

export const setStorage = ({
  data,
  key
}: {
  data: TStorageData
  key: TStorageKey
}) => {
  localStorage.setItem(key, JSON.stringify(data))
}
