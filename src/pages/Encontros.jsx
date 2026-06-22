import { useState } from 'react'
import { motion } from 'framer-motion'
import FadeIn from '../components/FadeIn'
const u = id => `https://images.unsplash.com/${id}?w=800&q=60&fit=crop`

const encontros = [
  {
    date: '12 Mai 2026',
    tag: 'Exportação',
    title: 'A fruticultura cearense conquista novos mercados na Europa',
    guest: 'Egídio Serpa · Acervo',
    featured: true,
    num: '001',
    img: 'photo-1464965911861-746a04b4bca6',
  },
  {
    date: '28 Abr 2026',
    tag: 'Carcinicultura',
    title: 'Camarão cearense volta a ganhar espaço no mercado internacional',
    guest: 'Egídio Serpa · Acervo',
    num: '002',
    img: 'photo-1505118380757-91f5f5632de0',
  },
  {
    date: '14 Abr 2026',
    tag: 'Bioeconomia',
    title: 'Ceará se posiciona como hub do hidrogênio verde no Brasil',
    guest: 'Egídio Serpa · Acervo',
    num: '003',
    img: 'photo-1466611653911-95081537e5b7',
  },
  {
    date: '31 Mar 2026',
    tag: 'Tecnologia',
    title: 'Tecnologia e inovação transformam o campo do semiárido cearense',
    guest: 'Egídio Serpa · Acervo',
    num: '004',
    img: 'photo-1586771107445-d3ca888129ff',
  },
  {
    date: '17 Mar 2026',
    tag: 'Pecuária',
    title: 'Cooperativas reinventam a pecuária leiteira no interior do Ceará',
    guest: 'Egídio Serpa · Acervo',
    num: '005',
    img: 'photo-1500595046743-cd271d694d30',
  },
]

const artigoIdMap = {
  '001': 'fruticultura-ceara-exportacao-2026',
  '002': 'carcinicultura-retomada-exportacao',
  '003': 'hidrogenio-verde-ceara-hub',
  '004': 'agricultura-precisao-semiarido',
  '005': 'pecuaria-leiteira-cooperativas',
}

export default function Encontros({ navigate }) {
  const [hovered, setHovered] = useState(null)
  const [busca, setBusca] = useState('')

  return (
    <main style={{ paddingTop: '64px', minHeight: '100svh' }}>
      <section style={{ padding: '5rem 3rem 3rem' }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '4rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
                Segunda-feira do Agro
              </div>
              <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem,5vw,4.5rem)', fontWeight: 300, color: 'var(--cream)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Encontros <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>recentes</em>
              </h1>
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--muted)', textAlign: 'right' }}>
              <div style={{ color: 'var(--gold)', fontSize: '1.8rem', fontFamily: 'var(--serif)', fontWeight: 300, lineHeight: 1 }}>+1000</div>
              encontros realizados
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div style={{ marginBottom:'2rem', position:'relative', maxWidth:'400px' }}>
            <span style={{ position:'absolute', left:'13px', top:'50%', transform:'translateY(-50%)', color:'var(--muted)', fontSize:'1rem', pointerEvents:'none' }}>⌕</span>
            <input
              type="text"
              placeholder="Buscar por tema, convidado ou data..."
              value={busca}
              onChange={e => setBusca(e.target.value)}
              style={{
                width:'100%', background:'var(--bg2)',
                border:'1px solid var(--border2)', borderRadius:'2px',
                padding:'11px 14px 11px 38px',
                fontFamily:'var(--sans)', fontSize:'0.82rem',
                color:'var(--cream)', fontWeight:300, outline:'none',
                transition:'border-color 0.25s',
              }}
              onFocus={e => e.target.style.borderColor='rgba(201,169,110,0.5)'}
              onBlur={e => e.target.style.borderColor='var(--border2)'}
            />
          </div>
        </FadeIn>

        {(() => {
          const encontrosFiltrados = encontros.filter(e => {
            if (!busca.trim()) return true
            const q = busca.toLowerCase()
            return (
              e.title.toLowerCase().includes(q) ||
              e.tag.toLowerCase().includes(q) ||
              e.guest.toLowerCase().includes(q) ||
              e.date.toLowerCase().includes(q)
            )
          })
          return <>

        {/* Featured */}
        <FadeIn delay={0.1}>
          {encontrosFiltrados.filter(e => e.featured).map(e => (
            <motion.div
              key={e.num}
              onClick={() => navigate('artigo', artigoIdMap[e.num])}
              onHoverStart={() => setHovered(e.num)}
              onHoverEnd={() => setHovered(null)}
              style={{
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid var(--border)',
                borderLeft: `3px solid ${hovered === e.num ? 'var(--gold2)' : 'var(--gold)'}`,
                marginBottom: '1px',
                display: 'grid', gridTemplateColumns: '1fr auto',
                gap: '2rem', alignItems: 'end',
                cursor: 'none',
                minHeight: '220px',
              }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url(${u(e.img)})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                transition: 'transform 0.5s ease',
                transform: hovered === e.num ? 'scale(1.04)' : 'scale(1)',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: hovered === e.num
                  ? 'linear-gradient(135deg, rgba(10,10,8,0.88) 0%, rgba(10,10,8,0.65) 100%)'
                  : 'linear-gradient(135deg, rgba(10,10,8,0.92) 0%, rgba(10,10,8,0.75) 100%)',
                transition: 'background 0.4s',
              }} />
              <div style={{ position: 'relative', padding: '3rem' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>{e.date}</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', background: 'rgba(201,169,110,0.15)', padding: '3px 10px', borderRadius: '2px' }}>{e.tag}</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'rgba(154,144,128,0.5)', letterSpacing: '0.08em' }}>Último encontro</span>
                </div>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.3rem,2.5vw,2rem)', fontWeight: 400, color: 'var(--cream)', lineHeight: 1.3, letterSpacing: '-0.01em', marginBottom: '1rem' }}>
                  {e.title}
                </h2>
                <div style={{ fontFamily: 'var(--sans)', fontSize: '0.82rem', color: 'var(--muted)', fontWeight: 300 }}>
                  Convidado especial: <span style={{ color: 'var(--cream)', fontWeight: 400 }}>{e.guest}</span>
                </div>
              </div>
              <div style={{ position: 'relative', padding: '3rem 3rem 3rem 0', fontFamily: 'var(--serif)', fontSize: '5rem', fontWeight: 300, color: 'rgba(201,169,110,0.18)', lineHeight: 1, userSelect: 'none' }}>
                {e.num}
              </div>
            </motion.div>
          ))}
        </FadeIn>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border)', marginTop: '1px' }}>
          {encontrosFiltrados.filter(e => !e.featured).map((e, i) => (
            <FadeIn key={e.num} delay={i * 0.07}>
              <motion.div
                onClick={() => navigate('artigo', artigoIdMap[e.num])}
                onHoverStart={() => setHovered(e.num)}
                onHoverEnd={() => setHovered(null)}
                style={{
                  position: 'relative', overflow: 'hidden',
                  minHeight: '200px',
                  cursor: 'none',
                }}
              >
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `url(${u(e.img)})`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  transition: 'transform 0.5s ease',
                  transform: hovered === e.num ? 'scale(1.06)' : 'scale(1)',
                }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: hovered === e.num
                    ? 'linear-gradient(180deg, rgba(10,10,8,0.55) 0%, rgba(10,10,8,0.88) 100%)'
                    : 'linear-gradient(180deg, rgba(10,10,8,0.65) 0%, rgba(10,10,8,0.93) 100%)',
                  transition: 'background 0.4s',
                }} />
                <div style={{ position: 'relative', padding: '2.5rem 2rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'rgba(201,169,110,0.35)', letterSpacing: '0.08em' }}>
                    {e.num}
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>{e.date}</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', background: 'rgba(201,169,110,0.12)', padding: '2px 8px', borderRadius: '2px' }}>{e.tag}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', fontWeight: 400, color: 'var(--cream)', lineHeight: 1.35, marginBottom: '1rem', letterSpacing: '-0.005em' }}>
                    {e.title}
                  </h3>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 300 }}>
                    {e.guest}
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>


          </>
        })()}
      </section>
    </main>
  )
}
