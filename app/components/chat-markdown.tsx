import type { ReactNode } from "react"

// Formatação leve para as respostas do chat: **negrito**, *itálico*, `código`,
// [links](url), URLs soltas e listas. Gera elementos React, sem injetar HTML.
const INLINE = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|`[^`]+`|\[[^\]]+\]\(https?:\/\/[^\s)]+\)|https?:\/\/[^\s<]+[^\s<.,;:!?)\]])/g

function Anchor({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="break-words font-medium text-primary underline underline-offset-2">
      {children}
    </a>
  )
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  return text.split(INLINE).map((part, i) => {
    const key = `${keyPrefix}-${i}`
    if (!part) return null
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={key} className="font-semibold">{part.slice(2, -2)}</strong>
    if (part.startsWith("`") && part.endsWith("`")) return <code key={key} className="rounded bg-background/60 px-1 py-0.5 font-mono text-[0.85em]">{part.slice(1, -1)}</code>
    const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/)
    if (link) return <Anchor key={key} href={link[2]}>{link[1]}</Anchor>
    if (/^https?:\/\//.test(part)) return <Anchor key={key} href={part}>{part.replace(/^https?:\/\/(www\.)?/, "")}</Anchor>
    if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) return <em key={key}>{part.slice(1, -1)}</em>
    return part
  })
}

export default function ChatMarkdown({ text }: { text: string }) {
  const blocks: ReactNode[] = []
  let list: { ordered: boolean; items: string[] } | null = null
  let paragraph: string[] = []

  const flushParagraph = () => {
    if (!paragraph.length) return
    const k = `p${blocks.length}`
    blocks.push(
      <p key={k}>
        {paragraph.flatMap((line, i) => (i === 0 ? renderInline(line, `${k}-${i}`) : [<br key={`${k}-br${i}`} />, ...renderInline(line, `${k}-${i}`)]))}
      </p>,
    )
    paragraph = []
  }
  const flushList = () => {
    if (!list) return
    const k = `l${blocks.length}`
    const items = list.items.map((item, i) => <li key={`${k}-${i}`}>{renderInline(item, `${k}-${i}`)}</li>)
    blocks.push(
      list.ordered ? (
        <ol key={k} className="list-decimal space-y-1 pl-5">{items}</ol>
      ) : (
        <ul key={k} className="list-disc space-y-1 pl-5 marker:text-primary">{items}</ul>
      ),
    )
    list = null
  }

  for (const raw of text.split("\n")) {
    const line = raw.replace(/^#{1,6}\s+/, "").trimEnd()
    const bullet = line.match(/^\s*[-*•]\s+(.*)$/)
    const numbered = line.match(/^\s*\d+[.)]\s+(.*)$/)
    if (bullet || numbered) {
      flushParagraph()
      const ordered = !!numbered
      if (!list || list.ordered !== ordered) {
        flushList()
        list = { ordered, items: [] }
      }
      list.items.push((bullet ?? numbered)![1])
    } else if (!line.trim()) {
      flushParagraph()
      flushList()
    } else {
      flushList()
      paragraph.push(line)
    }
  }
  flushParagraph()
  flushList()

  return <div className="space-y-2 leading-relaxed">{blocks}</div>
}
