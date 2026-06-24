import React, { useState } from 'react';
import type { CardComponentData } from '@/types';
import { CourseModal } from '@/components/ui/CourseModal';

interface CourseCardProps {
    card: CardComponentData;
}

export const CourseCard: React.FC<CourseCardProps> = ({ card }) => {
    const [hovered, setHovered] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [cursorVisible, setCursorVisible] = useState(false);

    // Resolve o caminho da imagem de forma compatível com o build do Vite
    const resolveAssetUrl = (relativePath: string) => {
        const filename = relativePath.substring(relativePath.lastIndexOf('/') + 1);
        return new URL(`../../../assets/images/${filename}`, import.meta.url).href;
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setCursorPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleMouseEnter = () => {
        setHovered(true);
        setCursorVisible(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
        setCursorVisible(false);
    };

    return (
        <>
            {/* Custom cursor pill */}
            {cursorVisible && (
                <div
                    className="course-card-cursor"
                    style={{
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        transform: `translate(${cursorPos.x}px, ${cursorPos.y}px) translate(-50%, -50%)`,
                        pointerEvents: 'none',
                        zIndex: 9000,
                    }}
                />
            )}

            <div
                className="flex flex-col select-none h-full relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                onTouchStart={() => { setHovered(true); }}
                onTouchEnd={() => { setHovered(false); }}
                onClick={() => setModalOpen(true)}
                style={{ cursor: 'none' }}
            >
                {/* Custom cursor pill — follows mouse inside the card */}
                <div
                    className="card-cursor-pill"
                    style={{
                        position: 'absolute',
                        left: cursorPos.x,
                        top: cursorPos.y,
                        transform: 'translate(-50%, -50%)',
                        pointerEvents: 'none',
                        zIndex: 50,
                        opacity: cursorVisible ? 1 : 0,
                        transition: 'opacity 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: '#D96C2B',
                        borderRadius: '999px',
                        padding: '7px 14px 7px 11px',
                        boxShadow: '0 4px 16px rgba(217,108,43,0.45)',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {/* Seta diagonal ↖ à esquerda */}
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        style={{ flexShrink: 0 }}
                    >
                        <path
                            d="M9.5 9.5L2.5 2.5M2.5 2.5H7.5M2.5 2.5V7.5"
                            stroke="#F9E8C7"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span
                        style={{
                            fontFamily: 'var(--font-sans, Inter, sans-serif)',
                            fontSize: '10px',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: '#F9E8C7',
                            lineHeight: 1,
                        }}
                    >
                        Saiba Mais
                    </span>
                </div>

                {/* Interactive dynamic card */}
                <div className={`relative w-full aspect-[4/5] p-8 md:p-9 rounded-[28px] overflow-hidden flex flex-col justify-between transition-all duration-500 ease-out border ${hovered
                        ? 'bg-white text-[#0B281E] border-[#0B281E]/20 shadow-lg translate-y-[-6px]'
                        : 'bg-[#F9E8C7] text-[#0B281E] border-[#0B281E]/10 shadow-sm'
                    }`}>

                    {/* Inner double framing */}
                    <div className={`absolute inset-2 rounded-[22px] border transition-colors duration-500 pointer-events-none ${hovered ? 'border-[#0B281E]/10' : 'border-[#0B281E]/5'
                        }`} />

                    {/* Left contents */}
                    <div className="flex flex-col justify-between h-full z-10 max-w-[62%] relative">
                        <span className={`font-mono text-[9px] uppercase tracking-widest transition-colors duration-500 ${hovered ? 'text-[#0B281E]/75' : 'text-[#0B281E]/70'
                            }`}>PÓS-GRADUAÇÃO</span>

                        <div>
                            <h4 className="font-grift-bold text-xl lg:text-[25px] leading-[1.12] tracking-tight">
                                {card.title}
                            </h4>
                            <p className={`font-sans text-[10.5px] lg:text-[11.5px] mt-3 leading-relaxed font-normal transition-opacity duration-500 ${hovered ? 'opacity-95' : 'opacity-80'
                                }`}>
                                {card.description}
                            </p>
                        </div>

                        <div className="flex items-center space-x-2">
                            <div className={`w-5 h-[1px] transition-colors duration-500 ${hovered ? 'bg-[#0B281E]/40' : 'bg-[#0B281E]/20'}`}></div>
                            <span className={`font-mono text-[8px] tracking-widest uppercase transition-colors duration-500 ${hovered ? 'text-[#0B281E]/90' : 'text-[#0B281E]/80'
                                }`}>CESMVC / UFPR</span>
                        </div>
                    </div>

                    {/* Right decoupled graphics */}
                    <div className="absolute right-[-12px] sm:right-[-16px] md:right-[-20px] bottom-[10px] md:bottom-[15px] w-[38%] sm:w-[42%] md:w-[48%] lg:w-[44%] flex flex-col items-center pointer-events-none transition-all duration-500 z-0">
                        {/* Ícone (Muda no hover) — wrapper com overflow-hidden para crop de ícones pequenos */}
                        <div
                            className="w-[65%] aspect-square rounded-full overflow-hidden flex items-center justify-center"
                        >
                            <img
                                src={resolveAssetUrl(hovered ? card.iconGreen : card.iconOrange)}
                                alt=""
                                className="w-full h-full object-contain"
                                style={(() => {
                                    const transform = hovered
                                        ? card.iconTransformGreen || card.iconTransform
                                        : card.iconTransformOrange || card.iconTransform;
                                    return transform ? {
                                        transform: `translate(${transform.x}, ${transform.y}) scale(${transform.scale})`,
                                    } : undefined;
                                })()}
                            />
                        </div>
                        {/* Pilar (Estático) — alargado para combinar com a base do ícone */}
                        <img
                            src={resolveAssetUrl(card.pilarImg)}
                            alt=""
                            className="object-contain"
                            style={{
                                width: '115%',
                                marginTop: '-14%',
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Dynamic Modal */}
            {modalOpen && (
                <CourseModal
                    card={card}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </>
    );
};
