import { motion } from 'framer-motion'
import { artigos } from '../data/artigos'
import FadeIn from '../components/FadeIn'

export default function Artigo({ id, navigate }) {
  const artigo = artigos.find(a => a.id === id)

  if (!artigo) return (
    <main style={{ paddingTop:'64px', minHeight:'100svh', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <p style={{ color:'var(--muted)', fontFamily:'var(--mono)', fontSize:'0.8rem', letterSpacing:'0.1em' }}>
        Matéria não encontrada.
      </p>
    </main>
  )

  const relacionados = artigos.filter(a => a.id !== artigo.id).slice(0, 3)

  return (
    <main style={{ paddingTop:'64px', background:'var(--bg)' }}>

      {/* HERO */}
      <section style={{ position:'relative', height:'72vh', minHeight:'480px', overflow:'hidden' }}>
        <img
          src={artigo.imgCapa}
          alt={artigo.titulo}
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}
        />
        <div style={{
          position:'absolute', inset:0,
          background:'linear-gradient(to top, rgba(14,11,8,0.97) 0%, rgba(14,11,8,0.65) 45%, rgba(14,11,8,0.15) 100%)',
        }} />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'3rem 3.5rem', maxWidth:'860px' }}>
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}>
            <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'1rem' }}>
              <button
                onClick={() => navigate('encontros')}
                style={{
                  background:'none', border:'none', color:'var(--muted)',
                  fontFamily:'var(--mono)', fontSize:'0.62rem', letterSpacing:'0.12em',
                  textTransform:'uppercase', cursor:'none',
                }}
              >
                ← Voltar
              </button>
              <span style={{ color:'var(--border2)' }}>·</span>
              <span style={{ fontFamily:'var(--mono)', fontSize:'0.62rem', letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--gold)' }}>
                {artigo.chapeu}
              </span>
            </div>
            <h1 style={{
              fontFamily:'var(--serif)', fontSize:'clamp(2rem,4vw,3.2rem)',
              fontWeight:300, color:'var(--cream)', lineHeight:1.15,
              letterSpacing:'-0.02em', marginBottom:'1.5rem', maxWidth:'780px',
            }}>
              {artigo.titulo}
            </h1>
            <div style={{ display:'flex', alignItems:'center', gap:'1.5rem', fontFamily:'var(--mono)', fontSize:'0.6rem', letterSpacing:'0.1em', textTransform:'uppercase' }}>
              <span style={{ color:'var(--gold)' }}>{artigo.autor}</span>
              <span style={{ color:'var(--border2)' }}>·</span>
              <span style={{ color:'var(--muted)' }}>{artigo.data}</span>
              <span style={{ color:'var(--border2)' }}>·</span>
              <span style={{ color:'var(--muted)' }}>{artigo.tempoLeitura} de leitura</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* RESUMO */}
      <FadeIn>
        <div style={{
          maxWidth:'680px', margin:'3rem 0 0',
          marginLeft:'clamp(2rem,10vw,14rem)',
          borderLeft:'3px solid var(--gold)',
          paddingLeft:'1.5rem',
        }}>
          <p style={{
            fontFamily:'var(--serif)', fontSize:'1.25rem',
            fontStyle:'italic', color:'var(--cream)',
            lineHeight:1.65, fontWeight:300,
          }}>
            {artigo.resumo}
          </p>
        </div>
      </FadeIn>

      {/* CORPO */}
      <article style={{
        maxWidth:'680px', padding:'3rem clamp(1.5rem,5vw,2rem) 5rem',
        marginLeft:'clamp(2rem,10vw,14rem)',
      }}>
        {artigo.corpo.map((bloco, i) => {
          if (bloco.tipo === 'paragrafo') return (
            <FadeIn key={i} delay={i * 0.04}>
              <p style={{
                fontFamily:'var(--sans)', fontWeight:300,
                fontSize:'1.05rem', lineHeight:1.9,
                color:'var(--cream)', opacity:0.88, marginBottom:'1.75rem',
              }}>
                {bloco.texto}
              </p>
            </FadeIn>
          )
          if (bloco.tipo === 'pullquote') return (
            <FadeIn key={i} delay={i * 0.04}>
              <blockquote style={{
                margin:'2.5rem 0', padding:'1.5rem 2rem',
                borderLeft:'2px solid var(--gold)',
                background:'rgba(201,169,110,0.04)',
              }}>
                <p style={{
                  fontFamily:'var(--serif)', fontSize:'1.4rem',
                  fontStyle:'italic', fontWeight:300,
                  color:'var(--gold2)', lineHeight:1.5, letterSpacing:'-0.01em',
                }}>
                  "{bloco.texto}"
                </p>
              </blockquote>
            </FadeIn>
          )
          return null
        })}

        <div style={{
          marginTop:'3rem', paddingTop:'2rem', borderTop:'1px solid var(--border)',
          display:'flex', alignItems:'center', gap:'12px',
        }}>
          <span style={{ fontFamily:'var(--mono)', fontSize:'0.6rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--gold)' }}>
            {artigo.autor}
          </span>
          <span style={{ color:'var(--border2)' }}>·</span>
          <span style={{ fontFamily:'var(--mono)', fontSize:'0.6rem', letterSpacing:'0.1em', color:'var(--muted)' }}>
            {artigo.chapeu}
          </span>
        </div>
      </article>

      {/* RELACIONADOS */}
      <section style={{ padding:'4rem 3.5rem', borderTop:'1px solid var(--border)', background:'var(--bg2)' }}>
        <FadeIn>
          <div style={{ fontFamily:'var(--mono)', fontSize:'0.62rem', letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'2rem' }}>
            Leia também
          </div>
        </FadeIn>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1px', background:'var(--border)' }}>
          {relacionados.map((rel, i) => (
            <FadeIn key={rel.id} delay={i * 0.1}>
              <div
                onClick={() => navigate('artigo', rel.id)}
                style={{ background:'var(--bg2)', padding:'0', cursor:'none', transition:'background 0.25s' }}
                onMouseEnter={e => e.currentTarget.style.background='var(--surface)'}
                onMouseLeave={e => e.currentTarget.style.background='var(--bg2)'}
              >
                <img src={rel.imgCapa} alt={rel.titulo} style={{ width:'100%', height:'140px', objectFit:'cover', display:'block', filter:'saturate(0.7) brightness(0.8)' }} />
                <div style={{ padding:'1.25rem 1.5rem' }}>
                  <div style={{ fontFamily:'var(--mono)', fontSize:'0.58rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'8px' }}>
                    {rel.tag} · {rel.data}
                  </div>
                  <div style={{ fontFamily:'var(--serif)', fontSize:'1rem', fontWeight:400, color:'var(--cream)', lineHeight:1.35 }}>
                    {rel.titulo}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

    </main>
  )
}