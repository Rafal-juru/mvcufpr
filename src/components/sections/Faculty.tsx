/**
 * Faculty.tsx — Corpo Docente
 *
 * Layout: Card de destaque da coordenadora (full-width, bg-cesmvc-green)
 * + grid secundário limpo com os demais professores mockados.
 */

import rostoRita from '../../assets/images/rostoRita.png';
import logoMVCLaranja from '../../assets/images/logoMVC_azul.png';

/* ── Dados dos docentes secundários ──────────────────────────────── */
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
];

export default function Faculty() {
  return (
    <section
      id="docentes"
      className="relative py-24 sm:py-32 bg-white overflow-hidden"
    >
      {/* ── Subtle decorative blob (top-right only) ── */}
      <div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{ background: '#2E6F57' }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="max-w-3xl mb-14">
          <span className="inline-flex items-center gap-2 text-cesmvc-green text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-8 h-px bg-cesmvc-green inline-block" />
            Corpo Docente
          </span>
          <h2
            className="font-serif-display text-[#0B281E] font-medium leading-[1.1] tracking-tight mb-5"
            style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)' }}
          >
            Professores de
            <span className="text-cesmvc-green"> Universidades Federais</span>
          </h2>
          <p
            className="text-[#0B281E]/60 leading-relaxed"
            style={{ fontSize: 'clamp(0.9375rem, 1.4vw, 1.0625rem)' }}
          >
            Nosso corpo docente reúne mais de 40 professores doutores de
            instituições federais, pesquisadores ativos e especialistas
            reconhecidos nacionalmente em medicina veterinária coletiva.
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════════
            CARD DE DESTAQUE — Coordenadora
        ══════════════════════════════════════════════════════════ */}
        <div className="w-full flex flex-col md:flex-row gap-8 p-8 md:p-12 rounded-3xl bg-cesmvc-green text-cesmvc-sand mb-14 relative overflow-hidden">

          {/* Decorative circle glow inside the card */}
          <div
            className="absolute -top-16 -right-16 w-72 h-72 rounded-full opacity-10 blur-2xl pointer-events-none"
            style={{ background: '#F9E8C7' }}
            aria-hidden="true"
          />

          {/* Logo no canto superior direito do painel */}
          <img
            src={logoMVCLaranja}
            alt="Logo MVC"
            className="absolute top-6 right-6 w-12 md:w-16 h-auto object-contain opacity-90"
          />

          {/* ── Foto ── */}
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shrink-0 border border-white/10">
            <img
              src={rostoRita}
              alt="Profa. Dra. Rita de Cassia Maria Garcia"
              className="w-full h-full object-cover"
            />
          </div>

          {/* ── Informações ── */}
          <div className="flex flex-col justify-center gap-4 relative z-10">

            {/* Eyebrow */}
            <div className="flex items-center gap-2">
              <span className="w-5 h-px bg-cesmvc-sand" />
              <span className="font-mono text-[0.65rem] uppercase tracking-widest font-bold text-cesmvc-sand">
                Coordenação Geral
              </span>
            </div>

            {/* Nome */}
            <h3
              className="font-serif-display font-medium leading-tight text-cesmvc-sand tracking-tight"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
            >
              Profa. Dra. Rita de Cassia Maria Garcia
            </h3>

            {/* Cargo */}
            <p
              className="font-semibold text-cesmvc-sand"
              style={{ fontSize: '0.9375rem' }}
            >
              Coordenadora Geral do CESMVC – UFPR
            </p>

            {/* Separador */}
            <div className="w-12 h-px bg-cesmvc-sand/25" />

            {/* Bio */}
            <p
              className="leading-relaxed text-cesmvc-sand/90 max-w-2xl"
              style={{ fontSize: 'clamp(0.875rem, 1.3vw, 1rem)' }}
            >
              Médica-veterinária fundamental na construção e consolidação da
              Medicina Veterinária do Coletivo no Brasil. Reúne excelência
              acadêmica, experiência prática e atuação direta em políticas
              públicas e iniciativas voltadas à Saúde Única.
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            Subtítulo do Grid Secundário
        ══════════════════════════════════════════════════════════ */}
        <div className="flex items-center gap-4 mb-8">
          <span className="w-8 h-px bg-cesmvc-green/30 inline-block" />
          <span className="text-[#0B281E]/50 font-mono text-[0.7rem] uppercase tracking-widest font-bold">
            Mais de 40 professores de instituições federais
          </span>
          <span className="flex-1 h-px bg-cesmvc-green/10" />
        </div>

        {/* ══════════════════════════════════════════════════════════
            GRID SECUNDÁRIO
        ══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FACULTY.map((prof) => (
            <div
              key={prof.id}
              className="group relative flex flex-col gap-4 rounded-2xl p-6 border border-cesmvc-green/15 bg-transparent hover:bg-cesmvc-sand/40 transition-all duration-300"
            >
              {/* Accent line top (visible on hover) */}
              <div
                className="absolute top-0 left-6 right-6 h-[1.5px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: prof.color }}
                aria-hidden="true"
              />

              {/* Avatar + Nome */}
              <div className="flex items-center gap-4">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-serif-display font-bold text-white text-sm"
                  style={{
                    background: `linear-gradient(135deg, ${prof.color}ee, ${prof.color}99)`,
                  }}
                  aria-hidden="true"
                >
                  {prof.initials}
                </div>
                <div className="min-w-0">
                  <p
                    className="text-[#0B281E] font-semibold leading-snug"
                    style={{ fontSize: 'clamp(0.8125rem, 1.1vw, 0.9375rem)' }}
                  >
                    {prof.name}
                  </p>
                  <p className="text-[#0B281E]/50 text-xs leading-snug mt-0.5 truncate">
                    {prof.title}
                  </p>
                </div>
              </div>

              {/* Separador */}
              <div className="h-px bg-cesmvc-green/10" />

              {/* Bullets */}
              <ul className="flex flex-col gap-2">
                {prof.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span
                      className="flex-shrink-0 mt-[0.3rem] w-1.5 h-1.5 rounded-full"
                      style={{ background: prof.color }}
                      aria-hidden="true"
                    />
                    <span
                      className="text-[#0B281E]/65 leading-snug"
                      style={{ fontSize: '0.8125rem' }}
                    >
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
          <p className="text-[#0B281E]/40 text-sm">
            E mais{' '}
            <span className="text-cesmvc-green font-semibold">9 professores especialistas</span>
            {' '}convidados de outras instituições federais e do mercado.
          </p>
          <a
            href="#depoimentos"
            className="inline-flex items-center gap-2 mt-4 text-cesmvc-green hover:text-cesmvc-green-dark font-semibold text-sm group transition-colors duration-200"
          >
            Veja o que dizem nossos alunos
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
