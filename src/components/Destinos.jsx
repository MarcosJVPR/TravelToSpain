import React from 'react'

const DESTINOS = [
 {
   nombre: 'Granada',
   comunidad: 'Andalucía',
   imagen: 'https://images.unsplash.com/photo-1669231334393-db4ae180be84?q=80&w=800&auto=format&fit=crop',
   tag: 'La Alhambra',
   rating: 4.9,
 },
 {
   nombre: 'Sevilla',
   comunidad: 'Andalucía',
   imagen: 'https://images.unsplash.com/photo-1559386081-325882507af7?q=80&w=800&auto=format&fit=crop',
   tag: 'Flamenco & Historia',
   rating: 4.9,
 },
 {
   nombre: 'Barcelona',
   comunidad: 'Cataluña',
   imagen: 'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?q=80&w=800&auto=format&fit=crop',
   tag: 'Arte & Vanguardia',
   rating: 4.9,
 },
 {
   nombre: 'Toledo',
   comunidad: 'Castilla-La Mancha',
   imagen: 'https://images.unsplash.com/photo-1600828312577-2d40fe16696b?q=80&w=800&auto=format&fit=crop',
   tag: 'Ciudad Imperial',
   rating: 4.8,
 },
 {
   nombre: 'Valencia',
   comunidad: 'Comunidad Valenciana',
   imagen: 'https://images.unsplash.com/photo-1683624990592-ce90fed41038?q=80&w=800&auto=format&fit=crop',
   tag: 'Tradición & Vanguardia',
   rating: 4.7,
 },
 {
   nombre: 'Ronda',
   comunidad: 'Andalucía',
   imagen: 'https://images.unsplash.com/photo-1724758831193-d2b74aa36726?q=80&w=800&auto=format&fit=crop',
   tag: 'Pueblo con Historia',
   rating: 4.8,
 },
 {
   nombre: 'Islas Canarias',
   comunidad: 'Canarias',
   imagen: 'https://images.unsplash.com/photo-1647002408653-129115ac90e1?q=80&w=800&auto=format&fit=crop',
   tag: 'Mar & Naturaleza',
   rating: 4.8,
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
         <a href="#" className="hidden md:flex items-center gap-2 text-cream/40 hover:text-gold font-body text-sm transition-colors pb-0.5">
           Ver todos →
         </a>
       </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
         {DESTINOS.map((d) => (
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
               <h3 className="font-display text-2xl text-cream font-bold mb-0.5">{d.nombre}</h3>
               <p className="text-cream/40 font-body text-xs tracking-wide">{d.comunidad}</p>
             </div>
             <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
           </div>
         ))}
       </div>
     </div>
   </section>
 )
}
