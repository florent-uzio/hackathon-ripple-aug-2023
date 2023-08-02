import { ethers } from "ethers"
import React, { createContext, useContext, useEffect, useState } from "react"
import { Keccak } from "sha3"
import { VerifyPII__factory } from "../../typechain-types/factories/did.sol/VerifyPII__factory"

type Web3ContextApi = {
  connectWallet: () => void
  currentAccount: string
  signMessage: (
    message: string,
  ) => Promise<{ message: string; signatureHash: string; address: string } | undefined>
  verifyMessage: (
    message: string,
    signatureHash: string,
    signingAddress: string,
  ) => Promise<boolean | undefined>
}

// const VERIFY_ADDRESS = "0x002B03cc1Fa230aA2820e4938d000213a9071764"
// const VERIFY_ADDRESS = "0x2352701BFa6466811c06E040A6Fa647d278E5866"
const VERIFY_ADDRESS = "0x5a8E50CcD3d8ABb7F512f2f37cA148eB1962da63"

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

    const hash = new Keccak(256)
    const hashMessage = hash.update(message).digest("hex")

    const address = await signer.getAddress()

    // sign hashed message
    const signatureHash = await window.ethereum.request({
      method: "personal_sign",
      params: [hashMessage, address],
    })

    return {
      message,
      signatureHash,
      address,
    }
  }

  const verifyMessage = async (message: string, signatureHash: string, signingAddress: string) => {
    if (!window.ethereum) return
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()

    // const contract = new ethers.Contract(VERIFY_ADDRESS, VerifyPII.abi, provider)
    const contract = VerifyPII__factory.connect(VERIFY_ADDRESS, signer)

    // await contract.store(10)
    // const numSet = await contract.retrieve()
    // console.log({ ethNumSet: numSet })

    // todo: update
    return await contract.verifySignatureV1(message, signatureHash, signingAddress)
  }

  return (
    <Web3Context.Provider value={{ connectWallet, currentAccount, signMessage, verifyMessage }}>
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
