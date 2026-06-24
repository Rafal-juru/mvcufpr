export interface CardComponentData {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    /** Texto completo aprovado exibido no modal (REDAÇÃO 4) */
    modalText: string;
    conceptText: string;
    illustrationType: 'legal' | 'indigenista' | 'desastres' | 'saude-unica' | 'manejo-populacional' | 'bem-estar' | 'politicas-publicas' | 'gestao-abrigos';
    tags: string[];
    pilarImg: string;
    iconOrange: string;
    iconGreen: string;
    /** Custom transform for icons with small artwork inside a large canvas */
    iconTransform?: { scale: number; x: string; y: string };
    iconTransformOrange?: { scale: number; x: string; y: string };
    iconTransformGreen?: { scale: number; x: string; y: string };
}

/* ─── Blog ──────────────────────────────────────────────────────────── */

export type PostStatus = 'draft' | 'published';

export interface BlogPost {
    id: number;
    /** URL-friendly identifier used in /blog/:slug */
    slug: string;
    title: string;
    /** Short summary shown in cards and meta description */
    excerpt: string;
    /** Full article body (Markdown) */
    content: string;
    /** Editorial category, e.g. "Saúde Única" */
    category: string;
    /** Cover image URL (absolute or relative to the public root) */
    coverImage: string;
    author: string;
    status: PostStatus;
    /** ISO date string (YYYY-MM-DD) */
    publishedAt: string;
    /** Estimated reading time in minutes */
    readingMinutes: number;
}

/** Payload used when creating/updating a post from the admin panel */
export type BlogPostInput = Omit<BlogPost, 'id' | 'readingMinutes'>;

/* ─── Auth ──────────────────────────────────────────────────────────── */

export interface AuthUser {
    id: number;
    name: string;
    email: string;
}

export interface AuthSession {
    token: string;
    user: AuthUser;
}
