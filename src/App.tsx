import { useState } from 'react'
import { Company, Employee, Receipt } from '@/components'

export const App = () => {
  const [step, setStep] = useState(0)

  if (step === 0) return <Company setStep={setStep} />
  if (step === 1) return <Employee setStep={setStep} />
  if (step === 2) return <Receipt setStep={setStep} />

  return null
}

export default App
