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

/* Strip HTML tags, count words (~200 wpm), minimum 1 minute. */
export function estimateReadingMinutes(content) {
  const text = (content || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = text.split(' ').filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
