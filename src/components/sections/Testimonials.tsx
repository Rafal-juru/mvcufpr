/* Testimonials.tsx — Depoimentos de Alunos — Estilo SaaS Premium */

/* ── Dados dos depoimentos ───────────────────────────────────── */
const TESTIMONIALS = [
  {
    id: 1,
    quote:
      'A especialização mudou completamente minha visão sobre saúde animal e saúde humana. A abordagem One Health é aplicada na prática, não apenas na teoria. O conteúdo sobre epidemiologia de populações foi revelador para minha atuação no serviço público.',
    name: 'Dra. Juliana Martins',
    role: 'Médica Veterinária — Secretaria de Saúde do Paraná',
    initials: 'JM',
    stars: 5,
  },
  {
    id: 2,
    quote:
      'O corpo docente é excepcional. Todos são pesquisadores ativos na área, o que garante que o conteúdo está sempre atualizado com as últimas evidências. A metodologia de ensino estimula o pensamento crítico e a autonomia do aluno.',
    name: 'Dr. Pedro Albuquerque',
    role: 'Médico Veterinário — MAPA / Serviço Federal',
    initials: 'PA',
    stars: 5,
  },
  {
    id: 3,
    quote:
      'Ingressei no programa com dúvidas sobre minha carreira. Hoje coordeno um programa municipal de saúde coletiva animal. A CESMVC me deu embasamento científico e ferramentas práticas que uso todos os dias no meu trabalho.',
    name: 'Dra. Ana Carolina Silva',
    role: 'Coordenadora de Saúde Animal — Prefeitura de Curitiba',
    initials: 'AC',
    stars: 5,
  },
  {
    id: 4,
    quote:
      'A grade curricular é muito bem estruturada. Os 8 pilares se complementam de forma orgânica, e o projeto integrador ao final do curso me permitiu publicar um artigo em revista Qualis A2. Recomendo para qualquer veterinário que queira atuar com visão sistêmica.',
    name: 'Dr. Marcos Tavares',
    role: 'Pesquisador — Embrapa Pecuária Sudeste',
    initials: 'MT',
    stars: 5,
  },
]

/* ── Starfield component ─────────────────────────────────────── */
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1" aria-label={`${count} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4"
          fill={i < count ? '#D96C2B' : 'none'}
          stroke={i < count ? '#D96C2B' : '#d1d5db'}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section
      id="depoimentos"
      className="relative py-24 sm:py-32 bg-cesmvc-sand overflow-hidden"
    >
      {/* ── Decorative blobs ── */}
      <div
        className="absolute top-0 right-0 w-[30rem] h-[30rem] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: '#D96C2B', transform: 'translate(40%, -40%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: '#2E6F57', transform: 'translate(-30%, 30%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="max-w-3xl mb-16">
          <span className="inline-flex items-center gap-2 text-cesmvc-green text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-8 h-px bg-cesmvc-green inline-block" />
            Depoimentos
          </span>
          <h2 className="font-grift text-gray-900 font-bold leading-tight mb-6"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            O que dizem nossos
            <span className="text-cesmvc-green block">egressos</span>
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)' }}>
            Profissionais que transformaram suas carreiras através de uma formação
            científica sólida, prática e alinhada às demandas atuais da saúde coletiva.
          </p>
        </div>

        {/* ── Testimonials Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={t.id}
              className={`
                group relative flex flex-col gap-5
                bg-white rounded-2xl p-8
                border border-gray-100
                shadow-sm hover:shadow-xl
                transition-all duration-300 ease-out
                hover:-translate-y-1
                ${idx === 0 ? 'md:col-span-1' : ''}
              `}
            >
              {/* Decorative large quote mark */}
              <span
                className="absolute top-6 right-8 font-grift font-bold leading-none select-none pointer-events-none"
                style={{ fontSize: '5rem', color: '#2E6F57', opacity: 0.08, lineHeight: 1 }}
                aria-hidden="true"
              >
                "
              </span>

              {/* Stars */}
              <Stars count={t.stars} />

              {/* Quote text */}
              <blockquote
                className="text-gray-700 leading-relaxed flex-1 relative z-10"
                style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1rem)' }}
              >
                "{t.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                {/* Initials avatar */}
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-grift font-bold text-sm shadow-sm"
                  style={{ background: 'linear-gradient(135deg, #2E6F57, #2B4C7E)' }}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-gray-900 font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Social proof bar ── */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 py-8 px-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/80">
          {[
            { value: '97%', label: 'de satisfação geral' },
            { value: '2ª', label: 'Turma em andamento' },
            { value: '100%', label: 'recomendariam o curso' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <span className="font-grift text-cesmvc-orange font-bold leading-none mb-1"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }}
              >
                {stat.value}
              </span>
              <span className="text-gray-500 text-sm">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-14 text-center">
          <a
            href="#investimento"
            className="
              inline-flex items-center gap-2
              text-cesmvc-green hover:text-cesmvc-green-dark
              font-semibold text-sm sm:text-base
              group transition-colors duration-200
            "
          >
            Conheça os valores do investimento
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
