import { cpfIsValid } from '@/utils'
import * as yup from 'yup'

export const schema = yup.object().shape({
  name: yup.string().required('Nome da empresa é obrigatório'),
  rg: yup.string().required('RG é obrigatório'),
  cpf: yup
    .string()
    .required('CPF é obrigatório')
    .test('cpf', 'CPF inválido', (value) => cpfIsValid(value))
})
