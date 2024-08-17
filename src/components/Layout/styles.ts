import { SxProps, Theme } from '@mui/material'

export const Wrapper: SxProps<Theme> = {
  p: 2,
  '.MuiTextField-root': {
    mb: 2
  },
  maxWidth: 600,
  margin: 'auto'
}

export const Title: SxProps<Theme> = {
  '&::after': {
    content: '""',
    width: 60,
    height: 8,
    display: 'block',
    backgroundColor: '#1976d2'
  }
}

export const ButtonGroup: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between'
}
