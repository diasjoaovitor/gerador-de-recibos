import { Box, FormControl, TextField } from '@mui/material'
import { Dayjs } from 'dayjs'
import { ChangeEvent } from 'react'

import * as GS from '@/styles'

import { InputDate } from '../InputDate'

export type TPeriodProps = {
  date: string
  endDate: string
  period: string
  handleDate(e: Dayjs): void
  handleEndDate(e: Dayjs): void
  handlePeriodChange(e: ChangeEvent<HTMLInputElement>): void
}

export const Period = ({
  date,
  endDate,
  period,
  handleDate,
  handleEndDate,
  handlePeriodChange
}: TPeriodProps) => {
  return (
    <Box component="fieldset" sx={GS.Fieldset}>
      <legend>Período</legend>
      <FormControl fullWidth>
        <InputDate
          name="date"
          label="Data Inicial"
          value={date}
          onChange={handleDate}
        />
        <InputDate
          name="endDate"
          label="Data Final"
          value={endDate}
          onChange={handleEndDate}
        />
        <TextField
          name="period"
          label="Período"
          value={period}
          onChange={handlePeriodChange}
        />
      </FormControl>
    </Box>
  )
}
