import "./App.css"
import { PropsWithChildren } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Button, Stack } from "@mui/material"
import { PageNotFound } from "./pages/PageNotFound"
import { WelcomePage } from "./pages/WelcomePage"
import { SignUpPage } from "./pages/SignUpPage"
import { SignInPage } from "./pages/SignInPage"
import { AdminPanelPage } from "./pages/AdminPanelPage"
import { AuthContext, AuthProvider, useAuth } from "./hooks/useAuth"

const ProtectedAdminRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { isFetching, isAdmin } = useAuth()

  if (isFetching) {
    return "Loading..."
  }

  if (!isAdmin) return <Navigate to="/" />

  return children
}

const ProtectedAdminPanelPage = (
  <ProtectedAdminRoute>
    <AdminPanelPage />
  </ProtectedAdminRoute>
)

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {({ isAuthenticated, logOut }) => (
          <Stack>
            {isAuthenticated && (
              <Button
                variant="contained"
                sx={{ alignSelf: "flex-end" }}
                onClick={logOut}
              >
                Logout
              </Button>
            )}
            <BrowserRouter>
              <Routes>
                <Route path="/" Component={WelcomePage}></Route>
                <Route path="/sign-up" Component={SignUpPage}></Route>
                <Route path="/sign-in" Component={SignInPage}></Route>
                <Route
                  path="/admin-panel"
                  element={ProtectedAdminPanelPage}
                ></Route>
                <Route path="*" Component={PageNotFound}></Route>
              </Routes>
            </BrowserRouter>
          </Stack>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  )
}

export default App
