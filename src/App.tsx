import "./App.css"
import { PropsWithChildren } from "react"
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom"
import Stack from "@mui/material/Stack"
import { ThemeProvider } from "@mui/material/styles"
import {
  PageNotFound,
  HomePage,
  SignUpPage,
  SignInPage,
  UsersPage,
  ClientsPage,
  NewClientPage,
  EditClientPage,
} from "./pages"
import { AuthProvider, useAuth } from "./hooks/useAuth"
import { Navbar } from "./layout/Navbar"
import { theme } from "./styles/theme"

const ProtectedAdminRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { isFetching, isAdmin, isAuthenticated, redirectToSignIn } = useAuth()

  if (isFetching) {
    return null
  }

  if (!isAdmin && isAuthenticated) {
    return <Navigate to="/" replace />
  }

  if (!isAdmin && !isAuthenticated) {
    return redirectToSignIn()
  }

  return children
}

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { isFetching, isAuthenticated, redirectToSignIn } = useAuth()

  if (isFetching) {
    return null
  }

  if (!isAuthenticated) {
    return redirectToSignIn()
  }

  return children
}

const PublicRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated, isFetching } = useAuth()

  if (isFetching) {
    return null
  }

  if (isAuthenticated) {
    return <Navigate to="/" />
  }

  return children
}

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <Stack>
            <Navbar />
            <Routes>
              <Route path="/" Component={HomePage}></Route>
              <Route
                path="/sign-up"
                element={
                  <PublicRoute>
                    <SignUpPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/sign-in"
                element={
                  <PublicRoute>
                    <SignInPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <ProtectedAdminRoute>
                    <UsersPage />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/clients"
                element={
                  <ProtectedRoute>
                    <Outlet />
                  </ProtectedRoute>
                }
              >
                <Route index Component={ClientsPage} />
                <Route path="new" Component={NewClientPage} />
                <Route path=":id" Component={EditClientPage} />
              </Route>
              <Route path="*" Component={PageNotFound}></Route>
            </Routes>
          </Stack>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
