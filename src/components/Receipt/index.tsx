import { FormControl } from '@mui/material'
import { Layout, Select, TAlertProps } from '@/components'

type TReceiptProps = {
  setStep: (step: number) => void
}

export const Receipt = ({ setStep }: TReceiptProps) => {
  return (
    <Layout
      isLoading={false}
      activeStep={2}
      alertProps={{} as TAlertProps}
      handleSubmit={() => {}}
      setStep={setStep}
    >
      <FormControl fullWidth>
        <Select
          items={[
            {
              name: 'Salário',
              value: 'salary'
            }
          ]}
          value="salary"
        />
      </FormControl>
    </Layout>
  )
}
