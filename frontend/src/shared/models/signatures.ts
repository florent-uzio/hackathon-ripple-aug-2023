export type DataSignature = {
  id?: string
  message: string
  address: string
  signatureHash: string
  nonce: string
  status: DataSignatureStatus
}

export enum DataSignatureStatus {
  Pending = "PENDING",
  Completed = "COMPLETED",
  Failed = "FAILED",
}
