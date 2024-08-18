import { TDocumentDefinitions } from 'pdfmake/interfaces'
import { formatCurrency, formatDate, formatToExtensive } from '@/utils'
import { docFooter, docHeader, docStyles, TDocHeader } from './partials'

export type TSalarioPDF = {
  header: TDocHeader
  main: {
    salary: number
    date: string
  }
}

export const salario = (args: TSalarioPDF): TDocumentDefinitions => {
  const {
    header,
    main: { salary, date }
  } = args
  return {
    content: [
      ...docHeader(header),
      {
        table: {
          widths: ['*', '*'],
          body: [
            [
              {
                text: [
                  {
                    text: 'Salário: ',
                    style: 'label'
                  },
                  formatCurrency(salary)
                ],
                border: [true, false, true, true]
              },
              {
                text: [
                  {
                    text: 'Data: ',
                    style: 'label'
                  },
                  formatDate(date)
                ],
                border: [true, false, true, true]
              }
            ]
          ]
        }
      },
      {
        table: {
          widths: ['*'],
          body: [
            [
              {
                text: `Declaro que recebi a quantia líquida de ${formatCurrency(salary)} - ${formatToExtensive(salary)}, referente ao pagamento do meu salário.`,
                margin: [10, 10, 10, 2],
                border: [true, false, true, false]
              }
            ],
            [
              {
                text: 'Para clareza e documento, firmo o presente recibo, dando plena e geral quitação.',
                margin: [10, 0, 10, 10],
                border: [true, false, true, false]
              }
            ]
          ]
        }
      },
      ...docFooter(header.employee.name)
    ],
    styles: docStyles
  }
}
