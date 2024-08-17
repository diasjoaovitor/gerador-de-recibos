import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormControl, TextField } from '@mui/material'
import { InputMask, Layout, TAlertProps } from '@/components'
import { TEmployee } from '@/types'
import { setStorage } from '@/utils'
import { defaultValues } from './default-values'
import { schema } from './schema'

type TEmployeeProps = {
  setStep: (step: number) => void
}

export const Employee = ({ setStep }: TEmployeeProps) => {
  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues
  })

  const onSubmit = (data: TEmployee) => {
    setStorage({ data, key: 'employee' })
    setStep(2)
  }

  return (
    <Layout
      isLoading={false}
      activeStep={1}
      alertProps={{} as TAlertProps}
      handleSubmit={handleSubmit(onSubmit)}
      setStep={setStep}
    >
      <FormControl fullWidth>
        <TextField
          label="Nome Completo"
          error={!!errors.name}
          helperText={errors.name?.message}
          {...register('name')}
        />
        <InputMask
          label="RG"
          format="##.###.###-##"
          error={!!errors.rg}
          helperText={errors.rg?.message}
          defaultValue={defaultValues.rg}
          {...register('rg')}
        />
        <InputMask
          type="cpf"
          label="CPF"
          format="###.###.###-##"
          error={!!errors.cpf}
          helperText={errors.cpf?.message}
          defaultValue={defaultValues.cpf}
          {...register('cpf')}
        />
      </FormControl>
    </Layout>
  )
}
