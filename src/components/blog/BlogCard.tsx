import { Link } from 'react-router-dom'
import type { BlogPost } from '../../types'
import { formatDate } from '../../lib/format'

/* Card de artigo no padrão visual do projeto (rounded-2xl, hover-lift). */
export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="
        group relative flex flex-col
        bg-white rounded-2xl overflow-hidden
        border border-gray-100
        shadow-sm hover:shadow-xl
        transition-all duration-300 ease-out
        hover:-translate-y-1
      "
    >
      {/* Cover */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <img
          src={post.coverImage}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-cesmvc-green/95 backdrop-blur-sm">
          {post.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingMinutes} min de leitura</span>
        </div>

        <h3 className="font-grift text-gray-900 font-bold text-lg leading-snug mb-2 group-hover:text-cesmvc-green transition-colors">
          {post.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        <span className="inline-flex items-center gap-2 mt-4 text-cesmvc-green font-semibold text-sm">
          Ler artigo
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </Link>
  )
}
