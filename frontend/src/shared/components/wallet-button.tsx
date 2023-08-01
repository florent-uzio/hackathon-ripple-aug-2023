import { Atom, SecondaryButton } from "@ripple/design-system"
import { useWeb3 } from "../contexts"

export const WalletButton = () => {
  const { connectWallet, currentAccount } = useWeb3()

  return (
    <>
      {currentAccount.length > 0 ? (
        <Atom css={{ my: "auto", border: "$border300 1px solid", p: [1, 2], borderRadius: "$md" }}>
          {String(currentAccount).substring(0, 6) + "..." + String(currentAccount).substring(38)}
        </Atom>
      ) : (
        <SecondaryButton css={{ my: "auto" }} onClick={connectWallet}>
          Connect Wallet
        </SecondaryButton>
      )}
    </>
  )
}
