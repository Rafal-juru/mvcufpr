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
        title: 'Saúde Coletiva',
        subtitle: 'One Health',
        description: 'A interconexão entre saúde humana, animal e ambiental — vigilância em saúde, controle de zoonoses e determinantes sociais da saúde.',
        modalText: 'A Saúde Coletiva propõe uma atuação integrada entre saúde humana, animal e ambiental. A especialização prepara profissionais para atuar em temas como vigilância em saúde, controle de zoonoses, manejo populacional, teoria do elo e acumulação de animais, considerando os determinantes sociais da saúde.',
        conceptText: 'One Health',
        illustrationType: 'saude-unica',
        tags: ['Zoonoses', 'Vigilância', 'Manejo populacional'],
        pilarImg: '../../../assets/images/CESMVC - banner Pilar em PNG.png',
        iconOrange: '../../../assets/images/CESMVC - banner Saúde coletiva laranja em PNG.png',
        iconGreen: '../../../assets/images/CESMVC - banner Saúde coletiva (1).png',
        iconTransformOrange: { scale: 1.02, x: '0.0%', y: '-0.5%' },
        iconTransformGreen: { scale: 6.07, x: '240.4%', y: '41.9%' },
    },
    {
        id: '2',
        title: 'Povos Originários e Tradicionais',
        subtitle: 'Comunidades & Territórios',
        description: 'Atuação em comunidades indígenas, quilombolas e outros territórios, respeitando saberes ancestrais e realidades culturais de cada comunidade.',
        modalText: 'A Medicina Veterinária de Povos Originários e Tradicionais atua em comunidades indígenas, quilombolas e outros territórios. Essa frente é construída de forma integrada, respeitando a comovisão das comunidades, seus imaginários, saberes ancestrais, práticas culturais e as realidades de cada território. O médico-veterinário atua interface entre a saúde humana, animal e ambiental — incluindo os animais como parte indissociável desse equilíbrio.',
        conceptText: 'Equidade',
        illustrationType: 'indigenista',
        tags: ['Saberes Ancestrais', 'Inclusão', 'Etnoveterinária'],
        pilarImg: '../../../assets/images/CESMVC - banner Pilar em PNG.png',
        iconOrange: '../../../assets/images/CESMVC - banner Medicina veterinária de povos originários laranja em PNG.png',
        iconGreen: '../../../assets/images/CESMVC - banner Medicina veterinária de povos originários em PNG.png',

    },
    {
        id: '3',
        title: 'Medicina de Abrigos',
        subtitle: 'Bem-estar & Gestão Sanitária',
        description: 'Gestão da saúde e do bem-estar de animais em espaços de acolhimento — manejo populacional, guarda responsável e políticas públicas.',
        modalText: 'A Medicina de Abrigos é o campo da Medicina Veterinária que cuida da saúde e do bem-estar de populações animais em espaços de acolhimento, atuando também no manejo populacional, na guarda responsável e em políticas públicas de proteção e reinserção animal. A capacitação do médico-veterinário para essa área vai além da clínica individual — é estruturada para suprir o que ele ainda não domina: gestão de abrigos, protocolos sanitários e operacionais, além da clínica, cirurgia e medicina comportamental aplicadas ao contexto do coletivo, onde os tratamentos, a prevenção e o manejo ganham complexidade por serem direcionados a populações inteiras. A formação inclui ainda epidemiologia e biossegurança como pilares essenciais da rotina, fundamentais para compreender a distribuição das doenças, prevenir surtos e proteger equipe e animais.',
        conceptText: 'Abrigos',
        illustrationType: 'gestao-abrigos',
        tags: ['Epidemiologia', 'Etologia', 'Políticas Públicas'],
        pilarImg: '../../../assets/images/CESMVC - banner Pilar em PNG.png',
        iconOrange: '../../../assets/images/CESMVC - banner Medicina veterinária de abrigos laranja em PNG.png',
        iconGreen: '../../../assets/images/CESMVC - banner Medicina veterinária de abrigos em PNG.png',
        imageScale: 'scale-[1.25]',
        hoverImageScale: 'scale-[1.30]',
    },
    {
        id: '4',
        title: 'Medicina de Desastres',
        subtitle: 'Prevenção & Protocolos',
        description: 'Prevenção, resposta e recuperação em cenários de emergência — do diagnóstico de risco ao abrigamento temporário e vigilância em saúde.',
        modalText: 'A Medicina Veterinária de Desastres atua nas ações de prevenção, preparação, resposta e recuperação em cenários de emergência. No CESMVC, os profissionais aprendem desde o diagnóstico de áreas de risco e elaboração de planos de contingência até protocolos de resgate, abrigamento temporário, reunificação familiar e vigilância em saúde, compreendendo o papel estratégico da Medicina Veterinária na proteção de animais, pessoas e ambiente em situações de desastre.',
        conceptText: 'Resgate',
        illustrationType: 'desastres',
        tags: ['Contingência', 'Resgate', 'Emergências'],
        pilarImg: '../../../assets/images/CESMVC - banner Pilar em PNG.png',
        iconOrange: '../../../assets/images/CESMVC - banner Medicina veterinária de desastres laranja em PNG.png',
        iconGreen: '../../../assets/images/CESMVC - banner Medicina veterinária de desastres em PNG.png',
        iconTransformOrange: { scale: 6.00, x: '-117.6%', y: '42.6%' },
        iconTransformGreen: { scale: 1.01, x: '1.1%', y: '0.5%' },
    },
    {
        id: '5',
        title: 'Medicina Veterinária Legal',
        subtitle: 'Perícia & Proteção Animal',
        description: 'Atuação intersetorial nos casos de maus-tratos, crueldade e abuso animal, articulando saúde, assistência social e redes de proteção.',
        modalText: 'A Medicina Veterinária Legal atua nas interações humano-animal negativas, especialmente em casos de maus-tratos, crueldade e abuso animal. A atuação é intersetorial, articulando medicina veterinária, saúde, assistência social e redes de proteção, reconhecendo que a violência contra os animais também pode indicar outras formas de violência social, como violência doméstica e abuso infantil.',
        conceptText: 'Justiça',
        illustrationType: 'legal',
        tags: ['Legislação', 'Perícia', 'Intersetorialidade'],
        pilarImg: '../../../assets/images/CESMVC - banner Pilar em PNG.png',
        iconOrange: '../../../assets/images/CESMVC - banner Medicina veterinária legal laranja em PNG.png',
        iconGreen: '../../../assets/images/CESMVC - banner Medicina veterinária legal em PNG.png',
        imageScale: 'scale-[1.25]',
        hoverImageScale: 'scale-[1.30]',
        iconTransformOrange: { scale: 5.93, x: '118.6%', y: '41.5%' },
        iconTransformGreen: { scale: 1.00, x: '0.0%', y: '0.0%' },
    },
];
