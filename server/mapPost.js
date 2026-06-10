/*
  Conversão entre a linha do banco (snake_case) e o objeto BlogPost que o
  frontend espera (camelCase). Mantém o backend alinhado ao contrato definido
  em src/lib/api.ts e src/types.ts.
*/

export function rowToPost(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? '',
    content: row.content,
    category: row.category ?? '',
    coverImage: row.cover_image ?? '',
    author: row.author ?? '',
    status: row.status,
    publishedAt: row.published_at ?? '',
    readingMinutes: row.reading_minutes ?? 1,
  };
}

/* Mesma heurística do mockStore: ~200 palavras por minuto, mínimo de 1. */
export function estimateReadingMinutes(content) {
  const words = (content || '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
