import React, { useState, useEffect } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-darkcard border border-gold/20 px-4 py-3">
      <p className="text-cream/50 font-body text-xs mb-1">{label}</p>
      <p className="text-gold font-body text-sm font-semibold">{payload[0].value.toFixed(1)}M turistas</p>
    </div>
  )
}

const CustomBarTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-darkcard border border-gold/20 px-4 py-3">
      <p className="text-cream/50 font-body text-xs mb-1">{label}</p>
      <p className="text-gold font-body text-sm font-semibold">{payload[0].value.toFixed(1)}M visitantes</p>
    </div>
  )
}

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

export default function Stats() {
  const [status, setStatus] = useState('loading')
  const [tendencia, setTendencia] = useState([])
  const [porMes, setPorMes] = useState([])
  const [topCCAA, setTopCCAA] = useState([])
  const [topPais, setTopPais] = useState(null)
  const [mesPico, setMesPico] = useState(null)
  const [totalUltimoAno, setTotalUltimoAno] = useState(null)

  useEffect(() => {
    fetch('/api/dataestur?dataset=turistas')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((json) => {
        const rows = json.rows ?? []
        if (!rows.length) { setStatus('fallback'); return }

        const soloTuristas = rows.filter((r) => r.TIPO_VISITANTE === 'Turista')

        // Tendencia anual
        const porAno = {}
        for (const r of soloTuristas) {
          if (!r.AÑO) continue
          porAno[r.AÑO] = (porAno[r.AÑO] || 0) + (r.VISITANTES || 0)
        }
        const tendenciaData = Object.entries(porAno)
          .sort(([a], [b]) => a - b)
          .slice(-10)
          .map(([año, total]) => ({ año: String(año), turistas: +(total / 1_000_000).toFixed(1) }))
        setTendencia(tendenciaData)

        // Total último año
        const ultimoAno = tendenciaData[tendenciaData.length - 1]
        if (ultimoAno) setTotalUltimoAno(`${ultimoAno.turistas}M`)

        // Estacionalidad: mes con más turistas (último año disponible)
        const lastYear = ultimoAno?.año ? Number(ultimoAno.año) : null
        if (lastYear) {
          const porMesData = {}
          for (const r of soloTuristas) {
            if (r.AÑO !== lastYear || !r.MES) continue
            porMesData[r.MES] = (porMesData[r.MES] || 0) + (r.VISITANTES || 0)
          }
          const mesArray = Object.entries(porMesData)
            .sort(([a], [b]) => a - b)
            .map(([mes, total]) => ({ mes: MESES[Number(mes) - 1], turistas: +(total / 1_000_000).toFixed(1) }))
          setPorMes(mesArray)

          const pico = mesArray.reduce((max, m) => m.turistas > max.turistas ? m : max, mesArray[0])
          setMesPico(pico?.mes)
        }

        // Top 5 CCAA más visitadas (último año)
        if (lastYear) {
          const porCCAA = {}
          for (const r of soloTuristas) {
            if (r.AÑO !== lastYear || !r.CCAA_DESTINO) continue
            if (['Tránsito', 'Todos'].includes(r.CCAA_DESTINO)) continue
            porCCAA[r.CCAA_DESTINO] = (porCCAA[r.CCAA_DESTINO] || 0) + (r.VISITANTES || 0)
          }
          const top5 = Object.entries(porCCAA)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([ccaa, total]) => ({ ccaa: ccaa.replace('Comunidad de ', '').replace(', Comunidad Foral de', ''), turistas: +(total / 1_000_000).toFixed(1) }))
          setTopCCAA(top5)
        }

        // País que más visita España
        const porPais = {}
        for (const r of soloTuristas) {
          if (!r.PAIS_RESIDENCIA || r.PAIS_RESIDENCIA === 'Todos') continue
          porPais[r.PAIS_RESIDENCIA] = (porPais[r.PAIS_RESIDENCIA] || 0) + (r.VISITANTES || 0)
        }
        const topP = Object.entries(porPais).sort(([, a], [, b]) => b - a)[0]
        if (topP) setTopPais(topP[0])

        setStatus('ok')
      })
      .catch(() => setStatus('fallback'))
  }, [])

  if (status === 'loading') {
    return (
      <section id="estadísticas" className="py-24 px-6 md:px-16 bg-darkcard">
        <div className="max-w-7xl mx-auto flex items-center justify-center h-64">
          <div className="w-8 h-8 border border-gold/30 border-t-gold rounded-full animate-spin" />
        </div>
      </section>
    )
  }

  if (status === 'fallback') {
    return (
      <section id="estadísticas" className="py-24 px-6 md:px-16 bg-darkcard">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center h-64 gap-4">
          <p className="text-cream/30 font-body text-sm">Datos no disponibles en este momento.</p>
          <a href="https://www.dataestur.es" target="_blank" rel="noopener noreferrer"
            className="text-gold/60 hover:text-gold font-body text-xs tracking-widest transition-colors border-b border-gold/20 pb-0.5">
            Ver datos en Dataestur →
          </a>
        </div>
      </section>
    )
  }

  return (
    <section id="estadísticas" className="py-24 px-6 md:px-16 bg-darkcard">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <p className="text-gold/70 font-body text-xs tracking-[0.4em] uppercase mb-3">
            Dataestur — Instituto de Turismo de España
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-cream font-bold">
            ¿Cuándo y dónde va la gente?
          </h2>
        </div>

        {/* Datos rápidos para el viajero */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-cream/5 mb-16">
          {totalUltimoAno && (
            <div className="bg-dark p-8 flex flex-col gap-2">
              <p className="text-cream/30 font-body text-xs tracking-widest uppercase">Turistas el año pasado</p>
              <p className="text-gold font-display text-5xl font-bold">{totalUltimoAno}</p>
              <p className="text-cream/60 font-body text-sm">visitantes internacionales</p>
            </div>
          )}
          {mesPico && (
            <div className="bg-dark p-8 flex flex-col gap-2">
              <p className="text-cream/30 font-body text-xs tracking-widest uppercase">Mes más concurrido</p>
              <p className="text-gold font-display text-5xl font-bold">{mesPico}</p>
              <p className="text-cream/60 font-body text-sm">si buscas tranquilidad, evítalo</p>
            </div>
          )}
          {topPais && (
            <div className="bg-dark p-8 flex flex-col gap-2">
              <p className="text-cream/30 font-body text-xs tracking-widest uppercase">País que más nos visita</p>
              <p className="text-gold font-display text-3xl font-bold">{topPais}</p>
              <p className="text-cream/60 font-body text-sm">mayor origen de turistas</p>
            </div>
          )}
        </div>

        {/* Gráfico de tendencia anual */}
        <div className="bg-dark p-8 mb-6">
          <h3 className="text-cream font-display text-2xl font-bold mb-1">Evolución anual de visitantes</h3>
          <p className="text-cream/40 font-body text-xs mb-8">Millones de turistas internacionales — FRONTUR / Dataestur</p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={tendencia} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(245,240,232,0.05)" />
              <XAxis dataKey="año" tick={{ fill: 'rgba(245,240,232,0.4)', fontSize: 11, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(245,240,232,0.4)', fontSize: 11, fontFamily: 'Inter' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}M`} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="turistas" stroke="#C9933A" strokeWidth={2} dot={{ fill: '#C9933A', r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Estacionalidad mensual */}
        {porMes.length > 0 && (
          <div className="bg-dark p-8 mb-6">
            <h3 className="text-cream font-display text-2xl font-bold mb-1">¿Qué mes tiene más turistas?</h3>
            <p className="text-cream/40 font-body text-xs mb-8">Millones de visitantes por mes — último año disponible</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={porMes} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(245,240,232,0.05)" />
                <XAxis dataKey="mes" tick={{ fill: 'rgba(245,240,232,0.4)', fontSize: 11, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(245,240,232,0.4)', fontSize: 11, fontFamily: 'Inter' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}M`} />
                <Tooltip content={<CustomBarTooltip />} />
                <Bar dataKey="turistas" fill="#C9933A" opacity={0.8} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Top CCAA */}
        {topCCAA.length > 0 && (
          <div className="bg-dark p-8">
            <h3 className="text-cream font-display text-2xl font-bold mb-1">Destinos más visitados</h3>
            <p className="text-cream/40 font-body text-xs mb-8">Top 5 comunidades autónomas — último año disponible</p>
            <div className="flex flex-col gap-4">
              {topCCAA.map((c, i) => (
                <div key={c.ccaa} className="flex items-center gap-4">
                  <span className="text-cream/20 font-body text-xs w-4">{i + 1}</span>
                  <span className="text-cream/70 font-body text-sm w-32">{c.ccaa}</span>
                  <div className="flex-1 h-px bg-cream/5 relative">
                    <div
                      className="absolute top-1/2 -translate-y-1/2 h-0.5 bg-gold transition-all duration-700"
                      style={{ width: `${(c.turistas / topCCAA[0].turistas) * 100}%` }}
                    />
                  </div>
                  <span className="text-gold font-body text-sm font-medium">{c.turistas}M</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
