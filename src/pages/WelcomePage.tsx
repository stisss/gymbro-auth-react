import { Stack } from "@mui/material"
import { Link } from "react-router-dom"

const style = {
  color: "white",
  fontSize: "2rem",
}

export const WelcomePage: React.FC = () => {
  return (
    <Stack>
      <Link style={style} to="/sign-up">
        Sign up
      </Link>
      <Link style={style} to="/sign-in">
        Sign in
      </Link>
    </Stack>
  )
}
