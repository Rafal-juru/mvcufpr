import { Link } from 'react-router-dom'
import logoBege from '../../assets/images/logoDescitivabBege.png'

/* Endereço do CESMVC e link para o Google Maps (busca pelo endereço). */
const ENDERECO = 'Rua dos Funcionários, 1540 — Cabral, Curitiba — PR, 80.035-050'
const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('Rua dos Funcionários, 1540, Cabral, Curitiba - PR, 80035-050')

/* Navegação útil do site (âncoras das seções da home + página do blog). */
const navLinks = [
  { label: 'O Curso', href: '#pilares' },
  { label: 'Docentes', href: '#docentes' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Investimento', href: '#valores' },
]

const redes = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/mvcufpr/',
    svg: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/user/TVUFPR',
    svg: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
]

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="
        flex items-center justify-center w-10 h-10
        bg-white/10 hover:bg-white/20
        text-white/80 hover:text-white
        rounded-full
        transition-all duration-300
        hover:-translate-y-0.5
      "
    >
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="bg-cesmvc-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* ── Brand ── */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img
              src={logoBege}
              alt="CESMVC — Curso de Especialização em Medicina Veterinária do Coletivo"
              className="w-full max-w-[240px] h-auto mb-4"
            />
            <p className="text-white/80 text-sm leading-relaxed max-w-xs">
              Universidade Federal do Paraná
            </p>
          </div>

          {/* ── Contact ── */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-cesmvc-sand mb-4">
              Contato
            </h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 md:justify-start justify-center hover:text-white transition-colors group"
                >
                  <svg className="w-4 h-4 shrink-0 mt-0.5 text-cesmvc-sand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>
                    {ENDERECO}
                    <span className="block text-cesmvc-sand text-xs mt-1 group-hover:underline">Ver no Google Maps →</span>
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-2 md:justify-start justify-center">
                <svg className="w-4 h-4 shrink-0 text-cesmvc-sand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:mvc@ufpr.br" className="hover:text-white transition-colors">mvc@ufpr.br</a>
              </li>
            </ul>
          </div>

          {/* ── Navegação ── */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-cesmvc-sand mb-4">
              Navegação
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <a
                  href="https://www.ufpr.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Portal da UFPR ↗
                </a>
              </li>
            </ul>
          </div>

          {/* ── Social ── */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-cesmvc-sand mb-4">
              Redes
            </h3>
            <div className="flex items-center gap-3">
              {redes.map((rede) => (
                <SocialLink key={rede.label} href={rede.href} label={rede.label}>
                  {rede.svg}
                </SocialLink>
              ))}
            </div>
            <p className="text-white/60 text-xs mt-4 max-w-xs">
              Acompanhe nossos conteúdos sobre saúde única, manejo populacional e políticas públicas.
            </p>
          </div>

        </div>

        {/* ── Divider ── */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} Universidade Federal do Paraná · CESMVC</p>
          <p>Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
