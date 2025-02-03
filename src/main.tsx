import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router"
import "./index.css"
import Home from "./pages/Home.tsx"
import { setupStore } from "./store.ts"
import { Provider } from "react-redux"
import "./i18n"
import Navbar from "./components/Navbar.tsx"
import { ThemeProvider } from "@emotion/react"
import mainTheme from "./theme/main.ts"

createRoot(document.getElementById("root")!).render(
  <Provider store={setupStore()}>
    <ThemeProvider theme={mainTheme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
)
