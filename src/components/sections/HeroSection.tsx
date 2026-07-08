import { useEffect, useState, useRef, Fragment } from 'react'
import heropc2 from '../../assets/images/heropc2.1_.png'
import heromob2 from '../../assets/images/heromob2.webp'
import logoDescritivaBege from '../../assets/images/logoDescitivabBege.png'

/* ── Typewriter config ────────────────────────────────────────── */
const ROTATING_WORDS = ['Coletiva.', 'Sistêmica.', 'Científica.', 'Transformadora.', 'Humana.']
const TYPE_SPEED = 80   // ms por caractere ao digitar
const DELETE_SPEED = 45   // ms por caractere ao apagar
const PAUSE_AFTER = 1800 // ms de pausa após palavra completa
const PAUSE_BEFORE = 350  // ms de pausa antes de começar a digitar

/* ── Feature badges ───────────────────────────────────────────── */
const BADGES = [
  { label: '100% remoto' },
  { label: 'Realização: abril/26 a abril/28' },
  { label: '20+ Professores Federais' },
  { label: 'Certificação UFPR | Reconhecimento MEC' },

]

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const [displayed, setDisplayed] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const badgesRef = useRef<HTMLDivElement>(null)
  const [isInteracting, setIsInteracting] = useState(false)
  const interactionTimeoutRef = useRef<number | null>(null)

  /* ── Auto scroll for badges on mobile ── */
  useEffect(() => {
    const container = badgesRef.current
    if (!container) return

    let frameId: number
    let lastTime = performance.now()
    const scrollSpeed = 30 // pixels per second

    // Store the exact float value of scrollLeft to prevent truncation rounding bugs
    let floatScrollLeft = container.scrollLeft

    const step = (time: number) => {
      if (window.innerWidth < 768) {
        const delta = (time - lastTime) / 1000

        // Scroll automatically if the user is not actively interacting
        if (!isInteracting) {
          floatScrollLeft += scrollSpeed * delta
          container.scrollLeft = floatScrollLeft
        } else {
          // Sync with manual touch/swipe scroll
          floatScrollLeft = container.scrollLeft
        }

        // Seamless wrap check using getBoundingClientRect for absolute reliability
        const fifthItem = container.children[4] as HTMLElement
        if (fifthItem) {
          const rectFifth = fifthItem.getBoundingClientRect()
          const rectContainer = container.getBoundingClientRect()
          const W = rectFifth.left - rectContainer.left + container.scrollLeft

          if (container.scrollLeft >= W) {
            floatScrollLeft -= W
            container.scrollLeft = floatScrollLeft
          } else if (container.scrollLeft <= 0 && isInteracting) {
            floatScrollLeft += W
            container.scrollLeft = floatScrollLeft
          }
        }
      }
      lastTime = time
      frameId = requestAnimationFrame(step)
    }

    frameId = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(frameId)
    }
  }, [isInteracting])

  const handlePointerDown = () => {
    setIsInteracting(true)
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current)
    }
  }

  const handlePointerUp = () => {
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current)
    }
    interactionTimeoutRef.current = window.setTimeout(() => {
      setIsInteracting(false)
    }, 3000)
  }

  /* ── Mount fade-in ── */
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120)
    return () => clearTimeout(t)
  }, [])

  /* ── Typewriter engine ── */
  useEffect(() => {
    const currentWord = ROTATING_WORDS[wordIdx]

    if (!isDeleting && displayed === currentWord) {
      // Palavra completa → pausar e começar a apagar
      const t = setTimeout(() => setIsDeleting(true), PAUSE_AFTER)
      return () => clearTimeout(t)
    }

    if (isDeleting && displayed === '') {
      // Palavra apagada → avançar para a próxima
      const t = setTimeout(() => {
        setIsDeleting(false)
        setWordIdx((i) => (i + 1) % ROTATING_WORDS.length)
      }, PAUSE_BEFORE)
      return () => clearTimeout(t)
    }

    const speed = isDeleting ? DELETE_SPEED : TYPE_SPEED
    const t = setTimeout(() => {
      setDisplayed(isDeleting
        ? currentWord.slice(0, displayed.length - 1)
        : currentWord.slice(0, displayed.length + 1)
      )
    }, speed)
    return () => clearTimeout(t)
  }, [displayed, isDeleting, wordIdx])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* ── Responsive Background Image ── */}
      <picture className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
        <source media="(max-width: 48rem)" srcSet={heromob2} />
        <img
          src={heropc2}
          alt=""
          className="w-full h-full object-cover object-right-bottom"
          fetchPriority="high"
        />
      </picture>

      {/* ── Overlay sutil na esquerda para dar leitura, direita livre e iluminada ── */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#0B281E]/90 via-[#0B281E]/40 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Legenda Vertical de Créditos da Imagem ── */}
      <div
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 -rotate-180 z-20 pointer-events-none select-none hidden sm:block"
        style={{ writingMode: 'vertical-rl' }}
      >
        <span className="text-white/40 font-sans text-[9px] sm:text-[6px] tracking-[0.2em] uppercase font-light">
          Foto: Marcos Sólivan/UFPR (com edição do céu)
        </span>
      </div>

      {/* ── Hero Content — ALINHADO À ESQUERDA ── */}
      <div
        className={`
          relative z-10 w-full max-w-7xl mx-auto
          px-6 sm:px-8 lg:px-12
          pt-36 pb-28
          flex flex-col items-start text-left justify-center w-full
          min-h-screen
          transition-all duration-1000 ease-out
          ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
      >
        {/* Pre-título oficial */}
        <p className="text-[#F9E8C7]/90 text-xs sm:text-sm font-semibold tracking-[0.25rem] uppercase mb-4">
          Uma especialização oficial UFPR
        </p>

        {/* Título Principal (Imagem da Logo Descritiva Bege) */}
        <div className="w-full max-w-md sm:max-w-xl mb-6">
          <img
            src={logoDescritivaBege}
            alt="CESMVC — Especialização em Medicina Veterinária do Coletivo"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Animação Typewriter */}
        <h2 className="font-grift text-white font-normal leading-none mb-8"
          style={{ fontSize: 'clamp(1.25rem, 3vw, 2.125rem)' }}
        >
          Uma formação{' '}
          <span
            className="inline-block min-w-[0.25rem] text-white"
          >
            {displayed}
            <span
              className="inline-block w-[0.1em] h-[0.9em] ml-[2px] align-middle rounded-sm cursor-blink bg-white"
              aria-hidden="true"
            />
          </span>
        </h2>

        {/* Sub-headline */}
        <p className="text-white/80 font-light leading-relaxed mb-10 max-w-lg"
          style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)' }}
        >
          Um programa da <strong className="text-white font-semibold">UFPR</strong> que une
          saúde única, bem-estar animal e medicina de populações — formando líderes em 
          Medicina Veterinária do Coletivo.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <a
            href="#investimento"
            className="
              group inline-flex items-center justify-center gap-3
              font-bold text-white
              px-8 py-4 rounded-full
              transition-all duration-300
              shadow-xl hover:shadow-2xl hover:-translate-y-1
            "
            style={{
              fontSize: 'clamp(0.9rem, 1.5vw, 1.125rem)',
              background: '#D96C2B',
              boxShadow: '0 0.5rem 2rem rgba(217,108,43,0.45)',
            }}
          >
            Garanta sua Vaga
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          <a
            href="#pilares"
            className="
              inline-flex items-center justify-center gap-2
              text-white/90 hover:text-white
              font-medium
              px-8 py-4 rounded-full
              border border-white/30 hover:border-white/60
              backdrop-blur-sm
              transition-all duration-300 hover:-translate-y-0.5
            "
            style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.125rem)' }}
          >
            Conheça o Curso
          </a>
        </div>

        {/* ── Feature Badges (Ultra minimalistas) ── */}
        <div
          ref={badgesRef}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchEnd={handlePointerUp}
          className="flex flex-row overflow-x-auto gap-3 w-full scrollbar-hide mt-12 md:mt-0 md:flex-row md:flex-wrap md:overflow-visible scroll-auto"
        >
          {[...BADGES, ...BADGES].map((b, idx) => (
            <Fragment key={`${b.label}-${idx}`}>
              {idx === 3 && <div className="hidden md:block basis-full h-0"></div>}
              <div
                className={`
                  inline-flex items-center gap-2.5
                  px-5 py-3 rounded-2xl
                  bg-white/5 backdrop-blur-md
                  border border-white/10
                  shrink-0
                  w-auto whitespace-nowrap md:shrink
                  ${idx >= 4 ? 'md:hidden' : ''}
                  ${idx === 3 ? 'md:w-full md:max-w-max' : ''}
                `}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#D96C2B' }} />
                <span className="text-white font-semibold tracking-wide"
                  style={{ fontSize: 'clamp(0.8rem, 1.2vw, 0.9375rem)' }}
                >
                  {b.label}
                </span>
              </div>
            </Fragment>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <a
        href="#sobre-o-curso"
        onClick={(e) => {
          e.preventDefault()
          document.getElementById('sobre-o-curso')?.scrollIntoView({ behavior: 'smooth' })
        }}
        className="absolute bottom-12 md:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-0.5 md:gap-1 animate-bounce cursor-pointer"
        aria-label="Rolar para a próxima seção"
      >
        <span className="text-white/80 text-[8px] md:text-xs tracking-widest uppercase">Role para baixo</span>
        <svg className="w-3 h-3 md:w-5 md:h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    </section>
  )
}
