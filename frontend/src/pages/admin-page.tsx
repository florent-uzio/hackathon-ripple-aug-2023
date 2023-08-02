import { Flex, Text } from "@ripple/design-system"
import { SignaturesTable } from "../shared/components"

export const AdminPage = () => {
  return (
    <Flex css={{ m: "auto" }} direction="column">
      <Text css={{ fontWeight: "$bold" }}>Signatures Available</Text>
      <SignaturesTable />
    </Flex>
  )
}
