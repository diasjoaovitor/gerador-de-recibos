import { MenuItem, Select as MUISelect, SelectProps } from '@mui/material'

type TSelectProps = SelectProps & {
  items: {
    value: string
    name: string
  }[]
}

export const Select = (props: TSelectProps) => {
  const { items, ...rest } = props
  return (
    <MUISelect {...rest}>
      {items.map(({ value, name }, index) => (
        <MenuItem key={index} value={value}>
          {name}
        </MenuItem>
      ))}
    </MUISelect>
  )
}
