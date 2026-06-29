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
  const [whatsAppClicks, setWhatsAppClicks] = useState<number>(0)

  useEffect(() => {
    // Load WhatsApp click count from localStorage
    try {
      const clicks = parseInt(localStorage.getItem('whatsapp_clicks') ?? '0', 10)
      setWhatsAppClicks(isNaN(clicks) ? 0 : clicks)
    } catch {
      setWhatsAppClicks(0)
    }

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

  function handleResetClicks() {
    if (!window.confirm('Zerar o contador de cliques no WhatsApp?')) return
    try {
      localStorage.setItem('whatsapp_clicks', '0')
      setWhatsAppClicks(0)
    } catch {
      // noop
    }
  }

  return (
    <AdminLayout>
      {/* ── Card de Métricas: WhatsApp ── */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          className="relative flex flex-col justify-between rounded-2xl p-6 text-white overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #2E6F57 0%, #1e4f3d 100%)' }}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">CTA Principal</p>
              <p className="text-white font-semibold text-sm">Inscreva-se via WhatsApp</p>
            </div>
            {/* WhatsApp icon */}
            <div className="flex-shrink-0 w-10 h-10 bg-white/15 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413A11.824 11.824 0 0012.05 0zm0 21.785a9.86 9.86 0 01-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374a9.861 9.861 0 01-1.51-5.26C2.182 6.455 6.635 2 12.05 2a9.84 9.84 0 016.986 2.896 9.842 9.842 0 012.896 6.99c-.003 5.45-4.437 9.899-9.882 9.899z" />
              </svg>
            </div>
          </div>
          <div>
            <span className="font-grift text-white font-black leading-none" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
              {whatsAppClicks}
            </span>
            <p className="text-white/60 text-xs mt-1">cliques registrados nesta sessão/dispositivo</p>
          </div>
          <button
            type="button"
            onClick={handleResetClicks}
            className="mt-4 text-white/50 hover:text-white text-xs underline underline-offset-2 transition-colors self-start"
          >
            Zerar contador
          </button>
        </div>
      </div>

      {/* Cabeçalho da página */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-grift text-gray-900 font-black text-2xl">Artigos</h1>
          <p className="text-gray-500 text-sm mt-1">
            {posts.length} {posts.length === 1 ? 'artigo' : 'artigos'} no total
          </p>
        </div>
        <Link
          to="/admin/posts/new"
          className="
            inline-flex items-center justify-center gap-2
            bg-cesmvc-blue hover:bg-cesmvc-blue-dark
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
          <Link to="/admin/posts/new" className="text-cesmvc-blue font-semibold hover:underline">
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
                          ? 'bg-cesmvc-blue/10 text-cesmvc-blue'
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
