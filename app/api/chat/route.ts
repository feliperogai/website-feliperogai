import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { buildKnowledge } from './knowledge'
import type { Language } from '../../i18n/translations'

export const maxDuration = 30

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

const DEEPSEEK_URL = `${process.env.DEEPSEEK_BASE_URL?.trim() || 'https://api.deepseek.com/v1'}/chat/completions`
const MAX_HISTORY = 20
const MAX_CHARS = 2000

const persona = (() => {
  try {
    const promptPath = path.join(process.cwd(), 'prompts', 'system-prompt.md')
    return fs.readFileSync(promptPath, 'utf-8')
  } catch (error) {
    console.error('Could not read system prompt file', error)
    return 'Você é o Felipe Rogai conversando com visitantes do seu portfólio. Responda em primeira pessoa, de forma natural e curta, apenas com fatos da base de conhecimento.'
  }
})()

function parseLanguage(value: unknown): Language {
  return value === 'en' || value === 'es' ? value : 'pt'
}

export async function POST(req: Request) {
  const apiKey = process.env.DEEPSEEK_API_KEY?.trim()

  if (!apiKey) {
    return NextResponse.json(
      { error: 'DeepSeek API key missing on server' },
      { status: 500 }
    )
  }

  const body = await req.json().catch(() => null)

  if (!body || !body.message) {
    return NextResponse.json(
      { error: 'Campo "message" é obrigatório' },
      { status: 400 }
    )
  }

  const userMessage = String(body.message).slice(0, MAX_CHARS)

  type HistoryCandidate = { role?: unknown; content?: unknown }

  const history: ChatMessage[] = Array.isArray(body.history)
    ? (body.history as HistoryCandidate[])
        .filter(
          (item): item is { role: ChatMessage['role']; content: string } =>
            !!item &&
            (item.role === 'user' || item.role === 'assistant') &&
            typeof item.content === 'string' &&
            item.content.trim().length > 0
        )
        .map((item) => ({
          role: item.role,
          content: item.content.slice(0, MAX_CHARS)
        }))
    : []

  const messages = [
    { role: 'system', content: `${persona}\n\n${buildKnowledge(parseLanguage(body.language))}` },
    ...history.slice(-MAX_HISTORY),
    { role: 'user', content: userMessage }
  ]

  let upstream: Response
  try {
    upstream = await fetch(DEEPSEEK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages,
        temperature: 0.7,
        max_tokens: 700,
        stream: true
      }),
      cache: 'no-store'
    })
  } catch (error) {
    console.error('DeepSeek request failed', error)
    return NextResponse.json(
      { error: 'Erro ao processar sua mensagem.' },
      { status: 500 }
    )
  }

  if (!upstream.ok || !upstream.body) {
    const errorText = await upstream.text().catch(() => '')
    console.error('DeepSeek API error', upstream.status, errorText)
    return NextResponse.json(
      {
        error:
          upstream.status === 401
            ? 'Chave DeepSeek inválida ou ausente no servidor. Verifique a variável DEEPSEEK_API_KEY.'
            : 'Não foi possível obter resposta no momento.'
      },
      { status: upstream.status === 401 ? 401 : 502 }
    )
  }

  // Repassa só o texto dos eventos SSE da DeepSeek, para o widget exibir a resposta enquanto é gerada
  const reader = upstream.body.getReader()
  const decoder = new TextDecoder()
  const encoder = new TextEncoder()

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let buffer = ''
      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() ?? ''
          for (const line of lines) {
            const trimmed = line.trim()
            if (!trimmed.startsWith('data:')) continue
            const data = trimmed.slice(5).trim()
            if (!data || data === '[DONE]') continue
            try {
              const delta: unknown = JSON.parse(data)?.choices?.[0]?.delta?.content
              if (typeof delta === 'string' && delta) controller.enqueue(encoder.encode(delta))
            } catch {
              // evento incompleto ou de keep-alive: ignora
            }
          }
        }
        controller.close()
      } catch (error) {
        console.error('DeepSeek stream failed', error)
        controller.error(error)
      }
    },
    cancel() {
      reader.cancel().catch(() => {})
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Accel-Buffering': 'no'
    }
  })
}
