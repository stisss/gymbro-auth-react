import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import { PageNotFound } from "./pages/PageNotFound"
import { WelcomePage } from "./pages/WelcomePage"
import { SignUpPage } from "./pages/SignUpPage"
import { SignInPage } from "./pages/SignInPage"
import { AdminPanelPage } from "./pages/AdminPanelPage"

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={WelcomePage}></Route>
        <Route path="/sign-up" Component={SignUpPage}></Route>
        <Route path="/sign-in" Component={SignInPage}></Route>
        <Route path="/admin-panel" Component={AdminPanelPage}></Route>
        <Route path="*" Component={PageNotFound}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
