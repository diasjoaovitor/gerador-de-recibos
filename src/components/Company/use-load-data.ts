import { getCities, getUfs } from '@/services'
import { useQueries } from '@tanstack/react-query'

export const useLoadData = ({ acronym }: { acronym: string | undefined }) => {
  const queries = useQueries({
    queries: [
      {
        queryKey: ['getUfs'],
        queryFn: getUfs
      },
      {
        queryKey: ['getCities', acronym],
        queryFn: async () => {
          if (!acronym) return
          return await getCities(acronym)
        },
        enabled: !!acronym
      }
    ]
  })

  const isLoading = queries.some(({ isLoading }) => isLoading)
  const isError = queries.some(({ isError }) => isError)

  return {
    isLoading,
    isError,
    ufs: queries[0].data,
    cities: queries[1].data
  }
}
