import { createTheme } from "@mui/material"

const mainTheme = createTheme({
  palette: {
    primary: {
      main: "#ba0b0b",
    },
    secondary: {
      main: "#FFC0CB",
    },
  },
  typography: {
    fontFamily: ["Hina Mincho", "Roboto"].join(","),
  },
})

export default mainTheme
