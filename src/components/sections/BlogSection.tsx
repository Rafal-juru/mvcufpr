import { useEffect, useState } from 'react';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  image_url: string;
  category: string;
  author: string;
  created_at: string;
}

export default function BlogSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/posts`)
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao buscar posts:', err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="blog" className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 text-cesmvc-green text-xs font-bold tracking-widest uppercase mb-4">
          <span className="w-8 h-px bg-cesmvc-green inline-block" />
          Conteúdo & SEO
        </span>
        <h2 className="font-grift text-gray-900 text-3xl sm:text-4xl font-bold mb-12">
          Artigos e Recursos
        </h2>

        {loading ? (
          <p className="text-gray-500 text-center">Carregando artigos...</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-500 text-center">Nenhum artigo publicado ainda</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <article key={post.id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                {post.image_url && (
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <span className="text-cesmvc-green text-xs font-bold tracking-widest uppercase">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{post.author}</span>
                    <span>{new Date(post.created_at).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
