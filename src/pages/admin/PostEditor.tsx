import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import RichTextEditor from '../../components/admin/RichTextEditor'
import ImageUploader from '../../components/ui/ImageUploader'
import { blogApi } from '../../lib/api'
import { slugify, formatDate } from '../../lib/format'
import type { BlogPostInput, PostStatus } from '../../types'

const EMPTY: BlogPostInput = {
  slug: '',
  title: '',
  excerpt: '',
  content: '',
  category: '',
  coverImage: '',
  author: '',
  status: 'draft',
  publishedAt: new Date().toISOString().slice(0, 10),
}

const inputClass =
  'w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-cesmvc-green focus:ring-2 focus:ring-cesmvc-green/20 outline-none transition text-sm'

export default function PostEditor() {
  const { id } = useParams<{ id: string }>()
  const isEditing = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState<BlogPostInput>(EMPTY)
  const [slugTouched, setSlugTouched] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isEditing) return
    blogApi
      .getById(Number(id))
      .then((post) => {
        if (!post) { setError('Post não encontrado.'); return }
        const { id: _id, readingMinutes: _r, ...rest } = post
        void _id; void _r
        setForm(rest)
        setSlugTouched(true)
      })
      .finally(() => setLoading(false))
  }, [id, isEditing])

  function update<K extends keyof BlogPostInput>(key: K, value: BlogPostInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleTitleChange(value: string) {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: slugTouched ? prev.slug : slugify(value),
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSaving(true)
    try {
      const payload: BlogPostInput = { ...form, slug: form.slug || slugify(form.title) }
      if (isEditing) await blogApi.update(Number(id), payload)
      else await blogApi.create(payload)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao salvar o post.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <AdminLayout><p className="text-gray-500 py-16 text-center">Carregando…</p></AdminLayout>
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <button type="button" onClick={() => navigate('/admin')}
          className="text-gray-400 hover:text-cesmvc-green text-sm font-medium mb-3 transition-colors">
          ← Voltar para a lista
        </button>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h1 className="font-grift text-gray-900 font-bold text-2xl">
            {isEditing ? 'Editar artigo' : 'Novo artigo'}
          </h1>
          <button type="button" onClick={() => setShowPreview((v) => !v)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
              showPreview
                ? 'bg-cesmvc-green text-white border-cesmvc-green'
                : 'bg-white text-gray-600 border-gray-200 hover:border-cesmvc-green hover:text-cesmvc-green'
            }`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {showPreview ? 'Ocultar preview' : 'Ver preview do card'}
          </button>
        </div>
      </div>

      {/* ── Preview do card ── */}
      {showPreview && (
        <div className="mb-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            Preview — como o card aparece no blog
          </p>
          <CardPreview form={form} />
        </div>
      )}

      {error && (
        <p className="text-cesmvc-orange-dark bg-cesmvc-orange/10 rounded-lg px-4 py-3 mb-6 text-sm">{error}</p>
      )}

      <form onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 flex flex-col gap-5">

        {/* Título */}
        <Field label="Título" htmlFor="title">
          <input id="title" type="text" required value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className={inputClass}
            placeholder="Ex.: One Health na prática do serviço público" />
        </Field>

        {/* Slug — oculto, gerado automaticamente a partir do título */}
        <input type="hidden" value={form.slug} readOnly />

        {/* Categoria + Autor */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Categoria" htmlFor="category">
            <input id="category" type="text" required value={form.category}
              onChange={(e) => update('category', e.target.value)}
              className={inputClass} placeholder="Saúde Única" />
          </Field>
          <Field label="Autor" htmlFor="author">
            <input id="author" type="text" required value={form.author}
              onChange={(e) => update('author', e.target.value)}
              className={inputClass} placeholder="Profa. Dra. Camila Rocha" />
          </Field>
        </div>

        {/* Imagem de capa */}
        <ImageUploader onImageUrl={(url) => update('coverImage', url)} label="Imagem de capa" />

        {/* Resumo */}
        <Field label="Resumo" htmlFor="excerpt" hint="Aparece nos cards e no e-mail da newsletter">
          <textarea id="excerpt" required rows={2} value={form.excerpt}
            onChange={(e) => update('excerpt', e.target.value)}
            className={inputClass}
            placeholder="Uma ou duas frases que resumem o artigo." />
        </Field>

        {/* Conteúdo — editor rico */}
        <Field label="Conteúdo" htmlFor="content">
          <RichTextEditor
            value={form.content}
            onChange={(html) => update('content', html)}
            placeholder="Escreva o conteúdo do artigo aqui…"
          />
        </Field>

        {/* Status + Data */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Status" htmlFor="status">
            <select id="status" value={form.status}
              onChange={(e) => update('status', e.target.value as PostStatus)}
              className={inputClass}>
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
            </select>
          </Field>
          <Field label="Data de publicação" htmlFor="publishedAt">
            <input id="publishedAt" type="date" required value={form.publishedAt}
              onChange={(e) => update('publishedAt', e.target.value)}
              className={inputClass} />
          </Field>
        </div>

        {/* Ações */}
        <div className="flex items-center gap-3 pt-2 border-t border-gray-100 mt-2">
          <button type="submit" disabled={saving}
            className="inline-flex items-center justify-center gap-2 bg-cesmvc-green hover:bg-cesmvc-green-dark text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed">
            {saving ? 'Salvando…' : isEditing ? 'Salvar alterações' : 'Criar artigo'}
          </button>
          <button type="button" onClick={() => navigate('/admin')}
            className="text-gray-500 hover:text-gray-700 font-semibold text-sm px-4 py-3">
            Cancelar
          </button>
        </div>
      </form>
    </AdminLayout>
  )
}

/* ── Preview do card em tempo real ── */
function CardPreview({ form }: { form: BlogPostInput }) {
  const readingEst = Math.max(1, Math.ceil((form.content.replace(/<[^>]+>/g, '').split(/\s+/).length) / 200))

  return (
    <div className="max-w-sm">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {form.coverImage ? (
          <img src={form.coverImage} alt={form.title}
            className="w-full h-44 object-cover" />
        ) : (
          <div className="w-full h-44 bg-gray-100 flex items-center justify-center text-gray-300 text-sm">
            Sem imagem de capa
          </div>
        )}
        <div className="p-5">
          {form.category && (
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-cesmvc-green/10 text-cesmvc-green mb-3">
              {form.category}
            </span>
          )}
          <h3 className="font-grift text-gray-900 font-bold text-lg leading-snug mb-2 line-clamp-2">
            {form.title || 'Título do artigo'}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
            {form.excerpt || 'Resumo do artigo aparece aqui…'}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{form.author || 'Autor'}</span>
            <div className="flex items-center gap-2">
              <span>{form.publishedAt ? formatDate(form.publishedAt) : '—'}</span>
              <span>·</span>
              <span>{readingEst} min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, htmlFor, hint, children }: {
  label: string; htmlFor: string; hint?: string; children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
        {hint && <span className="ml-2 font-normal text-gray-400 text-xs">{hint}</span>}
      </label>
      {children}
    </div>
  )
}
