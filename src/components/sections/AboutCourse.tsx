import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import imgIntroMVC from '../../assets/images/sobreocursoimgnova_1.png'; // Foto do homem com cachorros de rua / manejo coletivo
import imgInstituto from '../../assets/images/sobreocursoimgnova_2.png'; // Foto do cachorro sendo examinado / saúde única
import imgEnsino from '../../assets/images/sobreocursoimg1.png'; // Foto de profissionais veterinários com pequenos animais em ambiente acadêmico/clínico

// Suporte mínimo a <i>...</i> em textos estáticos (não renderiza HTML arbitrário)
function renderWithItalics(text: string) {
  return text.split(/(<i>.*?<\/i>)/g).map((part, i) => {
    const match = part.match(/^<i>(.*?)<\/i>$/);
    return match ? <em key={i}>{match[1]}</em> : part;
  });
}

function ExpandableCard({
  eyebrow,
  title,
  paragraphs,
  accent,
  readMoreText,
  readLessText,
}: {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  accent: string;
  readMoreText: string;
  readLessText: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="rounded-2xl pt-7 sm:pt-9 pb-7 sm:pb-9 relative overflow-hidden flex flex-col h-full"
      style={{
        background: 'rgba(255,255,255,0.60)',
        border: '1px solid rgba(46,111,87,0.15)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 0.5rem 2rem rgba(46,111,87,0.08)',
      }}
    >
      {/* Accent line on top of card */}
      <div
        className="absolute top-0 left-8 right-8 h-[3px] rounded-full"
        style={{ backgroundColor: accent }}
      />

      <span className="font-mono text-xs uppercase tracking-widest font-bold mb-3 mt-1 px-7 sm:px-9" style={{ color: accent }}>
        {eyebrow}
      </span>

      <h3 className="font-grift-bold text-xl sm:text-2xl text-[#0B281E] leading-snug mb-4 px-7 sm:px-9">
        {title}
      </h3>

      {/* Relative text container with max-height transition and mask-image fade-out */}
      <div
        className={`relative overflow-hidden w-full transition-all duration-500 ease-in-out ${expanded ? 'max-h-[1000px]' : 'max-h-[11rem]'
          }`}
        style={!expanded ? {
          maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
        } : undefined}
      >
        <div className="space-y-4 px-7 sm:px-9">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="font-sans leading-relaxed text-[#0B281E]/75 text-sm sm:text-base"
            >
              {renderWithItalics(p)}
            </p>
          ))}
        </div>
      </div>

      <div className="px-7 sm:px-9">
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-6 font-sans font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 self-start transition-colors duration-200 z-10 cursor-pointer"
          style={{ color: accent }}
        >
          {expanded ? (
            <>
              {readLessText}
              <svg className="w-3.5 h-3.5 transform rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </>
          ) : (
            <>
              {readMoreText}
              <svg className="w-3.5 h-3.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function AboutCourse() {
  const { t } = useTranslation();

  const stats = [
    { value: '+40', label: t('about.stats.professors') },
    { value: '75%', label: t('about.stats.doctors') },
    { value: '100%', label: t('about.stats.classes') },
    { value: '100%', label: t('about.stats.recommendation') },
  ];

  return (
    <section
      id="sobre-o-curso"
      className="relative pt-24 pb-24 sm:pt-32 sm:pb-24 overflow-hidden bg-cesmvc-sand"
    >
      {/* ── Decorative blobs ── */}
      <div
        className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: '#2E6F57' }}
        aria-hidden="true"
      />
      {/* Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(46,111,87,0.07) 1px, transparent 0)',
          backgroundSize: '1.5rem 1.5rem',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section eyebrow ── */}
        <div className="mb-16">
          <span className="inline-flex items-center gap-2 text-[#2E6F57] text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-8 h-px" style={{ background: '#2E6F57' }} />
            {t('about.eyebrow')}
          </span>
          <h2
            className="font-grift-black tracking-tight text-[#0B281E] leading-[1.1] max-w-4xl"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' }}
          >
            {t('about.mainTitle')}<span className="text-[#2E6F57]">{t('about.mainTitleHighlight')}</span>
          </h2>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            BLOCO 1 — ENSINO (O CESMVC): Especialização UFPR que prepara para o coletivo
        ───────────────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row-reverse gap-8 lg:gap-12 items-start mb-20">
          <div className="w-full md:w-1/2 flex-shrink-0 aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-2xl shadow-sm">
            <img
              src={imgEnsino}
              alt={t('about.ensinoTitle')}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="w-full md:w-1/2">
            <ExpandableCard
              eyebrow={`— ${t('about.ensinoEyebrow')}`}
              title={t('about.ensinoTitle')}
              paragraphs={[
                t('about.ensinoP1'),
                t('about.ensinoP2'),
                t('about.ensinoP3'),
                t('about.ensinoP4'),
              ]}
              accent="#D96C2B"
              readMoreText={t('about.readMore')}
              readLessText={t('about.readLess')}
            />
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            BLOCO 2 — ESPECIALIDADE: O que é a Medicina Veterinária do Coletivo?
        ───────────────────────────────────────────────────────────── */}
        <div className="mb-20">
          {/* Eyebrow */}
          <div className="mb-3">
            <span className="font-mono text-xs uppercase tracking-widest font-bold" style={{ color: '#2E6F57' }}>
              — {t('about.specialtyEyebrow')}
            </span>
          </div>
          {/* Layout: título à esquerda + texto à direita */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-2">
              <h3
                className="font-grift-bold leading-snug tracking-tight text-[#0B281E]"
                style={{ fontSize: 'clamp(1.375rem, 2.5vw, 1.875rem)' }}
              >
                {t('about.specialtyTitle')}
              </h3>
              <img src={imgIntroMVC} alt={t('about.specialtyTitle')} className="mt-8 rounded-2xl w-full object-cover aspect-video shadow-sm" loading="lazy" />
            </div>
            <div className="lg:col-span-3 space-y-4" style={{ borderLeft: `2px solid rgba(46,111,87,0.20)`, paddingLeft: '1.5rem' }}>
              <p className="font-sans leading-relaxed text-[#0B281E]/80" style={{ fontSize: 'clamp(0.9375rem, 1.4vw, 1.0625rem)' }}>
                {t('about.specialtyP1')}
              </p>
              <p className="font-sans leading-relaxed text-[#0B281E]/80" style={{ fontSize: 'clamp(0.9375rem, 1.4vw, 1.0625rem)' }}>
                {t('about.specialtyP2')}
              </p>
              <p className="font-sans leading-relaxed text-[#0B281E]/80" style={{ fontSize: 'clamp(0.9375rem, 1.4vw, 1.0625rem)' }}>
                {t('about.specialtyP3')}
              </p>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            BLOCO 3 — INSTITUTO: O Instituto de Medicina Veterinária do Coletivo (IMVC)
        ───────────────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start mb-20">
          <div className="w-full md:w-1/2 flex-shrink-0 aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-2xl shadow-sm">
            <img
              src={imgInstituto}
              alt={t('about.institutoTitle')}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="w-full md:w-1/2">
            <ExpandableCard
              eyebrow={`— ${t('about.institutoEyebrow')}`}
              title={t('about.institutoTitle')}
              paragraphs={[
                t('about.institutoP1'),
                t('about.institutoP2'),
                t('about.institutoP3'),
              ]}
              accent="#2E6F57"
              readMoreText={t('about.readMore')}
              readLessText={t('about.readLess')}
            />
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 rounded-2xl"
          style={{
            background: '#2E6F57',
            boxShadow: '0 1rem 2rem rgba(46,111,87,0.25)',
          }}
        >
          {stats.map((s, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <span
                className="font-grift-black leading-none mb-2"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: '#F9E8C7' }}
              >
                {s.value}
              </span>
              <span
                className="font-sans font-medium text-center leading-snug"
                style={{ fontSize: '0.8125rem', color: 'rgba(249,232,199,0.85)', whiteSpace: 'pre-line' }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <a
            href="#pilares"
            className="inline-flex items-center gap-2 font-semibold transition-colors duration-200 group"
            style={{ color: '#2E6F57', fontSize: '0.9375rem' }}
          >
            {t('curriculum.title')}
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <span className="hidden sm:block text-[#0B281E]/20">·</span>
          <a
            href="#investimento"
            className="inline-flex items-center gap-2 font-bold text-white rounded-full transition-all duration-300 hover:-translate-y-0.5"
            style={{
              fontSize: '0.875rem',
              padding: '0.625rem 1.5rem',
              background: '#D96C2B',
              boxShadow: '0 0.25rem 1rem rgba(217,108,43,0.35)',
            }}
          >
            {t('nav.enroll')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
