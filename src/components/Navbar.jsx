import React, { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark/95 backdrop-blur-md border-b border-gold/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-gold font-display text-xl font-bold tracking-wider">IBERIA</span>
          <span className="text-cream/60 font-body text-xs font-light tracking-[0.3em] uppercase mt-1">ELITE</span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {['Destinos', 'Estadísticas', 'Experiencias', 'Contacto'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="nav-link text-cream/70 hover:text-cream font-body text-sm tracking-wide transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="text-cream/50 hover:text-gold text-xs tracking-widest transition-colors font-body">ES</button>
          <span className="text-cream/20">|</span>
          <button className="text-cream/50 hover:text-gold text-xs tracking-widest transition-colors font-body">EN</button>
        </div>
      </div>
    </nav>
  )
}
