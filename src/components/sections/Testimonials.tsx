import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  initials?: string;
  stars?: number;
}

function Stars({ count = 5 }: { count?: number }) {
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
  );
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <div
      className="
        group relative flex flex-col gap-5
        bg-white rounded-2xl p-7 sm:p-8
        border border-gray-100
        shadow-sm hover:shadow-xl
        transition-all duration-300 ease-out
        hover:-translate-y-1
        snap-start flex-shrink-0
        w-full md:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)]
      "
    >
      {/* Decorative large quote mark */}
      <span
        className="absolute top-6 right-8 font-grift-black leading-none select-none pointer-events-none"
        style={{ fontSize: '5rem', color: '#2E6F57', opacity: 0.07, lineHeight: 1 }}
        aria-hidden="true"
      >
        "
      </span>

      <Stars count={item.stars || 5} />

      <blockquote
        className="font-sans text-gray-700 leading-relaxed flex-1 relative z-10"
        style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1rem)' }}
      >
        "{item.quote}"
      </blockquote>

      {/* Author info */}
      <div className="pt-4 border-t border-gray-100 mt-auto relative z-10 text-left">
        <p className="font-sans font-bold text-gray-900 text-sm truncate">
          {item.name}
        </p>
        <p className="font-sans text-gray-500 text-xs truncate">
          {item.role}
        </p>
      </div>

    </div>
  );
}

export default function Testimonials() {
  const { t } = useTranslation();
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const testimonials = (t('testimonials.quotes', { returnObjects: true }) as TestimonialItem[]) || [];
  
  // Estados para desabilitar as setas de rolagem nos limites
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  // Estado para desabilitar o scroll-snap durante o arraste e a inércia
  const [isSliding, setIsSliding] = useState(false);

  // Referências para física de clique e arraste com inércia (momentum)
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftVal = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  // Função para monitorar a posição do scroll e habilitar/desabilitar os botões
  const updateScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 5);
      // Arredondamento para evitar problemas de precisão de subpixel no Chrome/Safari
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      window.removeEventListener('resize', updateScrollButtons);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  // Manipuladores de clique-e-arraste com física de momentum
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    isDown.current = true;
    setIsSliding(true); // Desabilita o snap-type
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftVal.current = carouselRef.current.scrollLeft;
    lastX.current = e.pageX;
    lastTime.current = Date.now();
    velocity.current = 0;

    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
  };

  const handleMouseLeave = () => {
    if (isDown.current) {
      isDown.current = false;
      startMomentum();
    }
  };

  const handleMouseUp = () => {
    if (isDown.current) {
      isDown.current = false;
      startMomentum();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;

    // Calcular velocidade para inércia
    const now = Date.now();
    const elapsed = now - lastTime.current;
    if (elapsed > 0) {
      const deltaX = e.pageX - lastX.current;
      velocity.current = -deltaX / elapsed; // pixels por milissegundo
    }
    lastX.current = e.pageX;
    lastTime.current = now;

    carouselRef.current.scrollLeft = scrollLeftVal.current - walk;
    updateScrollButtons();
  };

  // Executa o deslize suave de inércia após soltar o mouse
  const startMomentum = () => {
    if (!carouselRef.current) return;

    const step = () => {
      if (Math.abs(velocity.current) < 0.05 || isDown.current) {
        if (!isDown.current) {
          setIsSliding(false); // Reabilita o snap-type somente se não estiver com o clique pressionado
        }
        // Força o snap do CSS a agir quando a animação de inércia desacelera quase ao total
        if (carouselRef.current) {
          const current = carouselRef.current.scrollLeft;
          carouselRef.current.scrollLeft = current + 0.5;
          carouselRef.current.scrollLeft = current;
        }
        return;
      }

      if (carouselRef.current) {
        carouselRef.current.scrollLeft += velocity.current * 16;
        updateScrollButtons();
      }
      velocity.current *= 0.94; // Coeficiente de atrito (fricção)
      animationFrameId.current = requestAnimationFrame(step);
    };

    animationFrameId.current = requestAnimationFrame(step);
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -carouselRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: carouselRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="depoimentos"
      className="relative py-16 sm:py-24 bg-cesmvc-sand overflow-hidden"
    >
      {/* Decorative blobs */}
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

        {/* ── Selo 100% de Aprovação ── */}
        <div className="flex justify-center mb-10">
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #2E6F57 0%, #1e4f3d 100%)',
              boxShadow: '0 0.5rem 2rem rgba(46,111,87,0.30)',
            }}
          >
            <span className="text-xl" aria-hidden="true">🏆</span>
            <span className="font-grift-black text-white tracking-wide" style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.125rem)' }}>
              100% de aprovação
            </span>
            <span className="w-px h-4 bg-white/30" />
            <span className="font-sans text-white/80 text-sm">
              pesquisa com alunos egressos
            </span>
          </div>
        </div>

        {/* ── Section Header ── */}
        <div className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-2 text-cesmvc-green text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-8 h-px bg-cesmvc-green inline-block" />
            {t('testimonials.eyebrow')} — {t('testimonials.turmaTag')}
          </span>
          <h2
            className="font-grift-black text-gray-900 leading-tight mb-5"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            {t('testimonials.title')}
            <span className="text-cesmvc-green block">{t('testimonials.titleHighlight')}</span>
          </h2>
          <p className="font-sans text-gray-600 leading-relaxed" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)' }}>
            {t('testimonials.description')}
          </p>
        </div>

        {/* ── CARROSSEL HORIZONTAL DE DEPOIMENTOS (Setas + Drag/Swipe com Física) ── */}
        <div className="pb-8 relative px-10 sm:px-14 md:px-20 lg:px-24">
          {/* Setas de Rolagem */}
          <button
            type="button"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`absolute left-2 sm:left-4 md:left-6 top-[42%] -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white text-cesmvc-green shadow-lg border border-cesmvc-green/10 flex items-center justify-center transition-all duration-300 ${
              !canScrollLeft
                ? 'opacity-35 cursor-not-allowed pointer-events-none'
                : 'opacity-100 hover:scale-105 hover:bg-cesmvc-green/5 active:scale-95 cursor-pointer'
            }`}
            aria-label="Rolagem para esquerda"
          >
            <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`absolute right-2 sm:right-4 md:right-6 top-[42%] -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white text-cesmvc-green shadow-lg border border-cesmvc-green/10 flex items-center justify-center transition-all duration-300 ${
              !canScrollRight
                ? 'opacity-35 cursor-not-allowed pointer-events-none'
                : 'opacity-100 hover:scale-105 hover:bg-cesmvc-green/5 active:scale-95 cursor-pointer'
            }`}
            aria-label="Rolagem para direita"
          >
            <svg className="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Container do Carrossel */}
          <div
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onScroll={updateScrollButtons}
            className={`flex gap-5 overflow-x-auto scrollbar-hide pb-4 cursor-grab active:cursor-grabbing select-none transition-all duration-150 ${
              isSliding ? '' : 'snap-x snap-mandatory'
            }`}
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {testimonials.map((item, idx) => (
              <TestimonialCard key={idx} item={item} />
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <p className="text-center text-[#0B281E]/50 font-mono text-[10px] uppercase tracking-widest font-bold mt-4">
          ← arraste ou use as setas nas laterais para ver mais depoimentos →
        </p>

        {/* ── Card Verde de Destaque (Para onde o CESMVC leva você?) ── */}
        <div
          className="mt-10 p-8 sm:p-10 rounded-2xl text-white relative overflow-hidden max-w-xl mx-auto w-full"
          style={{
            background: 'linear-gradient(135deg, #2E6F57 0%, #1e4f3d 100%)',
            boxShadow: '0 1rem 2.5rem rgba(46,111,87,0.15)',
          }}
        >
          {/* Decorative element */}
          <div
            className="absolute -right-12 -bottom-12 w-44 h-44 rounded-full opacity-10 blur-2xl pointer-events-none"
            style={{ background: '#F9E8C7' }}
          />

          <h3 className="font-grift-bold text-lg sm:text-xl text-[#F9E8C7] mb-6 tracking-wide text-center">
            Para onde o CESMVC leva você?
          </h3>

          <ul className="space-y-4">
            {[
              'Vigilância em saúde e controle de zoonoses;',
              'Medicina de Abrigos e gestão no terceiro setor;',
              'Comunidades tradicionais e povos originários;',
              'Medicina veterinária legal e enfrentamento de maus-tratos;',
              'Preparação e respostas a desastres.',
            ].map((ponto, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-cesmvc-sand mt-2.5 shrink-0" />
                <span className="font-sans text-white/90 text-sm sm:text-base leading-relaxed">
                  {ponto}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Social proof bar ── */}
        <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 py-8 px-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/80">
          {[
            { value: '97%', label: 'de satisfação geral' },
            { value: '82%', label: 'Transformaram sua atuação no mercado' },
            { value: '100%', label: 'recomendariam o curso' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <span
                className="font-grift-black text-cesmvc-orange leading-none mb-1"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }}
              >
                {stat.value}
              </span>
              <span className="font-sans text-gray-500 text-sm">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-12 text-center">
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
  );
}
