import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from '../components/FadeIn'

const BG_IDS = [
  'photo-1500534314209-a25ddb2bd429',
  'photo-1464965911861-746a04b4bca6',
  'photo-1494412651409-8963ce7935a7',
  'photo-1586771107445-d3ca888129ff',
  'photo-1500595046743-cd271d694d30',
  'photo-1416879595882-3373a0480b5b',
  'photo-1505118380757-91f5f5632de0',
  'photo-1466611653911-95081537e5b7',
]

const events = [
  { year: '2006', title: 'O início de uma ideia', desc: 'Um grupo informal nasce às segundas-feiras em Fortaleza. Sem estatuto, sem sede — apenas a convicção de que o diálogo transforma o agronegócio cearense. Os primeiros encontros reúnem menos de dez pessoas, mas a qualidade do debate já prenunciava o que viria.', tag: 'Fundação', featured: true },
  { year: '2007', title: 'As primeiras mesas', desc: 'O grupo começa a ganhar forma. Empresários, produtores e pesquisadores se encontram regularmente para debater os desafios do campo cearense. A regularidade dos encontros cria um sentimento de pertencimento que vai além dos negócios.', tag: 'Crescimento' },
  { year: '2008', title: 'Primeiros debates estruturantes', desc: 'A mesa passa a receber representantes do poder público, fortalecendo o diálogo entre setor privado e governo estadual. As conversas começam a gerar agendas concretas que chegam às secretarias do estado.', tag: 'Articulação' },
  { year: '2010', title: 'Expansão das cadeias', desc: 'Fruticultura, carcinicultura e pecuária leiteira ganham voz crescente nos debates semanais. O grupo consolida sua pluralidade e se torna referência para quem quer entender o agro cearense em todas as suas dimensões.', tag: 'Expansão' },
  { year: '2012', title: 'Novos temas, novos caminhos', desc: 'Projetos estruturantes ganham tração. A mesa começa a produzir agendas concretas para o desenvolvimento econômico do Ceará, e algumas dessas ideias chegam a virar política pública estadual.', tag: 'Projetos' },
  { year: '2016', title: 'Conquistas que ficam', desc: 'Realizações coletivas são reconhecidas publicamente. O grupo consolida sua reputação como espaço legítimo de articulação do agro nordestino, recebendo convidados de peso do cenário nacional.', tag: 'Conquistas', featured: true },
  { year: '2020', title: 'Resiliência na pandemia', desc: 'A pandemia não interrompe os encontros — o grupo se adapta ao formato digital e debate os impactos sobre o agronegócio, apoiando respostas setoriais. A crise revelou a solidez dos laços construídos ao longo de 14 anos.', tag: 'Resiliência' },
  { year: '2023', title: 'Bioeconomia e inovação', desc: 'Temas como hidrogênio verde, ESG e agricultura de precisão entram na pauta. O grupo acompanha a transformação do setor e lidera a conversa sobre o futuro do agro nordestino na era da sustentabilidade.', tag: 'Inovação' },
  { year: '2026', title: '20 anos — o futuro que construímos', desc: 'Duas décadas de memória coletiva chegam ao livro e à plataforma digital. A história não termina — ela se preserva e se expande. O grupo celebra não apenas o passado, mas a força do que ainda está por vir.', tag: '20 anos', featured: true },
]

export default function Timeline() {
  const [active, setActive] = useState(null)

  return (
    <main style={{ paddingTop: '64px', minHeight: '100svh' }}>
      <section style={{ padding: '5rem 0 3rem' }}>
        <FadeIn>
          <div style={{ marginBottom: '3rem', padding: '0 3rem' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
              2006 → 2026
            </div>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem,5vw,4.5rem)', fontWeight: 300, color: 'var(--cream)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Linha do <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Tempo</em>
            </h1>
          </div>
        </FadeIn>

        {/* Horizontal scroll container */}
        <div style={{ position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              gap: '2px',
              height: '520px',
              overflowX: 'auto',
              overflowY: 'hidden',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              paddingLeft: '3rem',
              paddingRight: '3rem',
            }}
          >
            {events.map((ev, i) => {
              const isActive = active === i
              const bgId = BG_IDS[i % BG_IDS.length]
              const bgUrl = `https://images.unsplash.com/${bgId}?w=800&q=60&fit=crop`

              return (
                <motion.div
                  key={ev.year}
                  layout
                  onClick={() => setActive(isActive ? null : i)}
                  animate={{ width: isActive ? 520 : 320 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={!isActive ? { scale: 1.03 } : {}}
                  style={{
                    position: 'relative',
                    flexShrink: 0,
                    height: '100%',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    borderRadius: '2px',
                  }}
                >
                  {/* Background image */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `url(${bgUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }} />

                  {/* Overlay */}
                  <motion.div
                    animate={{ background: isActive ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.55)' }}
                    transition={{ duration: 0.3 }}
                    style={{ position: 'absolute', inset: 0 }}
                  />

                  {/* Gold border left when featured */}
                  {ev.featured && (
                    <div style={{
                      position: 'absolute', left: 0, top: 0, bottom: 0,
                      width: '3px', background: 'var(--gold)',
                    }} />
                  )}

                  {/* Content */}
                  <div style={{
                    position: 'relative', height: '100%',
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '2rem',
                  }}>
                    {/* Year top-left */}
                    <div>
                      <div style={{
                        fontFamily: 'var(--serif)',
                        fontSize: '3rem',
                        fontWeight: 300,
                        color: 'var(--gold)',
                        lineHeight: 1,
                        letterSpacing: '-0.02em',
                      }}>
                        {ev.year}
                      </div>
                    </div>

                    {/* Bottom content */}
                    <div>
                      {/* Tag bottom-right absolute */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: isActive ? '1rem' : '0' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            fontFamily: 'var(--serif)',
                            fontSize: isActive ? '1.3rem' : '1.05rem',
                            fontWeight: 400,
                            color: 'var(--cream)',
                            lineHeight: 1.3,
                            marginBottom: '8px',
                            transition: 'font-size 0.3s',
                          }}>
                            {ev.title}
                          </div>
                        </div>
                        <span style={{
                          fontFamily: 'var(--mono)', fontSize: '0.58rem',
                          letterSpacing: '0.1em', textTransform: 'uppercase',
                          color: 'var(--gold)', background: 'rgba(201,169,110,0.15)',
                          padding: '3px 10px', borderRadius: '2px',
                          flexShrink: 0, marginLeft: '12px',
                          alignSelf: 'flex-end',
                        }}>
                          {ev.tag}
                        </span>
                      </div>

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: [0.22,1,0.36,1] }}
                            style={{ overflow: 'hidden' }}
                          >
                            <p style={{
                              fontFamily: 'var(--sans)', fontWeight: 300,
                              fontSize: '0.83rem', color: 'rgba(214,205,188,0.85)',
                              lineHeight: 1.75, marginBottom: '1rem',
                            }}>
                              {ev.desc}
                            </p>
                            <button
                              onClick={e => { e.stopPropagation(); setActive(null) }}
                              style={{
                                background: 'transparent',
                                border: '1px solid rgba(201,169,110,0.4)',
                                color: 'var(--gold)',
                                fontFamily: 'var(--mono)', fontSize: '0.6rem',
                                letterSpacing: '0.1em', textTransform: 'uppercase',
                                padding: '6px 14px', borderRadius: '2px',
                                cursor: 'pointer', transition: 'border-color 0.2s',
                              }}
                            >
                              fechar ×
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )
            })}

            {/* Scroll hint spacer */}
            <div style={{ flexShrink: 0, width: '1px' }} />
          </div>

          {/* Scroll hint arrow */}
          <div style={{
            position: 'absolute', right: '3rem', top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
          }}>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: '0.55rem', letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'rgba(201,169,110,0.4)',
              writingMode: 'vertical-rl', marginBottom: '8px',
            }}>
              scroll
            </div>
            <div style={{ color: 'rgba(201,169,110,0.4)', fontSize: '1.2rem', lineHeight: 1 }}>→</div>
          </div>
        </div>

        {/* Hide scrollbar for webkit */}
        <style>{`
          div::-webkit-scrollbar { display: none; }
        `}</style>
      </section>
    </main>
  )
}
