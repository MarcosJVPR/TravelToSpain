import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Destinos from './components/Destinos.jsx'
import Stats from './components/Stats.jsx'
import Footer from './components/Footer.jsx'
import DestinoPage from './pages/DestinoPage.jsx'

function Home() {
  return (
    <>
      <Hero />
      <Destinos />
      <Stats />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinos/:slug" element={<DestinoPage />} />
      </Routes>
    </div>
  )
}
