import React, { useState } from 'react';
import type { CardComponentData } from '@/types';
import {
    LegalIllustration,
    IndigenistaIllustration,
    DesastresIllustration,
    SaudeUnicaIllustration,
    ManejoPopulacionalIllustration,
    BemEstarAnimalIllustration,
    PoliticasPublicasIllustration,
    GestaoAbrigosIllustration
} from '@/components/ui/HalftoneIllustrations';

interface CourseCardProps {
    card: CardComponentData;
}

export const CourseCard: React.FC<CourseCardProps> = ({ card }) => {
    const [hovered, setHovered] = useState(false);

    const renderIllustration = (type: string, isHovered: boolean, customClass: string = '') => {
        switch (type) {
            case 'legal':
                return <LegalIllustration isHovered={isHovered} className={customClass} />;
            case 'indigenista':
                return <IndigenistaIllustration isHovered={isHovered} className={customClass} />;
            case 'desastres':
                return <DesastresIllustration isHovered={isHovered} className={customClass} />;
            case 'saude-unica':
                return <SaudeUnicaIllustration isHovered={isHovered} className={customClass} />;
            case 'manejo-populacional':
                return <ManejoPopulacionalIllustration isHovered={isHovered} className={customClass} />;
            case 'bem-estar':
                return <BemEstarAnimalIllustration isHovered={isHovered} className={customClass} />;
            case 'politicas-publicas':
                return <PoliticasPublicasIllustration isHovered={isHovered} className={customClass} />;
            case 'gestao-abrigos':
                return <GestaoAbrigosIllustration isHovered={isHovered} className={customClass} />;
            default:
                return null;
        }
    };

    return (
        <div
            className="flex flex-col select-none h-full"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onTouchStart={() => setHovered(true)}
            onTouchEnd={() => setHovered(false)}
        >
            {/* Interactive dynamic card */}
            <div className={`relative w-full aspect-[4/5] p-8 md:p-9 rounded-[28px] overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-500 ease-out border ${hovered
                    ? 'bg-[#2E6F57] text-[#F9E8C7] border-[#2E6F57] shadow-xl translate-y-[-6px]'
                    : 'bg-[#F9E8C7] text-[#0B281E] border-[#0B281E]/10 shadow-sm'
                }`}>

                {/* Inner double framing */}
                <div className={`absolute inset-2 rounded-[22px] border transition-colors duration-500 pointer-events-none ${hovered ? 'border-[#F9E8C7]/10' : 'border-[#0B281E]/5'
                    }`} />

                {/* Left contents */}
                <div className="flex flex-col justify-between h-full z-10 max-w-[62%] relative">
                    <span className={`font-mono text-[9px] uppercase tracking-widest transition-colors duration-500 ${hovered ? 'text-[#F9E8C7]/75' : 'text-[#0B281E]/70'
                        }`}>PÓS-GRADUAÇÃO</span>

                    <div>
                        <h4 className="font-serif-display text-xl lg:text-[25px] leading-[1.12] font-semibold tracking-tight">
                            {card.title}
                        </h4>
                        <p className={`font-sans text-[10.5px] lg:text-[11.5px] mt-3 leading-relaxed font-normal transition-opacity duration-500 ${hovered ? 'opacity-90' : 'opacity-80'
                            }`}>
                            {card.description}
                        </p>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div className={`w-5 h-[1px] transition-colors duration-500 ${hovered ? 'bg-[#F9E8C7]/40' : 'bg-[#0B281E]/20'}`}></div>
                        <span className={`font-mono text-[8px] tracking-widest uppercase transition-colors duration-500 ${hovered ? 'text-[#F9E8C7]/90' : 'text-[#0B281E]/80'
                            }`}>CESMVC / UFPR</span>
                    </div>
                </div>

                {/* Right graphics - reacts in real-time to state */}
                {renderIllustration(
                    card.illustrationType,
                    hovered,
                    "absolute right-[-45px] bottom-[5px] w-[58%] h-[98%] pointer-events-none transition-all duration-500 opacity-95"
                )}
            </div>
        </div>
    );
};
