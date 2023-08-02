import { ActionCellAction, Table, Text } from "@ripple/design-system"
import { SIGNATURES } from "../constants"
import { useAuth, useWeb3 } from "../contexts"
import { getLocalStorageItem } from "../helpers"
import { AccountType, DataSignature } from "../models"
import { TruncatedText } from "./truncated-text"

const colWidths = [5, 10, 85]

export const SignaturesTable = () => {
  const { accountType, isAuthenticated } = useAuth()
  const { verifyMessage } = useWeb3()
  const signatures = getLocalStorageItem<DataSignature[]>(SIGNATURES) ?? []

  if (signatures.length === 0) {
    return <Text>No Signatures Yet</Text>
  }

  const hasActions = accountType === AccountType.Admin && isAuthenticated

  const verifyAction: ActionCellAction = {
    label: "Verify",
    onSelect: async () => {
      const resp = await verifyMessage("hello")
      console.log({ hash: resp })
    },
  }

  return (
    <Table css={{ maxW: 1050 }} colWidths={colWidths}>
      <Table.Header>
        <Table.HeaderCell>#</Table.HeaderCell>
        <Table.HeaderCell>Nonce</Table.HeaderCell>
        <Table.HeaderCell>Signature Hash</Table.HeaderCell>
        {hasActions && <Table.HeaderCell></Table.HeaderCell>}
      </Table.Header>
      <Table.Body>
        {signatures.map((signature, index) => {
          return (
            <Table.Row key={signature.signatureHash}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{signature.nonce}</Table.Cell>
              <Table.Cell>
                <TruncatedText text={signature.signatureHash} />
              </Table.Cell>
              {hasActions && <Table.ActionCell actions={[verifyAction]} />}
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}
