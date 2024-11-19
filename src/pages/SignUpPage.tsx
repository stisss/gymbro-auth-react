import { Link } from "react-router-dom"
import { Stack } from "@mui/material"
import { SignUp } from "../features/SignUp"

const style = {
  color: "white",
  fontSize: "2rem",
}

export const SignUpPage: React.FC = () => {
  return (
    <Stack>
      Sign up
      <Link style={style} to="/">
        Back to welcome page
      </Link>
      <SignUp />
    </Stack>
  )
}
