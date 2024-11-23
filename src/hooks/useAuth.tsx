import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import api from "../api"

const ME_URL = "/auth/me"
const LOGOUT_URL = "/auth/logout"

type User = {
  login: string
  email: string
  isAdmin: boolean
}

type AuthState = {
  isAuthenticated: boolean
  email?: string
  login?: string
  isAdmin?: boolean
  isFetching: boolean
  logOut: () => Promise<void>
  authenticate: () => Promise<void>
  redirectToSignIn: () => React.ReactElement
}

type UseAuth = () => AuthState

const initialState: AuthState = {
  isAuthenticated: false,
  isFetching: true,
  logOut: async () => {},
  authenticate: async () => {},
  email: "",
  isAdmin: false,
  login: "",
  redirectToSignIn: () => <></>,
}

export const AuthContext = createContext<AuthState>(initialState)

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [me, setMe] = useState<User | null>(null)
  const [isFetching, setIsFetching] = useState(initialState.isFetching)

  const navigate = useNavigate()
  const location = useLocation()

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
      navigate("/sign-in", { replace: true })
    } catch (e) {
      // TODO: handle error
      console.error(e)
    }
  }

  const redirectToSignIn = () => {
    return <Navigate to="/sign-in" state={{ from: location }} replace />
  }

  useEffect(() => {
    if (!!me) return

    authenticate()
  }, [me])

  const value = useMemo(
    () => ({
      isAuthenticated: !!me,
      isAdmin: me?.isAdmin,
      email: me?.email,
      login: me?.login,
      isFetching,
      logOut,
      authenticate,
      redirectToSignIn,
    }),
    [me, isFetching, logOut, authenticate, redirectToSignIn]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth: UseAuth = () => {
  const auth = useContext(AuthContext)

  if (!auth) {
    throw new Error("useAuth must be used withing AuthProvider")
  }

  return auth
}
