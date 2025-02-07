import { Suspense } from "react"
import {Route, Routes} from "react-router-dom"
import HomePage from "./pages/HomePage"
import TrabajosActivos from "./pages/TrabajosActivos"

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trabajosActivos" element={<TrabajosActivos />} />
      </Routes>
    </Suspense>
  )
}

export default App
