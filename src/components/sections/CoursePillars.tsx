import { CourseCard } from '@/components/ui/cards/CourseCard'
import { courseCards } from '@/data/courseData'

/* ─────────────────────────────────────────────────────────────────────
   Main Section
───────────────────────────────────────────────────────────────────── */
export default function CoursePillars() {
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
            Os 8 Pilares da Especialização
            <span className="text-cesmvc-green block">
              que formam o especialista do futuro
            </span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Nossa grade curricular é estruturada em oito eixos temáticos interdependentes,
            desenhados para formar um profissional completo, ético e com visão sistêmica
            da medicina veterinária coletiva.
          </p>
        </div>

        {/* ── Pillar Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center items-stretch">
          {courseCards.map((card) => (
            <CourseCard key={card.id} card={card} />
          ))}
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
