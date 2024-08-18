import { ChangeEvent } from 'react'
import { Dayjs } from 'dayjs'
import { FormControl } from '@mui/material'
import { InputCurrency, InputDate } from '@/components'

type TSalarioProps = {
  salary: number
  date: string
  isLocked: boolean
  handleLockClick: () => void
  handleSalaryChange(e: ChangeEvent<HTMLInputElement>): void
  handleDateChange(e: Dayjs): void
}
export const Salario = ({
  salary,
  date,
  isLocked,
  handleLockClick,
  handleSalaryChange,
  handleDateChange
}: TSalarioProps) => {
  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputDate label="Data" value={date} onChange={handleDateChange} />
      <InputCurrency
        label="Salário"
        value={salary}
        isLocked={isLocked}
        handleLockClick={handleLockClick}
        onChange={handleSalaryChange}
      />
    </FormControl>
  )
}
