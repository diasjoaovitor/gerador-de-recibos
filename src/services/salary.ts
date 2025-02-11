import { salaryApi } from '@/api'
import { TSalary } from '@/types'

export const getSalaries = async (): Promise<TSalary[]> => {
  const { data } = await salaryApi.get('/')
  return data
}
