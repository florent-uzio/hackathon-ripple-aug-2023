import {
  ActionCellAction,
  ActionCellActions,
  Chip,
  ChipType,
  Loader,
  Table,
  Text,
  useMultiTriggerModal,
} from "@ripple/design-system"
import { useState } from "react"
import { useAuth, useFirebase, useWeb3 } from "../contexts"
import { AccountType, DataSignature, DataSignatureStatus } from "../models"
import { DeleteSignatureModal } from "./delete-signature-modal"
import { ExternalLink } from "./external-link"
import { TruncatedText } from "./truncated-text"

const colWidths = [10, 20, 20, 20, 10, 10]

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
  const { verifyMessage, currentAccount, getStatus } = useWeb3()
  const { signatures = [], updateSignature } = useFirebase()
  const { modalData, modalProps, registerMenuAction } = useMultiTriggerModal<DataSignature>()
  const [isVerifying, setIsVerifying] = useState(false)

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
          <Table.HeaderCell>Txn Hash</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          {signatures.map((signature) => {
            const verifyAction: ActionCellAction = {
              disabled: currentAccount === "",
              label: "Verify",
              onSelect: async () => {
                setIsVerifying(true)
                const verifyResp = await verifyMessage(
                  signature.nonce,
                  signature.signatureHash,
                  signature.address,
                )
                console.log({ verifyResp })

                if (!signature.id) {
                  setIsVerifying(false)
                  return
                }

                const result = await getStatus(signature.address)
                console.log({ result })

                await updateSignature(signature.id, {
                  status: result ? DataSignatureStatus.Completed : DataSignatureStatus.Failed,
                  txnHash: verifyResp?.hash,
                })
                setIsVerifying(false)
              },
            }

            const isVerified = signature.status !== DataSignatureStatus.Pending

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
                <Table.Cell>
                  <TruncatedText text={signature.nonce} />
                </Table.Cell>
                <Table.Cell>
                  <TruncatedText text={signature.signatureHash} />
                </Table.Cell>
                <Table.Cell>
                  <TruncatedText text={signature.address} />
                </Table.Cell>
                <Table.Cell>
                  <TruncatedText
                    as={ExternalLink}
                    text={signature.txnHash}
                    size="sm"
                    href={`https://evm-poa-sidechain.peersyst.tech/tx/${signature.txnHash}`}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Chip text={signature.status} type={getChipType(signature.status)} />
                </Table.Cell>
                {!isVerified && <Table.ActionCell actions={actions} />}
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
      {isVerifying && <Loader css={{ my: 2 }} />}
      <DeleteSignatureModal {...modalProps} {...modalData} />
    </>
  )
}
