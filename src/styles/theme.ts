import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#f1cf8e",
          100: "#e9b24b",
          200: "#ecbc62",
          300: "#eec578",
          400: "#f1cf8e",
          500: "#f4d8a5",
          600: "#f7e2bc",
          700: "#faecd2",
          800: "#fcf5e8",
          900: "#ffffff",
        },
        secondary: {
          main: "#60a3a0",
          100: "#006c67",
          200: "#207e7a",
          300: "#40918d",
          400: "#60a3a0",
          500: "#80b6b3",
          600: "#9fc8c6",
          700: "#bfdad9",
          800: "#dfedec",
          900: "#ffffff",
        },
      },
    },
  },
})
