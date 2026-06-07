import { useEffect, useState } from 'react'
import heropc from '../../assets/images/heropc.png'
import heromob from '../../assets/images/heromob.png'
import logoDescritivaBege from '../../assets/images/logoDescitivabBege.png'
import logoUFPR from '../../assets/images/logoUFPR.png'

/* ── Typewriter config ────────────────────────────────────────── */
const ROTATING_WORDS = ['Coletiva.', 'Sistêmica.', 'Científica.', 'Transformadora.', 'Humana.']
const TYPE_SPEED = 80   // ms por caractere ao digitar
const DELETE_SPEED = 45   // ms por caractere ao apagar
const PAUSE_AFTER = 1800 // ms de pausa após palavra completa
const PAUSE_BEFORE = 350  // ms de pausa antes de começar a digitar

/* ── Feature badges ───────────────────────────────────────────── */
const BADGES = [
  { label: '360h de Carga Horária' },
  { label: '18 Meses de Duração' },
  { label: '15+ Professores Federais' },
]

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const [displayed, setDisplayed] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

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
        <source media="(max-width: 48rem)" srcSet={heromob} />
        <img
          src={heropc}
          alt=""
          className="w-full h-full object-cover object-center"
          fetchPriority="high"
        />
      </picture>

      {/* ── Overlay sutil na esquerda para dar leitura, direita livre e iluminada ── */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#0B281E]/90 via-[#0B281E]/40 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Hero Content — ALINHADO À ESQUERDA ── */}
      <div
        className={`
          relative z-10 w-full max-w-7xl mx-auto
          px-6 sm:px-8 lg:px-12
          pt-36 pb-28
          flex flex-col items-start justify-center
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
        <h2 className="font-grift text-white font-bold leading-none mb-8"
          style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)' }}
        >
          Uma formação{' '}
          <span
            style={{ color: '#D96C2B' }}
            className="inline-block min-w-[0.25rem]"
          >
            {displayed}
            <span
              className="inline-block w-[0.1em] h-[0.9em] ml-[2px] align-middle rounded-sm cursor-blink bg-[#D96C2B]"
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
          saúde coletiva veterinária.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <a
            href="#valores"
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
        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
          {BADGES.map((b) => (
            <div
              key={b.label}
              className="
                inline-flex items-center gap-2.5
                px-5 py-3 rounded-2xl
                bg-white/5 backdrop-blur-md
                border border-white/10
              "
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#D96C2B' }} />
              <span className="text-white font-semibold tracking-wide"
                style={{ fontSize: 'clamp(0.8rem, 1.2vw, 0.9375rem)' }}
              >
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Logo UFPR (Endosso no Canto Inferior Direito) ── */}
      <div className="absolute bottom-12 right-6 sm:right-12 z-20 pointer-events-none">
        <img
          src={logoUFPR}
          alt="Universidade Federal do Paraná (UFPR)"
          className="h-10 sm:h-14 w-auto object-contain opacity-90"
        />
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/40 text-xs tracking-widest uppercase">Role para baixo</span>
        <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
