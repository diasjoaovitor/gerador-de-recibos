import { ibjeApi } from '@/api'
import { TUF } from '@/types'

export const getUfs = async (): Promise<TUF[]> => {
  const { data } = await ibjeApi.get('/estados')
  return data.map(({ nome, sigla }: any) => ({ name: nome, acronym: sigla }))
}

export const getCities = async (uf: string): Promise<string[]> => {
  const { data } = await ibjeApi.get(`/estados/${uf}/municipios`)
  return data.map(({ nome }: any) => nome)
}
