import { useEffect } from "react"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { useAuth } from "../hooks/useAuth"

export const HomePage: React.FC = () => {
  const { authenticate, isAuthenticated, login } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      authenticate()
    }
  }, [isAuthenticated])

  return (
    <Container>
      {isAuthenticated && (
        <Typography variant="h3" mt={4}>
          Signed in as {login}
        </Typography>
      )}
    </Container>
  )
}
