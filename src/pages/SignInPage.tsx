import { Link } from "react-router-dom"
import { Stack } from "@mui/material"

const style = {
  color: "white",
  fontSize: "2rem",
}

export const SignInPage: React.FC = () => {
  return (
    <Stack>
      Sign in
      <Link style={style} to="/">
        Back to welcome page
      </Link>
    </Stack>
  )
}
