import React, { useEffect, useRef } from 'react';
import type { CardComponentData } from '@/types';

interface CourseModalProps {
    card: CardComponentData;
    onClose: () => void;
}

const PLACEHOLDER_CONTENT = `Esta especialização aprofunda os fundamentos teóricos e as práticas contemporâneas desta disciplina, capacitando o profissional a atuar em cenários complexos com visão sistêmica, ética e técnica.

Ao longo dos módulos, o aluno desenvolverá competências para diagnosticar, planejar e executar intervenções baseadas em evidências, sempre alinhadas às diretrizes nacionais e internacionais da área.

O conteúdo programático integra estudos de caso reais, discussões interdisciplinares com docentes especialistas da UFPR e CESMVC, e atividades práticas orientadas para o mercado de trabalho.

Ao final deste eixo, espera-se que o egresso seja capaz de produzir laudos técnicos, conduzir pesquisas aplicadas e liderar equipes multiprofissionais com segurança e autonomia.`;

export const CourseModal: React.FC<CourseModalProps> = ({ card, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Close on Escape key
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKey);
        // Lock body scroll
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    // Close on backdrop click
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
            style={{ backgroundColor: 'rgba(11, 40, 30, 0.82)', backdropFilter: 'blur(8px)' }}
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div
                ref={modalRef}
                className="relative w-full max-w-2xl animate-modal-in"
                style={{
                    background: 'linear-gradient(145deg, #0f1f18 0%, #0a1a13 100%)',
                    border: '1px solid rgba(46,111,87,0.25)',
                    borderRadius: '24px',
                    boxShadow: '0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(46,111,87,0.12)',
                }}
            >
                {/* Inner border frame */}
                <div
                    className="absolute inset-[1px] rounded-[23px] pointer-events-none"
                    style={{ border: '1px solid rgba(255,255,255,0.04)' }}
                />

                {/* Header */}
                <div className="flex items-start justify-between p-7 pb-5" style={{ borderBottom: '1px solid rgba(46,111,87,0.15)' }}>
                    <div className="flex-1 pr-6">
                        {/* Badge */}
                        <div className="flex items-center space-x-2 mb-3">
                            <div className="w-5 h-[1px]" style={{ backgroundColor: '#D96C2B' }} />
                            <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: '#D96C2B' }}>
                                Pilar Curricular
                            </span>
                        </div>
                        {/* Title */}
                        <h2
                            id="modal-title"
                            className="font-serif-display text-2xl md:text-3xl font-medium leading-snug tracking-tight"
                            style={{ color: '#F9E8C7' }}
                        >
                            {card.title}
                        </h2>
                        {card.subtitle && (
                            <p className="font-mono text-xs mt-1" style={{ color: '#2E6F57' }}>
                                {card.subtitle}
                            </p>
                        )}
                    </div>

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 hover:scale-105"
                        style={{
                            backgroundColor: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            color: 'rgba(249,232,199,0.6)',
                        }}
                        aria-label="Fechar modal"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="p-7 pt-5">
                    {/* Tags */}
                    {card.tags && card.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-5">
                            {card.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full"
                                    style={{
                                        backgroundColor: 'rgba(46,111,87,0.15)',
                                        border: '1px solid rgba(46,111,87,0.3)',
                                        color: '#4a9a7a',
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Placeholder content */}
                    <div className="space-y-4">
                        {PLACEHOLDER_CONTENT.trim().split('\n\n').map((paragraph, i) => (
                            <p
                                key={i}
                                className="font-sans text-sm leading-relaxed"
                                style={{ color: 'rgba(249,232,199,0.65)' }}
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    {/* Footer CTA */}
                    <div
                        className="flex items-center justify-between mt-8 pt-5"
                        style={{ borderTop: '1px solid rgba(46,111,87,0.15)' }}
                    >
                        <span className="font-mono text-[8px] uppercase tracking-widest" style={{ color: 'rgba(249,232,199,0.3)' }}>
                            CESMVC / UFPR — Conteúdo Provisório
                        </span>
                        <button
                            onClick={onClose}
                            className="flex items-center space-x-2 font-mono text-[10px] uppercase tracking-widest px-4 py-2 rounded-full transition-all duration-200 hover:opacity-80"
                            style={{
                                backgroundColor: 'rgba(217,108,43,0.15)',
                                border: '1px solid rgba(217,108,43,0.4)',
                                color: '#D96C2B',
                            }}
                        >
                            <span>Fechar</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
