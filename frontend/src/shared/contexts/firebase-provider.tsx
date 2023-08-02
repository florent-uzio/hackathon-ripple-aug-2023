import { createContext, useContext, useEffect, useState } from "react"

import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"
import { db } from "../../firebase-config"
import { SIGNATURES } from "../constants"
import { DataSignature } from "../models"

type FirebaseContextApi = {
  signatures: DataSignature[]
  refresh: () => {}
  addSignature: (payload: DataSignature) => Promise<void>
  deleteSignature: (id: string) => Promise<void>
  updateSignature: (id: string, payload: Partial<DataSignature>) => Promise<void>
}

type FirebaseProviderProps = {
  children: React.ReactNode
}

const FirebaseContext = createContext<FirebaseContextApi>({} as FirebaseContextApi)

export const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  const [signatures, setSignatures] = useState<DataSignature[]>([])
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

  const updateSignature = async (id: string, payload: Partial<DataSignature>) => {
    const signatureDoc = doc(db, SIGNATURES, id)
    await updateDoc(signatureDoc, payload)
    await refresh()
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <FirebaseContext.Provider
      value={{ signatures, refresh, addSignature, deleteSignature, updateSignature }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}

export const useFirebase = () => {
  const context = useContext(FirebaseContext)
  if (!context) {
    throw new Error("useFirebase must be used inside FirebaseProvider")
  }
  return context
}
