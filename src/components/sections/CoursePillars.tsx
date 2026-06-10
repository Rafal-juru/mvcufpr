import { CourseCard } from '@/components/ui/cards/CourseCard';
import { courseCards } from '@/data/courseData';

export default function CoursePillars() {
  return (
    <section className="py-24 bg-[#F9E8C7] relative w-full overflow-hidden font-sans">

      {/* Decorative Top Accent Stripe */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0B281E] via-[#2E6F57] to-[#F9E8C7]" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">

        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-[1px] bg-[#2E6F57]"></div>
            <span className="text-[#2E6F57] font-mono text-xs font-bold uppercase tracking-widest">
              ESTRUTURA CURRICULAR
            </span>
          </div>
          <h2 className="font-serif-display text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-[#2E6F57] leading-[1.1] max-w-4xl">
            Os 8 Pilares da Especialização que formam o especialista do futuro
          </h2>
          <p className="text-base md:text-lg text-[#2E6F57]/90 font-light mt-6 max-w-3xl leading-relaxed">
            Nossa grade curricular é estruturada em oito eixos temáticos interdependentes, desenhados para formar um profissional completo, ético e com visão sistêmica da medicina veterinária coletiva.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 justify-center items-stretch">
          {courseCards.map((card) => (
            <CourseCard key={card.id} card={card} />
          ))}
        </div>

      </div>
    </section>
  );
}