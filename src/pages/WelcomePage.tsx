import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Stack, Typography } from "@mui/material"
import { useAuth } from "../hooks/useAuth"

const style = {
  color: "white",
  fontSize: "2rem",
}

export const WelcomePage: React.FC = () => {
  const { isAdmin, authenticate, isAuthenticated, login } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      authenticate()
    }
  }, [isAuthenticated])

  return (
    <Stack>
      {!isAuthenticated && (
        <>
          <Link style={style} to="/sign-up">
            Sign up
          </Link>
          <Link style={style} to="/sign-in">
            Sign in
          </Link>
        </>
      )}
      {isAuthenticated && (
        <Typography variant="h3">Signed in as {login}</Typography>
      )}
      {isAdmin && (
        <Link style={style} to="/admin-panel">
          Admin panel
        </Link>
      )}
    </Stack>
  )
}
