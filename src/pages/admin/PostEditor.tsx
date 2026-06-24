import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import { blogApi } from '../../lib/api'
import { slugify } from '../../lib/format'
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
  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /* Carrega o post ao editar */
  useEffect(() => {
    if (!isEditing) return
    blogApi
      .getById(Number(id))
      .then((post) => {
        if (!post) {
          setError('Post não encontrado.')
          return
        }
        const { id: _id, readingMinutes: _r, ...rest } = post
        void _id
        void _r
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
    return (
      <AdminLayout>
        <p className="text-gray-500 py-16 text-center">Carregando…</p>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <button
          type="button"
          onClick={() => navigate('/admin')}
          className="text-gray-400 hover:text-cesmvc-green text-sm font-medium mb-3 transition-colors"
        >
          ← Voltar para a lista
        </button>
        <h1 className="font-grift text-gray-900 font-black text-2xl">
          {isEditing ? 'Editar artigo' : 'Novo artigo'}
        </h1>
      </div>

      {error && (
        <p className="text-cesmvc-orange-dark bg-cesmvc-orange/10 rounded-lg px-4 py-3 mb-6 text-sm">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 flex flex-col gap-5"
      >
        {/* Título */}
        <Field label="Título" htmlFor="title">
          <input
            id="title"
            type="text"
            required
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className={inputClass}
            placeholder="Ex.: One Health na prática do serviço público"
          />
        </Field>

        {/* Slug */}
        <Field label="Slug (URL)" htmlFor="slug" hint={`/blog/${form.slug || 'meu-artigo'}`}>
          <input
            id="slug"
            type="text"
            required
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true)
              update('slug', slugify(e.target.value))
            }}
            className={inputClass}
            placeholder="one-health-na-pratica"
          />
        </Field>

        {/* Categoria + Autor */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Categoria" htmlFor="category">
            <input
              id="category"
              type="text"
              required
              value={form.category}
              onChange={(e) => update('category', e.target.value)}
              className={inputClass}
              placeholder="Saúde Única"
            />
          </Field>
          <Field label="Autor" htmlFor="author">
            <input
              id="author"
              type="text"
              required
              value={form.author}
              onChange={(e) => update('author', e.target.value)}
              className={inputClass}
              placeholder="Profa. Dra. Camila Rocha"
            />
          </Field>
        </div>

        {/* Imagem de capa */}
        <Field label="URL da imagem de capa" htmlFor="coverImage">
          <input
            id="coverImage"
            type="url"
            value={form.coverImage}
            onChange={(e) => update('coverImage', e.target.value)}
            className={inputClass}
            placeholder="https://…/capa.jpg"
          />
          {form.coverImage && (
            <img
              src={form.coverImage}
              alt="Pré-visualização da capa"
              className="mt-3 w-full max-w-sm aspect-[16/9] object-cover rounded-xl border border-gray-100"
            />
          )}
        </Field>

        {/* Resumo */}
        <Field label="Resumo" htmlFor="excerpt" hint="Aparece nos cards e na meta description">
          <textarea
            id="excerpt"
            required
            rows={2}
            value={form.excerpt}
            onChange={(e) => update('excerpt', e.target.value)}
            className={inputClass}
            placeholder="Uma ou duas frases que resumem o artigo."
          />
        </Field>

        {/* Conteúdo */}
        <Field label="Conteúdo (Markdown)" htmlFor="content" hint="Suporta ## títulos, listas, > citações e **negrito**">
          <textarea
            id="content"
            required
            rows={14}
            value={form.content}
            onChange={(e) => update('content', e.target.value)}
            className={`${inputClass} font-mono leading-relaxed`}
            placeholder={'## Subtítulo\n\nTexto do parágrafo...\n\n- item de lista\n- outro item'}
          />
        </Field>

        {/* Status + Data */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Status" htmlFor="status">
            <select
              id="status"
              value={form.status}
              onChange={(e) => update('status', e.target.value as PostStatus)}
              className={inputClass}
            >
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
            </select>
          </Field>
          <Field label="Data de publicação" htmlFor="publishedAt">
            <input
              id="publishedAt"
              type="date"
              required
              value={form.publishedAt}
              onChange={(e) => update('publishedAt', e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>

        {/* Ações */}
        <div className="flex items-center gap-3 pt-2 border-t border-gray-100 mt-2">
          <button
            type="submit"
            disabled={saving}
            className="
              inline-flex items-center justify-center gap-2
              bg-cesmvc-green hover:bg-cesmvc-green-dark
              text-white font-semibold text-sm
              px-6 py-3 rounded-xl transition-all duration-300
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            {saving ? 'Salvando…' : isEditing ? 'Salvar alterações' : 'Criar artigo'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="text-gray-500 hover:text-gray-700 font-semibold text-sm px-4 py-3"
          >
            Cancelar
          </button>
        </div>
      </form>
    </AdminLayout>
  )
}

/* ── Campo de formulário com label e dica ── */
function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string
  htmlFor: string
  hint?: string
  children: React.ReactNode
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
