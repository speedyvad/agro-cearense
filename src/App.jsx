import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Nav from './components/Nav'
import Home from './pages/Home'
import Timeline from './pages/Timeline'
import Pessoas from './pages/Pessoas'
import Encontros from './pages/Encontros'
import Artigo from './pages/Artigo'
import Admin from './pages/Admin'
import './index.css'

const pages = { home: Home, timeline: Timeline, pessoas: Pessoas, encontros: Encontros, admin: Admin }

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -16, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }
}

export default function App() {
  const [page, setPage] = useState('home')
  const [artigoId, setArtigoId] = useState(null)
  const cursor = useRef(null)

  useEffect(() => {
    const move = (e) => {
      if (!cursor.current) return
      cursor.current.style.left = e.clientX + 'px'
      cursor.current.style.top  = e.clientY + 'px'
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  const navigate = (id, articleId = null) => {
    setPage(id)
    setArtigoId(articleId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const PageComponent = pages[page] || Home

  return (
    <>
      <div id="cursor" ref={cursor}>
        <div id="cursor-dot" />
        <div id="cursor-ring" />
      </div>
      <Nav current={page} navigate={navigate} />
      <AnimatePresence mode="wait">
        <motion.div key={page + artigoId} variants={pageVariants} initial="initial" animate="animate" exit="exit">
          {page === 'artigo'
            ? <Artigo id={artigoId} navigate={navigate} />
            : page === 'admin'
            ? <Admin navigate={navigate} />
            : <PageComponent navigate={navigate} />
          }
        </motion.div>
      </AnimatePresence>
    </>
  )
}
