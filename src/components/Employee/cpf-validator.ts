const isSequence = (str: string) => {
  const sequence = str[0].repeat(str.length)
  return sequence === str
}

const createDigit = (partial: string) => {
  const array = Array.from(partial)
  let factor = array.length + 1
  const sum = array.reduce((acc, digit) => {
    acc += Number(digit) * factor
    factor--
    return acc
  }, 0)
  const rest = sum % 11
  const digit = 11 - rest
  return digit > 9 ? '0' : String(digit)
}

export const cpfIsValid = (cpf: string) => {
  const cpfClean = cpf.replace(/\D/g, '')

  if (cpfClean.length !== 11) return false
  if (isSequence(cpfClean)) return false

  const partial = cpfClean.slice(0, 9)
  const digit1 = createDigit(partial)
  const digit2 = createDigit(partial + digit1)

  return cpfClean === partial + digit1 + digit2
}
