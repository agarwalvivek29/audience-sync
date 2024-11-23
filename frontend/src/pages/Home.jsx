import React from 'react'
import Navbar from '../components/Navbar'
import { LampDemo } from '../components/LampDemo'
import { HeroHighlight } from '../components/ui/hero-highlight'

function Home() {
  return (
    <div>
        <Navbar />
        <LampDemo />
    </div>
  )
}

export default Home