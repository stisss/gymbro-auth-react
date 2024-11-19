import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"

import { useUsers } from "./useUsers"
import { Delete } from "@mui/icons-material"

export const Users: React.FC = () => {
  const { users, removeUser } = useUsers()
  return (
    <>
      <Typography variant="h2" sx={{ mt: 4, alignSelf: "start" }}>
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
                  <IconButton onClick={() => removeUser(id)}>
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
