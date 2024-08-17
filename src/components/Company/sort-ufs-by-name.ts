import { TUF } from '@/types'

export const sortUfsByName = (ufs: TUF[]) =>
  ufs.sort((a, b) => a.name.localeCompare(b.name))
