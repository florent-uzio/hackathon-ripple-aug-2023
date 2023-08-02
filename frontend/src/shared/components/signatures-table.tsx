import {
  ActionCellAction,
  ActionCellActions,
  Chip,
  ChipType,
  Table,
  Text,
  useMultiTriggerModal,
} from "@ripple/design-system"
import { useAuth, useWeb3 } from "../contexts"
import { useFirebase } from "../hooks/use-firebase"
import { AccountType, DataSignature, DataSignatureStatus } from "../models"
import { DeleteSignatureModal } from "./delete-signature-modal"
import { TruncatedText } from "./truncated-text"

const colWidths = [15, 10, 25, 20, 10, 10]

const getChipType = (status: DataSignatureStatus): ChipType => {
  switch (status) {
    case DataSignatureStatus.Completed: {
      return "success"
    }
    case DataSignatureStatus.Pending: {
      return "warning"
    }
    case DataSignatureStatus.Failed: {
      return "error"
    }

    default: {
      return "neutral"
    }
  }
}

export const SignaturesTable = () => {
  const { accountType, isAuthenticated } = useAuth()
  const { verifyMessage, currentAccount } = useWeb3()
  const { signatures = [] } = useFirebase()
  const { modalData, modalProps, registerMenuAction } = useMultiTriggerModal<DataSignature>()

  if (signatures.length === 0) {
    return <Text>No Signatures Yet</Text>
  }

  const canVerify = accountType === AccountType.Admin && isAuthenticated

  return (
    <>
      <Table css={{ maxW: 1250 }} colWidths={colWidths}>
        <Table.Header>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Nonce</Table.HeaderCell>
          <Table.HeaderCell>Signature Hash</Table.HeaderCell>
          <Table.HeaderCell>Public Address</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          {signatures.map((signature) => {
            const verifyAction: ActionCellAction = {
              disabled: currentAccount === "",
              label: "Verify",
              onSelect: async () => {
                const result = await verifyMessage(
                  signature.nonce,
                  signature.signatureHash,
                  signature.address,
                )
              },
            }

            const actions: ActionCellActions = canVerify
              ? [verifyAction]
              : [
                  registerMenuAction({
                    actionId: signature.id ?? "",
                    data: { ...signature },
                    props: { label: "Delete" },
                  }),
                ]

            return (
              <Table.Row key={signature.signatureHash}>
                <Table.Cell>
                  <TruncatedText text={signature.id} />
                </Table.Cell>
                <Table.Cell>{signature.nonce}</Table.Cell>
                <Table.Cell>
                  <TruncatedText text={signature.signatureHash} />
                </Table.Cell>
                <Table.Cell>
                  <TruncatedText text={signature.address} />
                </Table.Cell>
                <Table.Cell>
                  <Chip text={signature.status} type={getChipType(signature.status)} />
                </Table.Cell>
                <Table.ActionCell actions={actions} />
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
      <DeleteSignatureModal {...modalProps} {...modalData} />
    </>
  )
}
