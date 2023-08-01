import { rippleTheme, useThemeSetup } from "@ripple/design-system"
import { LoginPage, UserPage } from "../pages"
import { AdminPage } from "../pages/admin-page"
import { useAuth } from "../shared/contexts"
import { AccountType } from "../shared/models"
import { Header } from "./header"

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
  const { username, accountType } = useAuth()

  return (
    <>
      {!!username ? (
        <>
          <Header />
          {accountType === AccountType.Admin ? <AdminPage /> : <UserPage />}
        </>
      ) : (
        <LoginPage />
      )}
    </>
  )
}
