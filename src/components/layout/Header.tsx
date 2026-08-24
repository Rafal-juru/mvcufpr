import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import logoUFPR3 from '../../assets/images/logoUFPR3(semNome).png'
import logoMVCfeatUF_Bege from '../../assets/images/logoMVCfeatUF_Bege.png'
import LanguageSelector from '../ui/LanguageSelector'

/* ── Typewriter config ─────────────────────────────────────── */
const TW_WORDS = ['UFPR', 'Curso de Especialização Medicina Veterinária do Coletivo']
const TYPE_SPEED = 55
const DELETE_SPEED = 30
const PAUSE_AFTER = 2400
const PAUSE_BEFORE = 400

export default function Header() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [displayed, setDisplayed] = useState('UFPR')
  const [wordIdx, setWordIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  const navLinks = [
    { label: t('nav.course'), href: '#sobre-o-curso' },
    { label: t('nav.curriculum'), href: '#pilares' },
    { label: t('nav.faculty'), href: '#docentes' },
    { label: t('nav.testimonials'), href: '#depoimentos' },
    { label: t('nav.investment'), href: '#investimento' },
    { label: t('nav.faq'), href: '#faq' },
  ]

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
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  /* ── Typewriter engine ── */
  useEffect(() => {
    const currentWord = TW_WORDS[wordIdx]

    if (!isDeleting && displayed === currentWord) {
      const t = setTimeout(() => setIsDeleting(true), PAUSE_AFTER)
      return () => clearTimeout(t)
    }
    if (isDeleting && displayed === '') {
      const t = setTimeout(() => {
        setIsDeleting(false)
        setWordIdx((i) => (i + 1) % TW_WORDS.length)
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

  /* ── Hash scroll handling on load/route change ── */
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const t = setTimeout(() => {
        const target = document.getElementById(id)
        if (target) {
          const headerOffset = 80 // height of header
          const elementPosition = target.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.scrollY - headerOffset
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 300)
      return () => clearTimeout(t)
    }
  }, [location])

  /* ── Smooth scroll or redirection link click handler ── */
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const id = href.includes('#') ? href.split('#')[1] : href
    const target = document.getElementById(id)

    if (target) {
      e.preventDefault()
      setMenuOpen(false)
      const delay = menuOpen ? 300 : 0
      setTimeout(() => {
        const headerOffset = 80 // height of header
        const elementPosition = target.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - headerOffset
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }, delay)
    } else {
      setMenuOpen(false)
    }
  }

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500 ease-in-out
        ${scrolled
          ? 'bg-cesmvc-green/96 backdrop-blur-md shadow-lg shadow-black/20 py-2.5 sm:py-3'
          : 'bg-transparent py-3.5 sm:py-4'}
      `}
    >
      <div
        ref={menuRef}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center relative"
      >
        {/* ── Lado Esquerdo — Logos UFPR + CESMVC (e Typewriter quando no topo) ── */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 flex-shrink-0 min-w-0">
          <a
            href="https://agrarias.ufpr.br/mvc/especializacao-mvc/"
            target="_blank"
            rel="noopener noreferrer"
            title="Site Oficial UFPR MVC"
            className="flex-shrink-0 flex items-center drop-shadow-md hover:drop-shadow-xl hover:scale-105 transition-all duration-300"
          >
            <img
              src={logoUFPR3}
              alt="UFPR"
              className="h-7 sm:h-8 w-auto object-contain"
            />
          </a>

          {/* Typewriter — visível no topo em telas ultra-wide/grandes para evitar colisão */}
          {!scrolled && (
            <div className="hidden 2xl:flex flex-col items-start text-left min-w-0">
              <p
                className="text-white/60 font-mono text-[0.6rem] uppercase tracking-widest mb-0.5"
              >
                Especialização
              </p>
              <p
                className="font-grift-bold text-white leading-none whitespace-nowrap text-xs sm:text-sm"
              >
                {displayed}
                <span
                  className="inline-block w-[0.06em] h-[0.85em] ml-[2px] align-middle rounded-sm cursor-blink bg-white opacity-80"
                  aria-hidden="true"
                />
              </p>
            </div>
          )}

          {/* Logo CESMVC — aparece suavemente agrupado no bloco esquerdo ao rolar */}
          <a
            href={location.pathname === '/' ? '#hero' : `${import.meta.env.BASE_URL}#hero`}
            onClick={(e) => handleLinkClick(e, '#hero')}
            className={`flex items-center flex-shrink-0 transition-all duration-300 ease-in-out ${
              scrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-95 w-0 overflow-hidden pointer-events-none'
            }`}
          >
            <div className="hidden sm:block h-5 w-px bg-white/20 mr-2.5 sm:mr-3" />
            <img
              src={logoMVCfeatUF_Bege}
              alt="CESMVC"
              className="h-7 sm:h-8 w-auto object-contain"
            />
          </a>
        </div>

        {/* ── Centro: Desktop Navigation (visível em telas xl >= 1280px para conforto total) ── */}
        <nav className="hidden xl:flex items-center gap-4 2xl:gap-6 mx-4 flex-shrink min-w-0" aria-label="Navegação principal">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={location.pathname === '/' ? item.href : `${import.meta.env.BASE_URL}${item.href}`}
              onClick={(e) => handleLinkClick(e, item.href)}
              className="
                text-white/90 hover:text-white
                text-xs 2xl:text-sm font-medium tracking-wide
                transition-colors duration-200
                relative whitespace-nowrap py-1
                after:absolute after:bottom-[-2px] after:left-0
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
              text-xs 2xl:text-sm font-medium tracking-wide
              transition-colors duration-200
              relative whitespace-nowrap py-1
              after:absolute after:bottom-[-2px] after:left-0
              after:h-[2px] after:w-0 after:bg-cesmvc-orange
              after:transition-all after:duration-300
              hover:after:w-full
            "
          >
            {t('nav.blog')}
          </Link>
        </nav>

        {/* ── Lado Direito: Language Selector + CTA + Toggle Mobile/Tablet ── */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Language Selector */}
          <LanguageSelector dropdownAlign="right" />

          {/* CTA Inscreva-se */}
          <a
            href={location.pathname === '/' ? '#investimento' : `${import.meta.env.BASE_URL}#investimento`}
            onClick={(e) => handleLinkClick(e, '#investimento')}
            className="
              hidden sm:inline-flex items-center gap-1.5 sm:gap-2
              bg-cesmvc-orange hover:bg-cesmvc-orange-dark
              text-white font-semibold text-xs sm:text-sm
              px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full
              transition-all duration-300
              shadow-md shadow-cesmvc-orange/30
              hover:shadow-lg hover:shadow-cesmvc-orange/40
              hover:-translate-y-0.5 whitespace-nowrap
            "
          >
            {t('nav.enroll')}
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          {/* Botão Hamburger (visível em mobile e em telas comprimidas < xl) */}
          <button
            type="button"
            aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="xl:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile & Tablet Sidebar/Drawer Menu (< xl) ── */}
      {/* 1. Backdrop Overlay */}
      <div
        className={`
          xl:hidden fixed inset-0 z-[99] bg-[#0b281e]/60 backdrop-blur-sm transition-opacity duration-300
          ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => setMenuOpen(false)}
      />

      {/* 2. Drawer Content */}
      <div
        className={`
          xl:hidden fixed top-0 right-0 w-[290px] h-[100dvh] bg-cesmvc-green/98 backdrop-blur-md shadow-2xl
          flex flex-col transition-transform duration-300 ease-out border-l border-white/10 z-[100]
          ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header of drawer */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <span className="font-grift text-white text-lg tracking-wide">Menu</span>
          <div className="flex items-center gap-3">
            <LanguageSelector dropdownAlign="left" />
            <button
              onClick={() => setMenuOpen(false)}
              className="text-white p-2 rounded-lg border border-[#D96C2B] hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable navigation link list inside drawer */}
        <div className="flex-1 overflow-y-auto px-4 pt-6 pb-32 flex flex-col gap-1">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={location.pathname === '/' ? item.href : `${import.meta.env.BASE_URL}${item.href}`}
              onClick={(e) => handleLinkClick(e, item.href)}
              className="
                text-white/95 hover:text-white hover:bg-white/10
                text-sm font-medium tracking-wide
                px-4 py-3.5 rounded-xl
                transition-colors duration-200 whitespace-nowrap
              "
            >
              {item.label}
            </a>
          ))}
          <Link
            to="/blog"
            onClick={() => setMenuOpen(false)}
            className="
              text-white/95 hover:text-white hover:bg-white/10
              text-sm font-medium tracking-wide
              px-4 py-3.5 rounded-xl
              transition-colors duration-200 whitespace-nowrap
            "
          >
            {t('nav.blog')}
          </Link>
          <a
            href={location.pathname === '/' ? '#investimento' : `${import.meta.env.BASE_URL}#investimento`}
            onClick={(e) => handleLinkClick(e, '#investimento')}
            className="
              mt-4 inline-flex items-center justify-center gap-2
              bg-cesmvc-orange hover:bg-cesmvc-orange-dark
              text-white font-semibold text-sm
              px-5 py-3.5 rounded-xl
              transition-all duration-300 whitespace-nowrap
            "
          >
            {t('nav.enroll')}
          </a>
        </div>
      </div>
    </header>
  )
}
