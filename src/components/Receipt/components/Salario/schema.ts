import * as yup from 'yup'

export const salarySchema = yup.object().shape({
  date: yup.string().required('Data é obrigatória'),
  salary: yup
    .number()
    .required('Salário é obrigatório')
    .min(1, 'Salário deve ser maior que 0')
})
