import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react"
import api from "../api"

const ME_URL = "/auth/me"
const LOGOUT_URL = "/auth/logout"

type User = {
  login: string
  email: string
  isAdmin: boolean
}

type UseAuth = () => {
  isAuthenticated: boolean
  email?: string
  login?: string
  isAdmin?: boolean
  isFetching: boolean
  logOut: () => Promise<void>
  authenticate: () => Promise<void>
}

type AuthState = {
  isAuthenticated: boolean
  email?: string
  login?: string
  isAdmin?: boolean
  isFetching: boolean
  logOut: () => Promise<void>
  authenticate: () => Promise<void>
}

const initialState: AuthState = {
  isAuthenticated: false,
  isFetching: false,
  logOut: async () => {},
  authenticate: async () => {},
  email: "",
  isAdmin: false,
  login: "",
}

export const AuthContext = createContext<AuthState>(initialState)

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [me, setMe] = useState<User | null>(null)
  const [isFetching, setIsFetching] = useState(false)

  // TODO: use caching and polling instead
  const authenticate = async () => {
    setIsFetching(() => true)
    try {
      const res = await api.get<User>(ME_URL)
      setMe(res.data)
    } catch (e) {
      // TODO: handle error
      setMe(null)
      console.error(e)
    } finally {
      setIsFetching(() => false)
    }
  }

  const logOut = async () => {
    try {
      await api.get(LOGOUT_URL)
      setMe(null)
    } catch (e) {
      // TODO: handle error
      console.error(e)
    }
  }

  const value = useMemo(
    () => ({
      isAuthenticated: !!me,
      isAdmin: me?.isAdmin,
      email: me?.email,
      login: me?.login,
      isFetching,
      logOut,
      authenticate,
    }),
    [me, isFetching, logOut, authenticate]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth: UseAuth = () => {
  const auth = useContext(AuthContext)

  return auth
}
