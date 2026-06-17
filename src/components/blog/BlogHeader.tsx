import { Link } from 'react-router-dom'
import logoDescritivaLaranja from '../../assets/images/logoDescitivabLaranja.png'

/*
  Cabeçalho das páginas de blog (fundo verde fixo, mesmo idioma visual do
  Header da landing, mas usando navegação por rotas em vez de âncoras).
*/
export default function BlogHeader() {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-cesmvc-blue shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* ── Brand ── */}
          <Link to="/" className="flex items-center h-12">
            <img
              src={logoDescritivaLaranja}
              alt="CESMVC UFPR"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>

          {/* ── Nav ── */}
          <nav className="flex items-center gap-6 sm:gap-8" aria-label="Navegação do blog">
            <Link
              to="/"
              className="text-white/90 hover:text-white text-sm font-medium tracking-wide transition-colors"
            >
              Início
            </Link>
            <Link
              to="/blog"
              className="text-white/90 hover:text-white text-sm font-medium tracking-wide transition-colors"
            >
              Blog
            </Link>
            <Link
              to="/#investimento"
              className="
                hidden sm:inline-flex items-center gap-2
                bg-cesmvc-orange hover:bg-cesmvc-orange-dark
                text-white font-semibold text-sm
                px-5 py-2.5 rounded-full
                transition-all duration-300
                shadow-md shadow-cesmvc-orange/30 hover:-translate-y-0.5
              "
            >
              Inscreva-se
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
