import React from 'react';

// Common halftone dot pattern component to be reused
export const HalftonePatterns = () => (
    <defs>
        {/* Fine screen halftone gradient pattern (dense) */}
        <pattern id="halftone-dense" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <circle cx="2" cy="2" r="1.2" fill="currentColor" opacity="0.3" />
            <circle cx="8" cy="8" r="2.2" fill="currentColor" opacity="0.45" />
            <circle cx="14" cy="14" r="1.5" fill="currentColor" opacity="0.35" />
            <circle cx="4" cy="12" r="2.8" fill="currentColor" opacity="0.55" />
            <circle cx="12" cy="4" r="1.8" fill="currentColor" opacity="0.4" />
        </pattern>

        {/* Medium stipple/dither pattern for shading */}
        <pattern id="halftone-medium" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
            <circle cx="3" cy="3" r="1" fill="currentColor" opacity="0.15" />
            <circle cx="10" cy="5" r="1.8" fill="currentColor" opacity="0.3" />
            <circle cx="18" cy="12" r="2.5" fill="currentColor" opacity="0.4" />
            <circle cx="6" cy="16" r="2" fill="currentColor" opacity="0.25" />
            <circle cx="14" cy="20" r="3.2" fill="currentColor" opacity="0.5" />
            <circle cx="22" cy="4" r="1.5" fill="currentColor" opacity="0.2" />
        </pattern>

        {/* Organic / Dithered Noise Filter */}
        <filter id="dither-grain" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" result="noise" />
            <feColorMatrix type="matrix" values="
        1 0 0 0 0
        0 1 0 0 0
        0 0 1 0 0
        0 0 0 0.55 0" result="coloredNoise" />
            <feComposite operator="in" in2="SourceGraphic" result="grainySource" />
            <feBlend mode="multiply" in="SourceGraphic" in2="grainySource" />
        </filter>

        {/* Edge soft-feathering gradient mask to make illustration "bleed/dissolve" */}
        <linearGradient id="fade-right-to-left" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0.95" />
            <stop offset="45%" stopColor="white" stopOpacity="0.85" />
            <stop offset="80%" stopColor="white" stopOpacity="0.3" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        <mask id="bleed-mask">
            <rect x="0" y="0" width="400" height="400" fill="url(#fade-right-to-left)" />
        </mask>
    </defs>
);

interface IllustrationProps {
    className?: string;
    isHovered?: boolean;
}

/**
 * 1. Medicina Veterinária Legal
 * A stylized balance scales (balança da justiça) next to a gavel (martelo), with a veterinary paw-cross emblem integrated.
 */
export const LegalIllustration: React.FC<IllustrationProps> = ({ className = '', isHovered = false }) => {
    return (
        <svg
            viewBox="0 0 350 400"
            className={`absolute right-[-40px] top-[10px] w-[55%] h-[95%] pointer-events-none overflow-visible select-none transition-transform duration-700 ease-out ${isHovered ? 'scale-105 translate-x-1 -translate-y-1' : 'scale-100'
                } ${className}`}
            style={{ filter: 'url(#dither-grain)' }}
        >
            <HalftonePatterns />

            {/* Decorative background stipple/halftone shapes */}
            <circle cx="180" cy="200" r="130" fill="url(#halftone-medium)" opacity="0.6" />
            <circle cx="120" cy="120" r="85" fill="url(#halftone-dense)" opacity="0.4" />

            {/* Decorative dotted orbit arcs */}
            <circle cx="180" cy="200" r="160" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 8" opacity="0.35" />
            <circle cx="180" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="1 5" opacity="0.2" />

            {/* Gavel / Martelo (Underneath the scale scales) */}
            <g transform="rotate(-25, 230, 260)" className="opacity-85 transition-colors duration-500">
                {/* Handle */}
                <rect x="60" y="275" width="220" height="12" rx="6" fill="currentColor" opacity="0.45" />
                <rect x="60" y="275" width="220" height="12" rx="6" fill="none" stroke="currentColor" strokeWidth="2" />
                <line x1="80" y1="275" x2="80" y2="287" stroke="currentColor" strokeWidth="2.5" />
                <line x1="100" y1="275" x2="100" y2="287" stroke="currentColor" strokeWidth="2.5" />
                <line x1="120" y1="275" x2="120" y2="287" stroke="currentColor" strokeWidth="2.5" />

                {/* Gavel Head */}
                <g transform="translate(230, 240)">
                    {/* Main barrel */}
                    <rect x="-25" y="10" width="50" height="65" rx="4" fill="currentColor" opacity="0.65" />
                    <rect x="-25" y="10" width="50" height="65" rx="4" fill="none" stroke="currentColor" strokeWidth="3" />

                    {/* Ridges */}
                    <line x1="-25" y1="25" x2="25" y2="25" stroke="currentColor" strokeWidth="2" />
                    <line x1="-25" y1="60" x2="25" y2="60" stroke="currentColor" strokeWidth="2" />

                    {/* Halftone shading for gavel barrel */}
                    <rect x="-22" y="27" width="44" height="31" fill="url(#halftone-dense)" opacity="0.7" />

                    {/* Brass Ring */}
                    <rect x="-28" y="38" width="56" height="8" rx="1" fill="currentColor" />

                    {/* Left and right bands */}
                    <rect x="-28" y="15" width="6" height="55" rx="2" fill="currentColor" />
                    <rect x="22" y="15" width="6" height="55" rx="2" fill="currentColor" />
                </g>

                {/* Gavel Sound block */}
                <ellipse cx="230" cy="335" rx="55" ry="16" fill="none" stroke="currentColor" strokeWidth="2" />
                <ellipse cx="230" cy="341" rx="55" ry="16" fill="currentColor" opacity="0.2" />
                <ellipse cx="230" cy="341" rx="55" ry="16" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M 175, 335 L 175, 341 A 55 16 0 0 0 285, 341 L 285, 335" fill="currentColor" opacity="0.3" />
            </g>

            {/* Balance Scales Assembly */}
            <g className="transition-colors duration-500">
                {/* Central Stand Base */}
                <path d="M 60,340 C 60,330 80,315 130,315 C 180,315 200,330 200,340 Z" fill="currentColor" opacity="0.4" />
                <path d="M 60,340 C 60,330 80,315 130,315 C 180,315 200,330 200,340 Z" fill="none" stroke="currentColor" strokeWidth="3" />

                {/* Multi-tiered pedestal and columns */}
                <rect x="110" y="302" width="40" height="13" fill="currentColor" />
                <rect x="110" y="302" width="40" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" />

                {/* Main Pillar */}
                <rect x="122" y="100" width="16" height="202" fill="none" stroke="currentColor" strokeWidth="3" />
                <rect x="124" y="103" width="12" height="196" fill="url(#halftone-dense)" opacity="0.6" />
                <line x1="130" y1="100" x2="130" y2="302" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Pillar Decorative Knobs */}
                <circle cx="130" cy="160" r="16" fill="none" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="130" cy="160" r="10" fill="currentColor" opacity="0.8" />
                <circle cx="130" cy="240" r="14" fill="none" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="130" cy="240" r="8" fill="currentColor" opacity="0.7" />

                {/* Veterinary Paw-Cross Emblem (Merged Symbol on the Main Column) */}
                <g transform="translate(130, 200) scale(0.85)">
                    {/* Medical Cross Background */}
                    <path d="M -15,-5 L -5,-5 L -5,-15 L 5,-15 L 5,-5 L 15,-5 L 15,5 L 5,5 L 5,15 L -5,15 L -5,5 L -15,5 Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
                    {/* Paw Print Cutout inside Cross */}
                    <g fill={isHovered ? '#2E6F57' : '#F9E8C7'} stroke="none" transform="scale(0.65) translate(-0.5, -1)">
                        {/* Paw Pads */}
                        <circle cx="-5" cy="-5" r="2.5" />
                        <circle cx="0" cy="-8" r="2.5" />
                        <circle cx="5" cy="-5" r="2.5" />
                        <circle cx="-7" cy="0" r="2" />
                        <circle cx="7" cy="0" r="2" />
                        <path d="M -6,4 C -6,1 -3,-2 0,-2 C 3,-2 6,1 6,4 C 6,7 4,9 0,9 C -4,9 -6,7 -6,4 Z" />
                    </g>
                </g>

                {/* Top Ornament */}
                <circle cx="130" cy="85" r="15" fill="none" stroke="currentColor" strokeWidth="3" />
                <circle cx="130" cy="85" r="9" fill="currentColor" />

                {/* Crossbeam (Alavanca) */}
                <path d="M 28,100 Q 130,70 232,100" fill="none" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" />
                <path d="M 28,100 Q 130,70 232,100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="1 3" />
                {/* Left Joint and Right Joint loops */}
                <circle cx="28" cy="100" r="6" fill="currentColor" />
                <circle cx="232" cy="100" r="6" fill="currentColor" />
                <circle cx="130" cy="85" r="4" fill="currentColor" />

                {/* Left Scales Assembly */}
                <g>
                    {/* Chain Lines (Stylized Dotted line strings) */}
                    <line x1="28" y1="100" x2="-2" y2="190" stroke="currentColor" strokeWidth="2" strokeDasharray="4 6" />
                    <line x1="28" y1="100" x2="58" y2="190" stroke="currentColor" strokeWidth="2" strokeDasharray="4 6" />
                    <line x1="28" y1="100" x2="28" y2="190" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 4" opacity="0.7" />

                    {/* Left Plate hook and plate */}
                    <path d="M -8,190 L 64,190" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    <path d="M -8,190 C -8,225 64,225 64,190 Z" fill="none" stroke="currentColor" strokeWidth="3" />
                    <path d="M -8,190 C -8,225 64,225 64,190 Z" fill="url(#halftone-dense)" opacity="0.5" />

                    {/* Scale Plate Weights/Dots */}
                    <circle cx="28" cy="202" r="3" fill="currentColor" />
                    <circle cx="12" cy="198" r="2" fill="currentColor" />
                    <circle cx="44" cy="198" r="2" fill="currentColor" />
                </g>

                {/* Right Scales Assembly */}
                <g>
                    {/* Chain Lines (Stylized Dotted line strings) */}
                    <line x1="232" y1="100" x2="202" y2="190" stroke="currentColor" strokeWidth="2" strokeDasharray="4 6" />
                    <line x1="232" y1="100" x2="262" y2="190" stroke="currentColor" strokeWidth="2" strokeDasharray="4 6" />
                    <line x1="232" y1="100" x2="232" y2="190" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 4" opacity="0.7" />

                    {/* Right Plate hook and plate */}
                    <path d="M 196,190 L 268,190" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 196,190 C 196,225 268,225 268,190 Z" fill="none" stroke="currentColor" strokeWidth="3" />
                    <path d="M 196,190 C 196,225 268,225 268,190 Z" fill="url(#halftone-dense)" opacity="0.5" />

                    {/* Scale Plate Weights/Dots */}
                    <circle cx="232" cy="202" r="3" fill="currentColor" />
                    <circle cx="216" cy="198" r="2" fill="currentColor" />
                    <circle cx="248" cy="198" r="2" fill="currentColor" />
                </g>
            </g>

            {/* Floating stippling dust around the illustration */}
            <g opacity="0.4" fill="currentColor">
                <circle cx="40" cy="50" r="1.5" />
                <circle cx="310" cy="120" r="2" />
                <circle cx="270" cy="50" r="1" />
                <circle cx="340" cy="220" r="2.5" />
                <circle cx="20" cy="270" r="1.5" />
                <circle cx="80" cy="25" r="1" />
                <circle cx="160" cy="45" r="2" />
            </g>
        </svg>
    );
};

/**
 * 2. Medicina Veterinária Indigenista
 * A stylized hand reaching up, decorated with geometric indigenous carvings, surrounded by leaves, animal trails, and forest motifs.
 */
export const IndigenistaIllustration: React.FC<IllustrationProps> = ({ className = '', isHovered = false }) => {
    return (
        <svg
            viewBox="0 0 350 400"
            className={`absolute right-[-35px] top-[10px] w-[55%] h-[95%] pointer-events-none overflow-visible select-none transition-transform duration-700 ease-out ${isHovered ? 'scale-105 translate-x-1 -translate-y-1' : 'scale-100'
                } ${className}`}
            style={{ filter: 'url(#dither-grain)' }}
        >
            <HalftonePatterns />

            {/* Background patterns */}
            <circle cx="180" cy="200" r="120" fill="url(#halftone-medium)" opacity="0.65" />

            {/* Sacred geometry circular ring */}
            <circle cx="180" cy="190" r="150" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="8 6" opacity="0.4" />
            <circle cx="180" cy="190" r="135" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.2" />

            {/* Indigenous Marajoara zig-zag patterns in the background */}
            <g stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3" className="transition-colors duration-500">
                <path d="M 50,110 L 70,90 L 90,110 L 110,90 L 130,110 L 150,90" />
                <path d="M 50,115 L 70,95 L 90,115 L 110,95 L 130,115 L 150,95" />

                <path d="M 210,290 L 230,270 L 250,290 L 270,270 L 290,290 L 310,270" />
                <path d="M 210,295 L 230,275 L 250,295 L 270,275 L 290,295 L 310,275" />
            </g>

            {/* Jungle leaves & fauna symbols winding in from the right & bottom */}
            <g className="transition-colors duration-500">
                {/* Large Monstera style leaf silhouette */}
                <path
                    d="M 210,60 C 270,60 320,110 320,170 C 320,200 300,240 280,250 C 265,220 250,200 230,195 C 245,170 250,140 230,115 C 210,135 195,140 185,130 C 195,110 190,90 175,75 C 185,70 195,65 210,60 Z"
                    fill="currentColor"
                    opacity="0.18"
                />
                <path
                    d="M 210,60 C 270,60 320,110 320,170 C 320,200 300,240 280,250 C 265,220 250,200 230,195 M 245,170 C 250,140 230,115 M 210,135 C 195,140 185,130 M 195,110 C 190,90 175,75"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.5"
                />

                {/* Tribal Sun / Flower core (behind the hand) */}
                <g transform="translate(140, 190) scale(1.1)">
                    <circle cx="0" cy="0" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" opacity="0.4" />
                    <path d="M -50,0 L -40,0 M 50,0 L 40,0 M 0,-50 L 0,-40 M 0,50 L 0,40 M -35,-35 L -28,-28 M 35,35 L 28,28 M -35,35 L -28,28 M 35,-35 L 28,-28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
                    {/* Halftone core */}
                    <circle cx="0" cy="0" r="30" fill="url(#halftone-dense)" opacity="0.65" />
                </g>
            </g>

            {/* Styled Hand rising from bottom-center/left with indigenous and health tattoos */}
            <g className="transition-colors duration-500">
                {/* Hand Shadow */}
                <path
                    d="M 85,380 C 85,360 85,290 85,290 L 65,190 C 65,175 75,160 85,160 C 92,160 96,168 98,175 L 110,225 L 110,120 C 110,105 120,95 130,95 C 140,95 150,105 150,120 L 150,210 L 155,105 C 155,90 165,80 175,80 C 185,80 195,90 195,105 L 195,210 L 200,120 C 200,108 210,98 220,98 C 230,98 238,108 238,120 L 238,245 C 238,245 255,225 265,225 C 275,225 282,235 280,248 C 270,310 230,380 170,380 Z"
                    fill="currentColor"
                    opacity="0.32"
                />

                {/* Outer Hand Line */}
                <path
                    d="M 85,380 C 85,360 85,290 85,290 L 65,190 C 65,175 75,160 85,160 C 92,160 96,168 98,175 L 110,225 L 110,120 C 110,105 120,95 130,95 C 140,95 150,105 150,120 L 150,210 M 150,210 L 155,105 C 155,90 165,80 175,80 C 185,80 195,90 195,105 L 195,210 M 195,210 L 200,120 C 200,108 210,98 220,98 C 230,98 238,108 238,120 L 238,245 C 238,245 255,225 265,225 C 275,225 282,235 280,248 C 270,310 230,380 170,380"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Halftone grain inside the hand */}
                <path
                    d="M 85,378 C 85,358 85,290 85,290 L 65,190 C 65,175 75,160 85,160 C 92,160 96,168 98,175 L 110,225 L 110,120 C 110,105 120,95 130,95 C 140,95 150,105 150,120 L 150,210 L 155,105 C 155,90 165,80 175,80 C 185,80 195,90 195,105 L 195,210 L 200,120 C 200,108 210,98 220,98 C 230,98 238,108 238,120 L 238,245 C 238,245 255,225 265,225 C 275,225 282,235 280,248 C 270,310 230,380 170,380 Z"
                    fill="url(#halftone-dense)"
                    opacity="0.45"
                />

                {/* Hand wrist boundary cross patterns */}
                <line x1="110" y1="310" x2="210" y2="310" stroke="currentColor" strokeWidth="3" />
                <line x1="100" y1="320" x2="210" y2="320" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="90" y1="330" x2="200" y2="330" stroke="currentColor" strokeWidth="3" />

                {/* Indigenous sacred spiral dynamic painted in center of hand (representing traditional medicine) */}
                <path
                    d="M 160,250 C 145,250 135,235 135,220 C 135,200 155,185 175,185 C 200,185 215,205 215,225 C 215,250 190,270 165,270 C 135,270 115,245 115,215"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                />

                {/* Small animal footstep tracks (Veterinary connection) painted on the palm */}
                <g stroke="none" fill="currentColor" transform="translate(160, 150) scale(0.9)">
                    <circle cx="0" cy="0" r="4.5" />
                    <circle cx="-6" cy="-8" r="2.5" />
                    <circle cx="0" cy="-11" r="2.5" />
                    <circle cx="6" cy="-8" r="2.5" />
                    <circle cx="-10" cy="-2" r="2" />
                    <circle cx="10" cy="-2" r="2" />
                </g>

                {/* Another tiny animal footprint near thumb */}
                <g stroke="none" fill="currentColor" transform="translate(100, 260) scale(0.6) rotate(-35)">
                    <circle cx="0" cy="0" r="4.5" />
                    <circle cx="-6" cy="-8" r="2.5" />
                    <circle cx="0" cy="-11" r="2.5" />
                    <circle cx="6" cy="-8" r="2.5" />
                    <circle cx="-10" cy="-2" r="2" />
                    <circle cx="10" cy="-2" r="2" />
                </g>
            </g>

            {/* Forest leaves around outer edges */}
            <g className="transition-colors duration-500" opacity="0.75">
                <path d="M 320,290 C 320,290 280,310 270,340 C 290,340 310,320 320,290 Z" fill="currentColor" opacity="0.5" />
                <path d="M 320,290 C 320,290 280,310 270,340 C 290,340 310,320 320,290 Z" fill="none" stroke="currentColor" strokeWidth="2" />

                <path d="M 40,150 C 40,150 10,170 0,200 C 20,200 40,180 40,150 Z" fill="currentColor" opacity="0.4" />
                <path d="M 40,150 C 40,150 10,170 0,200 C 20,200 40,180 40,150 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            </g>

            {/* Pointillist floating specks of dust / stars */}
            <g fill="currentColor" opacity="0.35">
                <circle cx="60" cy="40" r="1.5" />
                <circle cx="300" cy="110" r="2" />
                <circle cx="15" cy="120" r="1" />
                <circle cx="340" cy="210" r="2" />
                <circle cx="280" cy="360" r="1.5" />
                <circle cx="95" cy="20" r="1" />
                <circle cx="285" cy="25" r="2.5" />
            </g>
        </svg>
    );
};

/**
 * 3. Medicina de Desastres
 * Símbolos de ajuda humanitária sob nuvens de tempestade com um raio, com elementos de resgate de animais.
 */
export const DesastresIllustration: React.FC<IllustrationProps> = ({ className = '', isHovered = false }) => {
    return (
        <svg
            viewBox="0 0 350 400"
            className={`absolute right-[-35px] top-[10px] w-[55%] h-[95%] pointer-events-none overflow-visible select-none transition-transform duration-700 ease-out ${isHovered ? 'scale-105 translate-x-1 -translate-y-1' : 'scale-100'
                } ${className}`}
            style={{ filter: 'url(#dither-grain)' }}
        >
            <HalftonePatterns />

            {/* Decorative halftone backdrops */}
            <circle cx="150" cy="180" r="110" fill="url(#halftone-medium)" opacity="0.6" />
            <circle cx="230" cy="220" r="95" fill="url(#halftone-dense)" opacity="0.45" />

            {/* Giant radial compass/geographic scope */}
            <circle cx="170" cy="200" r="145" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 8" opacity="0.3" />
            <circle cx="170" cy="200" r="130" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.15" />

            {/* Rain falling as pointillist slanted dashed lines */}
            <g stroke="currentColor" strokeWidth="1.5" opacity="0.3" className="transition-colors duration-500">
                <line x1="80" y1="120" x2="50" y2="240" strokeDasharray="3 10" />
                <line x1="120" y1="130" x2="90" y2="250" strokeDasharray="3 10" />
                <line x1="160" y1="140" x2="130" y2="260" strokeDasharray="4 8" />
                <line x1="200" y1="120" x2="170" y2="240" strokeDasharray="1 10" strokeWidth="1" />
                <line x1="240" y1="140" x2="210" y2="260" strokeDasharray="3 10" />
                <line x1="280" y1="110" x2="250" y2="230" strokeDasharray="4 8" />
                <line x1="320" y1="130" x2="290" y2="250" strokeDasharray="3 10" />
            </g>

            {/* Massive Storm Clouds (Nuvens de tempestade) */}
            <g className="transition-colors duration-500">
                {/* Dynamic textured cloud shapes */}
                <g opacity="0.8">
                    {/* Main cloud backing */}
                    <path
                        d="M 60,110 C 60,80 90,60 120,60 C 140,40 180,40 200,60 C 220,40 260,40 280,60 C 310,60 330,80 330,110 C 330,135 310,150 280,150 L 120,150 C 90,150 60,135 60,110 Z"
                        fill="currentColor"
                        opacity="0.35"
                    />
                    <path
                        d="M 60,110 C 60,80 90,60 120,60 C 140,40 180,40 200,60 C 220,40 260,40 280,60 C 310,60 330,80 330,110 C 330,135 310,150 280,150 L 120,150 M 120,150 C 90,150 60,135 60,110"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Halftone texture fill onto the clouds */}
                    <path
                        d="M 60,110 C 60,80 90,60 120,60 C 140,40 180,40 200,60 C 220,40 260,40 280,60 C 310,60 330,80 330,110 C 330,135 310,150 280,150 L 120,150 C 90,150 60,135 60,110 Z"
                        fill="url(#halftone-dense)"
                        opacity="0.55"
                    />
                </g>

                {/* Secondary foreground cloud for scale */}
                <path
                    d="M 180,130 C 180,110 200,95 220,95 C 235,80 260,80 275,95 C 290,95 310,110 310,130 C 310,145 295,155 280,155 L 210,155 C 195,155 180,145 180,130 Z"
                    fill="currentColor"
                    opacity="0.45"
                />
                <path
                    d="M 180,130 C 180,110 200,95 220,95 C 235,80 260,80 275,95 C 290,95 310,110 310,130 C 310,145 295,155 280,155 L 210,155"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                />
            </g>

            {/* Dramatic Lightning (Raio Crítico striking from the clouds) */}
            <g className="transition-colors duration-500">
                {/* Outer glowing lightning pulse */}
                <polyline
                    points="210,115 150,210 190,210 120,320 220,180 180,180 230,115"
                    fill="currentColor"
                    opacity="0.25"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <polyline
                    points="210,115 150,210 190,210 120,320 220,180 180,180 230,115"
                    fill="none"
                    stroke={isHovered ? '#F9E8C7' : '#0B281E'}
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                {/* Inner white hot filament */}
                <polyline
                    points="210,115 150,210 190,210 120,320 220,180 180,180 230,115"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.8"
                />
            </g>

            {/* Humanitarian Aid Rescue Symbol (Boia de Salvação / Vet Cross / Pet Rescue) representation */}
            <g transform="translate(185, 255)" className="transition-colors duration-500">
                {/* Life buoy outer ring (Boia de ajuda humanitária) */}
                <circle cx="0" cy="20" r="50" fill="none" stroke="currentColor" strokeWidth="12" />
                <circle cx="0" cy="20" r="50" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="1 4" opacity="0.5" />

                {/* Inner circle of the life buoy */}
                <circle cx="0" cy="20" r="44" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="0" cy="20" r="38" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.3" />

                {/* Life Buoy Red-Cross Bands (Fitas de amarração) */}
                <rect x="-6" y="-36" width="12" height="18" fill="currentColor" />
                <rect x="-6" y="58" width="12" height="18" fill="currentColor" />
                <rect x="-44" y="14" width="18" height="12" fill="currentColor" />
                <rect x="26" y="14" width="18" height="12" fill="currentColor" />

                {/* Veterinary Rescue Dog/Cat Emblem combined with a Protection Shield */}
                <g transform="translate(0, 20) scale(0.9)">
                    <path d="M -22,0 C -22,-15 0,-25 0,-25 C 0,-25 22,-15 22,0 C 22,12 12,25 0,30 C -12,25 -22,12 -22,0 Z" fill="none" stroke="currentColor" strokeWidth="3.5" />
                    <path d="M -22,0 C -22,-15 0,-25 0,-25 C 0,-25 22,-15 22,0 C 22,12 12,25 0,30 C -12,25 -22,12 -22,0 Z" fill="url(#halftone-dense)" opacity="0.4" />

                    {/* Rescue Medical Cross */}
                    <path d="M -12,-3 L -3,-3 L -3,-12 L 3,-12 L 3,-3 L 12,-3 L 12,3 L 3,3 L 3,12 L -3,12 L -3,3 L -12,3 Z" fill="currentColor" />

                    {/* Superimposed mini Pet Silhouette inside cross (Clean cut) */}
                    <ellipse cx="0" cy="1" rx="4.5" ry="3.5" fill={isHovered ? '#2E6F57' : '#F9E8C7'} stroke="none" />
                    <circle cx="2.5" cy="-2.5" r="2.2" fill={isHovered ? '#2E6F57' : '#F9E8C7'} stroke="none" />
                    <path d="M -3,0 L -5,-3 L -7,-1 Z" fill={isHovered ? '#2E6F57' : '#F9E8C7'} stroke="none" />
                </g>
            </g>

            {/* Flooded Water waves / Ground destruction below */}
            <g stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6" className="transition-colors duration-500">
                <path d="M 40,360 C 60,350 80,370 100,360 C 120,350 140,370 160,360 C 180,350 200,370 220,360 C 240,350 260,370 280,360 C 300,350 320,370 340,360" />
                <path d="M 30,370 C 50,360 70,380 90,370 C 110,360 130,380 150,370 C 170,360 190,380 210,370 C 230,360 250,380 270,370 C 290,360 310,380 330,370" opacity="0.5" />
            </g>

            {/* Floating stipple speckles */}
            <g fill="currentColor" opacity="0.32">
                <circle cx="35" cy="80" r="1.5" />
                <circle cx="310" cy="165" r="2" />
                <circle cx="10" cy="220" r="1" />
                <circle cx="340" cy="310" r="2.5" />
                <circle cx="70" cy="25" r="1" />
                <circle cx="160" cy="15" r="2" />
            </g>
        </svg>
    );
};

/**
 * 4. Saúde Única
 * Um globo terrestre estilizado representando a união perfeita da saúde humana, animal e ambiental.
 */
export const SaudeUnicaIllustration: React.FC<IllustrationProps> = ({ className = '', isHovered = false }) => {
    return (
        <svg
            viewBox="0 0 350 400"
            className={`absolute right-[-40px] top-[10px] w-[55%] h-[95%] pointer-events-none overflow-visible select-none transition-transform duration-700 ease-out ${isHovered ? 'scale-105 translate-x-1 -translate-y-1' : 'scale-100'
                } ${className}`}
            style={{ filter: 'url(#dither-grain)' }}
        >
            <HalftonePatterns />

            {/* Underlay halftone rings */}
            <circle cx="180" cy="200" r="130" fill="url(#halftone-medium)" opacity="0.5" />
            <circle cx="210" cy="160" r="85" fill="url(#halftone-dense)" opacity="0.35" />

            {/* Orbit Rings representing Humans, Animals, and Ecosphere */}
            <g stroke="currentColor" fill="none" className="transition-colors duration-500" opacity="0.6">
                {/* Ring 1 - Animal Health */}
                <ellipse cx="180" cy="200" rx="145" ry="70" strokeWidth="2" strokeDasharray="6 6" transform="rotate(-30, 180, 200)" />
                {/* Ring 2 - Human Health */}
                <ellipse cx="180" cy="200" rx="145" ry="70" strokeWidth="2" strokeDasharray="3 3" transform="rotate(30, 180, 200)" />
                {/* Ring 3 - Environmental Health */}
                <ellipse cx="180" cy="200" rx="150" ry="40" strokeWidth="1.5" strokeDasharray="1 5" transform="rotate(90, 180, 200)" />
            </g>

            {/* Orbit nodes (Nuclei) */}
            <g fill="currentColor" opacity="0.8">
                <circle cx="85" cy="145" r="6" />
                <circle cx="275" cy="255" r="6" />
                <circle cx="275" cy="145" r="4.5" />
                <circle cx="85" cy="255" r="4.5" />
            </g>

            {/* Earth Globe Sphere */}
            <g className="transition-colors duration-500">
                {/* Outer Globe boundary */}
                <circle cx="180" cy="200" r="105" fill="none" stroke="currentColor" strokeWidth="3.5" />
                <circle cx="180" cy="200" r="105" fill="url(#halftone-dense)" opacity="0.45" />

                {/* Latitude & Longitude lines (Grades do globo) */}
                {/* Longitude lines */}
                <ellipse cx="180" cy="200" rx="75" ry="105" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                <ellipse cx="180" cy="200" rx="40" ry="105" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                <line x1="180" y1="95" x2="180" y2="305" stroke="currentColor" strokeWidth="2" opacity="0.5" />

                {/* Latitude lines */}
                <ellipse cx="180" cy="200" rx="105" ry="65" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                <ellipse cx="180" cy="200" rx="105" ry="32" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                <line x1="75" y1="200" x2="285" y2="200" stroke="currentColor" strokeWidth="2" opacity="0.5" />

                {/* Stylized dithered continental islands (Abstract map silhouettes) */}
                {/* Americas / Western Land */}
                <path d="M 105,160 Q 120,150 140,165 T 150,210 T 130,260 T 115,220 Z" fill="currentColor" opacity="0.8" />
                {/* Africa / Europe Eastern Land */}
                <path d="M 215,140 Q 240,130 255,160 T 240,230 T 195,245 T 190,190 T 205,165 Z" fill="currentColor" opacity="0.8" />
                {/* Australis */}
                <path d="M 230,265 Q 245,260 255,275 T 235,290 Z" fill="currentColor" opacity="0.75" />

                {/* Central Tri-Leaf (Health icon overlapping representing the three folds of One Health) */}
                <g transform="translate(180, 200) scale(1.1)" className="transition-transform duration-500">
                    {/* Transparent backdrop shield to bring icons forward */}
                    <circle cx="0" cy="0" r="32" fill={isHovered ? '#2E6F57' : '#F9E8C7'} stroke="currentColor" strokeWidth="3" />

                    {/* Combined Veterinary cross and leaf */}
                    <path d="M -8,-2 L -2,-2 L -2,-8 L 2,-8 L 2,-2 L 8,-2 L 8,2 L 2,2 L 2,8 L -2,8 L -2,2 L -8,2 Z" fill="currentColor" transform="scale(1.2)" />

                    {/* Organic health leaf outlines overlay */}
                    <path d="M -5,-18 C -18,-15 -18,10 -5,12 C 8,10 8,-15 -5,-18" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(25)" opacity="0.5" />
                    <path d="M 5,-18 C 18,-15 18,10 5,12 C -8,10 -8,-15 5,-18" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(-25)" opacity="0.5" />
                </g>
            </g>

            {/* Environmental leaves sprouting from bottom left */}
            <g stroke="currentColor" fill="none" strokeWidth="2" opacity="0.75" className="transition-colors duration-500">
                <path d="M 50,310 C 50,310 20,330 10,360 C 30,360 50,340 50,310 Z" fill="currentColor" opacity="0.4" />
                <path d="M 300,290 C 300,290 330,310 340,340 C 320,340 300,320 300,290 Z" fill="currentColor" opacity="0.4" />
            </g>

            {/* Pointillist dust particles */}
            <g fill="currentColor" opacity="0.3">
                <circle cx="50" cy="50" r="1.5" />
                <circle cx="310" cy="110" r="2.5" />
                <circle cx="20" cy="190" r="1" />
                <circle cx="320" cy="240" r="2" />
                <circle cx="260" cy="40" r="1.5" />
                <circle cx="100" cy="15" r="1" />
            </g>
        </svg>
    );
};

/**
 * 5. Manejo Populacional
 * Silhuetas estilizadas de cães, gatos e humanos conectados por laços éticos de manejo.
 */
export const ManejoPopulacionalIllustration: React.FC<IllustrationProps> = ({ className = '', isHovered = false }) => {
    return (
        <svg
            viewBox="0 0 350 400"
            className={`absolute right-[-45px] top-[10px] w-[55%] h-[95%] pointer-events-none overflow-visible select-none transition-transform duration-700 ease-out ${isHovered ? 'scale-105 translate-x-1 -translate-y-1' : 'scale-100'
                } ${className}`}
            style={{ filter: 'url(#dither-grain)' }}
        >
            <HalftonePatterns />

            {/* Large backdrop circles */}
            <circle cx="180" cy="200" r="125" fill="url(#halftone-medium)" opacity="0.55" />
            <circle cx="140" cy="150" r="90" fill="url(#halftone-dense)" opacity="0.4" />

            {/* Network of connections (Dotted lines representing population data/management paths) */}
            <g stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.32" className="transition-colors duration-500">
                {/* Triangle connection */}
                <polygon points="175,120 105,280 255,280" strokeDasharray="5 5" />
                {/* Nodes */}
                <circle cx="175" cy="120" r="7" fill="currentColor" />
                <circle cx="105" cy="280" r="7" fill="currentColor" />
                <circle cx="255" cy="280" r="7" fill="currentColor" />
                {/* Heart/Infinity curve of ethics */}
                <path d="M 125,230 C 125,185 225,185 225,230 C 225,275 125,275 125,230" strokeWidth="1.5" strokeDasharray="2 4" />
            </g>

            {/* Styled human and animal silhouettes linked (Trazido em estilo gravura escura) */}
            <g className="transition-colors duration-500">

                {/* Center Human Silhouette (Mãos e ombros de proteção) */}
                <g transform="translate(175, 120)" opacity="0.85">
                    <circle cx="0" cy="-25" r="16" fill="currentColor" />
                    <path d="M -30,20 C -30,0 -15,5 0,5 C 15,5 30,0 30,20 C 30,35 25,100 25,100 L -25,100 C -25,100 -30,35 -30,20 Z" fill="currentColor" />
                    <path d="M -30,20 C -30,0 -15,5 0,5 C 15,5 30,0 30,20 C 30,35 25,100 25,100 L -25,100 C -25,100 -30,35 -30,20 Z" fill="url(#halftone-dense)" opacity="0.6" />
                    {/* Heart cutout representing empathy */}
                    <path d="M 0,22 C -4,18 -8,21 -8,25 C -8,30 0,36 0,36 C 0,36 8,30 8,25 C 8,21 4,18 0,22 Z" fill={isHovered ? '#2E6F57' : '#F9E8C7'} />
                </g>

                {/* Dog Silhouette (Cão vigilante no lado esquerdo) */}
                <g transform="translate(95, 255) scale(0.95)" opacity="0.9">
                    {/* Head & ears */}
                    <path d="M 12,-38 C 12,-38 10,-55 5,-55 C 0,-55 -3,-38 -3,-38 L -15,-32 C -15,-32 -25,-48 -30,-48 C -35,-48 -32,-30 -32,-30 L -33,-15 C -33,-5 -22,12 -12,12 L 20,12 C 25,12 30,2 30,-15 C 30,-22 25,-32 12,-38 Z" fill="currentColor" />
                    {/* Body and legs */}
                    <path d="M -25,-2 L -35,50 L -20,50 L -12,12 L 8,12 L 15,50 L 30,50 L 18,-8 Z" fill="currentColor" />
                    {/* Halftone texture onto the dog */}
                    <path d="M -33,-15 C -33,-5 -22,12 -12,12 L 20,12 C 25,12 30,2 30,-15 M -25,-2 L -35,50 L -20,50 L -12,12 L 8,12 L 15,50 L 30,50" fill="url(#halftone-dense)" opacity="0.5" />
                    {/* Tail wagging arcs */}
                    <path d="M 28,15 A 15 15 0 0 1 45,28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
                    <path d="M 28,22 A 10 10 0 0 1 38,32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />
                </g>

                {/* Cat Silhouette (Gato sentado no lado direito) */}
                <g transform="translate(245, 260) scale(0.88)" opacity="0.9">
                    {/* Head and ears */}
                    <path d="M -10,-45 L -20,-62 L -6,-52 L 6,-52 L 20,-62 L 10,-45 C 10,-45 22,-35 22,-20 C 22,-5 12,5 0,5 C -12,5 -22,-5 -22,-20 C -22,-35 -10,-45 -10,-45 Z" fill="currentColor" />
                    {/* Sitting body */}
                    <path d="M -16,0 C -20,12 -25,28 -25,45 L 25,45 C 25,32 18,12 12,0 Z" fill="currentColor" />
                    {/* Tail holding upward (Prancing curve) */}
                    <path d="M 18,35 C 32,35 38,20 38,5 C 38,-10 28,-18 28,-18" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
                    {/* Dither layer on cat */}
                    <path d="M -16,0 C -20,12 -25,28 -25,45 L 25,45 C 25,32 18,12 12,0 Z" fill="url(#halftone-dense)" opacity="0.5" />
                </g>

            </g>

            {/* Flurries of protection stars */}
            <g fill="currentColor" opacity="0.35">
                <circle cx="35" cy="110" r="1.5" />
                <circle cx="310" cy="180" r="2" />
                <circle cx="40" cy="300" r="1.5" />
                <circle cx="320" cy="320" r="2.5" />
                <circle cx="80" cy="35" r="1" />
                <circle cx="280" cy="45" r="2" />
            </g>
        </svg>
    );
};

/**
 * 6. Bem-estar Animal
 * Uma pata de animal (patinha) em destaque de forma orgânica e cientificamente embasada.
 */
export const BemEstarAnimalIllustration: React.FC<IllustrationProps> = ({ className = '', isHovered = false }) => {
    return (
        <svg
            viewBox="0 0 350 400"
            className={`absolute right-[-35px] top-[10px] w-[55%] h-[95%] pointer-events-none overflow-visible select-none transition-transform duration-700 ease-out ${isHovered ? 'scale-105 translate-x-1 -translate-y-1' : 'scale-100'
                } ${className}`}
            style={{ filter: 'url(#dither-grain)' }}
        >
            <HalftonePatterns />

            {/* Decorative background shapes */}
            <circle cx="180" cy="200" r="130" fill="url(#halftone-medium)" opacity="0.6" />
            <circle cx="210" cy="230" r="85" fill="url(#halftone-dense)" opacity="0.35" />

            {/* Dotted orbits of continuous wellbeing assessment */}
            <circle cx="180" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 8" opacity="0.35" />
            <circle cx="180" cy="200" r="125" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="1 5" opacity="0.2" />

            {/* Swirling floral/organic wind patterns representing mental and physical comfort */}
            <g stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4" className="transition-colors duration-500">
                <path d="M 60,110 C 90,95 120,120 140,150" />
                <path d="M 45,120 C 75,105 105,130 125,160" opacity="0.5" />

                <path d="M 300,290 C 270,305 240,280 220,250" />
                <path d="M 315,280 C 285,295 255,270 235,240" opacity="0.5" />
            </g>

            {/* Giant Empathic Paw Print containing organic shapes and a heart inside the pad */}
            <g className="transition-colors duration-500" transform="translate(180, 200) scale(1.1)">
                {/* Underlay shadow/halftone footprint */}
                <path
                    d="M -30,-4 C -30,-22 -15,-32 0,-32 C 15,-32 30,-22 30,-4 C 30,12 18,25 0,25 C -18,25 -30,12 -30,-4 Z"
                    fill="url(#halftone-dense)"
                    opacity="0.45"
                />

                {/* Outer loop of Main Pad */}
                <path
                    d="M -30,-4 C -30,-22 -15,-32 0,-32 C 15,-32 30,-22 30,-4 C 30,12 18,25 0,25 C -18,25 -30,12 -30,-4 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                />

                {/* Pad design with customized halftone fill */}
                <path
                    d="M -26,-2 C -26,-18 -12,-28 0,-28 C 12,-28 26,-18 26,-2 C 26,10 16,21 0,21 C -16,21 -26,10 -26,-2 Z"
                    fill="currentColor"
                    opacity="0.75"
                />

                {/* Heart shaped cutout in the main pad */}
                <path
                    d="M 0,-14 C -3,-18 -7,-15 -7,-11 C -7,-6 0,0 0,0 C 0,0 7,-6 7,-11 C 7,-15 3,-18 0,-14 Z"
                    fill={isHovered ? '#2E6F57' : '#F9E8C7'}
                />

                {/* 4 Toe Pads (Dedinhos da patinha) arranged neatly with custom borders and halftone screens */}
                {/* Toe 1 */}
                <g transform="translate(-25, -42) scale(0.95)">
                    <circle cx="0" cy="0" r="14" fill="currentColor" opacity="0.9" />
                    <circle cx="0" cy="0" r="14" fill="none" stroke="currentColor" strokeWidth="2" />
                    <circle cx="0" cy="0" r="11" fill="url(#halftone-dense)" opacity="0.6" />
                </g>

                {/* Toe 2 */}
                <g transform="translate(-8, -62)">
                    <circle cx="0" cy="0" r="15" fill="currentColor" opacity="0.95" />
                    <circle cx="0" cy="0" r="15" fill="none" stroke="currentColor" strokeWidth="2.5" />
                    <circle cx="0" cy="0" r="12" fill="url(#halftone-dense)" opacity="0.6" />
                </g>

                {/* Toe 3 */}
                <g transform="translate(18, -58)">
                    <circle cx="0" cy="0" r="14" fill="currentColor" opacity="0.95" />
                    <circle cx="0" cy="0" r="14" fill="none" stroke="currentColor" strokeWidth="2.5" />
                    <circle cx="0" cy="0" r="11" fill="url(#halftone-dense)" opacity="0.6" />
                </g>

                {/* Toe 4 */}
                <g transform="translate(35, -34) scale(0.9)">
                    <circle cx="0" cy="0" r="13" fill="currentColor" opacity="0.9" />
                    <circle cx="0" cy="0" r="13" fill="none" stroke="currentColor" strokeWidth="2" />
                    <circle cx="0" cy="0" r="10" fill="url(#halftone-dense)" opacity="0.6" />
                </g>
            </g>

            {/* Floating stippling dust */}
            <g fill="currentColor" opacity="0.32">
                <circle cx="50" cy="60" r="1.5" />
                <circle cx="300" cy="110" r="2" />
                <circle cx="20" cy="220" r="1" />
                <circle cx="340" cy="280" r="2.5" />
                <circle cx="70" cy="15" r="1" />
                <circle cx="160" cy="25" r="2" />
            </g>
        </svg>
    );
};

/**
 * 7. Políticas Públicas
 * Mão em colaboração/protesto sob a silhueta de um pilar/telhado governamental constitucional.
 */
export const PoliticasPublicasIllustration: React.FC<IllustrationProps> = ({ className = '', isHovered = false }) => {
    return (
        <svg
            viewBox="0 0 350 400"
            className={`absolute right-[-40px] top-[10px] w-[55%] h-[95%] pointer-events-none overflow-visible select-none transition-transform duration-700 ease-out ${isHovered ? 'scale-105 translate-x-1 -translate-y-1' : 'scale-100'
                } ${className}`}
            style={{ filter: 'url(#dither-grain)' }}
        >
            <HalftonePatterns />

            {/* Orbits and halftone structures */}
            <circle cx="180" cy="200" r="130" fill="url(#halftone-medium)" opacity="0.5" />
            <circle cx="130" cy="140" r="95" fill="url(#halftone-dense)" opacity="0.35" />

            {/* Architectural Institution / Senate Pillars backdrop (Prédio de leis) */}
            <g className="transition-colors duration-500" opacity="0.45">
                {/* Triangle Roof (Pórtico/Frontão clássico) */}
                <polygon points="180,55 90,105 270,105" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
                <polygon points="180,55 90,105 270,105" fill="url(#halftone-dense)" opacity="0.4" />

                {/* Architrave Beam */}
                <rect x="100" y="105" width="160" height="12" fill="currentColor" />

                {/* 4 Classical Pillars (Colunas romanas) */}
                <rect x="115" y="117" width="14" height="65" fill="none" stroke="currentColor" strokeWidth="2.5" />
                <rect x="150" y="117" width="14" height="65" fill="none" stroke="currentColor" strokeWidth="2.5" />
                <rect x="195" y="117" width="14" height="65" fill="none" stroke="currentColor" strokeWidth="2.5" />
                <rect x="230" y="117" width="14" height="65" fill="none" stroke="currentColor" strokeWidth="2.5" />

                {/* Fills on pillars */}
                <rect x="117" y="120" width="10" height="59" fill="url(#halftone-dense)" opacity="0.5" />
                <rect x="152" y="120" width="10" height="59" fill="url(#halftone-dense)" opacity="0.5" />
                <rect x="197" y="120" width="10" height="59" fill="url(#halftone-dense)" opacity="0.5" />
                <rect x="232" y="120" width="10" height="59" fill="url(#halftone-dense)" opacity="0.5" />

                {/* Foundation Base Plinth */}
                <rect x="90" y="182" width="180" height="14" fill="none" stroke="currentColor" strokeWidth="3" />
                <rect x="90" y="182" width="180" height="14" fill="currentColor" opacity="0.25" />
            </g>

            {/* Laurel wreath representing legal power of state policy frameworks */}
            <g className="transition-colors duration-500" transform="translate(10, 45)">
                <g stroke="currentColor" fill="none" strokeWidth="2.5" opacity="0.45" transform="translate(170, 180) scale(0.95)">
                    <path d="M -75,20 C -75,-30 -25,-60 0,-60 C 25,-60 75,-30 75,20" strokeLinecap="round" strokeDasharray="4 4" />
                    <circle cx="-50" cy="-35" r="4" fill="currentColor" />
                    <circle cx="50" cy="-35" r="4" fill="currentColor" />
                    <circle cx="-25" cy="-55" r="5" fill="currentColor" />
                    <circle cx="25" cy="-55" r="5" fill="currentColor" />
                </g>
            </g>

            {/* Floating stipple speckles */}
            <g fill="currentColor" opacity="0.3">
                <circle cx="45" cy="45" r="1.5" />
                <circle cx="305" cy="115" r="2" />
                <circle cx="15" cy="200" r="1" />
                <circle cx="335" cy="260" r="2.5" />
                <circle cx="75" cy="25" r="1" />
                <circle cx="165" cy="15" r="2" />
            </g>
        </svg>
    );
};

/**
 * 8. Gestão de Abrigos (Medicina de Abrigos)
 * Um prédio de abrigo com divisões quadradas e janelas, cercas e árvores estilizadas, marcadores de ajuda animal.
 */
export const GestaoAbrigosIllustration: React.FC<IllustrationProps> = ({ className = '', isHovered = false }) => {
    return (
        <svg
            viewBox="0 0 350 400"
            className={`absolute right-[-45px] top-[10px] w-[55%] h-[95%] pointer-events-none overflow-visible select-none transition-transform duration-700 ease-out ${isHovered ? 'scale-105 translate-x-1 -translate-y-1' : 'scale-100'
                } ${className}`}
            style={{ filter: 'url(#dither-grain)' }}
        >
            <HalftonePatterns />

            {/* Ground platform / background circles */}
            <circle cx="180" cy="200" r="130" fill="url(#halftone-medium)" opacity="0.5" />
            <circle cx="210" cy="150" r="95" fill="url(#halftone-dense)" opacity="0.4" />

            {/* Fences and pathways in the background (Cercas do abrigo) */}
            <g stroke="currentColor" strokeWidth="1.5" opacity="0.3" className="transition-colors duration-500">
                <line x1="30" y1="280" x2="110" y2="280" />
                <line x1="45" y1="280" x2="45" y2="295" strokeWidth="2.5" />
                <line x1="65" y1="280" x2="65" y2="295" strokeWidth="2.5" />
                <line x1="85" y1="280" x2="85" y2="295" strokeWidth="2.5" />
                <line x1="105" y1="280" x2="105" y2="295" strokeWidth="2.5" />
            </g>

            {/* Large Tree representation of green space in sustainable shelter */}
            <g className="transition-colors duration-500" opacity="0.4" transform="translate(60, 160)">
                <path d="M 20,40 C 5,25 5,-5 20,-20 C 35,-35 65,-25 65,5 Q 75,30 55,45 Z" fill="currentColor" />
                <path d="M 20,40 C 5,25 5,-5 20,-20 C 35,-35 65,-25 65,5 Q 75,30 55,45 Z" fill="url(#halftone-dense)" opacity="0.5" />
                <rect x="36" y="40" width="8" height="35" fill="currentColor" />
            </g>

            {/* Main Shelter Building (Prédio institucional com telhas clássicas e divisões) */}
            <g className="transition-colors duration-500">

                {/* Shadow backdrop of building */}
                <polygon points="105,280 105,175 180,120 255,175 255,280" fill="currentColor" opacity="0.18" />

                {/* Outer frame of Shelter structure */}
                <polygon
                    points="105,280 105,175 180,120 255,175 255,280"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                />

                {/* Roof Tiles texture (Telhado dithered) */}
                <polygon points="95,175 180,112 265,175" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
                <polygon points="95,175 180,112 265,175" fill="url(#halftone-dense)" opacity="0.4" />

                {/* Grid of Kennel/Cattery Divisions (Divisões quadradas e janelas) */}
                {/* Main central division lines */}
                <line x1="180" y1="175" x2="180" y2="280" stroke="currentColor" strokeWidth="3" />
                <line x1="105" y1="225" x2="255" y2="225" stroke="currentColor" strokeWidth="2.5" />

                {/* 4 Windows/Boxes representing cozy, sanitarily compliant individual kennels */}
                {/* Top-Left Box */}
                <g transform="translate(120, 185)" opacity="0.85">
                    <rect x="0" y="0" width="45" height="30" fill="none" stroke="currentColor" strokeWidth="2" />
                    <rect x="3" y="3" width="39" height="24" fill="url(#halftone-dense)" opacity="0.5" />
                    <line x1="22.5" y1="0" x2="22.5" y2="30" stroke="currentColor" strokeWidth="1" />
                </g>

                {/* Top-Right Box */}
                <g transform="translate(195, 185)" opacity="0.85">
                    <rect x="0" y="0" width="45" height="30" fill="none" stroke="currentColor" strokeWidth="2" />
                    <rect x="3" y="3" width="39" height="24" fill="url(#halftone-dense)" opacity="0.5" />
                    {/* Paw print indicator in Top-Right Box */}
                    <circle cx="22.5" cy="15" r="4.5" fill="currentColor" />
                    <circle cx="16.5" cy="7.5" r="2" fill="currentColor" />
                    <circle cx="28.5" cy="7.5" r="2" fill="currentColor" />
                </g>

                {/* Bottom-Left Box */}
                <g transform="translate(120, 235)" opacity="0.85">
                    <rect x="0" y="0" width="45" height="35" fill="none" stroke="currentColor" strokeWidth="2" />
                    <rect x="3" y="3" width="39" height="29" fill="url(#halftone-dense)" opacity="0.55" />
                    {/* Vertical safety bars */}
                    <line x1="11" y1="0" x2="11" y2="35" stroke="currentColor" strokeWidth="1" />
                    <line x1="22" y1="0" x2="22" y2="35" stroke="currentColor" strokeWidth="1" />
                    <line x1="33" y1="0" x2="33" y2="35" stroke="currentColor" strokeWidth="1" />
                </g>

                {/* Bottom-Right Box with stylized medical cross symbol */}
                <g transform="translate(195, 235)" opacity="0.85">
                    <rect x="0" y="0" width="45" height="35" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    {/* Medical cross icon */}
                    <path d="M 18,17 L 27,17 M 22.5,12.5 L 22.5,21.5" stroke="currentColor" strokeWidth="3" />
                </g>

                {/* Little Heart on the attic/pediment of the roof representing humanity */}
                <path d="M 180,148 C 177,144 174,147 174,150 C 174,154 180,158 180,158 C 180,158 186,154 186,150 C 186,147 183,144 180,148 Z" fill="currentColor" />

            </g>

            {/* Ground horizon / sidewalk base line */}
            <line x1="20" y1="280" x2="330" y2="280" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="transition-colors duration-500" />
            <line x1="10" y1="288" x2="340" y2="288" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />

            {/* Floating stipple speckles */}
            <g fill="currentColor" opacity="0.3">
                <circle cx="50" cy="50" r="1.5" />
                <circle cx="310" cy="110" r="2" />
                <circle cx="20" cy="190" r="1" />
                <circle cx="340" cy="300" r="2.5" />
                <circle cx="80" cy="20" r="1" />
                <circle cx="265" cy="25" r="2.5" />
            </g>
        </svg>
    );
};
