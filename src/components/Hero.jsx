import React, { useState, useEffect } from 'react'

const CITIES = [
  {
    name: 'Granada',
    subtitle: 'La Alhambra te espera',
    image: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=1920&q=80&auto=format&fit=crop',
  },
  {
    name: 'Sevilla',
    subtitle: 'El alma del sur',
    image: 'https://images.unsplash.com/photo-1559311745-2b2e5b7c5a96?w=1920&q=80&auto=format&fit=crop',
  },
  {
    name: 'Barcelona',
    subtitle: 'Arte y arquitectura sin límites',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1920&q=80&auto=format&fit=crop',
  },
  {
    name: 'Toledo',
    subtitle: 'Ciudad de las tres culturas',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80&auto=format&fit=crop',
  },
  {
    name: 'Valencia',
    subtitle: 'Tradición y vanguardia',
    image: 'https://images.unsplash.com/photo-1599894516690-9b8e7e4b3abb?w=1920&q=80&auto=format&fit=crop',
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [displayedName, setDisplayedName] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const city = CITIES[current]
    let i = 0
    setDisplayedName('')
    setIsTyping(true)

    const typeInterval = setInterval(() => {
      if (i <= city.name.length) {
        setDisplayedName(city.name.slice(0, i))
        i++
      } else {
        clearInterval(typeInterval)
        setIsTyping(false)
        setTimeout(() => {
          setFade(false)
          setTimeout(() => {
            setCurrent((prev) => (prev + 1) % CITIES.length)
            setFade(true)
          }, 600)
        }, 2500)
      }
    }, 80)

    return () => clearInterval(typeInterval)
  }, [current])

  const city = CITIES[current]

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className={`absolute inset-0 transition-opacity duration-700 ${fade ? 'opacity-100' : 'opacity-0'}`}>
        <img src={city.image} alt={city.name} className="w-full h-full object-cover hero-image" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-dark/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <p className="text-gold/80 font-body text-xs tracking-[0.4em] uppercase mb-6">
            Datos oficiales de Dataestur &nbsp;•&nbsp; Turismo de lujo en España
          </p>
          <p className="text-cream/60 font-body text-lg mb-2">Descubre la majestuosidad de</p>
          <div className="flex items-baseline gap-0 mb-4">
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-black text-cream leading-none">
              {displayedName}
            </h1>
            <span className="inline-block w-1 bg-gold ml-1" style={{ height: '0.85em', animation: 'blink 0.8s step-end infinite' }} />
          </div>
          <p className={`text-cream/50 font-body text-lg mb-10 transition-opacity duration-500 ${isTyping ? 'opacity-0' : 'opacity-100'}`}>
            {city.subtitle}
          </p>
          <div className="flex items-center gap-6">
            <a href="#destinos" className="inline-flex items-center gap-3 bg-gold hover:bg-gold/90 text-dark font-body text-sm font-semibold tracking-widest uppercase px-8 py-4 transition-all duration-300 hover:gap-5">
              Explorar destinos <span>→</span>
            </a>
            <a href="#estadísticas" className="text-cream/60 hover:text-cream font-body text-sm tracking-wide transition-colors border-b border-cream/20 hover:border-cream/60 pb-0.5">
              Ver estadísticas
            </a>
          </div>
        </div>
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-3">
        {CITIES.map((c, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`transition-all duration-300 ${i === current ? 'w-6 h-1 bg-gold' : 'w-3 h-1 bg-cream/30 hover:bg-cream/60'}`}
          />
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-cream/30 font-body text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-cream/30 to-transparent" />
      </div>
    </section>
  )
}
