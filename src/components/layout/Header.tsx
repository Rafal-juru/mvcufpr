import { useState, useEffect } from 'react'
import logoVerde from '../../assets/images/logoQuadradoTituloembaixo-Verde.png'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [showLogo, setShowLogo] = useState(true)

  /* ── Scroll → glass effect ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Logo ↔ Text fade cycle every 3 s ── */
  useEffect(() => {
    const interval = setInterval(() => {
      setShowLogo((prev) => !prev)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500 ease-in-out
        ${scrolled
          ? 'bg-cesmvc-green/95 backdrop-blur-md shadow-lg shadow-black/20 py-3'
          : 'bg-transparent py-5'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* ── Brand: Logo / Text fade toggle ── */}
          <a href="#hero" className="relative flex items-center h-12 min-w-[180px]">
            {/* Logo image */}
            <span
              className={`
                absolute inset-0 flex items-center
                transition-opacity duration-700 ease-in-out
                ${showLogo ? 'opacity-100' : 'opacity-0'}
              `}
            >
              <img
                src={logoVerde}
                alt="Logo CESMVC"
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </span>

            {/* Text fallback */}
            <span
              className={`
                absolute inset-0 flex flex-col justify-center
                transition-opacity duration-700 ease-in-out
                ${showLogo ? 'opacity-0' : 'opacity-100'}
              `}
            >
              <span className="font-grift text-white text-xs font-semibold tracking-widest uppercase leading-none">
                CESMVC
              </span>
              <span className="text-white/70 text-[10px] tracking-wider uppercase leading-none mt-0.5">
                Pós-Graduação · UFPR
              </span>
            </span>
          </a>

          {/* ── Desktop Navigation ── */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: 'O Curso',    href: '#pilares'   },
              { label: 'Docentes',   href: '#docentes'  },
              { label: 'Depoimentos',href: '#depoimentos'},
              { label: 'Blog',       href: '#blog'       },
              { label: 'Investimento', href: '#pricing'  },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="
                  text-white/90 hover:text-white
                  text-sm font-medium tracking-wide
                  transition-colors duration-200
                  relative after:absolute after:bottom-[-4px] after:left-0
                  after:h-[2px] after:w-0 after:bg-cesmvc-orange
                  after:transition-all after:duration-300
                  hover:after:w-full
                "
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* ── CTA Button ── */}
          <a
            href="#pricing"
            className="
              hidden sm:inline-flex items-center gap-2
              bg-cesmvc-orange hover:bg-cesmvc-orange-dark
              text-white font-semibold text-sm
              px-5 py-2.5 rounded-full
              transition-all duration-300
              shadow-md shadow-cesmvc-orange/30
              hover:shadow-lg hover:shadow-cesmvc-orange/40
              hover:-translate-y-0.5
            "
          >
            Inscreva-se
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          {/* ── Mobile Menu Button ── */}
          <button
            type="button"
            aria-label="Abrir menu"
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

        </div>
      </div>
    </header>
  )
}
