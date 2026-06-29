import logoDescritivaBege from '../../assets/images/logoDescitivabBege.png'
import logoUFPR3 from '../../assets/images/logoUFPR3(semNome).png'
import reconhecidoPeloMecCelo from '../../assets/images/reconhecidoPeloMecCelo.png'
import CFMVlogofooter from '../../assets/images/CFMVlogofooter.png'
import IMVClogofooter from '../../assets/images/IMVClogofooter.png'

const REDES = [
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
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/ufpr',
    svg: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/school/ufpr/',
    svg: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

          {/* ── Brand ── */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img
              src={logoDescritivaBege}
              alt="CESMVC UFPR"
              className="h-12 w-auto mb-4 object-contain"
            />
            <p className="font-sans text-white/80 text-sm leading-relaxed max-w-xs mb-5">
              Medicina Veterinária do Coletivo — Universidade Federal do Paraná
            </p>

            {/* Logos parceiros — versão negativa (branca) */}
            <div className="flex items-center gap-4 mt-1 flex-wrap justify-center md:justify-start">
              {/* UFPR */}
              <a
                href="https://agrarias.ufpr.br/mvc/"
                target="_blank"
                rel="noopener noreferrer"
                title="Site Oficial UFPR MVC"
                className="inline-flex items-center hover:scale-105 transition-all duration-300"
              >
                <img
                  src={logoUFPR3}
                  alt="UFPR"
                  className="h-12 w-auto object-contain"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </a>

              {/* Selo MEC — reconhecidoPeloMecCelo */}
              <img
                src={reconhecidoPeloMecCelo}
                alt="Reconhecido pelo MEC"
                title="Pós-Graduação autorizada e reconhecida pelo MEC (Ministério da Educação)"
                className="h-12 w-auto object-contain cursor-help transition-all hover:scale-105"
              />

              {/* Selo CFMV — CFMVlogofooter */}
              <img
                src={CFMVlogofooter}
                alt="Selo CFMV"
                title="Especialização homologada pelo CFMV (Conselho Federal de Medicina Veterinária)"
                className="h-12 w-auto object-contain cursor-help transition-all hover:scale-105"
                style={{ filter: 'brightness(0) invert(1)' }}
              />

              {/* IMVC — IMVClogofooter */}
              <img
                src={IMVClogofooter}
                alt="IMVC"
                title="Instituto de Medicina Veterinária do Coletivo"
                className="h-12 w-auto object-contain transition-all hover:scale-105"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
          </div>

          {/* ── Contact ── */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-sans text-sm font-semibold uppercase tracking-widest text-cesmvc-sand mb-4">
              Contato
            </h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-center gap-2 md:justify-start justify-center">
                <svg className="w-4 h-4 shrink-0 text-cesmvc-sand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-sans">Rua dos Funcionários, 1540 — Cabral<br />Curitiba — PR, 80.035-050</span>
              </li>
              <li className="flex items-center gap-2 md:justify-start justify-center">
                <svg className="w-4 h-4 shrink-0 text-cesmvc-sand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:secretariacesmvc@ufpr.br" className="font-sans hover:text-white transition-colors">secretariacesmvc@ufpr.br</a>
              </li>
              <li className="flex items-center gap-2 md:justify-start justify-center">
                <svg className="w-4 h-4 shrink-0 text-cesmvc-sand" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.25 8.477 3.517 2.266 2.268 3.513 5.28 3.513 8.484-.003 6.66-5.339 12-11.95 12h-.005c-2.006 0-3.978-.5-5.742-1.45L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.793 1.451 5.485 0 9.95-4.437 9.952-9.897.002-2.645-1.022-5.131-2.883-6.994C16.55 1.85 14.07 1.83 12.012 1.83c-5.484 0-9.95 4.438-9.952 9.898-.001 2.062.54 4.072 1.562 5.867L2.628 21.6l4.02-1.054-.001-.002z" />
                </svg>
                <a
                  href="https://wa.me/554196259743?text=Olá!%20Tenho%20interesse%20no%20CESMVC%20UFPR."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans hover:text-white transition-colors underline underline-offset-2"
                >
                  +55 41 9625-9743
                </a>
              </li>
              <li className="flex items-center gap-2 md:justify-start justify-center">
                <svg className="w-4 h-4 shrink-0 text-cesmvc-sand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <a
                  href="https://agrarias.ufpr.br/mvc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans hover:text-white transition-colors underline underline-offset-2"
                >
                  Site Institucional (UFPR)
                </a>
              </li>
            </ul>
          </div>

          {/* ── Redes ── */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-sans text-sm font-semibold uppercase tracking-widest text-cesmvc-sand mb-4">
              Redes Sociais
            </h3>
            <div className="flex items-center gap-3 flex-wrap">
              {REDES.map((rede) => (
                <SocialLink key={rede.label} href={rede.href} label={rede.label}>
                  {rede.svg}
                </SocialLink>
              ))}
            </div>
          </div>

        </div>

        {/* ── Divider + Assinatura ── */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p className="font-sans">© {new Date().getFullYear()} Universidade Federal do Paraná</p>
          <p className="font-sans">
            Desenvolvido por{' '}
            <a
              href="https://lunetacomunicacoes.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors underline underline-offset-2"
            >
              Luneta Comunicações
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
