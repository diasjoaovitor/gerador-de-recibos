import axios from 'axios'

export const salaryApi = axios.create({
  baseURL: 'https://salario-minimo.onrender.com'
})
