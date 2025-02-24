export const getProportionalNetValue = ({
  months,
  salary
}: {
  salary: number
  months: number
}) => (salary / 12) * months

export const getOneThird = (salary: number) => salary / 3

export const getProportionalOneThird = (salary: number, months: number) =>
  (salary / 3 / 12) * months

export const getNetValue = ({
  salary,
  months,
  oneThird
}: {
  salary: number
  months: number
  oneThird: number
}) => salary * months + oneThird * months
