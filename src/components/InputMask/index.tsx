import { forwardRef } from 'react'
import { PatternFormat, PatternFormatProps } from 'react-number-format'
import {
  InputBaseComponentProps,
  TextField,
  TextFieldProps
} from '@mui/material'

type TInputMaskProps = TextFieldProps & {
  format: string
}

export const InputMask = forwardRef<HTMLInputElement, TInputMaskProps>(
  (props: TInputMaskProps, ref) => {
    const { format, ...rest } = props
    const Mask = forwardRef<PatternFormatProps>((args, ref) => (
      <PatternFormat
        getInputRef={ref}
        allowEmptyFormatting
        mask="_"
        format={format}
        {...args}
      />
    ))
    return (
      <TextField
        ref={ref}
        {...rest}
        InputProps={{
          inputComponent: Mask as InputBaseComponentProps['inputComponent']
        }}
      />
    )
  }
)
