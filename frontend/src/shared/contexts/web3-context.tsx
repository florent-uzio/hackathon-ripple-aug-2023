import { ethers } from "ethers"
import React, { createContext, useContext, useEffect, useState } from "react"

type Web3ContextApi = {
  connectWallet: () => void
  currentAccount: string
  signMessage: (
    message: string,
  ) => Promise<{ message: string; signatureHash: string; address: string } | undefined>
}

export const Web3Context = createContext<Web3ContextApi>({} as Web3ContextApi)

type NFTProviderProps = {
  children: React.ReactNode
}

export const Web3Provider: React.FC<NFTProviderProps> = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("")

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) {
      return alert("Please install Metamask")
    }

    const accounts = await window.ethereum.request({ method: "eth_accounts" })

    if (accounts.length) {
      setCurrentAccount(accounts[0])
    } else {
      console.log("No accounts found.")
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  const connectWallet = async () => {
    if (!window.ethereum) {
      return alert("Please install Metamask")
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })

    setCurrentAccount(accounts[0])

    window.location.reload()
  }

  const signMessage = async (message: string) => {
    if (!window.ethereum) return

    const provider = new ethers.BrowserProvider(window.ethereum)

    const signer = await provider.getSigner()

    const signatureHash = await signer.signMessage(message)

    const address = await signer.getAddress()

    return {
      message,
      signatureHash,
      address,
    }
  }

  return (
    <Web3Context.Provider value={{ connectWallet, currentAccount, signMessage }}>
      {children}
    </Web3Context.Provider>
  )
}

export const useWeb3 = () => {
  const context = useContext(Web3Context)
  if (!context) {
    throw new Error("useWeb3 must be used inside Web3Provider")
  }
  return context
}
