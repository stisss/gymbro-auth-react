import { Link } from "react-router-dom"
import { Stack } from "@mui/material"
import { Users } from "../features/Users"

const style = {
  color: "white",
  fontSize: "2rem",
}

export const AdminPanelPage: React.FC = () => {
  return (
    <Stack>
      Admin panel
      <Link style={style} to="/">
        Back to welcome page
      </Link>
      <Users />
    </Stack>
  )
}
