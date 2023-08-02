import { AccountType } from "./account-type"

export type UserStorage = {
  username?: string
  accountType?: AccountType
  isAuthenticated: boolean
}
