import {
  AlertTitle,
  IconButton,
  Alert as MUIAlert,
  Snackbar
} from '@mui/material'
import { Close } from '@mui/icons-material'

export type TAlertAttributes = {
  severity: 'error' | 'info' | 'success' | 'warning'
  title: string
  description?: string
  autoHideDuration?: number
}

export type TAlertProps = {
  open: boolean
  handleClose: () => void
} & TAlertAttributes

export const Alert = ({
  open,
  severity,
  title,
  description,
  autoHideDuration,
  handleClose
}: TAlertProps) => {
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      autoHideDuration={autoHideDuration || 4000}
      onClose={handleClose}
    >
      <MUIAlert
        severity={severity}
        action={
          <IconButton size="small" onClick={handleClose}>
            <Close fontSize="inherit" />
          </IconButton>
        }
      >
        <AlertTitle>{title}</AlertTitle>
        {description}
      </MUIAlert>
    </Snackbar>
  )
}
