import {
  Card,
  DropdownField,
  Flex,
  FormRow,
  Heading,
  PrimaryButton,
  SecretField,
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
      username: { type: "email" },
      password: { type: "text" },
      accountType: { type: "dropdown" },
    },
    onSubmit: (values) => {
      const { accountType, username } = values

      setLocalStorageItem("isAuthenticated", {
        username,
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
    >
      <Card css={{ minW: 450 }}>
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
            <TextField {...getFieldProps("username")} label="Username" />
          </FormRow>
          <FormRow>
            <SecretField {...getFieldProps("password")} label="Password" />
          </FormRow>
          <PrimaryButton css={{ w: "100%" }} disabled={!isValid} type="submit">
            Login
          </PrimaryButton>
        </form>
      </Card>
    </Flex>
  )
}
