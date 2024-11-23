import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import SignIn from './pages/auth/SignIn'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TablePage from "./pages/TablePage"
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<Navbar />} /> 
       <Route path="/TablePage" element={<TablePage />} /> 
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
