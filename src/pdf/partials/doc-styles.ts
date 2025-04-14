import { StyleDictionary } from 'pdfmake/interfaces'

export const docStyles: StyleDictionary = {
  header: {
    fontSize: 24,
    bold: true,
    alignment: 'center',
    margin: [0, 10, 0, 10]
  },
  label: {
    bold: true
  },
  footer: {
    alignment: 'center'
  }
}
