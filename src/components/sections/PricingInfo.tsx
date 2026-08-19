import { useTranslation, Trans } from 'react-i18next'
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

const SIGA_ENROLLMENT_URL = 'https://siga.ufpr.br/siga/visitante/processoseletivo/index.jsp?sequencial=5339'
const WHATSAPP_DUVIDAS = 'https://wa.me/554196259743?text=Ol%C3%A1!%20Gostaria%20de%20tirar%20algumas%20d%C3%BAvidas%20sobre%20a%20p%C3%B3s-gradua%C3%A7%C3%A3o%20CESMVC.'

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
  const { t } = useTranslation()

  const features = (t('pricing.features', { returnObjects: true }) as string[]) || []

  return (
    <section
      id="investimento"
      className="relative py-16 sm:py-24 overflow-hidden"
      style={{ background: '#2B4C7E' }}
    >
      {/* ── Logo UFPR (Endosso) ── */}
      <div className="absolute top-8 right-6 sm:right-12 z-20">
        <a
          href="https://agrarias.ufpr.br/mvc/especializacao-mvc/"
          target="_blank"
          rel="noopener noreferrer"
          title={t('nav.officialUfpr')}
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
            {t('pricing.eyebrow')}
          </span>
          <h2
            className="font-grift-black text-white leading-tight mb-6"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            {t('pricing.title')}
            <span className="block text-[#7fb8a0]">{t('pricing.titleHighlight')}</span>
          </h2>
          <p className="font-sans text-white/70 leading-relaxed" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)' }}>
            {t('pricing.description')}
          </p>
        </div>

        {/* ── Layout: Features + Payment Card ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center lg:items-start">

          {/* ── Left: Features & Status Highlight (7 columns) ── */}
          <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8">
            <div>
              <p className="font-sans text-white/60 text-xs font-bold tracking-widest uppercase mb-6">
                {t('pricing.featuresTitle')}
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3">
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
            </div>

            <div className="p-4 rounded-xl border border-white/10 bg-white/5">
              <p className="font-sans text-white/60 text-xs leading-relaxed">
                <span className="text-white font-semibold">{t('pricing.noteLabel')}</span>{' '}
                {t('pricing.noteText')}
              </p>
            </div>

            {/* Status Highlight: 3ª Turma em andamento */}
            <div className="flex items-center gap-3.5 p-4 rounded-xl border border-[#7fb8a0]/25 bg-white/5 text-white shadow-md">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cesmvc-orange flex items-center justify-center font-grift-bold text-[#F9E8C7] text-sm shadow-md shadow-cesmvc-orange/30">
                ★
              </span>
              <div className="flex-1 text-left">
                <p className="font-sans text-xs font-bold text-[#7fb8a0] uppercase tracking-wider">{t('pricing.statusBadge')}</p>
                <p className="font-sans text-xs text-white/80 mt-0.5">{t('pricing.statusText')}</p>
              </div>
            </div>
          </div>

          {/* ── Right: Single Payment Card (5 columns) ── */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            {/* Card Parcelado — Destaque (azul escuro + branco) */}
            <div className="relative w-full max-w-md flex flex-col rounded-2xl p-8 sm:p-10 bg-white shadow-2xl shadow-black/30 scale-[1.02] sm:scale-105 transition-all duration-300 border border-gray-100">

              {/* Badge — verde frio */}
              <span
                className="inline-block self-start px-3 py-1 rounded-full text-xs font-bold mb-6 text-white"
                style={{ background: '#2E6F57' }}
              >
                {t('pricing.cardBadge')}
              </span>

              <p className="font-sans text-sm font-semibold tracking-wide mb-1 text-gray-500">{t('pricing.cardPlan')}</p>
              <p className="font-sans text-xs mb-1 text-gray-400">{t('pricing.cardInstallments')}</p>

              {/* Preço em verde frio */}
              <p
                className="font-grift-black leading-none mb-2"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 3rem)', color: '#2E6F57' }}
              >
                {t('pricing.cardPrice')}
              </p>
              <p className="font-sans text-sm font-semibold mb-2 text-gray-500">{t('pricing.cardTotal')}</p>
              <p className="font-sans text-[11px] leading-relaxed text-gray-400 mb-8 text-left">
                {t('pricing.cardObs')}
              </p>

              {/* CTA Principal — SIGA UFPR */}
              <a
                href={SIGA_ENROLLMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-auto inline-flex items-center justify-center gap-2.5
                  font-bold text-sm px-6 py-4 rounded-xl
                  text-white
                  transition-all duration-300 hover:-translate-y-0.5
                  shadow-lg hover:shadow-xl
                "
                style={{
                  background: 'linear-gradient(135deg, #2E6F57 0%, #1e4f3d 100%)',
                  boxShadow: '0 0.5rem 1.5rem rgba(46,111,87,0.40)',
                }}
              >
                {t('pricing.cardCta')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              {/* Botão Secundário — Tirar Dúvidas via WhatsApp */}
              <a
                href={WHATSAPP_DUVIDAS}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackWhatsAppClick}
                className="
                  mt-3 inline-flex items-center justify-center gap-2.5
                  font-bold text-sm px-6 py-3.5 rounded-xl
                  text-[#2E6F57] hover:text-[#1e4f3d]
                  border-2 border-[#2E6F57]/30 hover:border-[#2E6F57]
                  bg-transparent hover:bg-[#2E6F57]/5
                  transition-all duration-300
                "
              >
                <WhatsAppIcon />
                {t('pricing.cardDuvidasCta')}
              </a>
            </div>
          </div>

        </div>

        {/* ── Trust bar — ícones frios ── */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center">
          {[
            { icon: '🔒', text: t('pricing.trustSecure') },
            { icon: '📋', text: t('pricing.trustContract') },
            { icon: '🎓', text: t('pricing.trustMec') },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-white/60 text-sm">
              <span aria-hidden="true">{item.icon}</span>
              <span className="font-sans">{item.text}</span>
            </div>
          ))}
        </div>

        {/* ── Urgency note ── */}
        <p className="mt-8 text-center font-sans text-white/60 text-xs">
          <Trans i18nKey="pricing.urgencyText">
            Vagas limitadas para a turma 2026/2028. Inscrições encerram em <strong className="text-white/80">31 de julho de 2026</strong>.
          </Trans>
        </p>
      </div>
    </section>
  )
}
