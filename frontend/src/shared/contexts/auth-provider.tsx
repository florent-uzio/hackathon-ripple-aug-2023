import { useMountEffect } from "@ripple/design-system"
import { createContext, useContext, useState } from "react"
import { getLocalStorageItem } from "../helpers/local-storage"
import { AccountType, UserStorage } from "../models"

export type AuthContextApi = {
  accountType?: AccountType
  username?: string
  refresh: () => void
}

export const AuthContext = createContext<AuthContextApi>({} as AuthContextApi)

type AuthProviderProps = {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuth, setIsAuth] = useState<UserStorage>()

  const refreshAuth = () => {
    const value = getLocalStorageItem<UserStorage>("isAuthenticated")
    if (value) {
      console.log({ value })
      setIsAuth(value)
    }
  }

  useMountEffect(() => {
    refreshAuth()
  })

  return (
    <AuthContext.Provider value={{ ...isAuth, refresh: refreshAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider")
  }
  return context
}
