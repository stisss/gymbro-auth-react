import { Link } from "react-router-dom"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableContainer from "@mui/material/TableContainer"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import Button from "@mui/material/Button"
import Delete from "@mui/icons-material/Delete"
import Edit from "@mui/icons-material/Edit"
import CircularProgress from "@mui/material/CircularProgress"
import { useClients } from "./useClients"

export const Clients: React.FC = () => {
  const { clients, removeClient } = useClients()

  if (!clients) {
    return <CircularProgress size={100} />
  }

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mt={4}
      >
        <Typography variant="h2" sx={{ alignSelf: "start" }}>
          Clients
        </Typography>
        <Button
          component={Link}
          to="/clients/new"
          variant="contained"
          sx={{ height: "min-content" }}
        >
          Create new
        </Button>
      </Stack>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Secret</TableCell>
              <TableCell>Redirect URIs</TableCell>
              <TableCell>Scopes</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Created by</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map(
              (
                {
                  createdAt,
                  createdById,
                  id,
                  name,
                  redirectUris,
                  scopes,
                  secret,
                },
                idx
              ) => (
                <TableRow key={id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{id}</TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>{secret}</TableCell>
                  <TableCell>{redirectUris.join(", ")}</TableCell>
                  <TableCell>{scopes.join(", ")}</TableCell>
                  <TableCell>{new Date(createdAt).toLocaleString()}</TableCell>
                  <TableCell>{createdById}</TableCell>
                  <TableCell sx={{ display: "flex" }}>
                    <IconButton
                      component={Link}
                      to={`/clients/${id}`}
                      color="secondary"
                    >
                      <Edit></Edit>
                    </IconButton>
                    <IconButton
                      onClick={() => removeClient(id)}
                      color="secondary"
                    >
                      <Delete></Delete>
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
