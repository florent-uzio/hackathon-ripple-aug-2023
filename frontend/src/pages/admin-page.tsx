import { Flex, Heading, Text } from "@ripple/design-system"
import { SignaturesTable } from "../shared/components"

export const AdminPage = () => {
  return (
    <Flex css={{ m: "auto" }} direction="column">
      <Heading css={{ mx: "auto", mb: 4 }} level={1}>
        {import.meta.env.VITE_TITLE}
      </Heading>
      <Text css={{ fontWeight: "$bold" }}>Signatures Available</Text>
      <SignaturesTable />
    </Flex>
  )
}
