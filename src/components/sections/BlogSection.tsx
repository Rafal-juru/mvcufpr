import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../blog/BlogCard';
import { blogApi } from '../../lib/api';
import type { BlogPost } from '../../types';

/* Teaser do blog na landing page: mostra os 3 artigos publicados mais recentes
   e leva para a página completa em /blog. */
export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    blogApi
      .listPublished()
      .then((data) => active && setPosts(data.slice(0, 3)))
      .catch((err) => console.error('Erro ao buscar posts:', err))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="blog" className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 text-cesmvc-green text-xs font-bold tracking-widest uppercase mb-4">
          <span className="w-8 h-px bg-cesmvc-green inline-block" />
          Ciência e Informação
        </span>
        <h2 className="font-grift text-gray-900 text-3xl sm:text-4xl font-bold mb-12">
          Artigos e Recursos
        </h2>

        {loading ? (
          <p className="text-gray-500 text-center py-12">Carregando artigos…</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-500 text-center py-12">Nenhum artigo publicado ainda.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-cesmvc-green font-semibold hover:text-cesmvc-green-dark transition-colors"
              >
                Ver todos os artigos
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
