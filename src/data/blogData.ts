import type { BlogPost } from '../types'

/*
  Seed de artigos usado enquanto o backend PHP/MySQL do Plesk não está
  conectado. Quando a API real estiver no ar, basta definir VITE_USE_MOCK=false
  (ver src/lib/api.ts) — estes dados servem apenas de fallback/demonstração.
*/
export const SEED_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: 'one-health-na-pratica-do-servico-publico',
    title: 'One Health na prática do serviço público',
    excerpt:
      'Como a abordagem de Saúde Única integra vigilância animal, humana e ambiental nos municípios brasileiros — e por que ela é o futuro da saúde coletiva.',
    content:
      '## A Saúde Única deixou de ser teoria\n\nA abordagem **One Health** parte de um princípio simples: a saúde humana, a saúde animal e a saúde ambiental são indissociáveis. No dia a dia do serviço público, isso significa integrar vigilância epidemiológica, controle de zoonoses e gestão ambiental num mesmo fluxo de decisão.\n\n### Onde o médico-veterinário entra\n\nO profissional de medicina veterinária coletiva é peça central nessa engrenagem: atua na vigilância de zoonoses, no manejo populacional ético e na resposta a emergências sanitárias.\n\n- Vigilância integrada de doenças transmissíveis\n- Programas municipais de manejo populacional\n- Resposta coordenada a surtos e desastres\n\n> "Saúde Única não é um departamento — é um jeito de organizar o cuidado."\n\nA formação especializada conecta a evidência científica à prática de gestão, preparando o profissional para liderar essas frentes.',
    category: 'Saúde Única',
    coverImage:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    author: 'Profa. Dra. Camila Rocha',
    status: 'published',
    publishedAt: '2025-05-12',
    readingMinutes: 6,
  },
  {
    id: 2,
    slug: 'manejo-populacional-etico-de-caes-e-gatos',
    title: 'Manejo populacional ético de cães e gatos',
    excerpt:
      'Esterilização, registro e educação em posse responsável: os pilares de uma política pública eficaz e baseada em evidências para populações de animais.',
    content:
      '## Para além do recolhimento\n\nPor décadas o manejo de populações de cães e gatos se resumiu a recolhimento e eliminação — uma estratégia comprovadamente ineficaz e eticamente insustentável.\n\n### Os três pilares modernos\n\n1. **Esterilização cirúrgica** em larga escala e continuada\n2. **Registro e identificação** dos animais\n3. **Educação em guarda responsável** junto à comunidade\n\nPolíticas que combinam os três pilares reduzem de forma sustentável a população em situação de rua e os indicadores de zoonoses associadas.',
    category: 'Manejo Populacional',
    coverImage:
      'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1200&q=80',
    author: 'Prof. Dr. Rafael Souza',
    status: 'published',
    publishedAt: '2025-04-28',
    readingMinutes: 5,
  },
  {
    id: 3,
    slug: 'vigilancia-de-zoonoses-emergentes',
    title: 'Vigilância de zoonoses emergentes',
    excerpt:
      'Da raiva à influenza aviária: como estruturar sistemas de vigilância capazes de detectar e responder rapidamente a ameaças sanitárias emergentes.',
    content:
      '## Detectar cedo, responder rápido\n\nZoonoses emergentes representam um dos maiores desafios da saúde pública contemporânea. A chave está na **detecção precoce** e na **resposta coordenada**.\n\n### Componentes de um sistema robusto\n\n- Rede sentinela de notificação\n- Integração de dados laboratoriais e de campo\n- Georreferenciamento de casos\n- Protocolos de resposta intersetorial\n\nA bioestatística e a epidemiologia aplicada são as ferramentas que transformam dados dispersos em inteligência sanitária acionável.',
    category: 'Epidemiologia',
    coverImage:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    author: 'Prof. Dr. Carlos Vieira',
    status: 'published',
    publishedAt: '2025-04-10',
    readingMinutes: 7,
  },
  {
    id: 4,
    slug: 'gestao-de-abrigos-e-bem-estar-animal',
    title: 'Gestão de abrigos e bem-estar animal',
    excerpt:
      'Indicadores objetivos de bem-estar, protocolos sanitários e gestão de capacidade: como profissionalizar a operação de abrigos públicos e privados.',
    content:
      '## Bem-estar é mensurável\n\nA gestão moderna de abrigos abandona a lógica do acúmulo e adota indicadores objetivos de bem-estar animal, capacidade de cuidado e desfecho responsável.\n\n### O que medir\n\n- Tempo médio de permanência\n- Taxa de adoção e de retorno à comunidade\n- Indicadores sanitários e comportamentais\n\nUma operação baseada em dados protege os animais, a equipe e a saúde pública.',
    category: 'Gestão de Abrigos',
    coverImage:
      'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=1200&q=80',
    author: 'Profa. Dra. Fernanda Lima',
    status: 'draft',
    publishedAt: '2025-06-01',
    readingMinutes: 4,
  },
]
