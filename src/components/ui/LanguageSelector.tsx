import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Loader2 } from 'lucide-react';
import { SUPPORTED_LANGUAGES, type SupportedLanguageCode } from '@/i18n';

/* ── Crisp SVGs for flags ── */
export function FlagBR({ className = 'w-5 h-3.5' }: { className?: string }) {
  return (
    <svg className={`${className} rounded-[2px] shadow-xs flex-shrink-0`} viewBox="0 0 720 504" fill="none" aria-hidden="true">
      <rect width="720" height="504" fill="#009C3B" />
      <polygon points="360,40 670,252 360,464 50,252" fill="#FFDF00" />
      <circle cx="360" cy="252" r="130" fill="#002776" />
      <path d="M 235,268 A 145,145 0 0 1 485,240" stroke="#FFFFFF" strokeWidth="22" strokeLinecap="round" fill="none" />
      <circle cx="330" cy="235" r="5" fill="#FFFFFF" />
      <circle cx="355" cy="225" r="5" fill="#FFFFFF" />
      <circle cx="380" cy="228" r="5" fill="#FFFFFF" />
      <circle cx="360" cy="265" r="5" fill="#FFFFFF" />
      <circle cx="340" cy="285" r="5" fill="#FFFFFF" />
      <circle cx="375" cy="290" r="5" fill="#FFFFFF" />
    </svg>
  );
}

export function FlagUS({ className = 'w-5 h-3.5' }: { className?: string }) {
  return (
    <svg className={`${className} rounded-[2px] shadow-xs flex-shrink-0`} viewBox="0 0 741 390" fill="none" aria-hidden="true">
      <rect width="741" height="390" fill="#B22234" />
      <path d="M0,30H741M0,90H741M0,150H741M0,210H741M0,270H741M0,330H741" stroke="#FFFFFF" strokeWidth="30" />
      <rect width="296.4" height="210" fill="#3C3B6E" />
      <g fill="#FFFFFF">
        <circle cx="30" cy="25" r="7" />
        <circle cx="80" cy="25" r="7" />
        <circle cx="130" cy="25" r="7" />
        <circle cx="180" cy="25" r="7" />
        <circle cx="230" cy="25" r="7" />
        <circle cx="280" cy="25" r="7" />
        <circle cx="55" cy="55" r="7" />
        <circle cx="105" cy="55" r="7" />
        <circle cx="155" cy="55" r="7" />
        <circle cx="205" cy="55" r="7" />
        <circle cx="255" cy="55" r="7" />
        <circle cx="30" cy="85" r="7" />
        <circle cx="80" cy="85" r="7" />
        <circle cx="130" cy="85" r="7" />
        <circle cx="180" cy="85" r="7" />
        <circle cx="230" cy="85" r="7" />
        <circle cx="280" cy="85" r="7" />
        <circle cx="55" cy="115" r="7" />
        <circle cx="105" cy="115" r="7" />
        <circle cx="155" cy="115" r="7" />
        <circle cx="205" cy="115" r="7" />
        <circle cx="255" cy="115" r="7" />
        <circle cx="30" cy="145" r="7" />
        <circle cx="80" cy="145" r="7" />
        <circle cx="130" cy="145" r="7" />
        <circle cx="180" cy="145" r="7" />
        <circle cx="230" cy="145" r="7" />
        <circle cx="280" cy="145" r="7" />
        <circle cx="55" cy="175" r="7" />
        <circle cx="105" cy="175" r="7" />
        <circle cx="155" cy="175" r="7" />
        <circle cx="205" cy="175" r="7" />
        <circle cx="255" cy="175" r="7" />
      </g>
    </svg>
  );
}

export function FlagES({ className = 'w-5 h-3.5' }: { className?: string }) {
  return (
    <svg className={`${className} rounded-[2px] shadow-xs flex-shrink-0`} viewBox="0 0 750 500" fill="none" aria-hidden="true">
      <rect width="750" height="500" fill="#AA151B" />
      <rect y="125" width="750" height="250" fill="#F1BF00" />
      <g transform="translate(180, 250) scale(0.6)">
        <rect x="-35" y="-55" width="70" height="90" rx="10" fill="#AA151B" />
        <circle cx="0" cy="-10" r="24" fill="#F1BF00" />
        <rect x="-8" y="-70" width="16" height="20" fill="#AA151B" />
      </g>
    </svg>
  );
}

function renderFlag(code: string, className?: string) {
  switch (code) {
    case 'en-US':
      return <FlagUS className={className} />;
    case 'es-ES':
      return <FlagES className={className} />;
    case 'pt-BR':
    default:
      return <FlagBR className={className} />;
  }
}

interface LanguageSelectorProps {
  className?: string;
  dropdownAlign?: 'left' | 'right';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className = '',
  dropdownAlign = 'right',
}) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [pendingLang, setPendingLang] = useState<SupportedLanguageCode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine current active language code (handling 'pt', 'en', 'es' prefix matching)
  const resolvedCode: SupportedLanguageCode = (() => {
    const raw = (i18n.language || 'pt-BR').toLowerCase();
    if (raw.startsWith('en')) return 'en-US';
    if (raw.startsWith('es')) return 'es-ES';
    return 'pt-BR';
  })();

  const currentLang = pendingLang || resolvedCode;

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (targetCode: SupportedLanguageCode) => {
    if (targetCode === resolvedCode || isChanging) {
      setIsOpen(false);
      return;
    }

    // 1. Immediately close dropdown
    setIsOpen(false);
    // 2. Set loading state & pending language display
    setIsChanging(true);
    setPendingLang(targetCode);

    // 3. Controlled 600ms transition with visual spinner
    setTimeout(async () => {
      await i18n.changeLanguage(targetCode);
      if (typeof document !== 'undefined') {
        document.documentElement.lang = targetCode;
      }
      setPendingLang(null);
      setIsChanging(false);
    }, 600);
  };

  const otherLanguages = SUPPORTED_LANGUAGES.filter((lang) => lang.code !== currentLang);

  return (
    <div ref={containerRef} className={`relative inline-block text-left ${className}`}>
      {/* ── Main Selector Button ── */}
      <button
        type="button"
        disabled={isChanging}
        onClick={() => !isChanging && setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Idioma atual: ${currentLang}`}
        className={`
          flex items-center gap-2
          px-2.5 sm:px-3 py-1.5
          rounded-lg
          border transition-all duration-200
          text-white font-medium text-xs sm:text-sm
          ${
            isOpen
              ? 'bg-black/30 border-blue-400 ring-1 ring-blue-400 shadow-sm'
              : 'bg-white/10 hover:bg-white/20 border-white/25 hover:border-white/40'
          }
          ${isChanging ? 'cursor-wait opacity-90' : 'cursor-pointer'}
        `}
      >
        {/* Flag or Loading Spinner */}
        {isChanging ? (
          <Loader2 className="w-4 h-4 animate-spin text-white flex-shrink-0" />
        ) : (
          renderFlag(currentLang, 'w-4.5 h-3 sm:w-5 sm:h-3.5')
        )}

        {/* Language Code Label */}
        <span className="tracking-wide select-none whitespace-nowrap">{currentLang}</span>

        {/* Chevron Icon */}
        <ChevronDown
          className={`w-3.5 h-3.5 text-white/80 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-white' : ''
          }`}
        />
      </button>

      {/* ── Dropdown Popover ── */}
      {isOpen && (
        <div
          role="listbox"
          className={`
            absolute top-full mt-1.5 z-50
            bg-white rounded-lg shadow-xl border border-gray-100
            py-1 min-w-[125px] sm:min-w-[135px]
            animate-in fade-in zoom-in-95 duration-150
            ${dropdownAlign === 'right' ? 'right-0' : 'left-0'}
          `}
        >
          {otherLanguages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              role="option"
              aria-selected={false}
              onClick={() => handleLanguageChange(lang.code)}
              className="
                w-full flex items-center gap-2.5
                px-3 py-2
                text-xs sm:text-sm font-medium text-gray-800
                hover:bg-blue-50 hover:text-blue-900
                transition-colors duration-150
                cursor-pointer text-left
              "
            >
              {renderFlag(lang.code, 'w-4.5 h-3 sm:w-5 sm:h-3.5')}
              <span className="tracking-wide">{lang.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
