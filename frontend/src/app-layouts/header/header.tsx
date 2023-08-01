import { Flex, Text } from "@ripple/design-system"
import { WalletButton } from "../../shared/components"

export const Header = () => {
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
        Identity Verificator
      </Text>
      <WalletButton />
    </Flex>
  )
}
