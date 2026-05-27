/* Faculty.tsx — Grid de Professores — Estilo SaaS Premium */

/* ── Dados dos docentes ───────────────────────────────────────── */
const FACULTY = [
  {
    id: 1,
    name: 'Prof. Dr. Alexandre Mendes',
    title: 'Doutor em Epidemiologia Veterinária',
    initials: 'AM',
    color: '#2E6F57',
    bullets: [
      'Pesquisador do Laboratório de Saúde Coletiva – UFPR',
      '12 anos de docência em Medicina Veterinária Preventiva',
      'Colaborador do PAHO em projetos One Health',
    ],
  },
  {
    id: 2,
    name: 'Profa. Dra. Camila Rocha',
    title: 'Doutora em Saúde Pública Veterinária',
    initials: 'CR',
    color: '#2B4C7E',
    bullets: [
      'Coordenadora do Núcleo de Bem-Estar Animal – UFPR',
      'Pesquisadora CNPq nível 2 em medicina de populações',
      'Autora de 30+ artigos em periódicos Qualis A1',
    ],
  },
  {
    id: 3,
    name: 'Prof. Dr. Rafael Souza',
    title: 'Doutor em Parasitologia e Controle de Zoonoses',
    initials: 'RS',
    color: '#D96C2B',
    bullets: [
      'Chefe do Departamento de Medicina Veterinária Preventiva – UFPR',
      'Consultor técnico da Secretaria de Estado de Saúde do Paraná',
      'Especialista em zoonoses emergentes e gestão de risco',
    ],
  },
  {
    id: 4,
    name: 'Profa. Dra. Fernanda Lima',
    title: 'Doutora em Medicina Veterinária de Fauna Silvestre',
    initials: 'FL',
    color: '#2E6F57',
    bullets: [
      'Pesquisadora do IAP/Paraná em fauna silvestre nativa',
      'Professora associada da UFPR com 15 anos de experiência',
      'Especialista em medicina de animais silvestres e reabilitação',
    ],
  },
  {
    id: 5,
    name: 'Prof. Dr. Carlos Vieira',
    title: 'Doutor em Bioestatística e Epidemiologia',
    initials: 'CV',
    color: '#2B4C7E',
    bullets: [
      'Coordenador do Núcleo de Epidemiologia Animal – UFPR',
      'Consultor da OMS em vigilância epidemiológica veterinária',
      'Desenvolvedor de sistemas de georeferenciamento de doenças',
    ],
  },
  {
    id: 6,
    name: 'Profa. Dra. Beatriz Santos',
    title: 'Doutora em Políticas Públicas e Saúde Animal',
    initials: 'BS',
    color: '#D96C2B',
    bullets: [
      'Ex-Diretora de Saúde Animal do MAPA (2018–2022)',
      'Professora do Departamento de Gestão em Saúde – UFPR',
      'Autora da principal referência nacional em vigilância sanitária animal',
    ],
  },
]

export default function Faculty() {
  return (
    <section
      id="docentes"
      className="relative py-24 sm:py-32 bg-white overflow-hidden"
    >
      {/* ── Decorative blobs (mesmo padrão do CoursePillars) ── */}
      <div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: '#2E6F57' }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: '#2B4C7E' }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="max-w-3xl mb-16">
          <span className="inline-flex items-center gap-2 text-cesmvc-green text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-8 h-px bg-cesmvc-green inline-block" />
            Corpo Docente
          </span>
          <h2 className="font-grift text-gray-900 font-bold leading-tight mb-6"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            Professores de
            <span className="text-cesmvc-green block">Universidades Federais</span>
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)' }}>
            Nosso corpo docente é composto exclusivamente por professores doutores de
            instituições federais, pesquisadores ativos e especialistas reconhecidos
            nacionalmente em medicina veterinária coletiva.
          </p>
        </div>

        {/* ── Faculty Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {FACULTY.map((prof) => (
            <div
              key={prof.id}
              className="
                group relative flex flex-col gap-4
                bg-white rounded-2xl
                border border-gray-100
                p-6
                shadow-sm hover:shadow-xl
                transition-all duration-300 ease-out
                hover:-translate-y-1
              "
            >
              {/* Accent line top */}
              <div
                className="absolute top-0 left-6 right-6 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: prof.color }}
                aria-hidden="true"
              />

              {/* Avatar + Name */}
              <div className="flex items-center gap-4">
                {/* Circular avatar with initials */}
                <div
                  className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center font-grift font-bold text-white shadow-md"
                  style={{
                    background: `linear-gradient(135deg, ${prof.color}, ${prof.color}cc)`,
                    fontSize: '1.125rem',
                  }}
                  aria-hidden="true"
                >
                  {prof.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-gray-900 font-semibold leading-snug truncate"
                    style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1rem)' }}
                  >
                    {prof.name}
                  </p>
                  <p className="text-gray-500 text-xs leading-snug mt-0.5">{prof.title}</p>
                </div>
              </div>

              {/* Separator */}
              <div className="h-px bg-gray-100" />

              {/* Bullet points */}
              <ul className="flex flex-col gap-2.5">
                {prof.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span
                      className="flex-shrink-0 mt-[0.2rem] w-1.5 h-1.5 rounded-full"
                      style={{ background: prof.color }}
                      aria-hidden="true"
                    />
                    <span className="text-gray-600 leading-snug" style={{ fontSize: '0.8125rem' }}>
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom note ── */}
        <div className="mt-14 text-center">
          <p className="text-gray-500 text-sm">
            E mais{' '}
            <span className="text-cesmvc-green font-semibold">9 professores especialistas</span>
            {' '}convidados de outras instituições federais.
          </p>
          <a
            href="#depoimentos"
            className="
              inline-flex items-center gap-2 mt-4
              text-cesmvc-green hover:text-cesmvc-green-dark
              font-semibold text-sm sm:text-base
              group transition-colors duration-200
            "
          >
            Veja o que dizem nossos alunos
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
