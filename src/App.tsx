import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { Company, Employee, Receipt } from '@/components'

import { getSalaries } from './services'

export const App = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['getSalaries'],
    queryFn: getSalaries
  })

  const [step, setStep] = useState(0)

  if (step === 0) return <Company setStep={setStep} />
  if (step === 1) return <Employee setStep={setStep} />
  if (step === 2)
    return (
      <Receipt
        salaries={data}
        isLoading={isLoading}
        isError={isError}
        setStep={setStep}
      />
    )

  return null
}

export default App
