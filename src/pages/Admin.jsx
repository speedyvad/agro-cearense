import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { artigos } from '../data/artigos'

const SENHA = 'agro2026'

export default function Admin({ navigate }) {
  const [authed, setAuthed] = useState(false)
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(false)

  const login = () => {
    if (senha === SENHA) { setAuthed(true); setErro(false) }
    else { setErro(true); setSenha('') }
  }

  if (!authed) return (
    <main style={{ paddingTop:'64px', minHeight:'100svh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg)' }}>
      <motion.div
        initial={{ opacity:0, y:20 }}
        animate={{ opacity:1, y:0 }}
        style={{ width:'360px', padding:'3rem', background:'var(--bg2)', border:'1px solid var(--border2)' }}
      >
        <div style={{ fontFamily:'var(--mono)', fontSize:'0.62rem', letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'1.5rem' }}>
          Área Restrita · Admin
        </div>
        <h1 style={{ fontFamily:'var(--serif)', fontSize:'1.6rem', fontWeight:300, color:'var(--cream)', marginBottom:'2rem', lineHeight:1.2 }}>
          Acervo do<br/><em style={{ color:'var(--gold)', fontStyle:'italic' }}>Agro Cearense</em>
        </h1>
        <input
          type="password"
          placeholder="Senha de acesso"
          value={senha}
          onChange={e => { setSenha(e.target.value); setErro(false) }}
          onKeyDown={e => e.key === 'Enter' && login()}
          style={{
            width:'100%', background:'var(--bg)',
            border:`1px solid ${erro ? 'rgba(200,80,80,0.5)' : 'var(--border2)'}`,
            padding:'12px 14px', marginBottom:'12px',
            fontFamily:'var(--sans)', fontSize:'0.85rem',
            color:'var(--cream)', outline:'none', borderRadius:'2px',
          }}
        />
        <AnimatePresence>
          {erro && (
            <motion.p
              initial={{ opacity:0, y:-4 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
              style={{ fontFamily:'var(--mono)', fontSize:'0.6rem', color:'rgba(200,100,100,0.8)', marginBottom:'12px', letterSpacing:'0.08em' }}
            >
              Senha incorreta.
            </motion.p>
          )}
        </AnimatePresence>
        <button
          onClick={login}
          style={{
            width:'100%', background:'var(--gold)', color:'var(--bg)', border:'none',
            padding:'13px', fontFamily:'var(--sans)', fontWeight:500,
            fontSize:'0.75rem', letterSpacing:'0.12em', textTransform:'uppercase', borderRadius:'2px',
          }}
          onMouseEnter={e => e.currentTarget.style.background='var(--gold2)'}
          onMouseLeave={e => e.currentTarget.style.background='var(--gold)'}
        >
          Entrar
        </button>
      </motion.div>
    </main>
  )

  return (
    <main style={{ paddingTop:'64px', minHeight:'100svh', background:'var(--bg)' }}>
      <section style={{ padding:'4rem 3.5rem' }}>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'3rem', paddingBottom:'1.5rem', borderBottom:'1px solid var(--border)' }}>
          <div>
            <div style={{ fontFamily:'var(--mono)', fontSize:'0.62rem', letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'0.75rem' }}>
              Painel Admin
            </div>
            <h1 style={{ fontFamily:'var(--serif)', fontSize:'2.5rem', fontWeight:300, color:'var(--cream)', letterSpacing:'-0.02em' }}>
              Gerenciar <em style={{ color:'var(--gold)', fontStyle:'italic' }}>Matérias</em>
            </h1>
          </div>
          <div style={{ fontFamily:'var(--mono)', fontSize:'0.6rem', letterSpacing:'0.1em', color:'var(--muted)' }}>
            {artigos.length} matérias publicadas
          </div>
        </div>

        {/* Instruções */}
        <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', padding:'2rem', marginBottom:'2rem' }}>
          <div style={{ fontFamily:'var(--mono)', fontSize:'0.6rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'1rem' }}>
            Como publicar uma nova matéria
          </div>
          <ol style={{ fontFamily:'var(--sans)', fontSize:'0.85rem', color:'var(--muted)', lineHeight:2, fontWeight:300, paddingLeft:'1.25rem' }}>
            <li>Abra o arquivo <code style={{ color:'var(--gold2)', fontFamily:'var(--mono)', fontSize:'0.78rem' }}>src/data/artigos.js</code></li>
            <li>Copie um objeto existente e cole no início do array (mais recente primeiro)</li>
            <li>Preencha: <code style={{ color:'var(--gold2)', fontFamily:'var(--mono)', fontSize:'0.78rem' }}>id</code> (slug único sem espaços), titulo, chapeu, autor, data, resumo, imgCapa, corpo</li>
            <li>Para imagens: acesse unsplash.com, abra a foto, copie o ID da URL após /photos/</li>
            <li>Use o formato: <code style={{ color:'var(--gold2)', fontFamily:'var(--mono)', fontSize:'0.78rem' }}>https://images.unsplash.com/photo-ID?w=1400&q=80&fit=crop</code></li>
            <li>Salve e faça deploy — a matéria aparece automaticamente</li>
          </ol>
        </div>

        {/* Lista de matérias */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'1px', background:'var(--border)' }}>
          {artigos.map(art => (
            <div key={art.id} style={{ background:'var(--bg2)', padding:'1.75rem', display:'flex', gap:'1.25rem', alignItems:'flex-start' }}>
              <img src={art.imgCapa} alt="" style={{ width:'80px', height:'60px', objectFit:'cover', flexShrink:0, filter:'saturate(0.6)' }} />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontFamily:'var(--mono)', fontSize:'0.58rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'6px' }}>
                  {art.tag} · {art.data}
                </div>
                <div style={{ fontFamily:'var(--serif)', fontSize:'0.98rem', color:'var(--cream)', lineHeight:1.3, marginBottom:'10px' }}>
                  {art.titulo}
                </div>
                <button
                  onClick={() => navigate('artigo', art.id)}
                  style={{
                    background:'none', border:'1px solid var(--border2)', color:'var(--muted)',
                    padding:'5px 14px', fontFamily:'var(--mono)', fontSize:'0.58rem',
                    letterSpacing:'0.1em', textTransform:'uppercase', borderRadius:'2px', transition:'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--gold)'; e.currentTarget.style.color='var(--gold)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border2)'; e.currentTarget.style.color='var(--muted)' }}
                >
                  Ver matéria →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}