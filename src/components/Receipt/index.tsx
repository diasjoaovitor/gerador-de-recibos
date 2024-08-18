import * as pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { ValidationError } from 'yup'
import { Dayjs } from 'dayjs'
import { FormControl, SelectChangeEvent } from '@mui/material'
import { Layout, Select } from '@/components'
import { TCompany, TEmployee, TSalary } from '@/types'
import { useAlert } from '@/hooks'
import { Salario, salarySchema } from './components'
import { selectItems } from './select-items'
import { currentDate, getYearMonth } from './date'
import { salario } from '@/pdf'
import { getStorage } from '@/utils'

type TReceiptProps = {
  isLoading: boolean
  isError: boolean
  salaries: TSalary[] | undefined
  setStep: (step: number) => void
}

const company = getStorage('company') as TCompany
const employee = getStorage('employee') as TEmployee

export const Receipt = ({
  isLoading,
  isError,
  salaries,
  setStep
}: TReceiptProps) => {
  ;(window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs

  const [option, setOption] = useState(0)
  const [date, setDate] = useState(currentDate)
  const [salary, setSalary] = useState(salaries ? salaries[0].salary : 0)
  const [isLocked, setIsLocked] = useState(false)

  const { alertProps, handleAlertOpen } = useAlert()

  useEffect(() => {
    if (!salaries || isLocked) return
    const yearMonth = getYearMonth(date)
    setSalary(
      salaries.find(({ yearMonth: ym }) => ym === yearMonth)?.salary || 0
    )
  }, [date, salaries, isLocked])

  useEffect(() => {
    if (isError) {
      handleAlertOpen({
        severity: 'error',
        title: 'Ocorreu um erro ao carregar os dados'
      })
    }
  }, [isError, handleAlertOpen])

  const handleSelectChange = (e: SelectChangeEvent<unknown>) => {
    setOption(Number(e.target.value))
  }

  const handleDateChange = (e: Dayjs) => {
    setDate(e.format('YYYY-MM-DD'))
  }

  const handleSalaryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSalary(Number(e.target.value))
  }

  const handleLockClick = () => {
    setIsLocked(!isLocked)
  }

  const components = [
    {
      schema: salarySchema,
      data: { salary, date },
      title: 'Recibo de Salário',
      fn: salario,
      component: (
        <Salario
          salary={salary}
          date={date}
          isLocked={isLocked}
          handleLockClick={handleLockClick}
          handleSalaryChange={handleSalaryChange}
          handleDateChange={handleDateChange}
        />
      )
    }
  ]

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { schema, data, title, fn } = components[option]
    console.log({ data, company, employee })
    schema
      .validate(data)
      .then(() => {
        const pdf = fn({
          header: {
            company,
            employee,
            title
          },
          main: data
        })
        pdfMake.createPdf(pdf).open()
      })
      .catch((error: ValidationError) => {
        handleAlertOpen({
          severity: 'error',
          title: error.message
        })
      })
  }

  return (
    <Layout
      isLoading={isLoading}
      activeStep={2}
      alertProps={alertProps}
      handleSubmit={handleSubmit}
      setStep={setStep}
    >
      <FormControl fullWidth>
        <Select
          items={selectItems}
          value={option}
          onChange={handleSelectChange}
          sx={{ mb: 2 }}
        />
      </FormControl>
      {components[option]?.component || null}
    </Layout>
  )
}
