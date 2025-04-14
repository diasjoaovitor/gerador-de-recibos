import { useState } from 'react'

import { TAlertAttributes, TAlertProps } from '@/components'

export const useAlert = () => {
  const [alertProps, setAlertProps] = useState({} as TAlertProps)

  const handleAlertClose = () => setAlertProps({} as TAlertProps)

  const handleAlertOpen = (props: TAlertAttributes) => {
    setAlertProps({ ...props, open: true, handleClose: handleAlertClose })
  }

  return { alertProps, handleAlertOpen }
}
