import type { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import logoDescritivaLaranja from '../../assets/images/logoDescitivabLaranja.png'

/* Casca das páginas administrativas: barra superior verde + logout. */
export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <header className="bg-cesmvc-green shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3">
          <Link to="/admin" className="flex items-center gap-3">
            <img
              src={logoDescritivaLaranja}
              alt="CESMVC UFPR"
              className="h-9 w-auto object-contain"
            />
            <span className="text-white/80 text-sm font-medium hidden sm:inline border-l border-white/20 pl-3">
              Painel do Blog
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {user && (
              <span className="text-white/70 text-xs hidden sm:inline">{user.email}</span>
            )}
            <Link
              to="/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              Ver site ↗
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="bg-white/10 hover:bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>
    </div>
  )
}
