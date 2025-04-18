import { TextField, TextFieldProps } from '@mui/material'
import { forwardRef } from 'react'
import { PatternFormat } from 'react-number-format'

type TInputMaskProps = Omit<
  TextFieldProps,
  'type' | 'value' | 'defaultValue'
> & {
  format: string
  type?: 'text' | 'password' | 'tel'
  value?: string
  defaultValue?: string
}
export const InputMask = forwardRef<HTMLInputElement, TInputMaskProps>(
  (props: TInputMaskProps, ref) => {
    const { format, ...rest } = props
    return (
      <PatternFormat
        {...rest}
        getInputRef={ref}
        mask="_"
        format={format}
        customInput={TextField}
        allowEmptyFormatting
      />
    )
  }
)
