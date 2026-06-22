import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import FadeIn from '../components/FadeIn'
import heroVideo from '../assets/hero.mp4'

const chains = [
  { icon: '🍈', name: 'Fruticultura',      desc: 'Melão, caju, banana e uva tropical — cadeias que colocaram o Ceará no mapa das exportações.',               img: 'photo-1464965911861-746a04b4bca6', gridRow: '1 / span 2', gridColumn: '1',          tall: true },
  { icon: '🦐', name: 'Carcinicultura',    desc: 'Camarão cearense reconhecido internacionalmente. Um dos maiores polos de aquicultura do Brasil.',             img: 'photo-1505118380757-91f5f5632de0', gridRow: '1',          gridColumn: '2' },
  { icon: '🥛', name: 'Pecuária leiteira', desc: 'Leite e derivados produzidos no semiárido com resiliência e inovação.',                                       img: 'photo-1500595046743-cd271d694d30', gridRow: '1',          gridColumn: '3' },
  { icon: '🐟', name: 'Piscicultura',      desc: 'Tilápia e peixes nativos criados em reservatórios do interior cearense.',                                     img: 'photo-1544552866-d3ed42536cfd', gridRow: '2',          gridColumn: '2 / span 2' },
  { icon: '🌸', name: 'Floricultura',      desc: 'Flores tropicais exportadas para Europa e América do Norte.',                                                  img: 'photo-1416879595882-3373a0480b5b', gridRow: '3',          gridColumn: '1' },
  { icon: '🌿', name: 'Algodão',           desc: 'Cotonicultura orgânica e convencional que sustenta o Nordeste.',                                               img: 'photo-1500382017468-9049fed747ef', gridRow: '3',          gridColumn: '2' },
  { icon: '💻', name: 'Tecnologia',        desc: 'Agritech, drones e agricultura de precisão transformando o campo cearense.',                                   img: 'photo-1586771107445-d3ca888129ff', gridRow: '3',          gridColumn: '3' },
  { icon: '⚡', name: 'Bioeconomia',       desc: 'Hidrogênio verde, ESG e novos mercados de carbono no horizonte cearense.',                                     img: 'photo-1466611653911-95081537e5b7', gridRow: '4',          gridColumn: '1 / span 3' },
]

const stats = [
  { num: '20',    label: 'Anos de história' },
  { num: '+1000', label: 'Segundas-feiras' },
  { num: '8',     label: 'Cadeias produtivas' },
  { num: '2006',  label: 'Ano de fundação' },
]

function AnimatedCounter({ target, prefix = '', suffix = '', format = true }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const numeric = parseInt(target.replace(/\D/g, ''), 10)
    const duration = 1800
    const steps = 60
    const increment = numeric / steps
    let current = 0
    let step = 0
    const timer = setInterval(() => {
      step++
      current = Math.min(Math.round(increment * step), numeric)
      setCount(current)
      if (step >= steps) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span ref={ref}>
      {prefix}{format ? count.toLocaleString('pt-BR') : count}{suffix}
    </span>
  )
}

function TypingText({ text, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!inView || started) return
    setStarted(true)
    let i = 0
    const startTimeout = setTimeout(() => {
      const timer = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) clearInterval(timer)
      }, 38)
      return () => clearInterval(timer)
    }, delay * 1000)
    return () => clearTimeout(startTimeout)
  }, [inView, text, delay, started])

  return (
    <span ref={ref}>
      {displayed}
      {displayed.length < text.length && inView && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          style={{ color: 'var(--gold)', marginLeft: '2px' }}
        >|</motion.span>
      )}
    </span>
  )
}

const QUOTE_TEXT = 'O Brasil tem a maior fronteira agrícola do mundo. Mas fronteira não se conquista com território — conquista-se com conhecimento, com pessoas e com a coragem de sentar à mesa e debater.'
const QUOTE_WORDS = QUOTE_TEXT.split(' ')
const GOLD_WORDS = new Set(['conhecimento', 'pessoas', 'coragem', 'mesa'])
const isGoldWord = (word) => GOLD_WORDS.has(word.replace(/[^a-zA-ZÀ-ÿ]/g, '').toLowerCase())

export default function Home({ navigate }) {
  const heroRef  = useRef(null)
  const quoteRef = useRef(null)
  const [hovered, setHovered] = useState(null)
  const quoteInView = useInView(quoteRef, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOp = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <main style={{ paddingTop: '64px' }}>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        data-hero=""
        style={{
          position: 'relative', width: '100vw', height: '100svh',
          overflow: 'hidden', display: 'flex', alignItems: 'center',
        }}
      >
        {/* LAYER 0 — video */}
        <video
          autoPlay muted loop playsInline
          src={heroVideo}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', zIndex: 0,
          }}
        />

        {/* LAYER 1 — dark overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(105deg, rgba(14,11,8,0.96) 0%, rgba(14,11,8,0.88) 25%, rgba(14,11,8,0.55) 55%, rgba(14,11,8,0.15) 80%, rgba(14,11,8,0.05) 100%)',
        }} />

        {/* LAYER 2 — content */}
        <motion.div style={{
          position: 'absolute', zIndex: 2,
          left: '50%', transform: 'translateX(-50%)',
          maxWidth: '580px', textAlign: 'center',
          opacity: heroOp,
        }}>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '2.5rem' }}
          >
            <span style={{
              fontFamily: 'var(--mono)', fontSize: '0.68rem',
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'var(--gold)', fontWeight: 300,
            }}>
              Ceará · Agronegócio · Memória
            </span>
            <span style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(201,169,110,0.4), transparent)' }} />
          </motion.div>

          {/* Title */}
          <div style={{ overflow: 'hidden', marginBottom: '1rem' }}>
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(3rem, 7vw, 6.5rem)', fontWeight: 300, lineHeight: 1.05, color: 'var(--cream)', letterSpacing: '-0.02em' }}
            >
              Há 20 anos,
            </motion.h1>
          </div>
          <div style={{ overflow: 'hidden', marginBottom: '1rem' }}>
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(3rem, 7vw, 6.5rem)', fontWeight: 300, lineHeight: 1.05, color: 'var(--cream)', letterSpacing: '-0.02em' }}
            >
              toda segunda-feira,
            </motion.h1>
          </div>
          <div style={{ overflow: 'hidden', marginBottom: '3rem' }}>
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(3rem, 7vw, 6.5rem)', fontWeight: 300, lineHeight: 1.05, fontStyle: 'italic', color: 'var(--gold)', letterSpacing: '-0.02em' }}
            >
              uma ideia senta à mesa.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ fontFamily: 'var(--sans)', fontWeight: 200, fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '480px', margin: '0 auto 2rem' }}
          >
            A história de um grupo que cultiva ideias para o futuro do Ceará
            desde 2006 — sem atas, sem formalidades, com propósito.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}
          >
            <button
              onClick={() => navigate('timeline')}
              style={{ background: 'var(--gold)', color: 'var(--bg)', border: 'none', padding: '14px 32px', fontFamily: 'var(--sans)', fontWeight: 500, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: '2px', transition: 'all 0.25s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--gold2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--gold)'}
            >
              Conhecer a história
            </button>
            <button
              onClick={() => navigate('encontros')}
              style={{ background: 'transparent', color: 'var(--cream)', border: '1px solid rgba(201,169,110,0.3)', padding: '13px 28px', fontFamily: 'var(--sans)', fontWeight: 400, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: '2px', transition: 'all 0.25s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,169,110,0.8)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(201,169,110,0.3)'}
            >
              Encontros recentes
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 5 }}
        >
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--muted)', textTransform: 'uppercase' }}>scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--gold), transparent)' }}
          />
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: '6rem 3rem', borderTop: '1px solid var(--border)' }}>
        <FadeIn delay={0}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'var(--border)' }}>
            {stats.map((s, i) => (
              <div key={s.num} style={{ background: 'var(--bg2)', padding: '3rem 2rem', textAlign: 'center' }}>
                <motion.div
                  style={{ height: '2px', background: 'var(--gold)', width: 0, margin: '0 auto 1.25rem' }}
                  whileInView={{ width: 40 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
                />
                <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem,4vw,4rem)', fontWeight: 300, color: 'var(--gold)', lineHeight: 1, marginBottom: '0.75rem' }}>
                  <AnimatedCounter
                    target={s.num.replace(/\D/g, '')}
                    prefix={s.num.startsWith('+') ? '+' : ''}
                    format={s.num !== '2006'}
                  />
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── QUOTE ── */}
      <section
        ref={quoteRef}
        style={{ padding: '6rem 3rem', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}
      >
        <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '2.5rem' }}>
            Princípio fundador · 2006
          </div>
          <blockquote style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.5rem,3vw,2.5rem)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.55, letterSpacing: '-0.01em', marginBottom: '2rem', color: 'var(--cream)' }}>
            <span>"</span>
            {QUOTE_WORDS.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={quoteInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.4, delay: i * 0.04, ease: 'easeOut' }}
                style={{
                  color: isGoldWord(word) ? 'var(--gold2)' : 'var(--cream)',
                  marginRight: '0.25em',
                  display: 'inline-block',
                  verticalAlign: 'baseline',
                }}
              >
                {word}
              </motion.span>
            ))}
            <span>"</span>
          </blockquote>
          <FadeIn delay={0.8}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              Alysson Paolinelli · Prêmio Mundial da Alimentação · 2006
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CADEIAS ── */}
      <section style={{ padding: '6rem 3rem' }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>
                Eixo temático
              </div>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 300, color: 'var(--cream)', letterSpacing: '-0.01em' }}>
                Cadeias <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>produtivas</em> à mesa
              </h2>
            </div>
            <button
              onClick={() => navigate('encontros')}
              style={{ background: 'none', border: 'none', fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              Ver encontros <span>→</span>
            </button>
          </div>
        </FadeIn>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gridTemplateRows: 'auto',
          gap: '2px',
          background: 'var(--border)',
        }}>
          {chains.map((c, i) => (
            <motion.div
              key={c.name}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              style={{
                position: 'relative', overflow: 'hidden',
                minHeight: c.tall ? '420px' : '220px',
                gridRow: c.gridRow,
                gridColumn: c.gridColumn,
              }}
            >
              {/* Background image */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url(https://images.unsplash.com/${c.img}?w=900&q=75&fit=crop)`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                filter: hovered === i ? 'saturate(1.15) brightness(1.08)' : 'none',
                transition: 'filter 0.4s',
              }} />

              {/* Overlay */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                background: hovered === i ? 'rgba(14,11,8,0.25)' : 'rgba(14,11,8,0.62)',
                transition: 'background 0.4s',
              }} />

              {/* Static bottom content */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '1.5rem', zIndex: 2,
              }}>
                <div style={{ fontSize: '1.6rem', marginBottom: '8px' }}>{c.icon}</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '1.15rem', color: 'var(--cream)' }}>
                  {c.name}
                </div>
              </div>

              {/* Hover desc panel */}
              <AnimatePresence>
                {hovered === i && (
                  <motion.div
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '100%', opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      background: 'linear-gradient(to top, rgba(14,11,8,0.96) 0%, rgba(14,11,8,0.7) 100%)',
                      padding: '1.5rem',
                      borderBottom: '2px solid var(--gold)',
                      zIndex: 3,
                    }}
                  >
                    <div style={{ fontSize: '1.6rem', marginBottom: '8px' }}>{c.icon}</div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: '1.15rem', color: 'var(--cream)', marginBottom: '10px' }}>
                      {c.name}
                    </div>
                    <div style={{ fontFamily: 'var(--sans)', fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                      {c.desc}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <FadeIn>
        <section style={{ padding: '6rem 3rem', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '2rem', background: 'var(--bg3)' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)' }}>
            Uma história que continua
          </div>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem,4vw,3.5rem)', fontWeight: 300, color: 'var(--cream)', maxWidth: '640px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            O livro conta os primeiros 20 anos.
            <br />
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>
              <TypingText text="A plataforma ajuda a escrever os próximos." delay={0.3} />
            </em>
          </h2>
          <button
            onClick={() => navigate('timeline')}
            style={{ marginTop: '1rem', background: 'transparent', border: '1px solid rgba(201,169,110,0.4)', color: 'var(--gold)', padding: '14px 36px', fontFamily: 'var(--sans)', fontWeight: 400, fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', borderRadius: '2px', transition: 'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,169,110,0.1)'; e.currentTarget.style.borderColor = 'var(--gold)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(201,169,110,0.4)' }}
          >
            Explorar a história →
          </button>
        </section>
      </FadeIn>
    </main>
  )
}
