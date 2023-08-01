import { Atom, SecondaryButton } from "@ripple/design-system"
import { useEffect, useState } from "react"

export const WalletButton = () => {
  const [walletAddress, setWallet] = useState("")
  const [, setError] = useState("")

  const connectWallet = async () => {
    if (window.ethereum) {
      // Checks if MetaMask is installed in the browser
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
          // Requests an array of account addresses from the connect MetaMask wallet
        })
        const obj = {
          address: addressArray[0],
          // Grabs the first address in the array
        }
        return obj
      } catch (err) {
        throw err
      }
    } else {
      throw new Error(
        "You must install MetaMask, a virtual Ethereum wallet, in your browser.",
        // If MetaMask is not installed, the function will throw an error and tell the user they first need to install Metamask
      )
    }
  }

  const getConnectedWallet = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
          // Requests an array of account addresses from the connected MetaMask wallet
        })
        if (addressArray.length > 0) {
          return {
            address: addressArray[0],
            // First, we make sure atleast one address is avaiable and then return the first address in the array
          }
        } else {
          throw new Error("Connect to MetaMask using the connect wallet button.")
          // If there are no addresses in the array, this means MetaMask is installed but the user has not connected their account yet.
        }
      } catch (err) {
        throw err
      }
    } else {
      throw new Error("You must install MetaMask, a virtual Ethereum wallet, in your browser.")
    }
  }

  const walletConnectHandler = async () => {
    try {
      const walletResponse = await connectWallet()
      // We create a variable to await the returned promise of our connectWallet function
      setWallet(walletResponse.address)
      // Now we set the walletAddress state with the response so we can render this change in our wallet button
      setError("")
      // The SetError state is managed in App.js and is passed in as a prop to our wallet button
      // The state is set to null because we did not encounter an error while connecting to the wallet
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message)
      }
      // Otherwise, we set the error state with the encountered error
    }
  }

  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        // First, we listen for an account change event from Metamask
        if (accounts.length > 0) {
          setWallet(accounts[0])
          // Then, we set our walletAddress state to the new account address
          setError("")
        } else {
          setWallet("")
        }
      })
    } else {
      throw Error("You must install Metamask, a virtual Ethereum wallet, in your browser.")
    }
  }

  const load = async () => {
    try {
      const { address } = await getConnectedWallet()
      setWallet(address)
      addWalletListener()
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message)
      }
    }
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <>
      {walletAddress.length > 0 ? (
        <Atom css={{ my: "auto", border: "$border300 1px solid", p: 2, borderRadius: "$md" }}>
          {String(walletAddress).substring(0, 6) + "..." + String(walletAddress).substring(38)}
        </Atom>
      ) : (
        <SecondaryButton css={{ my: "auto" }} onClick={walletConnectHandler}>
          Connect Wallet
        </SecondaryButton>
      )}
    </>
  )
}
