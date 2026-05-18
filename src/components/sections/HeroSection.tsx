import { useEffect, useRef, useState } from 'react'
import heroImage from '../../assets/images/foto-hospital-fachada.png'
import logoComNomeBranco from '../../assets/images/logoComNome-branco.png'

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    /* Small delay so CSS transition fires after mount */
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Background Image ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
        aria-hidden="true"
      />

      {/* ── Overlay: gradient dark → green ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(0,0,0,0.65) 0%,
              rgba(46,111,87,0.55) 60%,
              rgba(46,111,87,0.80) 100%
            )
          `,
        }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div
        className={`
          relative z-10 w-full max-w-7xl mx-auto
          px-4 sm:px-6 lg:px-8
          pt-32 pb-24
          flex flex-col items-center text-center
          transition-all duration-1000 ease-out
          ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
      >
        {/* Institution badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
          <img
            src={logoComNomeBranco}
            alt="CESMVC UFPR"
            className="h-5 w-auto object-contain"
          />
          <span className="text-white/80 text-xs font-medium tracking-widest uppercase">
            Pós-Graduação Lato Sensu
          </span>
        </div>

        {/* Main heading */}
        <h1 className="font-grift text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-5xl mb-6">
          Especialização em{' '}
          <span className="text-cesmvc-orange">Medicina Veterinária</span>{' '}
          do Coletivo
        </h1>

        {/* Subtitle */}
        <p className="text-white/80 text-lg sm:text-xl md:text-2xl font-light max-w-3xl mb-4 leading-relaxed">
          Um programa transformador da <strong className="text-white font-semibold">UFPR</strong> que une saúde única, bem-estar animal
          e medicina de populações para formar líderes em saúde coletiva veterinária.
        </p>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            '🌿 Saúde Única',
            '🦜 Medicina de Fauna',
            '🏛️ UFPR',
            '📍 Curitiba',
            '📅 2025 · 2ª Turma',
          ].map((tag) => (
            <span
              key={tag}
              className="text-white/90 text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <a
            href="#pricing"
            className="
              group inline-flex items-center gap-3
              bg-cesmvc-orange hover:bg-cesmvc-orange-dark
              text-white font-bold text-base sm:text-lg
              px-8 py-4 rounded-full
              transition-all duration-300
              shadow-xl shadow-cesmvc-orange/40
              hover:shadow-2xl hover:shadow-cesmvc-orange/50
              hover:-translate-y-1
            "
          >
            Garanta sua Vaga
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          <a
            href="#pilares"
            className="
              inline-flex items-center gap-2
              text-white/90 hover:text-white
              font-medium text-base sm:text-lg
              px-8 py-4 rounded-full
              border border-white/30 hover:border-white/60
              backdrop-blur-sm
              transition-all duration-300
              hover:-translate-y-0.5
            "
          >
            Conheça o Curso
          </a>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 w-full max-w-3xl">
          {[
            { value: '360h',  label: 'Carga Horária'       },
            { value: '18',    label: 'Meses de Curso'      },
            { value: '5',     label: 'Pilares Formativos'  },
            { value: '100%',  label: 'Corpo Docente UFPR'  },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-5 border border-white/15"
            >
              <span className="font-grift text-cesmvc-orange text-3xl sm:text-4xl font-bold leading-none mb-1">
                {stat.value}
              </span>
              <span className="text-white/70 text-xs sm:text-sm text-center leading-snug">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/50 text-xs tracking-widest uppercase">Role para baixo</span>
        <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
