import axios from 'axios'

export const ibjeApi = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades'
})
