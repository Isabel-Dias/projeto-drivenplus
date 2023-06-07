import { BrowserRouter, Routes, Route } from "react-router-dom"
import LogInPage from "./pages/LogInPage/LogInPage"
import SignInPage from "./pages/SignInPage/SignInPage"
export default function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogInPage />} />
          <Route path="/sign-up" element={<SignInPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
