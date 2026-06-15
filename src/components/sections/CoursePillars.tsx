import React from 'react';
import { CourseCard } from '@/components/ui/cards/CourseCard';
import { courseCards } from '@/data/courseData';

/**
 * CoursePillars — Os 5 Eixos de Aprendizado e Competências do CESMVC
 *
 * Grid: 3 cards na 1.ª linha + 2 centralizados na 2.ª linha
 * Bloco de Competências logo abaixo do grid.
 */

const COMPETENCIAS = [
  'Compreender o que é a Medicina Veterinária do Coletivo e a Medicina Veterinária Social;',
  'Compreender os principais problemas da Saúde global e como atuar sob a estratégia de saúde única localmente;',
  'Compreender o SUS e SUAS para atuar intersetorialmente e multidisciplinarmente;',
  'Propor estratégias para implantação de programas efetivos de manejo populacional de cães e gatos urbanos;',
  'Propor plano de trabalho para o enfrentamento da problemática das pessoas em situação de acumulação de animais;',
  'Compreender a atuação com povos originários e de comunidades tradicionais para a promoção da saúde;',
  'Identificar problemas de abrigos de cães e gatos e fazer proposituras para a melhoria dos níveis de bem-estar, saúde e adoção;',
  'Criar planos de contingência para prevenção e minimização de impactos de desastres;',
  'Capacitar os diversos atores sociais para o enfrentamento dos maus-tratos aos animais;',
  'Identificar situações de crimes contra animais e elaborar laudos e pareceres de perícia veterinária;',
  'Criar planos de ação estratégicos na área de medicina veterinária do coletivo.',
];

export default function CoursePillars() {
  // 5 cards: primeiros 3 → linha 1, últimos 2 → linha 2 centrada
  const row1 = courseCards.slice(0, 3);
  const row2 = courseCards.slice(3, 5);

  return (
    <section id="pilares" className="pt-16 pb-24 bg-cesmvc-sand relative w-full overflow-hidden font-sans">

      <div className="container mx-auto px-4 max-w-7xl relative z-10">

        {/* ── Section Header ── */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-[1px] bg-[#2E6F57]" />
            <span className="text-[#2E6F57] font-mono text-xs font-bold uppercase tracking-widest">
              Estrutura Curricular
            </span>
          </div>
          <h2 className="font-serif-display text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-[#2E6F57] leading-[1.1] max-w-4xl">
            Eixos de Aprendizado
            <span className="block text-[#0B281E]"> e Competências</span>
          </h2>
          <p className="text-base md:text-lg text-[#2E6F57]/90 font-light mt-6 max-w-3xl leading-relaxed">
            Nossa grade curricular é estruturada em cinco eixos temáticos interdependentes, desenhados para formar
            um profissional completo, ético e com visão sistêmica da medicina veterinária coletiva.
            Clique em qualquer eixo para conhecer mais.
          </p>
        </div>

        {/* ── Cards Row 1: 3 cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          {row1.map((card) => (
            <CourseCard key={card.id} card={card} />
          ))}
        </div>

        {/* ── Cards Row 2: 2 cards centralizados ── */}
        <div className="flex justify-center mb-16 md:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full lg:w-2/3">
            {row2.map((card) => (
              <CourseCard key={card.id} card={card} />
            ))}
          </div>
        </div>

        {/* ── Bloco de Competências ── */}
        <div
          className="rounded-2xl px-8 py-10 md:px-12 md:py-12 relative overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.60)',
            border: '1px solid rgba(46,111,87,0.15)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 0.5rem 2rem rgba(46,111,87,0.08)',
          }}
        >
          {/* Accent top bar */}
          <div
            className="absolute top-0 left-12 right-12 h-[2px] rounded-full"
            style={{ background: 'linear-gradient(to right, #2E6F57, #2B4C7E, transparent)' }}
            aria-hidden="true"
          />

          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-5 h-px bg-[#2E6F57]" />
            <span className="font-mono text-[0.65rem] uppercase tracking-widest text-[#2E6F57] font-bold">
              Perfil de Saída
            </span>
          </div>

          <h3
            className="font-serif-display font-medium tracking-tight text-[#0B281E] mb-8 leading-snug"
            style={{ fontSize: 'clamp(1.25rem, 2.2vw, 1.75rem)' }}
          >
            Ao final do curso, os alunos serão capazes de:
          </h3>

          {/* Competências em duas colunas no desktop */}
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            {COMPETENCIAS.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                {/* Check icon */}
                <span
                  className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(46,111,87,0.12)' }}
                  aria-hidden="true"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="#2E6F57"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <span
                  className="font-sans leading-snug text-[#0B281E]/80"
                  style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1rem)' }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}