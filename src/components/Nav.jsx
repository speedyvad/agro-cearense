import { useState, useEffect } from 'react'
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: isMobile ? '0 1.25rem' : '0 3rem',
          height: isMobile ? '56px' : '64px',
          background: 'rgba(26,24,20,0.92)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(201,169,110,0.1)',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => { navigate('home'); setMenuOpen(false) }}
          style={{
            background: 'none', border: 'none', cursor: 'none',
            fontFamily: 'var(--serif)', fontSize: isMobile ? '0.9rem' : '1.05rem',
            fontWeight: 400, letterSpacing: '0.04em', color: 'var(--cream)',
          }}
        >
          Encontro do <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Agro Cearense</span>
        </button>

        {/* Desktop links */}
        {!isMobile && (
          <ul style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', listStyle: 'none' }}>
            {links.map(l => (
              <li key={l.id}>
                <button
                  onClick={() => navigate(l.id)}
                  style={{
                    background: 'none', border: 'none', cursor: 'none',
                    fontFamily: 'var(--sans)', fontWeight: 400,
                    fontSize: l.id === 'admin' ? '0.65rem' : '0.72rem',
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: current === l.id ? 'var(--gold)' : l.id === 'admin' ? 'rgba(154,144,128,0.4)' : 'var(--muted)',
                    position: 'relative', paddingBottom: '4px',
                    transition: 'color 0.25s',
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
              </li>
            ))}
          </ul>
        )}

        {/* Desktop badge */}
        {!isMobile && (
          <div style={{
            fontFamily: 'var(--mono)', fontSize: '0.65rem',
            color: 'var(--gold)', letterSpacing: '0.08em',
            border: '1px solid rgba(201,169,110,0.3)',
            padding: '5px 12px', borderRadius: '2px',
          }}>
            2006 — 2026
          </div>
        )}

        {/* Hamburger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            style={{
              background: 'none', border: 'none',
              color: 'var(--cream)', fontSize: '1.5rem',
              padding: '4px 8px', lineHeight: 1,
              zIndex: 1001, position: 'relative',
            }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        )}
      </motion.nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              top: '56px', left: 0, right: 0,
              background: 'rgba(20,16,10,0.98)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(201,169,110,0.15)',
              zIndex: 999,
              paddingBottom: '0.5rem',
            }}
          >
            {links.map(l => (
              <button
                key={l.id}
                onClick={() => { navigate(l.id); setMenuOpen(false) }}
                style={{
                  display: 'block', width: '100%',
                  background: 'none',
                  border: 'none',
                  borderBottom: '1px solid rgba(201,169,110,0.08)',
                  padding: '1rem 1.5rem',
                  fontFamily: 'var(--sans)', fontWeight: 400,
                  fontSize: '1rem', letterSpacing: '0.04em',
                  color: current === l.id ? 'var(--gold)' : 'var(--muted)',
                  textAlign: 'left',
                  transition: 'color 0.2s',
                }}
              >
                {current === l.id && (
                  <span style={{ color: 'var(--gold)', marginRight: '8px', fontSize: '0.6rem' }}>●</span>
                )}
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
