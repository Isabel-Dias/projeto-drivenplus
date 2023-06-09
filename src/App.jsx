import { BrowserRouter, Routes, Route } from "react-router-dom"
import { UserContext } from "./contexts/UserContext"
import { useState } from "react"
import LogInPage from "./pages/LogInPage/LogInPage"
import SignInPage from "./pages/SignInPage/SignInPage"
import SubscriptionsPage from "./pages/SubscriptionsPage/SubscriptionsPage"
import HomePage from "./pages/HomePage/HomePage"
import DrivenPlan from "./pages/DrivenPlan/DrivenPlan"

export default function App() {
  const [userData, setUserData] = useState("empty");

  return (
    <>

      <UserContext.Provider value={{ userData, setUserData }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LogInPage />} />
            <Route path="/sign-up" element={<SignInPage />} />
            <Route path="/subscriptions" element={<SubscriptionsPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/subscriptions/:planID" element={<DrivenPlan />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>

    </>
  )
}
