import { ConfirmationModal, ModalControlModalProps } from "@ripple/design-system"

import { useFirebase } from "../hooks/use-firebase"

export type WorkItemCancelTriggerProps = {
  id?: string
}

type CancelWorkItemModalProps = ModalControlModalProps & WorkItemCancelTriggerProps

export const DeleteSignatureModal = ({ id, ...rest }: CancelWorkItemModalProps) => {
  const { deleteSignature } = useFirebase()

  const deleteSignDoc = async () => {
    if (!id) return
    console.log({ id })
    await deleteSignature(id)
  }

  return (
    <ConfirmationModal
      {...rest}
      onConfirm={deleteSignDoc}
      title="Delete Signature"
      message="This will delete the signature from the database"
      cancelLabel="Cancel"
      confirmLabel="Delete"
    />
  )
}
