import React from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Destinos from './components/Destinos.jsx'
import Stats from './components/Stats.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <Hero />
      <Destinos />
      <Stats />
      <Footer />
    </div>
  )
}
