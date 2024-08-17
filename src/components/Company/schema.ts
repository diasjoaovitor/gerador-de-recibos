import * as yup from 'yup'

export const schema = yup.object().shape({
  name: yup.string().required('Nome da empresa é obrigatório'),
  cnpj: yup.string().required('CNPJ é obrigatório'),
  tel: yup.string().required('Telefone é obrigatório'),
  street: yup.string().required('Logradouro é obrigatório'),
  num: yup.string().required('Número é obrigatório'),
  district: yup.string().required('Bairro é obrigatório'),
  city: yup.string().required('Cidade é obrigatória')
})
