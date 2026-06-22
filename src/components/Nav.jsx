import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { id: 'home',      label: 'Início' },
  { id: 'timeline',  label: 'Linha do Tempo' },
  { id: 'pessoas',   label: 'Personagens' },
  { id: 'encontros', label: 'Encontros' },
  { id: 'admin',     label: 'Admin' },
]

export default function Nav({ current, navigate }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 3rem', height: '64px',
        background: 'rgba(26,24,20,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(201,169,110,0.1)',
      }}
    >
      <button
        onClick={() => navigate('home')}
        style={{
          background: 'none', border: 'none', cursor: 'none',
          fontFamily: 'var(--serif)', fontSize: '1.05rem',
          fontWeight: 400, letterSpacing: '0.04em',
          color: 'var(--cream)',
        }}
      >
        Encontro do <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Agro Cearense</span>
      </button>

      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        {links.map(l => (
          <button
            key={l.id}
            onClick={() => navigate(l.id)}
            style={{
              background: 'none', border: 'none', cursor: 'none',
              fontFamily: 'var(--sans)', fontWeight: 400,
              fontSize: l.id === 'admin' ? '0.65rem' : '0.72rem', letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: current === l.id ? 'var(--gold)' : 'var(--muted)',
              opacity: l.id === 'admin' ? 0.4 : 1,
              transition: 'color 0.25s',
              position: 'relative',
              paddingBottom: '4px',
            }}
          >
            {l.label}
            {current === l.id && (
              <motion.span
                layoutId="nav-indicator"
                style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '1px', background: 'var(--gold)',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <div style={{
        fontFamily: 'var(--mono)', fontSize: '0.65rem',
        color: 'var(--gold)', letterSpacing: '0.08em',
        border: '1px solid rgba(201,169,110,0.3)',
        padding: '5px 12px', borderRadius: '2px',
      }}>
        2006 — 2026
      </div>

      <button
        className="nav-hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none',
          background: 'none', border: 'none',
          color: 'var(--cream)', fontSize: '1.4rem',
          padding: '4px 8px', lineHeight: 1,
        }}
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: '56px', left: 0, right: 0,
              background: 'rgba(26,24,20,0.98)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border)',
              padding: '1rem 1.5rem 1.5rem',
              zIndex: 999,
              display: 'flex', flexDirection: 'column', gap: '0',
            }}
          >
            {[
              { id: 'home', label: 'Início' },
              { id: 'timeline', label: 'Linha do Tempo' },
              { id: 'pessoas', label: 'Personagens' },
              { id: 'encontros', label: 'Encontros' },
              { id: 'admin', label: 'Admin' },
            ].map(l => (
              <button
                key={l.id}
                onClick={() => { navigate(l.id); setMenuOpen(false) }}
                style={{
                  background: 'none', border: 'none',
                  borderBottom: '1px solid var(--border)',
                  padding: '1rem 0',
                  fontFamily: 'var(--sans)', fontWeight: 400,
                  fontSize: '0.95rem', letterSpacing: '0.06em',
                  color: current === l.id ? 'var(--gold)' : 'var(--muted)',
                  textAlign: 'left', width: '100%',
                }}
              >
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
