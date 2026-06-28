import React, { useState } from 'react'

const DESTINOS = [
  {
    nombre: 'Granada',
    comunidad: 'Andalucía',
    imagen: 'https://images.unsplash.com/photo-1669231334393-db4ae180be84?q=75&w=800&auto=format&fit=crop',
    tag: 'La Alhambra',
    descripcion: 'Granada es una ciudad donde el tiempo se detiene. La Alhambra, joya nazarí declarada Patrimonio de la Humanidad, domina la ciudad desde la colina del Sabika con una perfección geométrica que deja sin palabras. A sus pies, el Albaicín te arrastra por calles blancas con vistas al palacio y olor a jazmín. El flamenco, el té moruno y los barrios con historia conviven en una ciudad que no se parece a ninguna otra.',
  },
  {
    nombre: 'Sevilla',
    comunidad: 'Andalucía',
    imagen: 'https://images.unsplash.com/photo-1559386081-325882507af7?q=75&w=800&auto=format&fit=crop',
    tag: 'Flamenco & Historia',
    descripcion: 'Sevilla es la capital emocional de España. La Giralda, la Torre del Oro y la Plaza de España son tres razones para quedarse, pero la ciudad te conquista por lo que no está en los mapas: el olor a azahar en primavera, el duende del flamenco en un tablao del Triana, las tapas en el Mercado de Triana o simplemente cruzar el Guadalquivir al atardecer. Sevilla no se visita, se vive.',
  },
  {
    nombre: 'Barcelona',
    comunidad: 'Cataluña',
    imagen: 'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?q=75&w=800&auto=format&fit=crop',
    tag: 'Arte & Vanguardia',
    descripcion: 'Barcelona es la ciudad donde el Mediterráneo se encuentra con el genio. Gaudí lo impregna todo — la Sagrada Família, el Park Güell, la Casa Batlló — pero la ciudad va mucho más allá: el Born con su arquitectura modernista, la Barceloneta con sus chiringuitos, el Raval con su energía multicultural. Una ciudad que mira al futuro sin olvidar lo que es.',
  },
  {
    nombre: 'Toledo',
    comunidad: 'Castilla-La Mancha',
    imagen: 'https://images.unsplash.com/photo-1600828312577-2d40fe16696b?q=75&w=800&auto=format&fit=crop',
    tag: 'Ciudad Imperial',
    descripcion: 'Toledo es la ciudad donde tres culturas — cristiana, musulmana y judía — convivieron durante siglos y lo dejaron todo escrito en piedra. Declarada Patrimonio de la Humanidad, su casco histórico es un laberinto de callejuelas medievales con la Catedral Primada de España como epicentro. A menos de una hora de Madrid, parece pertenecer a otro tiempo.',
  },
  {
    nombre: 'Valencia',
    comunidad: 'Comunidad Valenciana',
    imagen: 'https://images.unsplash.com/photo-1683624990592-ce90fed41038?q=75&w=800&auto=format&fit=crop',
    tag: 'Tradición & Vanguardia',
    descripcion: 'Valencia es la ciudad que inventó la paella y construyó la Ciudad de las Artes y las Ciencias. Esa mezcla lo dice todo: raíces profundas y una mirada permanente al futuro. El Mercado Central, uno de los más bellos de Europa, convive con una escena gastronómica de primer nivel. Y las Fallas en marzo son, sencillamente, el espectáculo más brutal que puedes ver en España.',
  },
  {
    nombre: 'Ronda',
    comunidad: 'Andalucía',
    imagen: 'https://images.unsplash.com/photo-1724758831193-d2b74aa36726?q=75&w=800&auto=format&fit=crop',
    tag: 'Pueblo con Historia',
    descripcion: 'Ronda es uno de esos lugares que te quitan el aliento antes incluso de entrar. El Tajo — un desfiladero de 120 metros — parte la ciudad en dos, y el Puente Nuevo lo cruza con una elegancia que ha inspirado a Hemingway, Rilke y Orson Welles. La plaza de toros más antigua de España, los barrios árabes y las vistas infinitas sobre la serranía malagueña completan un pueblo que parece pintado.',
  },
  {
    nombre: 'Islas Canarias',
    comunidad: 'Canarias',
    imagen: 'https://images.unsplash.com/photo-1647002408653-129115ac90e1?q=75&w=800&auto=format&fit=crop',
    tag: 'Mar & Naturaleza',
    descripcion: 'Las Islas Canarias son siete mundos distintos en uno. Tenerife con el Teide nevado, Lanzarote con sus paisajes volcánicos de otro planeta, La Palma con sus cielos para astrónomos, Gran Canaria con sus dunas de Maspalomas. Primavera eterna, océano en todas direcciones y una biodiversidad única en Europa. Un destino que nunca se agota.',
  },
]

export default function Destinos() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="destinos" className="py-24 px-6 md:px-16 bg-dark">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-gold/70 font-body text-xs tracking-[0.4em] uppercase mb-3">
              Dataestur — Instituto de Turismo de España
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-cream font-bold">
              Destinos Populares
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DESTINOS.map((d) => (
            <div
              key={d.nombre}
              onClick={() => setSelected(d)}
              className="card-hover relative overflow-hidden bg-darkcard rounded-sm cursor-pointer group"
            >
              <div className="relative h-56 overflow-hidden">
                <img src={d.imagen} alt={d.nombre} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-darkcard via-darkcard/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="text-gold/80 font-body text-xs tracking-wider uppercase bg-dark/60 backdrop-blur-sm px-3 py-1.5">
                    {d.tag}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-2xl text-cream font-bold mb-0.5">{d.nombre}</h3>
                <p className="text-cream/40 font-body text-xs tracking-wide mb-3">{d.comunidad}</p>
                <p className="text-cream/50 font-body text-xs leading-relaxed line-clamp-2">{d.descripcion}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-darkcard overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 overflow-hidden">
              <img src={selected.imagen} alt={selected.nombre} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-darkcard via-darkcard/30 to-transparent" />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-cream/60 hover:text-cream font-body text-xs tracking-widest transition-colors bg-dark/60 backdrop-blur-sm px-3 py-2"
              >
                CERRAR ✕
              </button>
              <div className="absolute bottom-4 left-6">
                <span className="text-gold/80 font-body text-xs tracking-wider uppercase">{selected.tag}</span>
              </div>
            </div>
            <div className="p-8">
              <p className="text-cream/40 font-body text-xs tracking-widest uppercase mb-2">{selected.comunidad}</p>
              <h3 className="font-display text-4xl text-cream font-bold mb-6">{selected.nombre}</h3>
              <p className="text-cream/70 font-body text-sm leading-relaxed">{selected.descripcion}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
