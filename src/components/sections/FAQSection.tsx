import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'A Pós-Graduação em Medicina Veterinária do Coletivo da UFPR é online?',
    answer: 'Sim, a especialização oferecida pelo CESMVC em parceria com a UFPR é 100% online (EAD), contando com aulas síncronas semanais e acompanhamento por professores federais.',
  },
  {
    question: 'O certificado da Pós-Graduação em Medicina Veterinária do Coletivo é emitido pela UFPR?',
    answer: 'Sim, ao concluir o curso, o aluno recebe o certificado oficial de pós-graduação lato sensu emitido diretamente pela Universidade Federal do Paraná (UFPR), reconhecido pelo MEC e CFMV.',
  },
  {
    question: 'Quem pode fazer a Pós-Graduação em Medicina Veterinária do Coletivo?',
    answer: 'A especialização é destinada a profissionais que desejam atuar com manejo populacional, saúde pública, gestão de abrigos, perícia e medicina veterinária legal.',
  },
  {
    question: 'Qual é a duração da Pós-Graduação em Medicina Veterinária do Coletivo (Pós MVC)?',
    answer: 'O curso tem carga horária total de 544 horas realizada ao longo de 24 meses, com projeto de intervenção orientado individualmente.',
  },
  {
    question: 'Como consultar as opções de pagamento da pós-graduação em Medicina Veterinária do Coletivo?',
    answer: 'Você pode consultar os detalhes de investimento e condições de parcelamento falando diretamente com a equipe da secretaria pelo WhatsApp (+55 41 9625-9743) ou pelo e-mail secretariacesmvc@ufpr.br.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Decorative Blob */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 pointer-events-none blur-3xl"
        style={{ background: '#2E6F57' }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-16">
          <span className="inline-flex items-center gap-2 text-[#2E6F57] text-xs font-bold tracking-widest uppercase mb-3">
            <span className="w-6 h-px" style={{ background: '#2E6F57' }} />
            Perguntas Frequentes
            <span className="w-6 h-px" style={{ background: '#2E6F57' }} />
          </span>
          <h2
            className="font-grift-black tracking-tight text-[#0B281E] leading-tight"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
          >
            Dúvidas sobre a <span className="text-[#2E6F57]">Pós-Graduação em Medicina Veterinária do Coletivo</span>
          </h2>
          <p className="mt-4 text-gray-600 text-sm sm:text-base max-w-2xl mx-auto font-sans">
            Respostas para as principais perguntas sobre a especialização online em Medicina Veterinária do Coletivo (CESMVC).
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 bg-gray-50/60 hover:border-[#2E6F57]/40"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <h3 className="font-grift-bold text-base sm:text-lg text-[#0B281E] leading-snug">
                    {faq.question}
                  </h3>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${isOpen ? 'bg-[#2E6F57] text-white rotate-180' : 'bg-gray-200 text-[#0B281E]'
                      }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-gray-700 text-sm sm:text-base leading-relaxed font-sans border-t border-gray-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
