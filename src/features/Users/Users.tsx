import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import Delete from "@mui/icons-material/Delete"
import CircularProgress from "@mui/material/CircularProgress"
import { useUsers } from "./useUsers"

export const Users: React.FC = () => {
  const { users, removeUser } = useUsers()

  if (!users) {
    return <CircularProgress size={100} />
  }

  return (
    <>
      <Typography variant="h2" sx={{ mt: 4, textAlign: "left" }}>
        Users
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Login</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>isAdmin</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(({ id, createdAt, email, isAdmin, login }, idx) => (
              <TableRow key={id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{id}</TableCell>
                <TableCell>{login}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{createdAt}</TableCell>
                <TableCell>{isAdmin.toString()}</TableCell>
                <TableCell>
                  <IconButton onClick={() => removeUser(id)} color="secondary">
                    <Delete></Delete>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
