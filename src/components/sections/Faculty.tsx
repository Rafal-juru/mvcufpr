/**
 * Faculty.tsx — Corpo Docente
 *
 * Estrutura:
 * 1. Cabeçalho descritivo da seção
 * 2. Card unificado da coordenadora com fotoRitaCachorro.png integrada
 * 3. Grid de Destaques/Estatísticas do Corpo Docente
 * 4. Esteira Infinita (Infinite Marquee) com brasões das universidades parceiras
 * 5. Card de autoridade (~80%) posicionado após a esteira
 * 6. Nota de rodapé (Bottom note)
 */

import { useTranslation, Trans } from 'react-i18next';
import fotoRitaCachorroSemFundo from '../../assets/images/fotoRitaCachorroSemFundo.png';

// Importações dos logos das universidades parceiras
import logoEnvA from '../../assets/images/CESMVC - banner com logotipo EnvA em WEBP.webp';
import logoIFSULDEMINAS from '../../assets/images/CESMVC - banner com logotipo IFSULDEMINAS em WEBP (1).webp';
import logoUF from '../../assets/images/CESMVC - banner com logotipo UF em WEBP.webp';
import logoUFAL from '../../assets/images/CESMVC - banner com logotipo UFAL em WEBP.webp';
import logoUFF from '../../assets/images/CESMVC - banner com logotipo UFF em WEBP 2.webp';
import logoUFMG from '../../assets/images/CESMVC - banner com logotipo UFMG em WEBP 2.webp';
import logoUFPR from '../../assets/images/CESMVC - banner com logotipo UFPR em WEBP.webp';
import logoUFRPE from '../../assets/images/CESMVC - banner com logotipo UFRPE em WEBP.webp';
import logoUFRR from '../../assets/images/CESMVC - banner com logotipo UFRR em WEBP.webp';

const PARTNERS = [
  { logo: logoEnvA, name: "EnvA (École Nationale Vétérinaire d'Alfort)" },
  { logo: logoIFSULDEMINAS, name: "IFSULDEMINAS" },
  { logo: logoUF, name: "University of Florida (UF)" },
  { logo: logoUFAL, name: "UFAL (Universidade Federal de Alagoas)" },
  { logo: logoUFF, name: "UFF (Universidade Federal Fluminense)" },
  { logo: logoUFMG, name: "UFMG (Universidade Federal de Minas Gerais)" },
  { logo: logoUFPR, name: "UFPR (Universidade Federal do Paraná)" },
  { logo: logoUFRPE, name: "UFRPE (Universidade Federal Rural de Pernambuco)" },
  { logo: logoUFRR, name: "UFRR (Universidade Federal de Roraima)" }
];

export default function Faculty() {
  const { t } = useTranslation();

  return (
    <section
      id="docentes"
      className="relative bg-white overflow-hidden"
    >
      {/* ── Section Header ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-px bg-[#2E6F57]" />
          <span className="text-[#2E6F57] font-mono text-xs font-bold uppercase tracking-widest">
            {t('faculty.eyebrow')}
          </span>
        </div>
        <h2
          className="font-grift-black text-[#0B281E] leading-[1.05] max-w-4xl"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' }}
        >
          {t('faculty.title')}<span className="text-[#2E6F57]">{t('faculty.titleHighlight')}</span>
        </h2>
        <p className="font-sans text-[#0B281E]/60 text-base md:text-lg mt-4 max-w-3xl leading-relaxed">
          {t('faculty.description')}
        </p>
      </div>

      {/* ── Hero da Coordenação Geral (Rita - Overlap Card Design) ── */}
      <div className="flex flex-col items-center justify-center relative w-full pt-12 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
          
          {/* A Imagem da Rita (Centralizada, Ampliada e com Máscara de Suavização no Topo e Base) */}
          <div 
            className="relative w-full max-w-md sm:max-w-lg md:max-w-3xl lg:max-w-[800px] overflow-hidden flex items-end justify-center z-0"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 75%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 75%, transparent 100%)'
            }}
          >
            {/* Foto da Rita Sem Fundo */}
            <img
              src={fotoRitaCachorroSemFundo}
              alt="Profa. Dra. Rita de Cassia Maria Garcia - Coordenadora do Curso de Especialização em Medicina Veterinária do Coletivo CESMVC UFPR"
              className="w-full h-auto object-contain drop-shadow-2xl"
            />
          </div>

          {/* O Card de Texto (Sobreposição / Overlap) */}
          <div className="relative z-10 -mt-12 md:-mt-20 w-full max-w-2xl bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100/80 text-center flex flex-col items-center">
            <span className="font-mono text-xs md:text-sm uppercase tracking-widest font-bold text-[#2E6F57] mb-3">
              {t('faculty.coordEyebrow')}
            </span>
            
            <h3 className="font-grift-black text-[#0B281E] text-2xl sm:text-3xl md:text-4xl leading-tight mb-4">
              {t('faculty.coordName')}
            </h3>
            
            <p className="font-sans leading-relaxed text-[#0B281E]/80 text-base sm:text-lg font-light max-w-2xl">
              {t('faculty.coordBio')}
            </p>
          </div>

        </div>
      </div>

      {/* ── Grid de Estatísticas e Destaques ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 75% Doutores */}
          <div className="bg-[#F9E8C7]/20 border border-[#2E6F57]/15 rounded-3xl p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#2E6F57]/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#2E6F57]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <span className="font-grift-black text-[#D96C2B] text-4xl block leading-none mb-3">
                {t('faculty.statPhdNumber')}
              </span>
              <p className="font-sans text-[#0B281E] text-base font-semibold leading-relaxed">
                {t('faculty.statPhdTitle')}
              </p>
            </div>
            <p className="font-sans text-[#0B281E]/60 text-xs mt-4">
              {t('faculty.statPhdDesc')}
            </p>
          </div>

          {/* Card 2: Sólida Experiência */}
          <div className="bg-[#F9E8C7]/20 border border-[#2E6F57]/15 rounded-3xl p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#2E6F57]/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#2E6F57]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-grift-bold text-[#2E6F57] text-2xl block leading-tight mb-3">
                {t('faculty.statExpTitle')}
              </span>
              <p className="font-sans text-[#0B281E] text-base font-semibold leading-relaxed">
                {t('faculty.statExpSubtitle')}
              </p>
            </div>
            <p className="font-sans text-[#0B281E]/60 text-xs mt-4">
              {t('faculty.statExpDesc')}
            </p>
          </div>

          {/* Card 3: Construção Histórica */}
          <div className="bg-[#2E6F57] text-[#F9E8C7] rounded-3xl p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300 md:col-span-1">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#F9E8C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded bg-[#D96C2B] text-white text-[9px] font-bold uppercase tracking-wider mb-3">
                {t('faculty.statHistBadge')}
              </span>
              <p className="font-sans text-[#F9E8C7] text-base font-semibold leading-relaxed">
                {t('faculty.statHistTitle')}
              </p>
            </div>
            <p className="text-white/60 text-xs mt-4">
              {t('faculty.statHistDesc')}
            </p>
          </div>
        </div>
      </div>

      {/* ── Seção de Parcerias / Esteira Infinita ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <p className="text-center text-[#0B281E]/50 font-mono text-[10px] uppercase tracking-widest font-bold mb-8">
          {t('faculty.partnersTitle')}
        </p>

        {/* Container da Marquee com máscara de fade nas bordas */}
        <div className="relative w-full overflow-hidden select-none marquee-container pt-16 pb-8">
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              display: flex;
              width: max-content;
              animation: marquee 30s linear infinite;
            }
            .animate-marquee:hover {
              animation-play-state: paused;
            }
            .marquee-container {
              mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
              -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
            }
          `}</style>

          <div className="animate-marquee gap-10 md:gap-14 items-center">
            {/* Primeira metade da lista */}
            {PARTNERS.map((partner, index) => (
              <div key={`logo-1-${index}`} className="relative group/logo flex-shrink-0 flex items-center justify-center h-48 w-80 sm:h-44 sm:w-72">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-full w-auto object-contain max-h-40 sm:max-h-36 opacity-85 hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                />
                {/* Legenda (Tooltip) */}
                <div className="absolute bottom-full mb-2 hidden group-hover/logo:block bg-[#0B281E] text-white text-[11px] font-sans px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap z-50 pointer-events-none border border-white/10">
                  {partner.name}
                </div>
              </div>
            ))}
            {/* Segunda metade da lista (duplicada para o loop contínuo) */}
            {PARTNERS.map((partner, index) => (
              <div key={`logo-2-${index}`} className="relative group/logo flex-shrink-0 flex items-center justify-center h-48 w-80 sm:h-44 sm:w-72">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-full w-auto object-contain max-h-40 sm:max-h-36 opacity-85 hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                />
                {/* Legenda (Tooltip) */}
                <div className="absolute bottom-full mb-2 hidden group-hover/logo:block bg-[#0B281E] text-white text-[11px] font-sans px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap z-50 pointer-events-none border border-white/10">
                  {partner.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CARD DE AUTORIDADE — Estatística 80% ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div
          className="w-full flex flex-col sm:flex-row items-center gap-6 sm:gap-10 p-7 sm:p-9 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, #2E6F57 0%, #1e4f3d 100%)',
            boxShadow: '0 1rem 2.5rem rgba(46,111,87,0.30)',
          }}
        >
          {/* Stat */}
          <div className="flex-shrink-0 text-center sm:text-left">
            <span
              className="font-grift-black text-[#F9E8C7] block leading-none"
              style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)' }}
            >
              {t('faculty.authorityStat')}
            </span>
          </div>
          {/* Divider */}
          <div className="w-px h-16 bg-white/20 hidden sm:block flex-shrink-0" />
          {/* Text */}
          <div>
            <p
              className="font-grift-bold text-white leading-snug mb-2"
              style={{ fontSize: 'clamp(1.125rem, 2vw, 1.5rem)' }}
            >
              {t('faculty.authorityTitle')}
            </p>
            <p className="font-sans text-white/65 text-sm leading-relaxed">
              {t('faculty.authorityDesc')}
            </p>
          </div>
          {/* Icon */}
          <div className="flex-shrink-0 hidden lg:flex items-center justify-center w-16 h-16 rounded-full bg-white/10">
            <svg className="w-8 h-8 text-[#F9E8C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Bottom note ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-12 text-center">
        <p className="text-[#0B281E]/60 text-sm">
          <Trans i18nKey="faculty.bottomNote">
            E mais <span className="text-[#2E6F57] font-semibold">9 professores especialistas</span> convidados de outras instituições federais e do mercado.
          </Trans>
        </p>
        <a
          href="#depoimentos"
          className="inline-flex items-center gap-2 mt-4 text-[#2E6F57] hover:text-[#1e4f3d] font-semibold text-sm group transition-colors duration-200 cursor-pointer"
        >
          {t('faculty.testimonialsCta')}
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
