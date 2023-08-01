import {
  DropdownField,
  Flex,
  FormRow,
  Heading,
  PrimaryButton,
  TextField,
  useForm,
} from "@ripple/design-system"
import { Blockchain } from "../shared/models"

const FORM_ID = "user-form"

export const UserPage = () => {
  const { formProps, getFieldProps, isFieldHidden } = useForm({
    fields: {
      blockchain: { type: "dropdown", value: Blockchain.XRPL },
      publicKey: { type: "text" },
      publicAddress: { type: "text" },
      firstName: { type: "text" },
      lastName: { type: "text" },
      nonce: { type: "text" },
    },
    onFieldChange: {
      blockchain: ({ value }, { updateFields }) => {
        updateFields({
          publicKey: {
            hidden: value === Blockchain.ETH,
          },
        })
      },
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <Flex css={{ m: "auto" }} direction="column">
      <Heading css={{ mb: 2 }} level={4}>
        Enter your data
      </Heading>
      <form id={FORM_ID} {...formProps}>
        <FormRow css={{ minW: 450 }}>
          <DropdownField label="Choose Blockchain" {...getFieldProps("blockchain")}>
            <DropdownField.Option value={Blockchain.XRPL}>XRP Ledger</DropdownField.Option>
            <DropdownField.Option value={Blockchain.ETH}>Ethereum</DropdownField.Option>
          </DropdownField>
        </FormRow>
        {!isFieldHidden("publicKey") && (
          <FormRow>
            <TextField {...getFieldProps("publicKey")} label="Public Key" />
          </FormRow>
        )}
        <FormRow>
          <TextField {...getFieldProps("publicAddress")} label="Public Address" />
        </FormRow>
        <FormRow>
          <TextField {...getFieldProps("firstName")} label="First Name" />
        </FormRow>
        <FormRow>
          <TextField {...getFieldProps("lastName")} label="Last Name" />
        </FormRow>
        <FormRow>
          <TextField {...getFieldProps("nonce")} label="Nonce" />
        </FormRow>
        <PrimaryButton css={{ w: "100%" }}>Sign Data With Metamask</PrimaryButton>
      </form>
    </Flex>
  )
}
