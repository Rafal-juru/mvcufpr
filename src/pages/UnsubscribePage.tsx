import { Link, useSearchParams } from 'react-router-dom'
import SiteFooter from '../components/layout/SiteFooter'

export default function UnsubscribePage() {
  const [params] = useSearchParams()
  const status = params.get('status')
  const ok = status === 'ok'

  return (
    <div className="min-h-screen bg-cesmvc-sand font-sans flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="max-w-md w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
          {ok ? (
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
            </>
          ) : (
            <>
              <div className="w-14 h-14 rounded-full bg-cesmvc-orange/10 flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-cesmvc-orange-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
              </div>
              <h1 className="font-grift text-gray-900 font-bold text-2xl mb-3">
                Link inválido
              </h1>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Este link de cancelamento não é válido ou já foi utilizado.
              </p>
            </>
          )}

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-cesmvc-blue font-semibold text-sm hover:opacity-80 transition-opacity"
          >
            ← Voltar para o site
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
