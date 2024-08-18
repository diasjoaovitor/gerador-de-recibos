import { Content } from 'pdfmake/interfaces'

export const docFooter = (employee: string): Content[] => [
  {
    table: {
      widths: ['*'],
      body: [
        [
          {
            text: '__________________________________________________',
            style: 'footer',
            margin: [0, 30, 0, 0],
            border: [true, false, true, false]
          }
        ],
        [
          {
            text: employee,
            style: 'footer',
            margin: [0, 0, 0, 20],
            border: [true, false, true, true]
          }
        ]
      ]
    }
  }
]
