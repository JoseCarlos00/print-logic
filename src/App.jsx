import { Suspense } from "react"
import {Route, Routes} from "react-router-dom"
import HomePage from "./pages/HomePage"

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </Suspense>
  )
}

export default App
