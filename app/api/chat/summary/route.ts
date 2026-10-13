import { NextResponse } from 'next/server'
import { DEEPSEEK_URL } from '../deepseek'
import { formspreeEndpoint } from '../../../data/profile'

export const maxDuration = 30

type ChatMessage = { role: 'user' | 'assistant'; content: string }

const MAX_MESSAGES = 40
const MAX_CHARS = 1500
const FORMSPREE_URL = process.env.FORMSPREE_ENDPOINT?.trim() || formspreeEndpoint

const SUMMARY_PROMPT = `Você recebe a transcrição de uma conversa entre um visitante do portfólio do Felipe Rogai e o assistente de IA que responde por ele no site.
Escreva um resumo curto em português para o Felipe ler no e-mail. Use texto simples, sem markdown, exatamente com estas seções:

Resumo: 2 ou 3 frases sobre o que foi conversado.
O que o visitante queria: 1 frase.
Assuntos para estudar: temas que o assistente disse que o Felipe ainda não domina, separados por vírgula. Se não houver, escreva "Nenhum".
Contato do visitante: nome, e-mail, empresa ou telefone que ele informou. Se não informou nada, escreva "Não informado".
Próximo passo sugerido: 1 frase.

Não invente nada que não esteja na conversa. Não use travessão nem parênteses.`

// Limite simples por IP para evitar spam no e-mail (melhor esforço, por instância)
const hits = new Map<string, number[]>()
function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > 6
}

function parseMessages(value: unknown): ChatMessage[] {
  if (!Array.isArray(value)) return []
  return value
    .filter(
      (m): m is ChatMessage =>
        !!m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim().length > 0
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }))
}

async function summarize(transcript: string): Promise<string | null> {
  const apiKey = process.env.DEEPSEEK_API_KEY?.trim()
  if (!apiKey) return null
  try {
    const response = await fetch(DEEPSEEK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: SUMMARY_PROMPT },
          { role: 'user', content: transcript }
        ],
        temperature: 0.3,
        max_tokens: 400
      }),
      cache: 'no-store'
    })
    if (!response.ok) {
      console.error('DeepSeek summary error', response.status, await response.text().catch(() => ''))
      return null
    }
    const data = await response.json()
    const summary: unknown = data?.choices?.[0]?.message?.content
    return typeof summary === 'string' && summary.trim() ? summary.trim() : null
  } catch (error) {
    console.error('DeepSeek summary failed', error)
    return null
  }
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (rateLimited(ip)) return NextResponse.json({ error: 'Muitas requisições' }, { status: 429 })

  const body = await req.json().catch(() => null)
  const messages = parseMessages(body?.messages)
  const userMessages = messages.filter((m) => m.role === 'user')
  if (userMessages.length === 0 || !messages.some((m) => m.role === 'assistant')) {
    return NextResponse.json({ error: 'Conversa vazia' }, { status: 400 })
  }

  const transcript = messages.map((m) => `${m.role === 'user' ? 'Visitante' : 'Assistente'}: ${m.content}`).join('\n\n')
  const summary = (await summarize(transcript)) ?? 'Resumo automático indisponível no momento. Veja a conversa completa abaixo.'

  // Se o visitante deixou um e-mail na conversa, ele vira o "responder para" do Formspree
  const visitorEmail = userMessages.map((m) => m.content.match(/[\w.+-]+@[\w-]+\.[\w.-]+/)?.[0]).find(Boolean)
  const firstQuestion = userMessages[0].content.replace(/\s+/g, ' ').slice(0, 60)

  try {
    const response = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `Conversa no chat do portfólio: ${firstQuestion}`,
        name: 'Chat do portfólio (IA)',
        ...(visitorEmail ? { email: visitorEmail } : {}),
        message: summary
      }),
      cache: 'no-store'
    })
    if (!response.ok) {
      console.error('Formspree error', response.status, await response.text().catch(() => ''))
      return NextResponse.json({ error: 'Falha ao enviar o resumo' }, { status: 502 })
    }
  } catch (error) {
    console.error('Formspree request failed', error)
    return NextResponse.json({ error: 'Falha ao enviar o resumo' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
