import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import SignIn from './pages/auth/SignIn'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import BusinessDetails from './pages/BusinessDetails'
import DatabaseDetails from './pages/DatabaseDetails'
import ChannelIntegration from './pages/ChannelIntegration'
import UserEventIntegration from './pages/UserEventIntegration'

import TablePage from "./pages/TablePage"
import Home from './pages/home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<Home />} /> 
       <Route path="/onboarding/BusinessDetails" element={<BusinessDetails />} />
       <Route path="/onboarding/DatabaseDetails" element={< DatabaseDetails/>} />  
        <Route path="/onboarding/ChannelIntegration" element={<ChannelIntegration />} />
        <Route path="/onboarding/UserEventIntegration" element={<UserEventIntegration />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
