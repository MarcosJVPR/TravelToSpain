import React, { useState } from 'react'

const DESTINOS = [
  {
    nombre: 'Sevilla',
    comunidad: 'Andalucía',
    imagen: 'https://images.unsplash.com/photo-1559311745-2b2e5b7c5a96?w=600&q=80&auto=format&fit=crop',
    turistas: '145K', gasto: '€220', alojamiento: '82%', rating: 4.9, tag: 'Flamenco & Historia',
  },
  {
    nombre: 'Barcelona',
    comunidad: 'Cataluña',
    imagen: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&q=80&auto=format&fit=crop',
    turistas: '310K', gasto: '€295', alojamiento: '91%', rating: 4.9, tag: 'Arte & Vanguardia',
  },
  {
    nombre: 'Mallorca',
    comunidad: 'Baleares',
    imagen: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&q=80&auto=format&fit=crop',
    turistas: '180K', gasto: '€340', alojamiento: '89%', rating: 4.8, tag: 'Mar & Naturaleza',
  },
  {
    nombre: 'Madrid',
    comunidad: 'Comunidad de Madrid',
    imagen: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80&auto=format&fit=crop',
    turistas: '260K', gasto: '€310', alojamiento: '88%', rating: 4.8, tag: 'Cultura & Gastronomía',
  },
  {
    nombre: 'Valencia',
    comunidad: 'Comunidad Valenciana',
    imagen: 'https://images.unsplash.com/photo-1599894516690-9b8e7e4b3abb?w=600&q=80&auto=format&fit=crop',
    turistas: '120K', gasto: '€195', alojamiento: '79%', rating: 4.7, tag: 'Paella & Modernismo',
  },
  {
    nombre: 'Granada',
    comunidad: 'Andalucía',
    imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop',
    turistas: '98K', gasto: '€175', alojamiento: '76%', rating: 4.9, tag: 'La Alhambra',
  },
]

export default function Destinos() {
  return (
    <section id="destinos" className="py-24 px-6 md:px-16 bg-dark">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-gold/70 font-body text-xs tracking-[0.4em] uppercase mb-3">
              Datos Dataestur — Instituto Nacional de Turismo
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-cream font-bold">
              Destinos Populares
            </h2>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-cream/40 hover:text-gold font-body text-sm transition-colors pb-0.5">
            Ver todos →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DESTINOS.map((d, i) => (
            <div key={d.nombre} className="card-hover relative overflow-hidden bg-darkcard rounded-sm cursor-pointer group">
              <div className="relative h-56 overflow-hidden">
                <img src={d.imagen} alt={d.nombre} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-darkcard via-darkcard/20 to-transparent" />
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-dark/80 backdrop-blur-sm px-2.5 py-1.5">
                  <span className="text-gold text-xs">★</span>
                  <span className="text-cream font-body text-xs font-medium">{d.rating}</span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="text-gold/80 font-body text-xs tracking-wider uppercase bg-dark/60 backdrop-blur-sm px-3 py-1.5">
                    {d.tag}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="mb-4">
                  <h3 className="font-display text-2xl text-cream font-bold mb-0.5">{d.nombre}</h3>
                  <p className="text-cream/40 font-body text-xs tracking-wide">{d.comunidad}</p>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-cream/5">
                  <div>
                    <p className="text-cream/40 font-body text-xs mb-1">Turistas/mes</p>
                    <p className="text-gold font-body text-sm font-semibold">{d.turistas}</p>
                  </div>
                  <div>
                    <p className="text-cream/40 font-body text-xs mb-1">Gasto medio</p>
                    <p className="text-gold font-body text-sm font-semibold">{d.gasto}</p>
                  </div>
                  <div>
                    <p className="text-cream/40 font-body text-xs mb-1">Ocupación</p>
                    <p className="text-gold font-body text-sm font-semibold">{d.alojamiento}</p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
