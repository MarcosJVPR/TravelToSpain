import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const DESTINOS = {
  granada: {
    nombre: 'Granada',
    comunidad: 'Andalucía',
    slug: 'granada',
    acento: '#C4622D',
    acentoClaro: '#E8875A',
    imagen: 'https://images.unsplash.com/photo-1669231334393-db4ae180be84?q=75&w=1600&auto=format&fit=crop',
    tag: 'La Alhambra',
    descripcion: 'Granada es una ciudad donde el tiempo se detiene. La Alhambra, joya nazarí declarada Patrimonio de la Humanidad, domina la ciudad desde la colina del Sabika con una perfección geométrica que deja sin palabras.',
    porQue: [
      'La Alhambra — el palacio más visitado de España',
      'El Albaicín — laberinto de calles blancas medievales',
      'Flamenco en cuevas del Sacromonte',
      'Tapas gratuitas con cada consumición',
    ],
    cuandoIr: 'Marzo a mayo o septiembre a noviembre. Agosto es agotador por el calor y la masificación.',
    secreto: 'Sube al Mirador de San Nicolás al atardecer. La Alhambra con la Sierra Nevada detrás es la postal más memorable de España.',
  },
  sevilla: {
    nombre: 'Sevilla',
    comunidad: 'Andalucía',
    slug: 'sevilla',
    acento: '#E8A020',
    acentoClaro: '#F5C842',
    imagen: 'https://images.unsplash.com/photo-1559386081-325882507af7?q=75&w=1600&auto=format&fit=crop',
    tag: 'Flamenco & Historia',
    descripcion: 'Sevilla es la capital emocional de España. La Giralda, la Torre del Oro y la Plaza de España son tres razones para quedarse, pero la ciudad te conquista por lo que no está en los mapas.',
    porQue: [
      'La Giralda — símbolo arquitectónico de la ciudad',
      'Plaza de España — escenario de película',
      'Barrio de Triana — cuna del flamenco auténtico',
      'Semana Santa y Feria de Abril — experiencias únicas',
    ],
    cuandoIr: 'Octubre a diciembre y febrero a abril. Evita julio y agosto — los 45°C no son broma.',
    secreto: 'Cruza al barrio de Triana por la tarde, siéntate en cualquier bar de la calle Betis y pide un rebujito. Eso es Sevilla de verdad.',
  },
  barcelona: {
    nombre: 'Barcelona',
    comunidad: 'Cataluña',
    slug: 'barcelona',
    acento: '#1B4F8A',
    acentoClaro: '#3B7AC4',
    imagen: 'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?q=75&w=1600&auto=format&fit=crop',
    tag: 'Arte & Vanguardia',
    descripcion: 'Barcelona es la ciudad donde el Mediterráneo se encuentra con el genio. Gaudí lo impregna todo, pero la ciudad va mucho más allá de sus iconos.',
    porQue: [
      'Sagrada Família — obra maestra inacabada de Gaudí',
      'Park Güell — mosaicos y vistas sobre la ciudad',
      'El Born — modernismo y gastronomía de nivel',
      'Barceloneta — playa en el corazón de la ciudad',
    ],
    cuandoIr: 'Mayo, junio y septiembre. El verano es hermoso pero muy masificado. Enero es tranquilo y barato.',
    secreto: 'El Mercado de Santa Caterina, a dos minutos del Born, tiene el mismo producto que la Boqueria sin la mitad del turismo y con precios reales.',
  },
  toledo: {
    nombre: 'Toledo',
    comunidad: 'Castilla-La Mancha',
    slug: 'toledo',
    acento: '#8B6914',
    acentoClaro: '#C4A035',
    imagen: 'https://images.unsplash.com/photo-1600828312577-2d40fe16696b?q=75&w=1600&auto=format&fit=crop',
    tag: 'Ciudad Imperial',
    descripcion: 'Toledo es la ciudad donde tres culturas convivieron durante siglos y lo dejaron todo escrito en piedra. A menos de una hora de Madrid, parece pertenecer a otro tiempo.',
    porQue: [
      'Catedral Primada — una de las más importantes de España',
      'Sinagoga del Tránsito — joya del arte mudéjar',
      'Mezquita del Cristo de la Luz — historia en cada piedra',
      'Vista panorámica desde el Parador Nacional',
    ],
    cuandoIr: 'Primavera y otoño. En verano el calor extremo y los grupos de turistas hacen el centro difícil. Perfecta como escapada de un día desde Madrid.',
    secreto: 'Quédate a dormir — cuando los grupos se van al atardecer, Toledo se convierte en otra ciudad. Las calles vacías de noche son mágicas.',
  },
  valencia: {
    nombre: 'Valencia',
    comunidad: 'Comunidad Valenciana',
    slug: 'valencia',
    acento: '#2E7D6B',
    acentoClaro: '#4AAF96',
    imagen: 'https://images.unsplash.com/photo-1683624990592-ce90fed41038?q=75&w=1600&auto=format&fit=crop',
    tag: 'Tradición & Vanguardia',
    descripcion: 'Valencia es la ciudad que inventó la paella y construyó la Ciudad de las Artes y las Ciencias. Esa mezcla lo dice todo: raíces profundas y una mirada permanente al futuro.',
    porQue: [
      'Ciudad de las Artes y las Ciencias — arquitectura futurista',
      'Mercado Central — uno de los más bellos de Europa',
      'Paella auténtica en los arrozales de la Albufera',
      'Las Fallas en marzo — el espectáculo más brutal de España',
    ],
    cuandoIr: 'Marzo para las Fallas, septiembre y octubre para buen tiempo sin masas. El invierno es suave y la ciudad es tuya.',
    secreto: 'La paella auténtica no se come en el centro. Coge un bus hasta el Palmar, junto a la Albufera, y busca cualquier restaurante familiar.',
  },
  ronda: {
    nombre: 'Ronda',
    comunidad: 'Andalucía',
    slug: 'ronda',
    acento: '#5C4033',
    acentoClaro: '#8D6E63',
    imagen: 'https://images.unsplash.com/photo-1724758831193-d2b74aa36726?q=75&w=1600&auto=format&fit=crop',
    tag: 'Pueblo con Historia',
    descripcion: 'Ronda es uno de esos lugares que te quitan el aliento antes incluso de entrar. El Tajo — un desfiladero de 120 metros — parte la ciudad en dos, y el Puente Nuevo lo cruza con una elegancia que ha inspirado a Hemingway.',
    porQue: [
      'Puente Nuevo — sobre un desfiladero de 120 metros',
      'Plaza de toros más antigua de España',
      'Barrios árabes de la Ciudad Vieja',
      'Vistas infinitas sobre la serranía malagueña',
    ],
    cuandoIr: 'Primavera y otoño. Evita agosto — el pueblo se llena y pierde su magia. Entre semana en temporada media es lo ideal.',
    secreto: 'Baja al fondo del Tajo por el Camino de los Molinos. La vista del Puente Nuevo desde abajo es completamente distinta y casi nadie la hace.',
  },
  'islas-canarias': {
    nombre: 'Islas Canarias',
    comunidad: 'Canarias',
    slug: 'islas-canarias',
    acento: '#1A6B9A',
    acentoClaro: '#2E9CC4',
    imagen: 'https://images.unsplash.com/photo-1647002408653-129115ac90e1?q=75&w=1600&auto=format&fit=crop',
    tag: 'Mar & Naturaleza',
    descripcion: 'Las Islas Canarias son siete mundos distintos en uno. Primavera eterna, océano en todas direcciones y una biodiversidad única en Europa.',
    porQue: [
      'Teide en Tenerife — el volcán más alto de España',
      'Dunas de Maspalomas en Gran Canaria',
      'Timanfaya en Lanzarote — paisaje marciano',
      'Cielos de La Palma — reserva mundial de astroturismo',
    ],
    cuandoIr: 'Todo el año. El invierno canario es verano para el resto de Europa — ese es su secreto.',
    secreto: 'La isla de La Gomera no tiene aeropuerto propio y eso lo cambia todo. Coge el ferry desde Tenerife — es la Canarias sin masificar.',
  },
}

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const staggerVariants = {
  animate: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function DestinoPage() {
  const { slug } = useParams()
  const destino = DESTINOS[slug]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!destino) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <p className="text-cream/40 font-body text-sm">Destino no encontrado.</p>
        <Link to="/" className="text-gold font-body text-xs tracking-widest border-b border-gold/30 pb-0.5">
          Volver al inicio
        </Link>
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slug}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ '--acento': destino.acento, '--acento-claro': destino.acentoClaro }}
      >
        {/* Hero del destino */}
        <div className="relative h-screen w-full overflow-hidden">
          <motion.img
            src={destino.imagen}
            alt={destino.nombre}
            className="w-full h-full object-cover"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${destino.acento}99 0%, transparent 50%)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-transparent to-transparent" />

          <motion.div
            className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 pb-16 max-w-7xl mx-auto"
            variants={staggerVariants}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={itemVariants}>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-cream/50 hover:text-cream font-body text-xs tracking-widest uppercase transition-colors mb-8"
              >
                ← Todos los destinos
              </Link>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="font-body text-xs tracking-[0.4em] uppercase mb-4"
              style={{ color: destino.acentoClaro }}
            >
              {destino.tag} · {destino.comunidad}
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="font-display text-7xl md:text-9xl font-black text-cream leading-none mb-6"
            >
              {destino.nombre}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-cream/80 font-body text-lg max-w-2xl leading-relaxed"
            >
              {destino.descripcion}
            </motion.p>
          </motion.div>
        </div>

        {/* Contenido */}
        <div className="bg-dark">
          <div className="max-w-5xl mx-auto px-8 md:px-16 py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

              {/* Por qué ir */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-body text-xs tracking-[0.4em] uppercase mb-6" style={{ color: destino.acentoClaro }}>
                  Por qué ir
                </p>
                <ul className="flex flex-col gap-4">
                  {destino.porQue.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: destino.acento }} />
                      <span className="text-cream/70 font-body text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Cuándo ir + secreto */}
              <motion.div
                className="flex flex-col gap-10"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div>
                  <p className="font-body text-xs tracking-[0.4em] uppercase mb-4" style={{ color: destino.acentoClaro }}>
                    Cuándo ir
                  </p>
                  <p className="text-cream/70 font-body text-sm leading-relaxed">{destino.cuandoIr}</p>
                </div>

                <div
                  className="p-6 border-l-2"
                  style={{ borderColor: destino.acento, backgroundColor: `${destino.acento}15` }}
                >
                  <p className="font-body text-xs tracking-[0.4em] uppercase mb-3" style={{ color: destino.acentoClaro }}>
                    El secreto local
                  </p>
                  <p className="text-cream/80 font-body text-sm leading-relaxed italic">{destino.secreto}</p>
                </div>
              </motion.div>
            </div>

            {/* Barra de acento y navegación */}
            <motion.div
              className="mt-24 pt-12 border-t border-cream/5 flex items-center justify-between"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to="/"
                className="text-cream/40 hover:text-cream font-body text-xs tracking-widest uppercase transition-colors"
              >
                ← Todos los destinos
              </Link>
              <div className="w-12 h-px" style={{ backgroundColor: destino.acento }} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
