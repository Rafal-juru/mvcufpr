import { useState } from 'react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      if (!res.ok && res.status !== 200) throw new Error()
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('idle')
      alert('Não foi possível concluir a inscrição. Tente novamente.')
    }
  }

  return (
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
          Artigos, pesquisas e atualizações sobre saúde única, medicina veterinária
          coletiva, epidemiologia e políticas públicas — sem spam.
        </p>

        {status === 'success' ? (
          <div className="bg-white/15 rounded-2xl px-8 py-6 text-white border border-white/20">
            <p className="font-semibold text-lg mb-1">Inscrição confirmada!</p>
            <p className="text-white/70 text-sm">
              Você receberá nossas próximas publicações em breve.
            </p>
          </div>
        ) : (
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
              disabled={status === 'loading'}
              className="
                px-6 py-3 rounded-full whitespace-nowrap
                bg-cesmvc-orange hover:bg-cesmvc-orange-dark
                text-white font-semibold text-sm
                transition-all duration-300 hover:-translate-y-0.5
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {status === 'loading' ? 'Inscrevendo…' : 'Inscrever-se'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
