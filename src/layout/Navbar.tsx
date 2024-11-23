import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { AppBar, Toolbar, Button, Box } from "@mui/material"
import { useAuth } from "../hooks/useAuth"

export const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { isAuthenticated, logOut, isAdmin } = useAuth()

  const menuItems = [
    { label: "Home", path: "/", show: isAuthenticated },
    { label: "Clients", path: "/clients", show: isAuthenticated },
    { label: "Users", path: "/users", show: isAdmin },
    { label: "Sign in", path: "/sign-in", show: !isAuthenticated },
    { label: "Sign up", path: "/sign-up", show: !isAuthenticated },
  ]

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ marginLeft: "auto", gap: 2 }}>
          {menuItems.map(
            (item) =>
              item.show && (
                <Button
                  key={item.path}
                  color="inherit"
                  onClick={() => navigate(item.path)}
                  sx={{
                    borderRadius: 0,
                    borderBottom:
                      location.pathname === item.path
                        ? "2px solid white"
                        : "none",
                  }}
                >
                  {item.label}
                </Button>
              )
          )}
          {isAuthenticated && (
            <Button
              variant="contained"
              sx={{ ml: 4 }}
              onClick={logOut}
              color="secondary"
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
