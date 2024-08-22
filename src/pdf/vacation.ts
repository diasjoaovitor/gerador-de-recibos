import { TDocumentDefinitions } from 'pdfmake/interfaces'
import { formatCurrency, formatDate, formatToExtensive } from '@/utils'
import { TVacationReceipt } from '@/types'
import { docFooter, docHeader, docStyles, TDocHeader } from './partials'

export type TVacationPDF = {
  header: TDocHeader
  main: TVacationReceipt
}

export const vacationPdf = (args: TVacationPDF): TDocumentDefinitions => {
  const {
    header,
    main: { salary, oneThird, netValue, date, endDate, period }
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
                    text: 'Terço de Férias: ',
                    style: 'label'
                  },
                  formatCurrency(oneThird)
                ],
                border: [true, false, true, true]
              }
            ]
          ]
        }
      },
      {
        table: {
          widths: ['*', '*'],
          body: [
            [
              {
                text: [
                  {
                    text: 'Valor Líquido: ',
                    style: 'label'
                  },
                  formatCurrency(netValue)
                ],
                border: [true, false, true, true]
              },
              {
                text: [
                  {
                    text: 'Período: ',
                    style: 'label'
                  },
                  `${formatDate(date)} à ${formatDate(endDate)}`
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
                text: `Declaro que recebi a quantia líquida de ${formatCurrency(netValue)} - ${formatToExtensive(netValue)}, referente ao pagamento das minhas férias, proporcionais a ${period}.`,
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
