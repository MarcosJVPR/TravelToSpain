import React from 'react'
import { Link } from 'react-router-dom'

const DESTINOS = [
 {
   nombre: 'Granada',
   comunidad: 'Andalucía',
   slug: 'granada',
   imagen: 'https://images.unsplash.com/photo-1669231334393-db4ae180be84?q=75&w=800&auto=format&fit=crop',
   tag: 'La Alhambra',
   acento: '#C4622D',
   descripcion: 'La Alhambra te espera. Un palacio nazarí que detiene el tiempo.',
 },
 {
   nombre: 'Sevilla',
   comunidad: 'Andalucía',
   slug: 'sevilla',
   imagen: 'https://images.unsplash.com/photo-1559386081-325882507af7?q=75&w=800&auto=format&fit=crop',
   tag: 'Flamenco & Historia',
   acento: '#E8A020',
   descripcion: 'La capital emocional de España. Flamenco, tapas y el alma del sur.',
 },
 {
   nombre: 'Barcelona',
   comunidad: 'Cataluña',
   slug: 'barcelona',
   imagen: 'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?q=75&w=800&auto=format&fit=crop',
   tag: 'Arte & Vanguardia',
   acento: '#1B4F8A',
   descripcion: 'Gaudí, Mediterráneo y una energía que no para nunca.',
 },
 {
   nombre: 'Toledo',
   comunidad: 'Castilla-La Mancha',
   slug: 'toledo',
   imagen: 'https://images.unsplash.com/photo-1600828312577-2d40fe16696b?q=75&w=800&auto=format&fit=crop',
   tag: 'Ciudad Imperial',
   acento: '#8B6914',
   descripcion: 'Tres culturas en una ciudad. Historia escrita en cada piedra.',
 },
 {
   nombre: 'Valencia',
   comunidad: 'Comunidad Valenciana',
   slug: 'valencia',
   imagen: 'https://images.unsplash.com/photo-1683624990592-ce90fed41038?q=75&w=800&auto=format&fit=crop',
   tag: 'Tradición & Vanguardia',
   acento: '#2E7D6B',
   descripcion: 'La ciudad que inventó la paella y mira siempre al futuro.',
 },
 {
   nombre: 'Ronda',
   comunidad: 'Andalucía',
   slug: 'ronda',
   imagen: 'https://images.unsplash.com/photo-1724758831193-d2b74aa36726?q=75&w=800&auto=format&fit=crop',
   tag: 'Pueblo con Historia',
   acento: '#5C4033',
   descripcion: 'Un desfiladero de 120 metros que inspiró a Hemingway.',
 },
 {
   nombre: 'Islas Canarias',
   comunidad: 'Canarias',
   slug: 'islas-canarias',
   imagen: 'https://images.unsplash.com/photo-1647002408653-129115ac90e1?q=75&w=800&auto=format&fit=crop',
   tag: 'Mar & Naturaleza',
   acento: '#1A6B9A',
   descripcion: 'Siete mundos distintos. Primavera eterna y volcanes.',
 },
]

export default function Destinos() {
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
           <Link
             key={d.nombre}
             to={`/destinos/${d.slug}`}
             className="card-hover relative overflow-hidden bg-darkcard rounded-sm group block"
           >
             <div className="relative h-56 overflow-hidden">
               <img
                 src={d.imagen}
                 alt={d.nombre}
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-darkcard via-darkcard/20 to-transparent" />
               <div className="absolute top-4 left-4">
                 <span
                   className="font-body text-xs tracking-wider uppercase backdrop-blur-sm px-3 py-1.5"
                   style={{ color: d.acento, backgroundColor: 'rgba(10,10,10,0.6)' }}
                 >
                   {d.tag}
                 </span>
               </div>
             </div>
             <div className="p-5">
               <h3 className="font-display text-2xl text-cream font-bold mb-0.5">{d.nombre}</h3>
               <p className="text-cream/40 font-body text-xs tracking-wide mb-3">{d.comunidad}</p>
               <p className="text-cream/70 font-body text-xs font-medium leading-relaxed line-clamp-2">{d.descripcion}</p>
             </div>
             <div
               className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
               style={{ backgroundColor: d.acento }}
             />
           </Link>
         ))}
       </div>
     </div>
   </section>
 )
}
