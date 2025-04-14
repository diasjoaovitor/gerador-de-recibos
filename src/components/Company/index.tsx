import { yupResolver } from '@hookform/resolvers/yup'
import { Box, FormControl, SelectChangeEvent, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { InputMask, Layout, Select } from '@/components'
import { useAlert } from '@/hooks'
import * as GS from '@/styles'
import { TCompany } from '@/types'
import { getStorage, setStorage } from '@/utils'

import { schema } from './schema'
import { sortCitiesByName } from './sort-cities-by-name'
import { sortUfsByName } from './sort-ufs-by-name'
import { useLoadData } from './use-load-data'

type TCompanyProps = {
  setStep: (step: number) => void
}

export const Company = ({ setStep }: TCompanyProps) => {
  const getDefaultValues = () =>
    (getStorage('company') as TCompany | null) || {
      name: '',
      cnpj: '',
      tel: '',
      street: '',
      num: '',
      district: '',
      city: 'C',
      uf: 'E'
    }
  const defaultValues = getDefaultValues()

  const [uf, setUf] = useState(defaultValues.uf)
  const [city, setCity] = useState(defaultValues.city)

  const { cities, ufs, isError, isLoading } = useLoadData({
    acronym: uf !== 'E' ? uf : undefined
  })

  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues
  })

  const { alertProps, handleAlertOpen } = useAlert()

  useEffect(() => {
    if (isError) {
      handleAlertOpen({
        title: 'Erro ao carregar dados',
        severity: 'error'
      })
    }
  }, [isError, handleAlertOpen])

  const handleUfChange = (e: SelectChangeEvent<unknown>) => {
    const selectedUf = ufs?.find((uf) => uf.acronym === e.target.value)
    if (selectedUf) {
      setUf(selectedUf.acronym)
    }
  }

  const handleCityChange = (e: SelectChangeEvent<unknown>) => {
    setCity(e.target.value as string)
  }

  const onSubmit = (data: Omit<TCompany, 'uf' | 'city'>) => {
    const company: TCompany = {
      ...data,
      uf,
      city
    }
    setStorage({ data: company, key: 'company' })
    setStep(1)
  }

  return (
    <Layout
      isLoading={isLoading}
      activeStep={0}
      alertProps={alertProps}
      handleSubmit={handleSubmit(onSubmit)}
      setStep={setStep}
    >
      <FormControl fullWidth>
        <TextField
          label="Nome da Empresa"
          error={!!errors.name}
          helperText={errors.name?.message}
          {...register('name')}
        />
        <InputMask
          label="CNPJ"
          format="##.###.###/####-##"
          error={!!errors.cnpj}
          helperText={errors.cnpj?.message}
          defaultValue={defaultValues.cnpj}
          {...register('cnpj')}
        />
        <InputMask
          type="tel"
          label="Telefone"
          format="(##) ####-####"
          error={!!errors.tel}
          helperText={errors.tel?.message}
          defaultValue={defaultValues.tel}
          {...register('tel')}
        />
      </FormControl>
      <Box component="fieldset" sx={{ ...GS.Fieldset, mb: 2 }}>
        <legend>Endereço</legend>
        <FormControl fullWidth>
          <TextField
            label="Logradouro"
            error={!!errors.street}
            helperText={errors.street?.message}
            {...register('street')}
          />
          <TextField
            type="number"
            label="Número"
            error={!!errors.num}
            helperText={errors.num?.message}
            {...register('num')}
          />
          <TextField
            label="Bairro"
            error={!!errors.district}
            helperText={errors.district?.message}
            {...register('district')}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Select
            items={[
              {
                name: 'Selecionar Estado',
                value: defaultValues.uf
              },
              ...sortUfsByName(ufs || []).map(({ acronym, name }) => ({
                name,
                value: acronym
              }))
            ]}
            value={uf}
            onChange={handleUfChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Select
            items={[
              {
                name: 'Selecionar Cidade',
                value: defaultValues.city
              },
              ...sortCitiesByName(cities || []).map((city) => ({
                name: city,
                value: city
              }))
            ]}
            value={city}
            onChange={handleCityChange}
            disabled={!cities}
          />
        </FormControl>
      </Box>
    </Layout>
  )
}
