import * as pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Dayjs } from 'dayjs'
import { FormControl, SelectChangeEvent } from '@mui/material'
import { Layout, Select } from '@/components'
import { TCompany, TEmployee, TSalary } from '@/types'
import { useAlert } from '@/hooks'
import {
  proportionalThirteenthPdf,
  salaryPdf,
  thirteenthSalaryPdf,
  vacationPdf
} from '@/pdf'
import { formatCurrencyToNumber, getStorage } from '@/utils'
import { selectItems } from './select-items'
import {
  currentDate,
  getEndDate,
  getNumberOfMonths,
  getPeriod,
  getYearMonth
} from './date'
import { getNetValue, getOneThird, getProportionalNetValue } from './receipt'
import {
  proportionalThirteenthSchema,
  salaryOrThirteenthSchema,
  vacationSchema
} from './schemas'
import { ProportionalThirteenth, SalaryOrThirteenth, Vacation } from './Options'
import { ValidationError } from 'yup'

type TReceiptProps = {
  isLoading: boolean
  isError: boolean
  salaries: TSalary[] | undefined
  setStep: (step: number) => void
}

export const Receipt = ({
  isLoading,
  isError,
  salaries,
  setStep
}: TReceiptProps) => {
  ;(window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs

  const getStorageData = () => {
    const company = getStorage('company') as TCompany | null
    const employee = getStorage('employee') as TEmployee | null
    if (company && employee) {
      return { company, employee }
    }
    return null
  }

  const storageData = getStorageData()

  const [option, setOption] = useState(0)
  const [date, setDate] = useState(currentDate)
  const [endDate, setEndDate] = useState(getEndDate(currentDate))
  const [period, setPeriod] = useState(getPeriod(date, endDate))
  const [salary, setSalary] = useState(salaries ? salaries[0].salary : 0)
  const [oneThird, setOneThird] = useState(getOneThird(salary))
  const [netValue, setNetValue] = useState(
    getNetValue({ salary, oneThird, months: 1 })
  )
  const [proportionalNetValue, setProportionalNetValue] = useState(
    getProportionalNetValue({ salary, months: 1 })
  )
  const [isLocked, setIsLocked] = useState(false)

  const { alertProps, handleAlertOpen } = useAlert()

  const numberOfMonths = getNumberOfMonths(date, endDate)
  const updatedNetValue = getNetValue({
    salary,
    oneThird,
    months: numberOfMonths
  })
  const updatedProportionalNetValue = getProportionalNetValue({
    salary,
    months: numberOfMonths
  })

  useEffect(() => {
    if (!salaries || isLocked) return
    const yearMonth = getYearMonth(date)
    setSalary(
      salaries.find(({ yearMonth: ym }) => ym === yearMonth)?.salary || 0
    )
  }, [date, salaries, isLocked])

  useEffect(() => {
    const endDate = getEndDate(date)
    setEndDate(endDate)
    setPeriod(getPeriod(date, endDate))
  }, [date])

  useEffect(() => {
    setPeriod(getPeriod(date, endDate))
    setNetValue(updatedNetValue)
    setProportionalNetValue(updatedProportionalNetValue)
  }, [endDate])

  useEffect(() => {
    const oneThird = getOneThird(salary)
    setOneThird(oneThird)
    setNetValue(updatedNetValue)
    setProportionalNetValue(updatedProportionalNetValue)
  }, [salary])

  useEffect(() => {
    if (isError) {
      handleAlertOpen({
        severity: 'error',
        title: 'Ocorreu um erro ao carregar os dados'
      })
    }
  }, [isError, handleAlertOpen])

  const handleOptionChange = (e: SelectChangeEvent<unknown>) => {
    setOption(Number(e.target.value))
  }

  const handleDateChange = (e: Dayjs) => {
    setDate(e.format('YYYY-MM-DD'))
  }

  const handleEndDateChange = (e: Dayjs) => {
    setEndDate(e.format('YYYY-MM-DD'))
  }

  const handlePeriodChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPeriod(e.target.value)
  }

  const handleSalaryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSalary(formatCurrencyToNumber(e.target.value))
  }

  const handleOneThirdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOneThird(formatCurrencyToNumber(e.target.value))
  }

  const handleNetValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNetValue(formatCurrencyToNumber(e.target.value))
  }

  const handleProportionalNetValueChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setProportionalNetValue(formatCurrencyToNumber(e.target.value))
  }

  const handleLockClick = () => {
    setIsLocked(!isLocked)
  }

  const components = [
    {
      schema: salaryOrThirteenthSchema,
      data: { salary, date },
      title: 'Recibo de Salário',
      fn: salaryPdf,
      component: (
        <SalaryOrThirteenth
          date={date}
          salary={salary}
          isLocked={isLocked}
          handleDateChange={handleDateChange}
          handleSalaryChange={handleSalaryChange}
          handleLockClick={handleLockClick}
        />
      )
    },
    {
      schema: vacationSchema,
      data: { date, endDate, period, salary, oneThird, netValue },
      title: 'Recibo de Férias',
      fn: vacationPdf,
      component: (
        <Vacation
          date={date}
          endDate={endDate}
          period={period}
          salary={salary}
          oneThird={oneThird}
          netValue={netValue}
          isLocked={isLocked}
          handleDateChange={handleDateChange}
          handleEndDateChange={handleEndDateChange}
          handlePeriodChange={handlePeriodChange}
          handleSalaryChange={handleSalaryChange}
          handleOneThirdChange={handleOneThirdChange}
          handleNetValueChange={handleNetValueChange}
          handleLockClick={handleLockClick}
        />
      )
    },
    {
      schema: salaryOrThirteenthSchema,
      data: { salary, date },
      title: 'Recibo de Décimo Terceiro',
      fn: thirteenthSalaryPdf,
      component: (
        <SalaryOrThirteenth
          date={date}
          salary={salary}
          isLocked={isLocked}
          handleDateChange={handleDateChange}
          handleSalaryChange={handleSalaryChange}
          handleLockClick={handleLockClick}
        />
      )
    },
    {
      schema: proportionalThirteenthSchema,
      data: { date, endDate, period, salary, proportionalNetValue },
      title: 'Recibo de Décimo Terceiro Proporcional',
      fn: proportionalThirteenthPdf,
      component: (
        <ProportionalThirteenth
          date={date}
          endDate={endDate}
          period={period}
          salary={salary}
          proportionalNetValue={proportionalNetValue}
          isLocked={isLocked}
          handleDateChange={handleDateChange}
          handleEndDateChange={handleEndDateChange}
          handlePeriodChange={handlePeriodChange}
          handleSalaryChange={handleSalaryChange}
          handleProportionalNetValueChange={handleProportionalNetValueChange}
          handleLockClick={handleLockClick}
        />
      )
    }
  ]

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!storageData) {
      handleAlertOpen({
        severity: 'error',
        title: 'Dados da empresa e do funcionário não encontrados',
        description: 'Por favor, atualize a página e tente novamente'
      })
      return
    }
    const { schema, title, data, fn } = components[option]
    schema
      .validate(data)
      .then(() => {
        const pdf = fn({ header: { ...storageData, title }, main: data as any })
        pdfMake.createPdf(pdf).open()
      })
      .catch((error: ValidationError) => {
        handleAlertOpen({
          severity: 'error',
          title: 'Erro ao gerar o recibo',
          description: error.message
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
          onChange={handleOptionChange}
          sx={{ mb: 2 }}
        />
      </FormControl>
      {components[option]?.component || null}
    </Layout>
  )
}
