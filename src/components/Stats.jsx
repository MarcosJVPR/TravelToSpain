import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const FALLBACK = {
 turistas: '94M',
 gasto: '€108B',
 ocupacion: '78%',
 posicion: '2ª',
}

const CustomTooltip = ({ active, payload, label }) => {
 if (!active || !payload?.length) return null
 return (
   <div className="bg-darkcard border border-gold/20 px-4 py-3">
     <p className="text-cream/50 font-body text-xs mb-1">{label}</p>
     <p className="text-gold font-body text-sm font-semibold">{payload[0].value}M turistas</p>
   </div>
 )
}

export default function Stats() {
 const [data, setData] = useState(null)
 const [status, setStatus] = useState('loading')

 useEffect(() => {
   fetch('/api/dataestur?dataset=turistas')
     .then((res) => {
       if (!res.ok) throw new Error(`HTTP ${res.status}`)
       return res.json()
     })
     .then((json) => {
       const rows = json.rows ?? []
       const columns = json.columns ?? []

       const yearCol = columns.find((c) => /a[ñn]o|year/i.test(c))
       const valueCol = columns.find((c) => /total|llegadas|turistas|viajeros/i.test(c))

       if (!yearCol || !valueCol || rows.length === 0) {
         setStatus('fallback')
         return
       }

       const chartData = rows
         .filter((r) => r[yearCol] && r[valueCol])
         .map((r) => ({
           año: String(r[yearCol]),
           turistas: +(r[valueCol] / 1_000_000).toFixed(1),
         }))
         .slice(-10)

       setData(chartData)
       setStatus('ok')
     })
     .catch(() => setStatus('fallback'))
 }, [])

 return (
   <section id="estadísticas" className="py-24 px-6 md:px-16 bg-darkcard">
     <div className="max-w-7xl mx-auto">
       <div className="mb-14">
         <p className="text-gold/70 font-body text-xs tracking-[0.4em] uppercase mb-3">
           Dataestur — Instituto de Turismo de España
         </p>
         <h2 className="font-display text-4xl md:text-5xl text-cream font-bold">
           España en Cifras
         </h2>
       </div>

       <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-cream/5 mb-16">
         {[
           { label: 'Turistas internacionales', value: FALLBACK.turistas, source: 'FRONTUR' },
           { label: 'Gasto turístico total', value: FALLBACK.gasto, source: 'EGATUR' },
           { label: 'Ocupación hotelera', value: FALLBACK.ocupacion, source: 'EOH' },
           { label: 'Potencia turística mundial', value: FALLBACK.posicion, source: 'UNWTO' },
         ].map((stat) => (
           <div key={stat.label} className="bg-dark p-8 flex flex-col gap-3">
             <p className="text-cream/30 font-body text-xs tracking-widest uppercase">{stat.source}</p>
             <p className="text-gold font-display text-4xl md:text-5xl font-bold">{stat.value}</p>
             <p className="text-cream/60 font-body text-sm">{stat.label}</p>
           </div>
         ))}
       </div>

       <div className="bg-dark p-8">
         <div className="flex items-center justify-between mb-8">
           <div>
             <h3 className="text-cream font-display text-2xl font-bold">Llegadas de turistas internacionales</h3>
             <p className="text-cream/40 font-body text-xs mt-1">Millones de turistas — Fuente: FRONTUR / Dataestur</p>
           </div>
           {status === 'loading' && (
             <span className="text-cream/30 font-body text-xs tracking-widest animate-pulse">Cargando datos...</span>
           )}
           {status === 'ok' && (
             <span className="text-gold/60 font-body text-xs tracking-widest">DATOS EN VIVO</span>
           )}
           {status === 'fallback' && (
             <span className="text-cream/20 font-body text-xs tracking-widest">DATOS NO DISPONIBLES</span>
           )}
         </div>

         {status === 'loading' && (
           <div className="h-64 flex items-center justify-center">
             <div className="w-8 h-8 border border-gold/30 border-t-gold rounded-full animate-spin" />
           </div>
         )}

         {status === 'ok' && data && (
           <ResponsiveContainer width="100%" height={280}>
             <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
               <CartesianGrid strokeDasharray="3 3" stroke="rgba(245,240,232,0.05)" />
               <XAxis dataKey="año" tick={{ fill: 'rgba(245,240,232,0.4)', fontSize: 11, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
               <YAxis tick={{ fill: 'rgba(245,240,232,0.4)', fontSize: 11, fontFamily: 'Inter' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}M`} />
               <Tooltip content={<CustomTooltip />} />
               <Line type="monotone" dataKey="turistas" stroke="#C9933A" strokeWidth={2} dot={{ fill: '#C9933A', r: 3 }} activeDot={{ r: 5, fill: '#C9933A' }} />
             </LineChart>
           </ResponsiveContainer>
         )}

         {status === 'fallback' && (
           <div className="h-64 flex flex-col items-center justify-center gap-3">
             <p className="text-cream/30 font-body text-sm">No se pudieron cargar los datos en este momento.</p>
             <a href="https://www.dataestur.es" target="_blank" rel="noopener noreferrer"
               className="text-gold/60 hover:text-gold font-body text-xs tracking-widest transition-colors border-b border-gold/20 hover:border-gold/60 pb-0.5">
               Ver datos en Dataestur →
             </a>
           </div>
         )}
       </div>
     </div>
   </section>
 )
}
