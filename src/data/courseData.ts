import type { CardComponentData } from '../types';

/**
 * Os 5 pilares do CESMVC.
 * Títulos e textos aprovados conforme REDAÇÃO 4 do ficheiro
 * "CESMVC - Controle de redações.md".
 *
 * ATENÇÃO: O pilar "SAÚDE COLETIVA" no documento source é exibido
 * no site como "Saúde Única" (conforme orientação do cliente).
 */
export const courseCards: CardComponentData[] = [
    {
        id: '1',
        title: 'Saúde Única',
        subtitle: 'One Health',
        description: 'A interconexão entre saúde humana, animal e ambiental — vigilância em saúde, controle de zoonoses e determinantes sociais da saúde.',
        modalText: 'A Saúde Coletiva propõe uma atuação integrada entre saúde humana, animal e ambiental. A especialização prepara profissionais para atuar em temas como vigilância em saúde, controle de zoonoses, manejo populacional, teoria do elo e acumulação de animais, considerando os determinantes sociais da saúde.',
        conceptText: 'One Health',
        illustrationType: 'saude-unica',
        tags: ['Zoonoses', 'Vigilância', 'Saúde Única'],
    },
    {
        id: '2',
        title: 'Medicina Veterinária Legal',
        subtitle: 'Perícia & Proteção Animal',
        description: 'Atuação intersetorial nos casos de maus-tratos, crueldade e abuso animal, articulando saúde, assistência social e redes de proteção.',
        modalText: 'A Medicina Veterinária Legal atua nas interações humano-animal negativas, especialmente em casos de maus-tratos, crueldade e abuso animal. A atuação é intersetorial, articulando medicina veterinária, saúde, assistência social e redes de proteção, reconhecendo que a violência contra os animais também pode indicar outras formas de violência social, como violência doméstica e abuso infantil.',
        conceptText: 'Justiça',
        illustrationType: 'legal',
        tags: ['Perícia', 'Maus-Tratos', 'Legislação'],
    },
    {
        id: '3',
        title: 'Povos Originários e Tradicionais',
        subtitle: 'Comunidades & Territórios',
        description: 'Atuação em comunidades indígenas, quilombolas e outros territórios, respeitando saberes ancestrais e realidades culturais de cada comunidade.',
        modalText: 'A Medicina Veterinária de Povos Originários e Tradicionais atua em comunidades indígenas, quilombolas e outros territórios. Essa frente é construída de forma integrada, respeitando saberes ancestrais, práticas culturais e as realidades de cada comunidade.',
        conceptText: 'Equidade',
        illustrationType: 'indigenista',
        tags: ['Territórios', 'Saberes Ancestrais', 'Inclusão'],
    },
    {
        id: '4',
        title: 'Medicina de Desastres',
        subtitle: 'Emergências & Resgate',
        description: 'Prevenção, resposta e recuperação em cenários de emergência — do diagnóstico de risco ao abrigamento temporário e vigilância em saúde.',
        modalText: 'A Medicina Veterinária de Desastres atua nas ações de prevenção, preparação, resposta e recuperação em cenários de emergência. No CESMVC, os profissionais aprendem desde o diagnóstico de áreas de risco e elaboração de planos de contingência até protocolos de resgate, abrigamento temporário, reunificação familiar e vigilância em saúde, compreendendo o papel estratégico da Medicina Veterinária na proteção de animais, pessoas e ambiente em situações de desastre.',
        conceptText: 'Resgate',
        illustrationType: 'desastres',
        tags: ['Contingência', 'Resgate', 'Emergências'],
    },
    {
        id: '5',
        title: 'Medicina de Abrigos',
        subtitle: 'Gestão Sanitária & Bem-Estar',
        description: 'Gestão da saúde e do bem-estar de animais em espaços de acolhimento — manejo populacional, guarda responsável e políticas públicas.',
        modalText: 'A Medicina de Abrigos atua na gestão da saúde e do bem-estar de animais que vivem em espaços de acolhimento animal. A área também discute manejo populacional, guarda responsável e políticas públicas voltadas à proteção e reintrodução segura dos animais na sociedade.',
        conceptText: 'Abrigos',
        illustrationType: 'gestao-abrigos',
        tags: ['Sanidade', 'Bem-Estar', 'Políticas Públicas'],
    },
];
