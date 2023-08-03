import {
  Card,
  DropdownField,
  Flex,
  FormRow,
  Heading,
  PrimaryButton,
  TextField,
  useForm,
} from "@ripple/design-system"
import { useAuth } from "../shared/contexts"
import { setLocalStorageItem } from "../shared/helpers/local-storage"
import { AccountType } from "../shared/models"

const FORM_ID = "form-login"

export const LoginPage = () => {
  const { refresh } = useAuth()
  const { formProps, getFieldProps, isValid } = useForm({
    fields: {
      // username: { type: "email" },
      // password: { type: "text" },
      did: { type: "text", value: "did:xrpl:1:rJJtjC4KtFrr9jZi87wc6zM7XXE3c7hqBZ" },
      accountType: { type: "dropdown" },
    },
    onSubmit: (values) => {
      const { accountType, did } = values

      setLocalStorageItem("isAuthenticated", {
        did,
        accountType,
      })
      refresh()
    },
  })

  return (
    <Flex
      css={{
        m: "auto",
      }}
      direction="column"
    >
      <Heading css={{ mx: "auto" }} level={1}>
        {import.meta.env.VITE_TITLE}
      </Heading>
      <Card css={{ minW: 450, mt: 3 }}>
        <Heading level={3} css={{ mb: 2 }}>
          Please login
        </Heading>
        <form id={FORM_ID} {...formProps}>
          <FormRow>
            <DropdownField {...getFieldProps("accountType")} label="Account Type">
              <DropdownField.Option value={AccountType.Admin}>Admin</DropdownField.Option>
              <DropdownField.Option value={AccountType.User}>User</DropdownField.Option>
            </DropdownField>
          </FormRow>
          <FormRow>
            <TextField {...getFieldProps("did")} label="DID" />
          </FormRow>
          {/* <FormRow>
            <TextField {...getFieldProps("username")} label="Username" />
          </FormRow>
          <FormRow>
            <SecretField {...getFieldProps("password")} label="Password" />
          </FormRow> */}
          <PrimaryButton css={{ w: "100%" }} disabled={!isValid} type="submit">
            Login
          </PrimaryButton>
        </form>
      </Card>
    </Flex>
  )
}
