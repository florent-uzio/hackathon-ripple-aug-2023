import { Table, Text } from "@ripple/design-system"
import { SIGNATURES } from "../constants"
import { getLocalStorageItem } from "../helpers"
import { DataSignature } from "../models"
import { TruncatedText } from "./truncated-text"

const colWidths = [5, 10, 85]

export const SignaturesTable = () => {
  const signatures = getLocalStorageItem<DataSignature[]>(SIGNATURES) ?? []

  if (signatures.length === 0) {
    return <Text>No Signatures Yet</Text>
  }

  return (
    <Table css={{ maxW: 1050 }} colWidths={colWidths}>
      <Table.Header>
        <Table.HeaderCell>#</Table.HeaderCell>
        <Table.HeaderCell>Nonce</Table.HeaderCell>
        <Table.HeaderCell>Signature Hash</Table.HeaderCell>
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
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}
