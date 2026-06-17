import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect, useCallback } from 'react'

interface Props {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

type ToolbarButtonProps = {
  onClick: () => void
  active?: boolean
  title: string
  children: React.ReactNode
}

function Btn({ onClick, active, title, children }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => { e.preventDefault(); onClick() }}
      className={`
        px-2.5 py-1.5 rounded-lg text-sm transition-colors select-none
        ${active
          ? 'bg-cesmvc-green text-white'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
      `}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <span className="w-px h-5 bg-gray-200 mx-1 self-center" />
}

export default function RichTextEditor({ value, onChange, placeholder }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Underline,
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-cesmvc-blue underline' } }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: placeholder || 'Escreva o conteúdo do artigo…' }),
    ],
    content: value || '',
    onUpdate({ editor }) {
      onChange(editor.isEmpty ? '' : editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none min-h-[320px] px-4 py-3 focus:outline-none',
      },
    },
  })

  // Sync external value changes (load existing post).
  useEffect(() => {
    if (!editor) return
    if (value !== editor.getHTML()) editor.commands.setContent(value || '')
  }, [value, editor])

  const setLink = useCallback(() => {
    if (!editor) return
    const prev = editor.getAttributes('link').href as string | undefined
    const url = window.prompt('URL do link:', prev ?? 'https://')
    if (url === null) return
    if (url === '') { editor.chain().focus().unsetLink().run(); return }
    editor.chain().focus().setLink({ href: url }).run()
  }, [editor])

  if (!editor) return null

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:border-cesmvc-green focus-within:ring-2 focus-within:ring-cesmvc-green/20 transition">
      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 bg-gray-50 border-b border-gray-200">
        {/* Desfazer / Refazer */}
        <Btn title="Desfazer" onClick={() => editor.chain().focus().undo().run()}>↩</Btn>
        <Btn title="Refazer"  onClick={() => editor.chain().focus().redo().run()}>↪</Btn>
        <Divider />

        {/* Títulos */}
        <Btn title="Título 2" active={editor.isActive('heading', { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </Btn>
        <Btn title="Título 3" active={editor.isActive('heading', { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          H3
        </Btn>
        <Divider />

        {/* Formatação inline */}
        <Btn title="Negrito (Ctrl+B)" active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}>
          <strong>B</strong>
        </Btn>
        <Btn title="Itálico (Ctrl+I)" active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}>
          <em>I</em>
        </Btn>
        <Btn title="Sublinhado (Ctrl+U)" active={editor.isActive('underline')}
          onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <u>U</u>
        </Btn>
        <Divider />

        {/* Listas */}
        <Btn title="Lista com marcadores" active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}>
          ≡
        </Btn>
        <Btn title="Lista numerada" active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          1≡
        </Btn>
        <Divider />

        {/* Citação + Link */}
        <Btn title="Citação" active={editor.isActive('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          "
        </Btn>
        <Btn title="Link" active={editor.isActive('link')} onClick={setLink}>
          🔗
        </Btn>
        <Divider />

        {/* Alinhamento */}
        <Btn title="Alinhar à esquerda"  active={editor.isActive({ textAlign: 'left' })}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}>⇐</Btn>
        <Btn title="Centralizar" active={editor.isActive({ textAlign: 'center' })}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}>≡</Btn>
        <Btn title="Alinhar à direita" active={editor.isActive({ textAlign: 'right' })}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}>⇒</Btn>
        <Divider />

        {/* Separador horizontal */}
        <Btn title="Linha separadora"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          —
        </Btn>
      </div>

      {/* ── Área de edição ── */}
      <EditorContent editor={editor} />
    </div>
  )
}
