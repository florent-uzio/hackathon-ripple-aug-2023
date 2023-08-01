import { rippleTheme, useThemeSetup } from "@ripple/design-system"
import { LoginPage } from "../pages"
import { useAuth } from "../shared/contexts"

// global css for our render container to get the correct layout
const localGlobalStyles = rippleTheme.globalCss({
  "#root": {
    backgroundColor: "$background200",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
})

export const App = () => {
  useThemeSetup()
  localGlobalStyles()
  const { username } = useAuth()
  console.log({ username })

  return (
    <>
      {/* <Header /> */}
      {!!username ? <span>yes</span> : <LoginPage />}
    </>
  )
}
