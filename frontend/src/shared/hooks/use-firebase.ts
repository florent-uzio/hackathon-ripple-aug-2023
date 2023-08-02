import { useEffect, useState } from "react"

import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore"
import { db } from "../../firebase-config"
import { SIGNATURES } from "../constants"
import { DataSignature } from "../models"

export const useFirebase = () => {
  const [signatures, setSignatures] = useState<DataSignature[]>()
  const signaturesCollectionRef = collection(db, SIGNATURES)

  const refresh = async () => {
    const data = await getDocs(signaturesCollectionRef)
    setSignatures(
      data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id } as DataSignature
      }),
    )
  }

  const addSignature = async (payload: DataSignature) => {
    await addDoc(signaturesCollectionRef, payload)
    await refresh()
  }

  const deleteSignature = async (id: string) => {
    const signatureDoc = doc(db, SIGNATURES, id)
    await deleteDoc(signatureDoc)
    await refresh()
  }

  useEffect(() => {
    refresh()
  }, [signatures])

  return { signatures, refresh, addSignature, deleteSignature }
}
