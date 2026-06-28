import React from 'react'

export default function Footer() {
  return (
    <footer className="py-16 px-6 bg-darkcard border-t border-cream/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-gold font-display text-xl font-bold tracking-wider">TRAVEL</span>
          <span className="font-body text-xs font-light tracking-[0.3em] uppercase mt-1">TO SPAIN</span>
        </div>

        <p className="text-cream/30 font-body text-xs text-center max-w-md">
          Datos proporcionados por Dataestur — Instituto de Turismo de España
        </p>

        <p className="text-cream/20 font-body text-xs">
          © 2025 Travel to Spain
        </p>
      </div>
    </footer>
  )
}
