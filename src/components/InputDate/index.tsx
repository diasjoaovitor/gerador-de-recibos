import dayjs from 'dayjs'
import {
  DatePicker,
  DatePickerProps,
  LocalizationProvider
} from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { FormControl } from '@mui/material'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

export const InputDate = (props: DatePickerProps<any>) => (
  <FormControl fullWidth>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <DatePicker {...props} value={dayjs(props.value)} />
    </LocalizationProvider>
  </FormControl>
)
