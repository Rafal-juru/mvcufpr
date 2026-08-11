import { useState } from 'react'
import Toast from '../ui/Toast'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ message: string; detail: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok && res.status !== 200) throw new Error(body.message || `HTTP ${res.status}`)
      setEmail('')
      setToast({
        message: 'Inscrição confirmada!',
        detail: 'Verifique seu e-mail — enviamos uma confirmação.',
      })
    } catch (err) {
      setToast({
        message: 'Não foi possível inscrever.',
        detail: err instanceof Error ? err.message : 'Tente novamente em instantes.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="bg-cesmvc-blue py-16 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-3 text-white/60 text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-8 h-px bg-white/40 inline-block" />
            Newsletter
            <span className="w-8 h-px bg-white/40 inline-block" />
          </span>

          <h2
            className="font-grift text-white font-bold leading-tight mb-3"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
          >
            Receba novidades diretamente no seu e-mail
          </h2>

          <p className="text-white/70 text-sm sm:text-base mb-8 leading-relaxed">
            Artigos, pesquisas e atualizações sobre saúde única, Medicina Veterinária do Coletivo, epidemiologia e políticas públicas.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            noValidate
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor e-mail"
              required
              aria-label="Endereço de e-mail para newsletter"
              className="
                flex-1 px-5 py-3 rounded-full
                bg-white text-gray-900 placeholder-gray-400 text-sm
                focus:outline-none focus:ring-2 focus:ring-white/60
              "
            />
            <button
              type="submit"
              disabled={loading}
              className="
                px-6 py-3 rounded-full whitespace-nowrap
                bg-cesmvc-orange hover:bg-cesmvc-orange-dark
                text-white font-semibold text-sm
                transition-all duration-300 hover:-translate-y-0.5
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {loading ? 'Inscrevendo…' : 'Inscrever-se'}
            </button>
          </form>
        </div>
      </section>

      {toast && (
        <Toast
          message={toast.message}
          detail={toast.detail}
          onClose={() => setToast(null)}
        />
      )}
    </>
  )
}
