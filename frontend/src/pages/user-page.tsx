import {
  DropdownField,
  Flex,
  FormRow,
  Heading,
  PrimaryButton,
  Text,
  TextField,
  useForm,
} from "@ripple/design-system"
import { genUID } from "@ripple/ui-helpers"
import { useEffect } from "react"
import { SignaturesTable } from "../shared/components"
import { SIGNATURES } from "../shared/constants"
import { useWeb3 } from "../shared/contexts"
import { getLocalStorageItem, setLocalStorageItem } from "../shared/helpers"
import { Blockchain, DataSignature } from "../shared/models"

const FORM_ID = "user-form"

export const UserPage = () => {
  const uid = genUID()
  const { currentAccount, signMessage } = useWeb3()

  const { getValues, formProps, getFieldProps, isFieldHidden, updateFieldsConfig, isValid } =
    useForm({
      fields: {
        blockchain: { type: "dropdown", value: Blockchain.XRPL },
        publicKey: { type: "text" },
        publicAddress: { type: "text" },
        // firstName: { type: "text" },
        // lastName: { type: "text" },
        nonce: { type: "text", value: uid },
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
      onSubmit: async (values) => {
        const { firstName, lastName, nonce } = values
        // const message = JSON.stringify({ firstName, lastName, nonce })
        const message = `${firstName}${lastName}${nonce}`
        const resultat = await signMessage(message)

        if (resultat) {
          const savedData: DataSignature = { ...resultat, nonce }
          const previousSignatures = getLocalStorageItem<DataSignature[]>(SIGNATURES) ?? []

          setLocalStorageItem(SIGNATURES, [...previousSignatures, savedData])
        }
      },
    })

  const blockchainType = getValues().blockchain

  useEffect(() => {
    updateFieldsConfig({
      publicAddress: {
        value: blockchainType === Blockchain.ETH ? currentAccount : "",
      },
    })
  }, [currentAccount, blockchainType])

  return (
    <>
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
          {/* <FormRow>
          <TextField {...getFieldProps("firstName")} label="First Name" />
        </FormRow>
        <FormRow>
          <TextField {...getFieldProps("lastName")} label="Last Name" />
        </FormRow> */}
          <FormRow>
            <TextField disabled={true} {...getFieldProps("nonce")} label="Nonce" />
          </FormRow>
          <PrimaryButton disabled={!isValid || currentAccount === ""} css={{ w: "100%" }}>
            Sign Data With Metamask
          </PrimaryButton>
        </form>
      </Flex>
      <Flex css={{ m: "auto" }} direction="column">
        <Text css={{ fontWeight: "$bold" }}>Signatures Available</Text>
        <SignaturesTable />
      </Flex>
    </>
  )
}
