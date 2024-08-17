import { TCompany } from '@/types'
import { getStorage } from '@/utils'

const storageData = getStorage('company') as TCompany | null

export const defaultValues: TCompany = storageData
  ? storageData
  : {
      name: '',
      cnpj: '',
      tel: '',
      street: '',
      num: '',
      district: '',
      city: 'C',
      uf: 'E'
    }
