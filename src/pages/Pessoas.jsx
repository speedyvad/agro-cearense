import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from '../components/FadeIn'

const filters = ['Todos', 'Fundadores', 'Empresários', 'Poder Público', 'Pesquisa', 'Mídia']

const PORTRAIT_IDS = [
  '1585747', '1559058', '1472099', '1580489', '1547592',
  '1438761', '1472099', '1534528', '1542085',
]

const pessoas = [
  {
    initials: 'FG', name: 'Fundador do Grupo', role: 'Empresário · Agro', cat: 'Fundadores',
    quote: 'A mesa nos ensinou que o Ceará avança quando privado e público sentam juntos.',
    years: '2006–presente',
    bio: 'Visionário que reuniu, pela primeira vez em 2006, um grupo informal de líderes do agronegócio cearense às segundas-feiras. Ao longo de duas décadas, conduziu debates que moldaram políticas públicas e abriram mercados internacionais para produtores locais. Com trajetória sólida no setor empresarial e profunda convicção de que o desenvolvimento do Ceará passa pelo campo, transformou um encontro semanal em um dos espaços mais influentes do agro nordestino. Sua liderança silenciosa e estratégica é o fio que une gerações de protagonistas do setor.',
  },
  {
    initials: 'ES', name: 'Egídio Serpa', role: 'Jornalista · Colunista', cat: 'Mídia',
    quote: 'Acompanhei cada encontro como testemunha de uma história que se fazia semana a semana.',
    years: '2006–2024',
    bio: 'Jornalista de carreira, Egídio Serpa cobriu décadas de transformações no agronegócio cearense com o rigor de quem entende que o campo é também pauta de poder e economia. Sua presença nas mesas do grupo conferiu ao espaço um olhar editorial aguçado, conectando os debates internos às narrativas públicas que chegavam ao grande público. Autor de colunas de referência, contribuiu para que a voz do agro cearense ecoasse além das porteiras, chegando às salas de reunião do estado e às pautas nacionais.',
  },
  {
    initials: 'LP', name: 'Liderança Produtiva', role: 'Produtor · Fruticultura', cat: 'Empresários',
    quote: 'Aqui aprendi que negócio se faz com confiança. E confiança se constrói à mesa.',
    years: '2008–presente',
    bio: 'Produtor rural de segunda geração, herdou terras no Vale do Jaguaribe e as transformou em referência nacional em fruticultura irrigada. Participante ativo do grupo desde 2008, trouxe para os debates a perspectiva de quem enfrenta cotidianamente os desafios logísticos, climáticos e sanitários do campo cearense. Defensor fervoroso da certificação de origem e das boas práticas agrícolas, ajudou a pavimentar o caminho para a manga e o melão cearenses nos mercados europeus. Hoje é um dos rostos do agro moderno do Nordeste.',
  },
  {
    initials: 'GE', name: 'Gestor do Estado', role: 'Secretário · Governo do Ceará', cat: 'Poder Público',
    quote: 'O grupo nos ajudou a entender a realidade do campo antes de qualquer política pública.',
    years: '2010–2018',
    bio: 'Ao longo de oito anos à frente de secretarias estratégicas do Governo do Ceará, participou das mesas como interlocutor do poder público em debates que influenciaram diretamente a formulação de políticas de irrigação, crédito rural e infraestrutura logística. Sua presença simbolizou a abertura do Estado ao diálogo com o setor privado — raro e valioso no contexto nordestino. Economista de formação e gestor de vocação, deixou legados institucionais que ainda estruturam programas agrícolas estaduais.',
  },
  {
    initials: 'PI', name: 'Pesquisador', role: 'Embrapa Semiárido', cat: 'Pesquisa',
    quote: 'Ciência e prática do campo se encontram nessa mesa. Isso é raro e valioso.',
    years: '2012–presente',
    bio: 'Doutor em Agronomia com especialização em culturas adaptadas ao semiárido, representa a Embrapa nos fóruns onde ciência e produção se encontram. Suas contribuições nos debates do grupo levaram tecnologias de manejo hídrico, controle biológico de pragas e variedades tolerantes à seca diretamente aos produtores. Acredita que a ponte entre laboratório e lavoura é o maior desafio — e a maior responsabilidade — do pesquisador brasileiro. No grupo, encontrou o espaço ideal para encurtar essa distância.',
  },
  {
    initials: 'EC', name: 'Empresário Cearense', role: 'Indústria · Beneficiamento', cat: 'Empresários',
    quote: 'Meus melhores negócios nasceram de conversas que começaram em uma segunda-feira.',
    years: '2009–presente',
    bio: 'Fundador de uma das maiores indústrias de beneficiamento de castanha de caju do Nordeste, construiu seu império empresarial com base em relações de confiança tecidas ao longo de anos nos encontros semanais. Defensor da verticalização da produção e da geração de empregos locais, tornou-se referência em responsabilidade social empresarial no setor. Sua trajetória ilustra como o networking qualificado transforma não apenas negócios, mas comunidades inteiras no sertão cearense.',
  },
  {
    initials: 'MC', name: 'Ministra Convidada', role: 'Ministério da Agricultura', cat: 'Poder Público',
    quote: 'Raros os grupos que mantêm esse nível de diálogo por tanto tempo e com tanto resultado.',
    years: '2014',
    bio: 'Visitou o grupo em 2014 como convidada especial e saiu impressionada com a maturidade do debate e a diversidade de vozes presentes à mesa. Ex-ministra de Estado, trouxe ao encontro uma visão federal dos desafios do agro brasileiro e abriu portas para que pautas cearenses chegassem a Brasília com mais força. Sua passagem marcou um ponto de inflexão no reconhecimento nacional do grupo como interlocutor legítimo do agronegócio nordestino.',
  },
  {
    initials: 'RC', name: 'Representante da Cadeia', role: 'Carcinicultura · ABCC', cat: 'Empresários',
    quote: 'A mesa deu voz ao camarão cearense quando o setor mais precisava de articulação.',
    years: '2007–2020',
    bio: 'Representou por mais de uma década a cadeia produtiva da carcinicultura nos debates do grupo, período que coincidiu com os maiores desafios sanitários e comerciais do setor. Sua atuação na ABCC e nos fóruns da mesa contribuiu decisivamente para a articulação de respostas coletivas às barreiras de exportação. Engenheiro de aquicultura de formação, aliou conhecimento técnico à habilidade política para garantir que o camarão cearense voltasse às mesas europeias com certificação e credibilidade.',
  },
  {
    initials: 'PT', name: 'Pesquisador Tech', role: 'Agritech · Startup', cat: 'Pesquisa',
    quote: 'Foi aqui que percebi: o futuro do agro passa pelo digital. E o grupo já sabia disso.',
    years: '2018–presente',
    bio: 'Fundador de uma agritech cearense especializada em monitoramento por satélite e inteligência artificial aplicada à agricultura familiar, chegou ao grupo como jovem pesquisador e tornou-se uma das vozes mais ouvidas nos debates sobre tecnologia e inovação. Sua startup hoje atende produtores em seis estados, mas segue enraizada no Ceará — e nas segundas-feiras que moldaram sua visão de que o impacto real da tecnologia se mede no campo, não nos slides de pitch.',
  },
]

function Modal({ person, index, onClose }) {
  const portraitId = PORTRAIT_IDS[index % PORTRAIT_IDS.length]
  const imgUrl = `https://images.unsplash.com/photo-${portraitId}?w=400&h=400&fit=crop&face`

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(12px)',
        background: 'rgba(10,10,8,0.75)',
        padding: '2rem',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 24 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--bg2)',
          border: '1px solid var(--gold)',
          borderRadius: '4px',
          padding: '3rem',
          maxWidth: '600px',
          width: '100%',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '1.5rem', right: '1.5rem',
            background: 'transparent', border: '1px solid var(--border)',
            color: 'var(--muted)', width: '32px', height: '32px',
            borderRadius: '2px', cursor: 'pointer',
            fontFamily: 'var(--mono)', fontSize: '1rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}
        >
          ×
        </button>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', marginBottom: '2rem' }}>
          {/* Avatar large */}
          <div style={{
            width: '96px', height: '96px', borderRadius: '50%',
            border: '2px solid rgba(201,169,110,0.4)',
            flexShrink: 0, overflow: 'hidden',
            background: 'rgba(201,169,110,0.06)',
          }}>
            <img
              src={imgUrl}
              alt={person.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => { e.currentTarget.style.display = 'none' }}
            />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--cream)', marginBottom: '6px', lineHeight: 1.2 }}>
              {person.name}
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.08em', color: 'var(--gold)', marginBottom: '12px' }}>
              {person.role}
            </div>
            <span style={{
              fontFamily: 'var(--mono)', fontSize: '0.6rem', letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'var(--bg)',
              background: 'var(--gold)', padding: '4px 12px', borderRadius: '2px',
            }}>
              {person.years}
            </span>
          </div>
        </div>

        <blockquote style={{
          fontFamily: 'var(--serif)', fontSize: '1rem', fontStyle: 'italic',
          color: 'var(--muted)', lineHeight: 1.65,
          borderLeft: '2px solid var(--gold)', paddingLeft: '1.25rem',
          marginBottom: '2rem',
        }}>
          "{person.quote}"
        </blockquote>

        <p style={{
          fontFamily: 'var(--sans)', fontSize: '0.88rem', fontWeight: 300,
          color: 'var(--muted)', lineHeight: 1.8,
        }}>
          {person.bio}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default function Pessoas() {
  const [filter, setFilter] = useState('Todos')
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)
  const filtered = filter === 'Todos' ? pessoas : pessoas.filter(p => p.cat === filter)

  const selectedIndex = selected !== null ? pessoas.findIndex(p => p.name === selected.name) : -1

  return (
    <main style={{ paddingTop: '64px', minHeight: '100svh' }}>
      <section style={{ padding: '5rem 3rem 3rem' }}>
        <FadeIn>
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
              Quem sentou à mesa
            </div>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem,5vw,4.5rem)', fontWeight: 300, color: 'var(--cream)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Os <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>personagens</em> da história
            </h1>
          </div>
        </FadeIn>

        {/* Filters */}
        <FadeIn delay={0.1}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '3rem', flexWrap: 'wrap' }}>
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  background: filter === f ? 'var(--gold)' : 'transparent',
                  color: filter === f ? 'var(--bg)' : 'var(--muted)',
                  border: `1px solid ${filter === f ? 'var(--gold)' : 'var(--border2)'}`,
                  padding: '7px 18px', borderRadius: '2px',
                  fontFamily: 'var(--mono)', fontSize: '0.65rem',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  transition: 'all 0.25s', fontWeight: 400,
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Grid */}
        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'var(--border)' }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.22,1,0.36,1] }}
                onHoverStart={() => setHovered(p.name)}
                onHoverEnd={() => setHovered(null)}
                onClick={() => setSelected(p)}
                style={{
                  background: hovered === p.name ? 'var(--surface)' : 'var(--bg2)',
                  padding: '2.5rem 2rem',
                  transition: 'background 0.3s',
                  position: 'relative', overflow: 'hidden',
                  cursor: 'pointer',
                }}
              >
                {hovered === p.name && (
                  <motion.div
                    layoutId="card-highlight"
                    style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'var(--gold)' }}
                  />
                )}
                <div style={{
                  width: '52px', height: '52px', borderRadius: '50%',
                  border: '1px solid rgba(201,169,110,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--serif)', fontSize: '1.1rem', color: 'var(--gold)',
                  marginBottom: '1.25rem', background: 'rgba(201,169,110,0.06)',
                }}>
                  {p.initials}
                </div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', fontWeight: 400, color: 'var(--cream)', marginBottom: '4px' }}>
                  {p.name}
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', letterSpacing: '0.08em', color: 'var(--gold)', marginBottom: '1.25rem' }}>
                  {p.role}
                </div>
                <blockquote style={{ fontFamily: 'var(--serif)', fontSize: '0.92rem', fontStyle: 'italic', color: 'var(--muted)', lineHeight: 1.65, borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                  "{p.quote}"
                </blockquote>
                <div style={{ marginTop: '10px', fontFamily: 'var(--mono)', fontSize: '0.58rem', letterSpacing: '0.08em', color: 'rgba(154,144,128,0.5)' }}>
                  {p.years}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <AnimatePresence>
        {selected && (
          <Modal
            person={selected}
            index={selectedIndex}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </main>
  )
}
