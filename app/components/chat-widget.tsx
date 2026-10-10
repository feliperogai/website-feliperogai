'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowUp, RotateCcw, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguageContext } from '../contexts/LanguageContext'
import ChatMarkdown from './chat-markdown'
import type { TranslationKey } from '../i18n/translations'

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

const AVATAR = '/felipe-rogai-portrait-hq.webp'
const SUGGESTIONS: TranslationKey[] = ['chatSuggest1', 'chatSuggest2', 'chatSuggest3', 'chatSuggest4']
const TEASER_KEY = 'chat-teaser-dismissed'

function Avatar({ className, online = false }: { className?: string; online?: boolean }) {
  return (
    <span className={cn('relative flex shrink-0', className)}>
      <span className="block h-full w-full overflow-hidden rounded-full bg-primary">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={AVATAR} alt="Felipe Rogai" className="h-full w-full origin-[50%_42%] scale-[1.8] object-cover" />
      </span>
      {online && (
        <span className="absolute bottom-0 right-0 h-[28%] w-[28%] rounded-full border-2 border-background bg-emerald-400" />
      )}
    </span>
  )
}

function TypingDots({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1 px-1 py-1" role="status" aria-label={label}>
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/70"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  )
}

export default function ChatWidget() {
  const { t, language } = useLanguageContext()
  const [isOpen, setIsOpen] = useState(false)
  const [showTeaser, setShowTeaser] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState('')
  const listRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const greeting: ChatMessage = { role: 'assistant', content: t('chatGreeting') }
  const conversation = [greeting, ...messages]

  // Balão de convite que aparece uma vez por sessão
  useEffect(() => {
    let dismissed = false
    try {
      dismissed = sessionStorage.getItem(TEASER_KEY) === '1'
    } catch {}
    if (dismissed) return
    const timer = setTimeout(() => setShowTeaser(true), 4000)
    return () => clearTimeout(timer)
  }, [])

  const dismissTeaser = () => {
    setShowTeaser(false)
    try {
      sessionStorage.setItem(TEASER_KEY, '1')
    } catch {}
  }

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, isOpen, isSending])

  useEffect(() => {
    if (!isOpen) return
    const timer = setTimeout(() => inputRef.current?.focus(), 150)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen])

  // Textarea cresce com o texto, até um limite
  useEffect(() => {
    const el = inputRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`
  }, [input])

  const open = () => {
    setIsOpen(true)
    dismissTeaser()
  }

  const reset = () => {
    abortRef.current?.abort()
    setMessages([])
    setError('')
    setIsSending(false)
  }

  const send = useCallback(
    async (text: string) => {
      const content = text.trim().slice(0, 1000)
      if (!content || isSending) return

      const history = [greeting, ...messages]
      const withUser: ChatMessage[] = [...messages, { role: 'user', content }]
      setMessages(withUser)
      setInput('')
      setError('')
      setIsSending(true)

      const controller = new AbortController()
      abortRef.current = controller

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: content, history, language }),
          signal: controller.signal
        })

        if (!response.ok || !response.body) {
          const data = await response.json().catch(() => null)
          throw new Error(data?.error || 'Erro ao obter resposta.')
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let reply = ''
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          reply += decoder.decode(value, { stream: true })
          setMessages([...withUser, { role: 'assistant', content: reply }])
        }
        if (!reply.trim()) throw new Error('Resposta vazia.')
      } catch (err) {
        if (controller.signal.aborted) return
        console.error(err)
        setMessages((prev) => (prev[prev.length - 1]?.role === 'assistant' && !prev[prev.length - 1].content ? prev.slice(0, -1) : prev))
        setError(t('chatError'))
      } finally {
        if (abortRef.current === controller) {
          abortRef.current = null
          setIsSending(false)
        }
      }
    },
    // greeting depende de t; messages/isSending/language mudam a cada envio
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isSending, messages, language, t]
  )

  const waitingFirstToken = isSending && messages[messages.length - 1]?.role === 'user'

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-[70] flex flex-col bg-background sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[600px] sm:max-h-[calc(100vh-3rem)] sm:w-[400px] sm:overflow-hidden sm:rounded-3xl sm:border sm:border-border sm:shadow-2xl sm:shadow-black/50"
          role="dialog"
          aria-label={t('chatTitle')}
        >
          {/* Cabeçalho */}
          <div className="flex items-center gap-3 border-b border-border bg-card/80 px-4 py-3 backdrop-blur pt-[max(0.75rem,env(safe-area-inset-top))]">
            <Avatar className="h-10 w-10" online />
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold leading-tight">{t('chatTitle')}</p>
              <p className="truncate text-xs text-emerald-400">{t('chatStatus')}</p>
            </div>
            {messages.length > 0 && (
              <button
                onClick={reset}
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label={t('chatReset')}
                title={t('chatReset')}
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label={t('chatClose')}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Mensagens */}
          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-5">
            {conversation.map((message, index) => {
              const isAssistant = message.role === 'assistant'
              const showAvatar = isAssistant && conversation[index - 1]?.role !== 'assistant'
              if (isAssistant && !message.content) return null
              return (
                <div key={index} className={cn('flex items-end gap-2', isAssistant ? 'justify-start' : 'justify-end')}>
                  {isAssistant && (showAvatar ? <Avatar className="h-7 w-7" /> : <span className="w-7 shrink-0" />)}
                  <div
                    className={cn(
                      'max-w-[82%] px-3.5 py-2.5 text-[0.9rem]',
                      isAssistant
                        ? 'rounded-2xl rounded-bl-md bg-muted text-foreground'
                        : 'whitespace-pre-wrap rounded-2xl rounded-br-md bg-primary text-primary-foreground'
                    )}
                  >
                    {isAssistant ? <ChatMarkdown text={message.content} /> : message.content}
                  </div>
                </div>
              )
            })}

            {waitingFirstToken && (
              <div className="flex items-end gap-2">
                <Avatar className="h-7 w-7" />
                <div className="rounded-2xl rounded-bl-md bg-muted px-3.5 py-2.5">
                  <TypingDots label={t('chatTyping')} />
                </div>
              </div>
            )}

            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2 pl-9 pt-1">
                {SUGGESTIONS.map((key) => (
                  <button
                    key={key}
                    onClick={() => send(t(key))}
                    className="rounded-full border border-border px-3 py-1.5 text-left text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                  >
                    {t(key)}
                  </button>
                ))}
              </div>
            )}

            {error && (
              <p className="pl-9 text-xs text-red-400" role="alert">
                {error}
              </p>
            )}
          </div>

          {/* Campo de mensagem */}
          <div className="border-t border-border px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="flex items-end gap-2 rounded-3xl border border-border bg-card px-2 py-1.5 transition-colors focus-within:border-primary/60"
            >
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    send(input)
                  }
                }}
                placeholder={t('chatPlaceholder')}
                className="max-h-[120px] flex-1 resize-none bg-transparent px-2 py-2 text-base outline-none placeholder:text-muted-foreground sm:text-sm"
              />
              <button
                type="submit"
                disabled={isSending || !input.trim()}
                className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:opacity-30"
                aria-label={t('chatSend')}
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </form>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">{t('chatDisclaimer')}</p>
          </div>
        </div>
      )}

      {!isOpen && (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
          {showTeaser && (
            <div className="relative max-w-[240px] rounded-2xl rounded-br-md border border-border bg-card px-4 py-3 text-sm shadow-2xl animate-slide-in-from-bottom">
              <button
                onClick={dismissTeaser}
                className="absolute -left-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground"
                aria-label={t('chatClose')}
              >
                <X className="h-3 w-3" />
              </button>
              <button onClick={open} className="text-left">
                {t('chatTeaser')}
              </button>
            </div>
          )}

          <button
            onClick={open}
            className="group flex items-center gap-3 rounded-full border border-border bg-card/90 p-1.5 shadow-2xl shadow-black/40 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60 sm:pr-5"
            aria-label={t('chatOpenButton')}
          >
            <span className="relative flex h-12 w-12 shrink-0">
              <span className="absolute inset-0 animate-ping rounded-full bg-primary/40 [animation-duration:2.5s]" />
              <Avatar className="relative h-12 w-12" online />
            </span>
            <span className="hidden text-left sm:block">
              <span className="block text-sm font-semibold leading-tight">{t('chatOpenButton')}</span>
              <span className="block text-xs text-muted-foreground">{t('chatOpenHint')}</span>
            </span>
          </button>
        </div>
      )}
    </>
  )
}
