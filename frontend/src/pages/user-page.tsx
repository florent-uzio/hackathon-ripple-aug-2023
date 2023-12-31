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
import { useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { SignaturesTable } from "../shared/components"
import { useFirebase, useWeb3 } from "../shared/contexts"
import { Blockchain, DataSignature, DataSignatureStatus } from "../shared/models"

const FORM_ID = "user-form"

export const UserPage = () => {
  const { currentAccount, signMessage } = useWeb3()
  const { addSignature, refresh } = useFirebase()

  const { getValues, formProps, getFieldProps, isFieldHidden, updateFieldsConfig, isValid } =
    useForm({
      fields: {
        blockchain: { type: "dropdown", value: Blockchain.XRPL },
        publicKey: { type: "text" },
        publicAddress: { type: "text" },
        // firstName: { type: "text" },
        // lastName: { type: "text" },
        nonce: { type: "text", value: uuidv4() },
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
        const { nonce } = values

        const resultat = await signMessage(nonce)

        if (resultat) {
          const savedData: DataSignature = {
            ...resultat,
            nonce,
            status: DataSignatureStatus.Pending,
          }

          await addSignature(savedData)
          await refresh()
          updateFieldsConfig({
            nonce: {
              value: uuidv4(),
            },
          })
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
        <Heading css={{ mx: "auto" }} level={1}>
          {import.meta.env.VITE_TITLE}
        </Heading>
        <Heading css={{ my: 3 }} level={4}>
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
