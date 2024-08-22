import { NumericFormat } from 'react-number-format'
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps
} from '@mui/material'
import { Lock, LockOpen } from '@mui/icons-material'

export type TInputCurrencyProps = Omit<
  OutlinedInputProps,
  'defaultValue' | 'type'
> & {
  isLocked?: boolean
  handleLockClick?: () => void
}

export const InputCurrency = (props: TInputCurrencyProps) => {
  const { value, isLocked, handleLockClick, ...rest } = props

  return (
    <FormControl fullWidth className="InputCurrency">
      <InputLabel htmlFor={rest.id || rest.name}>{rest.label}</InputLabel>
      <NumericFormat
        {...rest}
        value={Number(value) || 0}
        customInput={OutlinedInput}
        prefix="R$ "
        thousandSeparator="."
        decimalSeparator=","
        fixedDecimalScale
        decimalScale={2}
        endAdornment={
          isLocked !== undefined && (
            <InputAdornment position="end">
              <IconButton onClick={handleLockClick} edge="end">
                {!isLocked ? <LockOpen /> : <Lock />}
              </IconButton>
            </InputAdornment>
          )
        }
      />
    </FormControl>
  )
}
