import { useState, useRef, useEffect } from 'react'
import iconeLogoImg from '../../assets/images/icone-logo.png'

/* ─────────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────────── */
interface Pillar {
  id: number
  icon: string         // emoji fallback (used when no image asset is found)
  iconImg?: string     // optional image path
  tag: string
  title: string
  summary: string
  body: string
  color: string        // Tailwind accent color class set
}

const PILLARS: Pillar[] = [
  {
    id: 1,
    iconImg: iconeLogoImg,
    icon: '🌍',
    tag: 'Pilar 01',
    title: 'Saúde Única (One Health)',
    summary:
      'A interconexão indissociável entre saúde humana, animal e ambiental como princípio fundador do curso.',
    body: `O conceito de Saúde Única reconhece que a saúde dos seres humanos, dos animais e dos ecossistemas são
profundamente interdependentes. Neste pilar, os alunos desenvolvem competências para atuar na interface
animal-humano-ambiente, compreendendo a epidemiologia de zoonoses, o papel dos reservatórios animais e as
estratégias de vigilância integrada. São estudados casos reais de emergências sanitárias com abordagem
transdisciplinar envolvendo medicina veterinária, saúde pública e gestão ambiental.`,
    color: 'green',
  },
  {
    id: 2,
    iconImg: undefined,
    icon: '🦜',
    tag: 'Pilar 02',
    title: 'Medicina de Fauna Silvestre',
    summary:
      'Conservação in situ e ex situ, reabilitação de fauna e monitoramento de populações silvestres.',
    body: `Este pilar aprofunda as técnicas de medicina preventiva e curativa aplicadas a animais silvestres em
ambientes naturais e em cativeiro. Abrange contenção química e física, diagnóstico por imagem em campo,
reintrodução de espécies ameaçadas e biossegurança em zoológicos, criadouros científicos e CETAS.
Os alunos participam de saídas de campo supervisionadas em unidades de conservação do Paraná e Santa Catarina,
integrando dados clínicos ao monitoramento populacional por telemetria e armadilhas fotográficas.`,
    color: 'blue',
  },
  {
    id: 3,
    iconImg: undefined,
    icon: '🏘️',
    tag: 'Pilar 03',
    title: 'Saúde em Povos Originários e Comunidades Vulneráveis',
    summary:
      'Territórios indígenas, quilombolas e populações em situação de risco: medicina veterinária como ferramenta de equidade social.',
    body: `A medicina veterinária coletiva tem papel estratégico na redução de desigualdades em saúde. Este pilar
capacita o aluno para o trabalho em contextos socialmente vulneráveis, incluindo aldeias indígenas do Sul e
Centro-Oeste do Brasil, comunidades quilombolas e periferias urbanas. Estuda-se o papel do médico-veterinário
nas equipes multiprofissionais de atenção básica, a interface com a saúde indígena (SESAI) e os desafios
éticos de uma prática contextualizada.`,
    color: 'orange',
  },
  {
    id: 4,
    iconImg: undefined,
    icon: '🐾',
    tag: 'Pilar 04',
    title: 'Controle Populacional e Bem-Estar Animal Urbano',
    summary:
      'Gestão ética e eficaz de populações de cães e gatos: esterilização, abrigos, políticas públicas.',
    body: `Com mais de 40 milhões de animais em situação de rua no Brasil, o controle populacional humanitário é
uma urgência de saúde pública. Este pilar forma especialistas para planejar e executar programas municipais
de castração, desenvolver protocolos para abrigos (OAK, protocolo de grupo, etc.), elaborar políticas de
posse responsável e mensurar indicadores epidemiológicos de populações animais. Inclui módulo de legislação
(Lei Federal 14.064/2020) e advocacy institucional.`,
    color: 'green',
  },
  {
    id: 5,
    iconImg: undefined,
    icon: '🔬',
    tag: 'Pilar 05',
    title: 'Pesquisa, Epidemiologia e Políticas Públicas',
    summary:
      'Metodologia científica aplicada, bioestatística e formulação de políticas veterinárias baseadas em evidências.',
    body: `O médico-veterinário do coletivo precisa ser capaz de produzir e interpretar evidências científicas para
embasar decisões de saúde pública. Este pilar cobre delineamento de estudos observacionais e experimentais,
análise geoespacial de dados sanitários, uso do R e QGIS, redação de artigos científicos e relatórios
técnicos para órgãos governamentais. O Trabalho de Conclusão de Curso (TCC) é desenvolvido neste módulo
com orientação individual por docentes pesquisadores da UFPR.`,
    color: 'blue',
  },
]

/* ─────────────────────────────────────────────────────────────────────
   Color maps
───────────────────────────────────────────────────────────────────── */
const colorMap: Record<string, { badge: string; line: string; iconBg: string; expandBtn: string }> = {
  green: {
    badge:     'bg-cesmvc-green/10 text-cesmvc-green',
    line:      'bg-cesmvc-green',
    iconBg:    'bg-cesmvc-green/10',
    expandBtn: 'text-cesmvc-green',
  },
  blue: {
    badge:     'bg-cesmvc-blue/10 text-cesmvc-blue',
    line:      'bg-cesmvc-blue',
    iconBg:    'bg-cesmvc-blue/10',
    expandBtn: 'text-cesmvc-blue',
  },
  orange: {
    badge:     'bg-cesmvc-orange/10 text-cesmvc-orange',
    line:      'bg-cesmvc-orange',
    iconBg:    'bg-cesmvc-orange/10',
    expandBtn: 'text-cesmvc-orange',
  },
}

/* ─────────────────────────────────────────────────────────────────────
   Expandable Card
───────────────────────────────────────────────────────────────────── */
function PillarCard({ pillar, isOpen, onToggle }: {
  pillar: Pillar
  isOpen: boolean
  onToggle: () => void
}) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  const colors = colorMap[pillar.color]

  useEffect(() => {
    if (bodyRef.current) {
      setHeight(isOpen ? bodyRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  return (
    <article
      className={`
        group relative rounded-3xl border
        transition-all duration-500 ease-in-out cursor-pointer
        ${isOpen
          ? 'bg-white border-transparent shadow-2xl shadow-black/10'
          : 'bg-white/60 border-white/80 hover:bg-white hover:shadow-xl hover:shadow-black/8'}
      `}
      onClick={onToggle}
    >
      {/* ── Accent left border line ── */}
      <div
        className={`
          absolute top-0 left-0 w-1 rounded-l-3xl
          transition-all duration-500
          ${colors.line}
          ${isOpen ? 'h-full opacity-100' : 'h-0 group-hover:h-full opacity-0 group-hover:opacity-100'}
        `}
      />

      <div className="p-6 sm:p-8">
        {/* ── Card Header ── */}
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={`flex-shrink-0 w-14 h-14 rounded-2xl ${colors.iconBg} flex items-center justify-center`}>
            {pillar.iconImg ? (
              <img
                src={pillar.iconImg}
                alt={pillar.title}
                className="w-8 h-8 object-contain"
              />
            ) : (
              <span className="text-2xl" role="img" aria-label={pillar.title}>
                {pillar.icon}
              </span>
            )}
          </div>

          {/* Title block */}
          <div className="flex-1 min-w-0">
            <span className={`inline-block text-xs font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full ${colors.badge} mb-2`}>
              {pillar.tag}
            </span>
            <h3 className="font-grift text-gray-900 text-lg sm:text-xl font-semibold leading-snug">
              {pillar.title}
            </h3>
          </div>

          {/* Toggle chevron */}
          <button
            type="button"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Fechar' : 'Expandir'}
            className={`
              flex-shrink-0 mt-1 w-8 h-8 rounded-full
              flex items-center justify-center
              transition-all duration-300
              ${colors.expandBtn}
              ${isOpen ? 'bg-current/10 rotate-180' : 'hover:bg-current/8'}
            `}
            onClick={(e) => { e.stopPropagation(); onToggle() }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* ── Summary (always visible) ── */}
        <p className="mt-4 ml-[calc(3.5rem+1rem)] text-gray-600 text-sm sm:text-base leading-relaxed">
          {pillar.summary}
        </p>

        {/* ── Expandable Body ── */}
        <div
          style={{ height: `${height}px` }}
          className="overflow-hidden transition-[height] duration-500 ease-in-out"
          aria-hidden={!isOpen}
        >
          <div ref={bodyRef}>
            <div className="mt-5 ml-[calc(3.5rem+1rem)] pt-5 border-t border-gray-100">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {pillar.body}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   Main Section
───────────────────────────────────────────────────────────────────── */
export default function CoursePillars() {
  const [openId, setOpenId] = useState<number | null>(1)

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section
      id="pilares"
      className="relative py-24 sm:py-32 bg-cesmvc-sand overflow-hidden"
    >
      {/* ── Decorative blobs ── */}
      <div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: '#2E6F57' }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: '#2B4C7E' }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <div className="max-w-3xl mb-16">
          <span className="inline-flex items-center gap-2 text-cesmvc-green text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-8 h-px bg-cesmvc-green inline-block" />
            Estrutura Curricular
          </span>
          <h2 className="font-grift text-gray-900 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
            Os 5 Pilares que formam
            <span className="text-cesmvc-green block">
              o especialista do futuro
            </span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Nossa grade curricular é estruturada em cinco eixos temáticos interdependentes,
            desenhados para formar um profissional completo, ético e com visão sistêmica
            da medicina veterinária coletiva.
          </p>
        </div>

        {/* ── Pillar Cards Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-5">
          {/* Left column: cards 1, 2, 3 */}
          <div className="flex flex-col gap-5">
            {PILLARS.slice(0, 3).map((p) => (
              <PillarCard
                key={p.id}
                pillar={p}
                isOpen={openId === p.id}
                onToggle={() => toggle(p.id)}
              />
            ))}
          </div>

          {/* Right column: cards 4, 5 + decorative stat box */}
          <div className="flex flex-col gap-5">
            {PILLARS.slice(3).map((p) => (
              <PillarCard
                key={p.id}
                pillar={p}
                isOpen={openId === p.id}
                onToggle={() => toggle(p.id)}
              />
            ))}

            {/* ── Decorative info box ── */}
            <div className="rounded-3xl bg-cesmvc-green p-8 text-white flex flex-col justify-between min-h-[180px]">
              <div>
                <p className="text-white/60 text-xs font-semibold tracking-widest uppercase mb-3">
                  Metodologia do Curso
                </p>
                <p className="font-grift text-2xl sm:text-3xl font-bold leading-snug">
                  Aprendizagem baseada em problemas reais
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Aulas Online', 'Módulos Presenciais', 'Saídas de Campo', 'TCC Orientado'].map((tag) => (
                  <span
                    key={tag}
                    className="text-white/90 text-xs font-medium px-3 py-1.5 rounded-full bg-white/15 border border-white/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-16 text-center">
          <a
            href="#docentes"
            className="
              inline-flex items-center gap-2
              text-cesmvc-green hover:text-cesmvc-green-dark
              font-semibold text-sm sm:text-base
              group transition-colors duration-200
            "
          >
            Conheça os docentes do programa
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
