import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

const systemPrompt = (() => {
  try {
    const promptPath = path.join(process.cwd(), 'prompts', 'system-prompt.md')
    return fs.readFileSync(promptPath, 'utf-8')
  } catch (error) {
    console.error('Could not read system prompt file', error)
    return 'You are Felipe Rogai. Respond only to questions about Felipe Rogai using concise Portuguese unless the user writes in another language.'
  }
})()

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

  const userMessage = String(body.message).slice(0, 2000)

  type HistoryCandidate = { role?: unknown; content?: unknown }

  const history: ChatMessage[] = Array.isArray(body.history)
    ? (body.history as HistoryCandidate[])
        .filter(
          (item): item is { role: ChatMessage['role']; content: string } =>
            !!item &&
            (item.role === 'user' || item.role === 'assistant') &&
            typeof item.content === 'string'
        )
        .map((item) => ({
          role: item.role,
          content: String(item.content).slice(0, 2000)
        }))
    : []

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-10),
    { role: 'user', content: userMessage }
  ]

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages,
        temperature: 0.4,
        max_tokens: 400
      }),
      cache: 'no-store'
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => '')
      console.error('DeepSeek API error', response.status, errorText)
      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Chave DeepSeek inválida ou ausente no servidor. Verifique a variável DEEPSEEK_API_KEY e reinicie o servidor.' },
          { status: 401 }
        )
      }
      return NextResponse.json(
        { error: 'Não foi possível obter resposta no momento.' },
        { status: response.status }
      )
    }

    const data = await response.json()
    const reply: string | undefined =
      data?.choices?.[0]?.message?.content?.trim()

    if (!reply) {
      return NextResponse.json(
        { error: 'Resposta vazia do modelo.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('DeepSeek request failed', error)
    return NextResponse.json(
      { error: 'Erro ao processar sua mensagem.' },
      { status: 500 }
    )
  }
}
