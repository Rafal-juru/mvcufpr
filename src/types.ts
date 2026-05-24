export interface CardComponentData {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    conceptText: string;
    illustrationType: 'legal' | 'indigenista' | 'desastres' | 'saude-unica' | 'manejo-populacional' | 'bem-estar' | 'politicas-publicas' | 'gestao-abrigos';
    tags: string[];
}

