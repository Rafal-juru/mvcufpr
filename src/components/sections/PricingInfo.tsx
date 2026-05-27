/* PricingInfo.tsx — Seção de Investimento — Fundo Azul Marinho #2B4C7E */

const FEATURES = [
  '360h de carga horária total',
  '18 meses de duração',
  'Corpo docente 100% UFPR',
  'Material didático incluso',
  'Acesso à Biblioteca UFPR',
  'Certificado de Especialização reconhecido pelo MEC',
  'Projeto integrador com orientação individual',
  'Rede de ex-alunos em todo o Brasil',
]

const PAYMENT_OPTIONS = [
  {
    id: 'parcel',
    highlight: true,
    badge: 'Mais escolhido',
    label: 'Parcelado',
    priceDisplay: '18x de',
    price: 'R$ 580',
    note: 'sem juros no cartão',
    sub: 'Total: R$ 10.440',
    cta: 'Garantir Minha Vaga',
    ctaHref: '#',
  },
  {
    id: 'upfront',
    highlight: false,
    badge: 'Maior economia',
    label: 'À Vista',
    priceDisplay: 'por',
    price: 'R$ 9.200',
    note: 'desconto de R$ 1.240',
    sub: '12% off no pagamento único',
    cta: 'Pagar à Vista',
    ctaHref: '#',
  },
]

export default function PricingInfo() {
  return (
    <section
      id="valores"
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{ background: '#2B4C7E' }}
    >
      {/* ── Subtle texture overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 0)',
          backgroundSize: '1.5rem 1.5rem',
        }}
        aria-hidden="true"
      />

      {/* ── Decorative blobs ── */}
      <div
        className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: '#D96C2B' }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: '#2E6F57' }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="max-w-3xl mb-16">
          <span className="inline-flex items-center gap-2 text-white/60 text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-8 h-px bg-white/40 inline-block" />
            Investimento
          </span>
          <h2 className="font-grift text-white font-bold leading-tight mb-6"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            Valores e Formas
            <span className="block" style={{ color: '#D96C2B' }}>de Pagamento</span>
          </h2>
          <p className="text-white/70 leading-relaxed" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)' }}>
            Um investimento em conhecimento que transforma carreiras. Parcelamento
            facilitado sem acréscimos para que nada impeça sua especialização.
          </p>
        </div>

        {/* ── Layout: Features list + Payment cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* ── Left: O que está incluso ── */}
          <div className="lg:col-span-2">
            <p className="text-white/60 text-xs font-bold tracking-widest uppercase mb-6">
              Tudo incluso na especialização
            </p>
            <ul className="flex flex-col gap-3">
              {FEATURES.map((feat) => (
                <li key={feat} className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(46,111,87,0.30)' }}
                    aria-hidden="true"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="#2E6F57" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-white/80 text-sm leading-snug">{feat}</span>
                </li>
              ))}
            </ul>

            {/* CAPES/MEC note */}
            <div className="mt-8 p-4 rounded-xl border border-white/10 bg-white/5">
              <p className="text-white/60 text-xs leading-relaxed">
                <span className="text-white font-semibold">Nota:</span>{' '}
                Curso de Pós-Graduação Lato Sensu reconhecido pela UFPR, seguindo as
                diretrizes da resolução CNE/CES nº 1/2018.
              </p>
            </div>
          </div>

          {/* ── Right: Payment cards ── */}
          <div className="lg:col-span-3 flex flex-col sm:flex-row gap-6">
            {PAYMENT_OPTIONS.map((opt) => (
              <div
                key={opt.id}
                className={`
                  relative flex-1 flex flex-col rounded-2xl p-8
                  transition-all duration-300
                  ${opt.highlight
                    ? 'bg-white shadow-2xl shadow-black/30 scale-[1.02] sm:scale-105'
                    : 'bg-white/10 border border-white/20 hover:bg-white/15'}
                `}
              >
                {/* Badge */}
                <span
                  className="inline-block self-start px-3 py-1 rounded-full text-xs font-bold mb-6"
                  style={
                    opt.highlight
                      ? { background: '#D96C2B', color: '#fff' }
                      : { background: 'rgba(255,255,255,0.15)', color: '#fff' }
                  }
                >
                  {opt.badge}
                </span>

                <p
                  className={`text-sm font-semibold tracking-wide mb-1 ${
                    opt.highlight ? 'text-gray-500' : 'text-white/60'
                  }`}
                >
                  {opt.label}
                </p>
                <p
                  className={`text-xs mb-1 ${opt.highlight ? 'text-gray-400' : 'text-white/50'}`}
                >
                  {opt.priceDisplay}
                </p>

                {/* Big price */}
                <p
                  className="font-grift font-bold leading-none mb-2"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                    color: opt.highlight ? '#D96C2B' : '#fff',
                  }}
                >
                  {opt.price}
                </p>

                <p className={`text-xs font-medium mb-1 ${opt.highlight ? 'text-gray-500' : 'text-white/60'}`}>
                  {opt.note}
                </p>
                <p className={`text-xs mb-8 ${opt.highlight ? 'text-gray-400' : 'text-white/40'}`}>
                  {opt.sub}
                </p>

                {/* CTA */}
                <a
                  href={opt.ctaHref}
                  className={`
                    mt-auto inline-flex items-center justify-center gap-2
                    font-bold text-sm px-6 py-3.5 rounded-xl
                    transition-all duration-300 hover:-translate-y-0.5
                    ${opt.highlight
                      ? 'text-white hover:opacity-90 shadow-lg hover:shadow-xl'
                      : 'text-white border border-white/30 hover:border-white/60 hover:bg-white/10'}
                  `}
                  style={opt.highlight ? { background: '#D96C2B', boxShadow: '0 0.5rem 1.5rem rgba(217,108,43,0.4)' } : {}}
                >
                  {opt.cta}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ── Trust bar ── */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center">
          {[
            { icon: '🔒', text: 'Pagamento 100% seguro' },
            { icon: '📋', text: 'Contrato claro e transparente' },
            { icon: '🎓', text: 'Certificado reconhecido pelo MEC' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-white/60 text-sm">
              <span aria-hidden="true">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>

        {/* ── Urgency note ── */}
        <p className="mt-8 text-center text-white/50 text-xs">
          Vagas limitadas para a turma 2025. Inscrições encerram em <strong className="text-white/70">31 de julho de 2025</strong>.
        </p>
      </div>
    </section>
  )
}
