import type { ReactNode } from 'react'

/*
  Renderizador de Markdown minimalista e sem dependências, suficiente para o
  corpo dos artigos do blog (títulos, parágrafos, listas, citações e **negrito**).
  Mantém o frontend leve; se no futuro for preciso suporte completo, trocar por
  uma lib como react-markdown.
*/

/** Converte **negrito** em <strong> dentro de um trecho de texto. */
function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-gray-900">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return <span key={i}>{part}</span>
  })
}

export function renderMarkdown(markdown: string): ReactNode {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n')
  const blocks: ReactNode[] = []
  let list: string[] | null = null
  let ordered = false

  const flushList = () => {
    if (!list) return
    const items = list.map((item, i) => (
      <li key={i} className="leading-relaxed">
        {renderInline(item)}
      </li>
    ))
    blocks.push(
      ordered ? (
        <ol key={`l${blocks.length}`} className="list-decimal pl-6 my-5 flex flex-col gap-2 text-gray-700">
          {items}
        </ol>
      ) : (
        <ul key={`l${blocks.length}`} className="list-disc pl-6 my-5 flex flex-col gap-2 text-gray-700">
          {items}
        </ul>
      ),
    )
    list = null
  }

  lines.forEach((raw) => {
    const line = raw.trimEnd()

    if (!line.trim()) {
      flushList()
      return
    }

    // Listas
    const ulMatch = line.match(/^[-*]\s+(.*)$/)
    const olMatch = line.match(/^\d+\.\s+(.*)$/)
    if (ulMatch || olMatch) {
      const isOrdered = Boolean(olMatch)
      if (list && ordered !== isOrdered) flushList()
      ordered = isOrdered
      list = list ?? []
      list.push((ulMatch?.[1] ?? olMatch?.[1]) as string)
      return
    }
    flushList()

    // Títulos
    if (line.startsWith('### ')) {
      blocks.push(
        <h3 key={blocks.length} className="font-grift text-gray-900 font-bold text-xl mt-8 mb-3">
          {renderInline(line.slice(4))}
        </h3>,
      )
      return
    }
    if (line.startsWith('## ')) {
      blocks.push(
        <h2 key={blocks.length} className="font-grift text-gray-900 font-black text-2xl mt-10 mb-4">
          {renderInline(line.slice(3))}
        </h2>,
      )
      return
    }
    if (line.startsWith('# ')) {
      blocks.push(
        <h1 key={blocks.length} className="font-grift text-gray-900 font-black text-3xl mt-10 mb-4">
          {renderInline(line.slice(2))}
        </h1>,
      )
      return
    }

    // Citação
    if (line.startsWith('> ')) {
      blocks.push(
        <blockquote
          key={blocks.length}
          className="border-l-4 border-cesmvc-orange pl-5 my-6 italic text-gray-600"
        >
          {renderInline(line.slice(2))}
        </blockquote>,
      )
      return
    }

    // Parágrafo
    blocks.push(
      <p key={blocks.length} className="text-gray-700 leading-relaxed my-4">
        {renderInline(line)}
      </p>,
    )
  })

  flushList()
  return <>{blocks}</>
}
