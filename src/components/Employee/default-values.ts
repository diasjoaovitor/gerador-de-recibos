import { TEmployee } from '@/types'
import { getStorage } from '@/utils'

const storageData = getStorage('employee') as TEmployee | null

export const defaultValues: TEmployee = storageData
  ? storageData
  : {
      name: '',
      rg: '',
      cpf: ''
    }
