import React, { useState, useEffect, useRef } from 'react'

const STATS = [
  { valor: '85.1M', label: 'Turistas internacionales (2023)', fuente: 'Dataestur' },
  { valor: '€108B', label: 'Gasto total en turismo', fuente: 'Dataestur' },
  { valor: '32K', label: 'Alojamientos registrados', fuente: 'INE' },
  { valor: '2ª', label: 'Potencia turística mundial', fuente: 'UNWTO' },
]

export default function Stats() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="estadísticas" ref={ref} className="py-24 px-6 md:px-16 bg-darkcard border-t border-b border-cream/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-gold/70 font-body text-xs tracking-[0.4em] uppercase mb-3">
            Fuente oficial
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-cream font-bold">
            Estadísticas Clave del Turismo
            <span className="text-gold"> (Dataestur)</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-cream/5">
          {STATS.map((s, i) => (
            <div
              key={i}
              className={`bg-darkcard p-10 text-center transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <p className="font-display text-4xl md:text-5xl font-black text-gold mb-3">{s.valor}</p>
              <p className="text-cream/60 font-body text-sm leading-relaxed mb-3">{s.label}</p>
              <p className="text-cream/25 font-body text-xs tracking-widest uppercase">{s.fuente}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
