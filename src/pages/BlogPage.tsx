import { useEffect, useMemo, useState } from 'react'
import BlogHeader from '../components/blog/BlogHeader'
import SiteFooter from '../components/layout/SiteFooter'
import BlogCard from '../components/blog/BlogCard'
import { blogApi } from '../lib/api'
import type { BlogPost } from '../types'

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('Todos')

  useEffect(() => {
    let active = true
    blogApi
      .listPublished()
      .then((data) => active && setPosts(data))
      .catch(() => active && setError('Não foi possível carregar os artigos.'))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  const categories = useMemo(
    () => ['Todos', ...Array.from(new Set(posts.map((p) => p.category)))],
    [posts],
  )

  const filtered = useMemo(
    () =>
      activeCategory === 'Todos'
        ? posts
        : posts.filter((p) => p.category === activeCategory),
    [posts, activeCategory],
  )

  return (
    <div className="min-h-screen bg-cesmvc-sand font-sans flex flex-col">
      <BlogHeader />

      {/* ── Hero ── */}
      <section className="relative bg-cesmvc-green overflow-hidden">
        <div
          className="absolute -top-32 -right-24 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: '#D96C2B' }}
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <span className="inline-flex items-center gap-2 text-white/70 text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-8 h-px bg-white/50 inline-block" />
            Conteúdo & SEO
          </span>
          <h1
            className="font-grift text-white font-bold leading-tight mb-5"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Artigos e Recursos
          </h1>
          <p className="text-white/80 leading-relaxed max-w-2xl" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)' }}>
            Conhecimento científico aplicado à medicina veterinária coletiva: Saúde
            Única, epidemiologia, manejo populacional e políticas públicas.
          </p>
        </div>
      </section>

      {/* ── Conteúdo ── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Filtros de categoria */}
        {!loading && !error && posts.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`
                  px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200
                  ${
                    activeCategory === cat
                      ? 'bg-cesmvc-green text-white shadow-md shadow-cesmvc-green/30'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-cesmvc-green hover:text-cesmvc-green'
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <p className="text-gray-500 text-center py-20">Carregando artigos…</p>
        )}

        {error && (
          <p className="text-cesmvc-orange-dark text-center py-20">{error}</p>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p className="text-gray-500 text-center py-20">
            Nenhum artigo publicado ainda. Volte em breve!
          </p>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
