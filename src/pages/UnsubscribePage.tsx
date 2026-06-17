import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import SiteFooter from '../components/layout/SiteFooter'

type Stage = 'confirm' | 'loading' | 'success' | 'error' | 'invalid'

export default function UnsubscribePage() {
  const [params] = useSearchParams()
  const email = params.get('email') ?? ''
  const sig   = params.get('sig')   ?? ''

  const [stage, setStage] = useState<Stage>(email && sig ? 'confirm' : 'invalid')

  async function handleConfirm() {
    setStage('loading')
    try {
      const res = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, sig }),
      })
      setStage(res.ok ? 'success' : 'error')
    } catch {
      setStage('error')
    }
  }

  return (
    <div className="min-h-screen bg-cesmvc-sand font-sans flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="max-w-md w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">

          {stage === 'confirm' && (
            <>
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="font-grift text-gray-900 font-bold text-2xl mb-2">
                Cancelar inscrição?
              </h1>
              <p className="text-gray-500 text-sm leading-relaxed mb-2">
                Você está prestes a cancelar o recebimento de e-mails da newsletter do CESMVC–UFPR.
              </p>
              <p className="text-gray-400 text-xs mb-8 font-mono break-all">{email}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="px-6 py-3 rounded-xl bg-cesmvc-orange-dark hover:bg-cesmvc-orange text-white font-semibold text-sm transition-colors"
                >
                  Sim, cancelar inscrição
                </button>
                <Link
                  to="/"
                  className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:border-gray-300 font-semibold text-sm transition-colors"
                >
                  Voltar ao site
                </Link>
              </div>
            </>
          )}

          {stage === 'loading' && (
            <>
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5 animate-pulse">
                <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-400 text-sm">Processando…</p>
            </>
          )}

          {stage === 'success' && (
            <>
              <div className="w-14 h-14 rounded-full bg-cesmvc-blue/10 flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-cesmvc-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="font-grift text-gray-900 font-bold text-2xl mb-3">
                Inscrição cancelada
              </h1>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Você foi removido da nossa lista e não receberá mais e-mails da newsletter do CESMVC–UFPR.
              </p>
              <Link to="/" className="inline-flex items-center gap-2 text-cesmvc-blue font-semibold text-sm hover:opacity-80 transition-opacity">
                ← Voltar para o site
              </Link>
            </>
          )}

          {(stage === 'error' || stage === 'invalid') && (
            <>
              <div className="w-14 h-14 rounded-full bg-cesmvc-orange/10 flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-cesmvc-orange-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
              </div>
              <h1 className="font-grift text-gray-900 font-bold text-2xl mb-3">
                {stage === 'invalid' ? 'Link inválido' : 'Erro ao processar'}
              </h1>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                {stage === 'invalid'
                  ? 'Este link de cancelamento não é válido ou já foi utilizado.'
                  : 'Não foi possível cancelar a inscrição. Tente novamente ou entre em contato.'}
              </p>
              <Link to="/" className="inline-flex items-center gap-2 text-cesmvc-blue font-semibold text-sm hover:opacity-80 transition-opacity">
                ← Voltar para o site
              </Link>
            </>
          )}

        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
