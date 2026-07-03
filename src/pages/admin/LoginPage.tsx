import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import logoDescritivaLaranja from '../../assets/images/logoDescitivabLaranja.png'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await login(email, password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao entrar')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-cesmvc-blue flex flex-col items-center justify-center px-4 font-sans">
      {/* Blob decorativo */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: '#D96C2B' }}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src={logoDescritivaLaranja}
            alt="CESMVC UFPR"
            className="h-14 w-auto object-contain mx-auto mb-6"
          />
          <h1 className="font-grift text-white font-black text-2xl">Painel do Blog</h1>
          <p className="text-white/70 text-sm mt-1">Acesso restrito à administração</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-5"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-cesmvc-blue focus:ring-2 focus:ring-cesmvc-blue/20 outline-none transition"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5">
              Senha
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-cesmvc-blue focus:ring-2 focus:ring-cesmvc-blue/20 outline-none transition"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-cesmvc-orange-dark bg-cesmvc-orange/10 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="
              mt-1 inline-flex items-center justify-center gap-2
              bg-cesmvc-blue hover:bg-cesmvc-blue-dark
              text-white font-semibold text-sm
              px-6 py-3 rounded-xl transition-all duration-300
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            {submitting ? 'Entrando…' : 'Entrar'}
          </button>

          <Link to="/" className="text-center text-xs text-gray-400 hover:text-cesmvc-blue transition-colors">
            ← Voltar para o site
          </Link>
        </form>
      </div>
    </div>
  )
}
