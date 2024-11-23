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

const ProtectedAdminRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { isFetching, isAdmin, isAuthenticated } = useAuth()

  if (isFetching) {
    return "Loading..."
  }

  if (!isAdmin) return <Navigate to={isAuthenticated ? "/" : "sign-in"} />

  return children
}

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { isFetching, isAuthenticated } = useAuth()

  if (isFetching) {
    return "Loading..."
  }

  if (!isAuthenticated) return <Navigate to="/sign-in" />

  return children
}

const ProtectedUsersPage = (
  <ProtectedAdminRoute>
    <UsersPage />
  </ProtectedAdminRoute>
)

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Stack>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" Component={HomePage}></Route>
            <Route path="/sign-up" Component={SignUpPage}></Route>
            <Route path="/sign-in" Component={SignInPage}></Route>
            <Route path="/users" element={ProtectedUsersPage}></Route>
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
        </BrowserRouter>
      </Stack>
    </AuthProvider>
  )
}

export default App
