import { Flex, SecondaryButton, Text } from "@ripple/design-system"
import { WalletButton } from "../../shared/components"
import { IS_AUTHENTICATED } from "../../shared/constants"
import { useAuth } from "../../shared/contexts"
import { removeLocalStorageItem } from "../../shared/helpers"
import { AccountType } from "../../shared/models"

export const Header = () => {
  const { accountType, isAuthenticated, refresh } = useAuth()
  const logoutHandler = () => {
    removeLocalStorageItem(IS_AUTHENTICATED)
    refresh()
  }

  return (
    <Flex
      as="header"
      justifyContent="space-between"
      alignContent="center"
      css={{
        h: 72,
        backgroundColor: "$background300",
        p: [1, 10],
        boxShadow: "$medium",
      }}
    >
      <Text
        css={{
          fontSize: "$600",
          my: "auto",
        }}
      >
        {accountType === AccountType.Admin
          ? "Admin Compliance Investigation"
          : "User Compliance Verification"}
      </Text>
      <Flex gap={2} alignItems="center">
        <WalletButton />
        {isAuthenticated && <SecondaryButton onClick={logoutHandler}>Logout</SecondaryButton>}
      </Flex>
    </Flex>
  )
}
