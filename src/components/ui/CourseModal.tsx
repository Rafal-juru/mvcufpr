import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import type { CardComponentData } from '@/types';
import logoDescitivaBege from '@/assets/images/logoDescitivabBege.png';

interface CourseModalProps {
    card: CardComponentData;
    onClose: () => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({ card, onClose }) => {
    const { t } = useTranslation();
    const modalRef = useRef<HTMLDivElement>(null);

    const cardTitle = t(`curriculum.pillars.${card.id}.title`, { defaultValue: card.title });
    const cardSubtitle = t(`curriculum.pillars.${card.id}.subtitle`, { defaultValue: card.subtitle });
    const cardModalText = t(`curriculum.pillars.${card.id}.modalText`, { defaultValue: card.modalText });
    const cardTags = (t(`curriculum.pillars.${card.id}.tags`, { returnObjects: true }) as string[]) || card.tags || [];

    // Fechar com Escape + bloquear scroll do body
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    // Fechar ao clicar no backdrop
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
            style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }}
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            {/* ── Modal box ── */}
            <div
                ref={modalRef}
                className="relative w-full max-w-3xl flex flex-col"
                style={{
                    background: '#F9E8C7',
                    borderRadius: '1.5rem',
                    boxShadow: '0 2.5rem 5rem rgba(0,0,0,0.4)',
                    maxHeight: '85vh',
                    overflow: 'hidden',
                }}
            >
                {/* ── Marca d'água decorativa (paper grain + dots) ── */}
                <div
                    className="pointer-events-none absolute inset-0 rounded-[1.5rem]"
                    style={{
                        backgroundImage: 'radial-gradient(rgba(46,111,87,0.08) 1px, transparent 0)',
                        backgroundSize: '1.25rem 1.25rem',
                        zIndex: 0,
                        mixBlendMode: 'multiply',
                    }}
                    aria-hidden="true"
                />
                {/* Blob de cor como marca d'água */}
                <div
                    className="pointer-events-none absolute -bottom-16 -right-16 w-80 h-80 rounded-full opacity-10 blur-3xl"
                    style={{ background: '#2E6F57', zIndex: 0 }}
                    aria-hidden="true"
                />

                {/* ── Header fixo (logo + título + fechar) ── */}
                <div
                    className="relative z-10 flex-shrink-0 px-8 pt-8 pb-5"
                    style={{ borderBottom: '1px solid rgba(46,111,87,0.12)' }}
                >
                    {/* Logo CESMVC centralizada */}
                    <div className="flex justify-center mb-5">
                        <img
                            src={logoDescitivaBege}
                            alt="CESMVC UFPR"
                            className="h-10 w-auto object-contain"
                            style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(34%) saturate(613%) hue-rotate(107deg) brightness(86%) contrast(90%)' }}
                        />
                    </div>

                    {/* Eyebrow */}
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-6 h-px" style={{ background: '#D96C2B' }} />
                        <span className="font-mono text-[0.6rem] uppercase tracking-widest" style={{ color: '#D96C2B' }}>
                            {t('curriculum.modalEyebrow', { defaultValue: 'Pilar Curricular' })}
                        </span>
                    </div>

                    {/* Título */}
                    <h2
                        id="modal-title"
                        className="font-grift-bold leading-snug tracking-tight"
                        style={{ fontSize: 'clamp(1.375rem, 3vw, 2rem)', color: '#0B281E' }}
                    >
                        {cardTitle}
                    </h2>
                    {cardSubtitle && (
                        <p className="font-mono text-xs mt-1" style={{ color: '#2E6F57' }}>
                            {cardSubtitle}
                        </p>
                    )}

                    {/* Tags */}
                    {cardTags && cardTags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                            {cardTags.map((tag) => (
                                <span
                                    key={tag}
                                    className="font-mono text-[0.55rem] uppercase tracking-widest px-2.5 py-1 rounded-full"
                                    style={{
                                        backgroundColor: 'rgba(46,111,87,0.12)',
                                        border: '1px solid rgba(46,111,87,0.25)',
                                        color: '#2E6F57',
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Botão X */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 hover:scale-105 hover:bg-black/10 cursor-pointer"
                        style={{
                            border: '1px solid rgba(11,40,30,0.15)',
                            color: 'rgba(11,40,30,0.5)',
                        }}
                        aria-label="Fechar modal"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* ── Body com scroll ── */}
                <div className="relative z-10 flex-1 overflow-y-auto px-8 py-6"
                    style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(46,111,87,0.3) transparent' }}
                >
                    <div className="space-y-4 pb-24">
                        {cardModalText.trim().split('\n\n').map((paragraph, i) => (
                            <p
                                key={i}
                                className="font-sans leading-relaxed"
                                style={{ fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)', color: 'rgba(11,40,30,0.82)' }}
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>

                {/* ── CTA Fixo no rodapé (não rola com o texto) ── */}
                <div
                    className="relative z-10 flex-shrink-0 px-8 py-5 flex items-center justify-between gap-4"
                    style={{
                        borderTop: '1px solid rgba(46,111,87,0.12)',
                        background: '#F9E8C7',
                    }}
                >
                    <span className="font-mono text-[0.6rem] uppercase tracking-widest" style={{ color: 'rgba(11,40,30,0.35)' }}>
                        CESMVC / UFPR
                    </span>
                    <a
                        href="#investimento"
                        onClick={onClose}
                        className="inline-flex items-center gap-2 font-bold text-white rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
                        style={{
                            fontSize: '0.8125rem',
                            padding: '0.625rem 1.375rem',
                            background: '#D96C2B',
                            boxShadow: '0 0.25rem 1rem rgba(217,108,43,0.35)',
                            letterSpacing: '0.03em',
                        }}
                    >
                        {t('nav.enroll', { defaultValue: 'Inscreva-se' })}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
};
