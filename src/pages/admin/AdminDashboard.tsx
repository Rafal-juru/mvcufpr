import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import { blogApi } from '../../lib/api'
import { formatDate } from '../../lib/format'
import type { BlogPost } from '../../types'

export default function AdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  useEffect(() => {
    let active = true
    blogApi
      .listAll()
      .then((data) => active && setPosts(data))
      .catch(() => active && setError('Não foi possível carregar os posts.'))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  async function handleDelete(post: BlogPost) {
    if (!window.confirm(`Excluir o post "${post.title}"? Esta ação não pode ser desfeita.`)) {
      return
    }
    setDeletingId(post.id)
    try {
      await blogApi.remove(post.id)
      setPosts((prev) => prev.filter((p) => p.id !== post.id))
    } catch {
      setError('Falha ao excluir o post.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <AdminLayout>
      {/* Cabeçalho da página */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-grift text-gray-900 font-bold text-2xl">Artigos</h1>
          <p className="text-gray-500 text-sm mt-1">
            {posts.length} {posts.length === 1 ? 'artigo' : 'artigos'} no total
          </p>
        </div>
        <Link
          to="/admin/posts/new"
          className="
            inline-flex items-center justify-center gap-2
            bg-cesmvc-green hover:bg-cesmvc-green-dark
            text-white font-semibold text-sm
            px-5 py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5
          "
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Novo artigo
        </Link>
      </div>

      {error && (
        <p className="text-cesmvc-orange-dark bg-cesmvc-orange/10 rounded-lg px-4 py-3 mb-6 text-sm">
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-gray-500 py-16 text-center">Carregando…</p>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <p className="text-gray-500 mb-4">Nenhum artigo cadastrado ainda.</p>
          <Link to="/admin/posts/new" className="text-cesmvc-green font-semibold hover:underline">
            Criar o primeiro artigo
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-400 text-xs uppercase tracking-wider">
                <th className="px-5 py-3 font-semibold">Título</th>
                <th className="px-5 py-3 font-semibold hidden md:table-cell">Categoria</th>
                <th className="px-5 py-3 font-semibold hidden sm:table-cell">Data</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-gray-900 line-clamp-1">{post.title}</p>
                    <p className="text-gray-400 text-xs line-clamp-1">{post.slug}</p>
                  </td>
                  <td className="px-5 py-4 text-gray-600 hidden md:table-cell">{post.category}</td>
                  <td className="px-5 py-4 text-gray-600 hidden sm:table-cell whitespace-nowrap">
                    {formatDate(post.publishedAt)}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                        post.status === 'published'
                          ? 'bg-cesmvc-green/10 text-cesmvc-green'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/posts/${post.id}`}
                        className="text-cesmvc-blue hover:text-cesmvc-blue-dark font-semibold px-3 py-1.5 rounded-lg hover:bg-cesmvc-blue/5 transition-colors"
                      >
                        Editar
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(post)}
                        disabled={deletingId === post.id}
                        className="text-cesmvc-orange-dark hover:text-cesmvc-orange font-semibold px-3 py-1.5 rounded-lg hover:bg-cesmvc-orange/5 transition-colors disabled:opacity-50"
                      >
                        {deletingId === post.id ? 'Excluindo…' : 'Excluir'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  )
}
