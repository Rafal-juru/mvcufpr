import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import BlogHeader from '../components/blog/BlogHeader'
import SiteFooter from '../components/layout/SiteFooter'
import { blogApi } from '../lib/api'
import { renderMarkdown } from '../lib/markdown'
import { formatDate } from '../lib/format'
import type { BlogPost } from '../types'

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    let active = true
    blogApi
      .getBySlug(slug)
      .then((data) => active && setPost(data))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [slug])

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <BlogHeader />

      <main className="flex-1">
        {loading && (
          <p className="text-gray-500 text-center py-32">Carregando artigo…</p>
        )}

        {!loading && !post && (
          <div className="max-w-2xl mx-auto px-4 py-32 text-center">
            <h1 className="font-grift text-gray-900 font-bold text-2xl mb-4">
              Artigo não encontrado
            </h1>
            <p className="text-gray-500 mb-8">
              O artigo que você procura não existe ou ainda não foi publicado.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-cesmvc-green font-semibold hover:text-cesmvc-green-dark"
            >
              ← Voltar para o blog
            </Link>
          </div>
        )}

        {!loading && post && (
          <article>
            {/* ── Hero do artigo ── */}
            <header className="relative bg-cesmvc-blue overflow-hidden">
              <div
                className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
                style={{ background: '#D96C2B' }}
                aria-hidden="true"
              />
              <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-6 transition-colors"
                >
                  ← Voltar para o blog
                </Link>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-white/15 mb-4">
                  {post.category}
                </span>
                <h1
                  className="font-grift text-white font-bold leading-tight mb-5"
                  style={{ fontSize: 'clamp(1.85rem, 4.5vw, 3rem)' }}
                >
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-white/70 text-sm">
                  <span className="text-white/90 font-medium">{post.author}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingMinutes} min de leitura</span>
                </div>
              </div>
            </header>

            {/* ── Cover ── */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full aspect-[16/9] object-cover rounded-2xl shadow-xl"
              />
            </div>

            {/* ── Corpo ── */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
              <p className="text-lg text-gray-500 leading-relaxed mb-8 font-medium">
                {post.excerpt}
              </p>
              <div className="text-base">{renderMarkdown(post.content)}</div>

              {/* CTA final */}
              <div className="mt-14 p-8 rounded-2xl bg-cesmvc-sand border border-cesmvc-sand-dark text-center">
                <h2 className="font-grift text-gray-900 font-bold text-xl mb-2">
                  Quer se aprofundar na Medicina Veterinária Coletiva?
                </h2>
                <p className="text-gray-600 text-sm mb-5">
                  Conheça a especialização do CESMVC – UFPR.
                </p>
                <Link
                  to="/#investimento"
                  className="
                    inline-flex items-center gap-2
                    bg-cesmvc-orange hover:bg-cesmvc-orange-dark
                    text-white font-semibold text-sm
                    px-6 py-3 rounded-full transition-all duration-300 hover:-translate-y-0.5
                  "
                >
                  Conhecer o curso
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </article>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
