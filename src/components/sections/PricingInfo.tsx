/* PricingInfo.tsx — Seção de Investimento — Paleta 100% fria (azul/verde/branco) */

import logoUFPR3 from '../../assets/images/logoUFPR3(semNome).png'

/* ── Click tracking (localStorage) ── */
function trackWhatsAppClick() {
  try {
    const current = parseInt(localStorage.getItem('whatsapp_clicks') ?? '0', 10)
    localStorage.setItem('whatsapp_clicks', String(current + 1))
  } catch {
    // silently fail if localStorage is unavailable
  }
}

const FEATURES = [
  '544 horas de carga horária total',
  '24 meses de duração',
  'Corpo docente 100% UFPR',
  'Material didático incluso',
  'Acesso à Biblioteca UFPR',
  'Certificado de Especialização reconhecido pelo MEC',
  'Projeto integrador com orientação individual',
  'Rede de ex-alunos em todo o Brasil',
]

const WHATSAPP_PARCELADO = 'https://wa.me/554196259743?text=Ol%C3%A1!%20Quero%20garantir%20minha%20vaga%20no%20CESMVC%20utilizando%20a%20op%C3%A7%C3%A3o%20de%20pagamento%20parcelado.'
const WHATSAPP_AVISTA = 'https://wa.me/554196259743?text=Ol%C3%A1!%20Tenho%20interesse%20no%20CESMVC%20e%20gostaria%20de%20consultar%20as%20condi%C3%A7%C3%B5es%20e%20o%20desconto%20para%20pagamento%20%C3%A0%20vista.'

/* ── Ícone WhatsApp ── */
function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413A11.824 11.824 0 0012.05 0zm0 21.785a9.86 9.86 0 01-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374a9.861 9.861 0 01-1.51-5.26C2.182 6.455 6.635 2 12.05 2a9.84 9.84 0 016.986 2.896 9.842 9.842 0 012.896 6.99c-.003 5.45-4.437 9.899-9.882 9.899z" />
    </svg>
  )
}

export default function PricingInfo() {
  return (
    <section
      id="investimento"
      className="relative py-16 sm:py-24 overflow-hidden"
      style={{ background: '#2B4C7E' }}
    >
      {/* ── Logo UFPR (Endosso) ── */}
      <div className="absolute top-8 right-6 sm:right-12 z-20">
        <a
          href="https://agrarias.ufpr.br/mvc/"
          target="_blank"
          rel="noopener noreferrer"
          title="Site Oficial UFPR MVC"
          className="flex items-center drop-shadow-md hover:drop-shadow-xl hover:scale-105 transition-all duration-300"
        >
          <img src={logoUFPR3} alt="UFPR" className="h-9 sm:h-10 w-auto object-contain" />
        </a>
      </div>

      {/* ── Subtle texture ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 0)',
          backgroundSize: '1.5rem 1.5rem',
        }}
        aria-hidden="true"
      />

      {/* ── Decorative blobs — apenas tons frios ── */}
      <div
        className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: '#2E6F57' }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: '#1a3057' }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 text-white/60 text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-8 h-px bg-white/40 inline-block" />
            Investimento
          </span>
          <h2
            className="font-grift-black text-white leading-tight mb-6"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            Valores e Formas
            <span className="block text-[#7fb8a0]">de Pagamento</span>
          </h2>
          <p className="font-sans text-white/70 leading-relaxed" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)' }}>
            Um investimento em conhecimento que transforma carreiras. Parcelamento
            facilitado sem acréscimos para que nada impeça sua especialização.
          </p>
        </div>

        {/* ── Layout: Features + Payment cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">

          {/* ── Left: Tudo incluso ── */}
          <div className="lg:col-span-2">
            <p className="font-sans text-white/60 text-xs font-bold tracking-widest uppercase mb-6">
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
                    <svg className="w-3 h-3" fill="none" stroke="#7fb8a0" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="font-sans text-white/80 text-sm leading-snug">{feat}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-4 rounded-xl border border-white/10 bg-white/5">
              <p className="font-sans text-white/60 text-xs leading-relaxed">
                <span className="text-white font-semibold">Nota:</span>{' '}
                Curso de Pós-Graduação Lato Sensu reconhecido pela UFPR, seguindo as
                diretrizes da resolução CNE/CES nº 1/2018.
              </p>
            </div>
          </div>

          {/* ── Right: Payment cards ── */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-6">

              {/* Card Parcelado — Destaque (azul escuro + branco) */}
              <div className="relative flex-1 flex flex-col rounded-2xl p-8 bg-white shadow-2xl shadow-black/30 scale-[1.02] sm:scale-105 transition-all duration-300">

                {/* Badge — verde frio */}
                <span
                  className="inline-block self-start px-3 py-1 rounded-full text-xs font-bold mb-6 text-white"
                  style={{ background: '#2E6F57' }}
                >
                  Mais escolhido
                </span>

                <p className="font-sans text-sm font-semibold tracking-wide mb-1 text-gray-500">Parcelado</p>
                <p className="font-sans text-xs mb-1 text-gray-400">24x de</p>

                {/* Preço em verde frio */}
                <p
                  className="font-grift-black leading-none mb-2"
                  style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: '#2E6F57' }}
                >
                  R$ 664,39
                </p>
                <p className="font-sans text-xs font-medium mb-1 text-gray-500">sem juros no cartão</p>
                <p className="font-sans text-xs mb-8 text-gray-400">Total: R$ 15.945,36</p>

                {/* CTA Principal — verde */}
                <a
                  href={WHATSAPP_PARCELADO}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackWhatsAppClick}
                  className="
                    mt-auto inline-flex items-center justify-center gap-2.5
                    font-bold text-sm px-6 py-3.5 rounded-xl
                    text-white
                    transition-all duration-300 hover:-translate-y-0.5
                    shadow-lg hover:shadow-xl
                  "
                  style={{
                    background: 'linear-gradient(135deg, #2E6F57 0%, #1e4f3d 100%)',
                    boxShadow: '0 0.5rem 1.5rem rgba(46,111,87,0.40)',
                  }}
                >
                  <WhatsAppIcon />
                  Inscreva-se via WhatsApp
                </a>
              </div>

              {/* Card À Vista */}
              <div className="relative flex-1 flex flex-col rounded-2xl p-8 bg-white/10 border border-white/20 hover:bg-white/15 transition-all duration-300">

                <span className="inline-block self-start px-3 py-1 rounded-full text-xs font-bold mb-6 text-white" style={{ background: 'rgba(255,255,255,0.15)' }}>
                  Maior economia
                </span>

                <p className="font-sans text-sm font-semibold tracking-wide mb-1 text-white/60">À Vista</p>
                <p className="font-sans text-xs mb-1 text-white/50">Valor</p>

                <p
                  className="font-grift-black leading-none mb-2 text-white"
                  style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }}
                >
                  Com Desconto
                </p>
                <p className="font-sans text-xs font-medium mb-1 text-white/60">Consultar desconto para pagamento à vista</p>
                <p className="font-sans text-xs mb-8 text-white/40">Fale com a secretaria do curso</p>

                <a
                  href={WHATSAPP_AVISTA}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackWhatsAppClick}
                  className="
                    mt-auto inline-flex items-center justify-center gap-2
                    font-bold text-sm px-6 py-3.5 rounded-xl
                    text-white border border-white/30
                    hover:border-white/60 hover:bg-white/10
                    transition-all duration-300 hover:-translate-y-0.5
                  "
                >
                  <WhatsAppIcon />
                  Consultar via WhatsApp
                </a>
              </div>
            </div>

            {/* Status Highlight: 2ª Turma em andamento */}
            <div className="flex items-center gap-3.5 p-4 rounded-xl border border-[#7fb8a0]/25 bg-white/5 text-white shadow-md">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cesmvc-orange flex items-center justify-center font-grift-bold text-[#F9E8C7] text-sm shadow-md shadow-cesmvc-orange/30">
                ★
              </span>
              <div className="flex-1 text-left">
                <p className="font-sans text-xs font-bold text-[#7fb8a0] uppercase tracking-wider">Status Acadêmico</p>
                <p className="font-sans text-xs text-white/80 mt-0.5">2ª Turma em andamento: aulas síncronas semanais já iniciadas.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Trust bar — ícones frios ── */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center">
          {[
            { icon: '🔒', text: 'Pagamento 100% seguro' },
            { icon: '📋', text: 'Contrato claro e transparente' },
            { icon: '🎓', text: 'Certificado reconhecido pelo MEC' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-white/60 text-sm">
              <span aria-hidden="true">{item.icon}</span>
              <span className="font-sans">{item.text}</span>
            </div>
          ))}
        </div>

        {/* ── Urgency note ── */}
        <p className="mt-8 text-center font-sans text-white/50 text-xs">
          Vagas limitadas para a turma 2026/2028. Inscrições encerram em{' '}
          <strong className="text-white/70">31 de julho de 2026</strong>.
        </p>
      </div>
    </section>
  )
}
