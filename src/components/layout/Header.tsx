import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import logoMVCfeatUF_Bege from '../../assets/images/logoMVCfeatUF_Bege.png'
import logoUFPR3 from '../../assets/images/logoUFPR3(semNome).png'

const NAV_LINKS = [
  { label: 'O Curso', href: '#sobre-o-curso' },
  { label: 'Eixos de Aprendizado', href: '#pilares' },
  { label: 'Docentes', href: '#docentes' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Investimento', href: '#investimento' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Close mobile menu on outside click ── */
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500 ease-in-out
        ${scrolled
          ? 'bg-cesmvc-green/96 backdrop-blur-md shadow-lg shadow-black/20 py-3'
          : 'bg-transparent py-5'}
      `}
    >
      <div
        ref={menuRef}
        className="w-full px-4 md:px-8 lg:px-12 flex justify-between md:justify-center items-center relative"
      >
        {/* ── Lado Esquerdo (Extrema Esquerda - Apenas UFPR) ── */}
        <div className="flex-shrink-0 md:absolute md:left-8 lg:left-12 md:top-1/2 md:-translate-y-1/2">
          <a
            href="https://agrarias.ufpr.br/mvc/"
            target="_blank"
            rel="noopener noreferrer"
            title="Site Oficial UFPR MVC"
            className="flex items-center drop-shadow-md hover:drop-shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <img
              src={logoUFPR3}
              alt="UFPR"
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </a>
        </div>

        {/* ── Lado Direito (CESMVC + Menu + Botão) ── */}
        <div className="flex items-center gap-6 lg:gap-8 flex-shrink-0">
          {/* Logo do CESMVC */}
          <a href="#hero" className="flex items-center h-12 flex-shrink-0">
            <img
              src={logoMVCfeatUF_Bege}
              alt="CESMVC"
              className={`h-10 sm:h-12 w-auto object-contain transition-opacity duration-500 ease-in-out ${scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6" aria-label="Navegação principal">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="
                  text-white/90 hover:text-white
                  text-sm font-medium tracking-wide
                  transition-colors duration-200
                  relative
                  whitespace-nowrap
                  after:absolute after:bottom-[-4px] after:left-0
                  after:h-[2px] after:w-0 after:bg-cesmvc-orange
                  after:transition-all after:duration-300
                  hover:after:w-full
                "
              >
                {item.label}
              </a>
            ))}
            <Link
              to="/blog"
              className="
                text-white/90 hover:text-white
                text-sm font-medium tracking-wide
                transition-colors duration-200
                relative
                whitespace-nowrap
                after:absolute after:bottom-[-4px] after:left-0
                after:h-[2px] after:w-0 after:bg-cesmvc-orange
                after:transition-all after:duration-300
                hover:after:w-full
              "
            >
              Blog
            </Link>
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="#investimento"
              className="
                hidden sm:inline-flex items-center gap-2
                bg-cesmvc-orange hover:bg-cesmvc-orange-dark
                text-white font-semibold text-sm
                px-5 py-2.5 rounded-full
                transition-all duration-300
                shadow-md shadow-cesmvc-orange/30
                hover:shadow-lg hover:shadow-cesmvc-orange/40
                hover:-translate-y-0.5
                whitespace-nowrap
              "
            >
              Inscreva-se
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {menuOpen
                ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              }
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Dropdown Menu ── */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div
          className={`
            md:hidden overflow-hidden
            transition-all duration-400 ease-in-out
            ${menuOpen ? 'max-h-[20rem] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}
          `}
          aria-hidden={!menuOpen}
        >
          <nav
            className="flex flex-col gap-1 bg-cesmvc-green/95 backdrop-blur-md rounded-2xl px-4 py-4 border border-white/10"
            aria-label="Navegação mobile"
          >
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="
                  text-white/90 hover:text-white hover:bg-white/10
                  text-sm font-medium tracking-wide
                  px-4 py-3 rounded-xl
                  transition-colors duration-200
                  whitespace-nowrap
                "
              >
                {item.label}
              </a>
            ))}
            <Link
              to="/blog"
              onClick={() => setMenuOpen(false)}
              className="
                text-white/90 hover:text-white hover:bg-white/10
                text-sm font-medium tracking-wide
                px-4 py-3 rounded-xl
                transition-colors duration-200
                whitespace-nowrap
              "
            >
              Blog
            </Link>
            <a
              href="#investimento"
              onClick={() => setMenuOpen(false)}
              className="
                mt-2 inline-flex items-center justify-center gap-2
                bg-cesmvc-orange hover:bg-cesmvc-orange-dark
                text-white font-semibold text-sm
                px-5 py-3 rounded-xl
                transition-all duration-300
                whitespace-nowrap
              "
            >
              Inscreva-se Agora
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
