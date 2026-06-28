import React from 'react'

export default function Footer() {
  return (
    <footer className="py-12 px-6 md:px-16 bg-dark border-t border-cream/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="text-gold font-display text-lg font-bold tracking-wider">IBERIA</span>
          <span className="text-cream/40 font-body text-xs tracking-[0.3em] uppercase">ELITE</span>
        </div>

        <p className="text-cream/25 font-body text-xs tracking-wide text-center">
          Datos oficiales proporcionados por Dataestur — Instituto de Turismo de España
        </p>

        <p className="text-cream/20 font-body text-xs">
          © 2024 Iberia Elite
        </p>
      </div>
    </footer>
  )
}
