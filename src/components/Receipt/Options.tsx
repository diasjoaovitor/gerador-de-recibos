import { ChangeEvent } from 'react'
import { Dayjs } from 'dayjs'
import { FormControl } from '@mui/material'
import { InputCurrency, InputDate, Period } from '@/components'
import {
  TProportionalThirteenthReceipt,
  TSalaryOrTThirteenthReceipt,
  TVacationReceipt
} from '@/types'
import * as S from './styles'

type TBasicOptionProps = {
  isLocked: boolean
  handleLockClick: () => void
  handleDateChange(e: Dayjs): void
  handleSalaryChange(e: ChangeEvent<HTMLInputElement>): void
} & TSalaryOrTThirteenthReceipt

type TVacationOptionProps = {
  handleEndDateChange(e: Dayjs): void
  handlePeriodChange(e: ChangeEvent<HTMLInputElement>): void
  handleOneThirdChange(e: ChangeEvent<HTMLInputElement>): void
  handleNetValueChange(e: ChangeEvent<HTMLInputElement>): void
} & TBasicOptionProps &
  TVacationReceipt

type TProportionalThirteenthOptionProps = {
  handleEndDateChange(e: Dayjs): void
  handlePeriodChange(e: ChangeEvent<HTMLInputElement>): void
  handleProportionalNetValueChange(e: ChangeEvent<HTMLInputElement>): void
} & TBasicOptionProps &
  TProportionalThirteenthReceipt

export const SalaryOrThirteenth = ({
  date,
  salary,
  isLocked,
  handleDateChange,
  handleSalaryChange,
  handleLockClick
}: TBasicOptionProps) => (
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

export const Vacation = ({
  date,
  endDate,
  period,
  salary,
  oneThird,
  netValue,
  isLocked,
  handleDateChange,
  handleEndDateChange,
  handlePeriodChange,
  handleSalaryChange,
  handleOneThirdChange,
  handleNetValueChange,
  handleLockClick
}: TVacationOptionProps) => (
  <FormControl fullWidth sx={S.Wrapper}>
    <Period
      date={date}
      endDate={endDate}
      period={period}
      handleDate={handleDateChange}
      handleEndDate={handleEndDateChange}
      handlePeriodChange={handlePeriodChange}
    />
    <InputCurrency
      label="Salário"
      value={salary}
      isLocked={isLocked}
      handleLockClick={handleLockClick}
      onChange={handleSalaryChange}
    />
    <InputCurrency
      label="Terço de Férias"
      value={oneThird}
      onChange={handleOneThirdChange}
    />
    <InputCurrency
      label="Valor Líquido"
      value={netValue}
      onChange={handleNetValueChange}
    />
  </FormControl>
)

export const ProportionalThirteenth = ({
  date,
  endDate,
  period,
  salary,
  proportionalNetValue,
  isLocked,
  handleDateChange,
  handleEndDateChange,
  handlePeriodChange,
  handleSalaryChange,
  handleProportionalNetValueChange,
  handleLockClick
}: TProportionalThirteenthOptionProps) => (
  <FormControl fullWidth sx={S.Wrapper}>
    <Period
      date={date}
      endDate={endDate}
      period={period}
      handleDate={handleDateChange}
      handleEndDate={handleEndDateChange}
      handlePeriodChange={handlePeriodChange}
    />
    <InputCurrency
      label="Salário"
      value={salary}
      isLocked={isLocked}
      handleLockClick={handleLockClick}
      onChange={handleSalaryChange}
    />
    <InputCurrency
      label="Valor Líquido"
      value={proportionalNetValue}
      onChange={handleProportionalNetValueChange}
    />
  </FormControl>
)
