# Encontro do Agro Cearense — Plataforma Digital

> A história de um grupo que há 20 anos cultiva ideias para o futuro do Ceará.

![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat-square&logo=vite)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff0055?style=flat-square&logo=framer)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000?style=flat-square&logo=vercel)

---

## Sobre o projeto

O **Encontro do Agro Cearense** é um grupo informal que se reúne toda segunda-feira desde 2006 para debater o desenvolvimento do agronegócio no Ceará. Em duas décadas, passaram por suas mesas governadores, ministros, pesquisadores, empresários e produtores rurais — sem atas, sem formalidades, com propósito.

Para celebrar os **20 anos do grupo (2006–2026)**, foi desenvolvida esta plataforma digital com dois objetivos principais:

- **Preservar a memória** de uma trajetória que, até então, existia apenas na lembrança dos seus protagonistas
- **Projetar o futuro** com uma ferramenta viva que o grupo possa continuar alimentando nas próximas décadas

O projeto entrega um livro comemorativo físico e esta plataforma — onde o livro conta os primeiros 20 anos, e a plataforma ajuda a escrever os próximos.

---

## Stack

O projeto foi construído com uma stack moderna focada em performance, experiência visual e facilidade de manutenção futura.

| Camada | Tecnologia | Decisão |
|--------|-----------|---------|
| Framework | React 18 + Vite | Performance de build e HMR instantâneo |
| Animações | Framer Motion 11 | `AnimatePresence`, `useInView`, `useMotionValue` para animações declarativas |
| Tipografia | Cormorant Garamond + DM Sans + DM Mono | Combinação serif histórica + sans moderna — referência editorial |
| Estilização | CSS-in-JS inline + variáveis CSS | Sem dependência de framework de CSS; design tokens via `var()` |
| Dados | Arquivos JS estáticos (`src/data/`) | Velocidade de entrega; arquitetura preparada para migração a Supabase |
| Deploy | Vercel | CI/CD automático via GitHub; CDN global |

---

## Arquitetura

```
src/
├── assets/           # Vídeo hero e imagens estáticas
├── components/
│   ├── Nav.jsx       # Navegação responsiva com hamburger menu
│   └── FadeIn.jsx    # Wrapper de animação scroll-triggered
├── data/
│   └── artigos.js    # Fonte de dados das matérias (migração Supabase planejada)
├── pages/
│   ├── Home.jsx      # Hero com vídeo full-bleed, stats animados, mosaico de cadeias
│   ├── Timeline.jsx  # Linha do tempo horizontal interativa com Framer Motion
│   ├── Pessoas.jsx   # Grid de personagens com modal de biografia
│   ├── Encontros.jsx # Feed com busca em tempo real + acervo de matérias
│   ├── Artigo.jsx    # Página editorial com pull quotes e matérias relacionadas
│   └── Admin.jsx     # Painel protegido por senha para gestão de conteúdo
└── styles/
    └── mobile.css    # Breakpoints e overrides para dispositivos móveis
```

---

## Decisões de design

### Identidade visual

O briefing pedia algo que transmitisse **herança, sofisticação e propósito** — mas sem o peso visual excessivo que geralmente acompanha projetos institucionais do agronegócio. A referência foi o **neoclassicismo digital**: layouts limpos, espaço em branco generoso, tipografia como elemento visual principal.

A paleta abandona os verdes saturados do agro tradicional em favor de tons terrosos escuros com um único acento cromático:

```
--bg:      #1a1814   fundo principal
--gold:    #c9a96e   dourado — único acento cromático
--cream:   #f0e8d8   texto principal
--muted:   #9a9080   texto secundário
```

Referências de benchmarking: Jordan Winery, Costadoro, National Geographic Longreads.

### Tom editorial

O site foi concebido com tom de **jornal de qualidade** — não de portal corporativo. Isso se reflete na tipografia (Cormorant Garamond peso 300 para títulos), no layout das matérias (coluna estreita, pull quotes, tempo de leitura) e na nomenclatura das seções (chapéu, acervo, leia também).

---

## Desafios técnicos

### Responsividade com CSS-in-JS

O maior obstáculo técnico foi tornar o site mobile-friendly. Por usar exclusivamente estilos inline via objetos JavaScript, media queries externas não conseguiam sobrescrever os valores — a especificidade dos estilos inline sempre vence sobre classes e seletores externos.

A solução foi implementar responsividade **no nível do componente**: cada página recebe um hook `isMobile` baseado em `window.innerWidth` com `resize` listener, e os valores de estilo são condicionais diretos no JSX. Isso aumenta a verbosidade do código mas elimina completamente conflitos de especificidade.

```jsx
const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

useEffect(() => {
  const handler = () => setIsMobile(window.innerWidth <= 768)
  window.addEventListener('resize', handler)
  return () => window.removeEventListener('resize', handler)
}, [])
```

### Vídeo no iOS

O elemento `<video>` com `autoPlay` sem `controls` exibia o botão nativo de play do Safari no iOS, sobrepondo o texto do hero. A solução envolveu uma combinação específica de atributos:

```jsx
<video
  autoPlay muted loop playsInline
  controls={false}
  disablePictureInPicture
  controlsList="nodownload nofullscreen noremoteplayback"
  x-webkit-airplay="deny"
  style={{ pointerEvents: 'none' }}
/>
```

O `pointerEvents: 'none'` foi o elemento decisivo — impede que o iOS interprete toques na área do vídeo como intenção de controle de playback.

### Hotlinking de vídeo externo

A primeira implementação tentava carregar um MP4 diretamente da CDN do Pexels via URL hardcoded. O servidor retornava **403 Forbidden** por política anti-hotlink. A solução correta foi baixar o arquivo, versioná-lo no repositório e servi-lo como asset estático via import do Vite — garantindo disponibilidade total independente de terceiros.

### Roteamento sem React Router

O projeto deliberadamente evita React Router para manter o mínimo de dependências. O roteamento é gerenciado por estado simples no `App.jsx`, suportando inclusive rotas com parâmetro (ID do artigo):

```js
const [page, setPage] = useState('home')
const [artigoId, setArtigoId] = useState(null)

const navigate = (id, articleId = null) => {
  setPage(id)
  setArtigoId(articleId)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
```

O custo é a ausência de deep linking e botão voltar nativo do browser — aceitável para MVP, solucionável com `window.history.pushState` em próxima iteração.

### Animações sem biblioteca adicional

Os contadores de estatísticas (20 anos, +1000 segundas-feiras) e o efeito de digitação no footer foram implementados sem biblioteca — apenas `useInView` do Framer Motion combinado com `setInterval` e `setTimeout` nativos. A decisão mantém o bundle leve e evita dependências desnecessárias para funcionalidades pontuais.

### Navegação hamburger com stacking context

O menu mobile inicialmente não abria, pois o dropdown estava renderizado **dentro** do elemento `<nav>` com `position: fixed`. Isso criava um stacking context isolado que impedia o menu de aparecer sobre o conteúdo da página. A solução foi mover o dropdown para **fora** do nav usando um fragment React (`<>...</>`), tornando-o irmão do nav no DOM e livre de restrições de stacking.

---

## Roadmap

O projeto foi entregue como MVP para apresentação ao grupo. As próximas fases planejadas:

- **Supabase como CMS** — migrar `artigos.js` para tabela no banco; admin com formulário rico substituindo edição manual de código
- **Domínio próprio** — `agrocearense.com.br` com SSL gerenciado pela Vercel
- **Mapa interativo** — SVG do Ceará com regiões produtivas clicáveis e filtro por cadeia
- **Acervo Egídio Serpa** — galeria completa das colunas jornalísticas com busca full-text
- **PWA** — service worker para acesso offline e instalação no celular
- **Deep linking** — `history.pushState` para URLs compartilháveis por artigo e seção

---

## Créditos

Desenvolvido para o **Encontro do Agro Cearense** como parte do projeto comemorativo de 20 anos (2006–2026).

Imagens: [Unsplash](https://unsplash.com) · Vídeo: [Pexels](https://pexels.com) · Tipografia: [Google Fonts](https://fonts.google.com)

---

*"Quando pessoas comprometidas se reúnem em torno de um propósito comum, grandes transformações podem acontecer."*