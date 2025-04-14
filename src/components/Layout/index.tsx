import {
  Box,
  Button,
  Step,
  StepButton,
  Stepper,
  Typography
} from '@mui/material'
import { FormEvent, ReactNode } from 'react'

import { Alert, Loader, TAlertProps } from '@/components'

import * as S from './styles'

type TLayoutProps = {
  activeStep: number
  children: ReactNode
  isLoading: boolean
  alertProps: TAlertProps
  setStep(step: number): void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export const Layout = ({
  activeStep,
  children,
  isLoading,
  alertProps,
  setStep,
  handleSubmit
}: TLayoutProps) => {
  return (
    <Box sx={S.Wrapper}>
      <Typography component="h1" variant="h5" sx={S.Title}>
        Gerador de Recibos
      </Typography>
      <main>
        <Stepper activeStep={activeStep} sx={{ my: 3 }}>
          <Step>
            <StepButton onClick={() => setStep(0)}>Dados da Empresa</StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => setStep(1)}>
              Dados do Funcionário
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => setStep(2)}>Recibo</StepButton>
          </Step>
        </Stepper>
        <form onSubmit={handleSubmit} noValidate>
          {children}
          <Box sx={S.ButtonGroup}>
            <Button
              onClick={() => setStep(activeStep - 1)}
              disabled={activeStep === 0}
            >
              Voltar
            </Button>
            <Button type="submit">
              {activeStep !== 2 ? 'Próximo' : 'Gerar Recibo'}
            </Button>
          </Box>
        </form>
      </main>
      <Loader open={isLoading} />
      <Alert {...alertProps} />
    </Box>
  )
}
