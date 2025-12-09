'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { MessageCircle, Send, X } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useLanguageContext } from '../contexts/LanguageContext'

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatWidget() {
  const { t, language } = useLanguageContext()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: t('chatGreeting') }
  ])
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState('')
  const listRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setMessages((prev) => {
      if (!prev.length) {
        return [{ role: 'assistant', content: t('chatGreeting') }]
      }
      const updated = [...prev]
      if (updated[0].role === 'assistant') {
        updated[0] = { ...updated[0], content: t('chatGreeting') }
      }
      return updated
    })
  }, [language, t])

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, isOpen])

  const historyForApi = useMemo(
    () => messages.map(({ role, content }) => ({ role, content })),
    [messages]
  )

  const handleSend = async () => {
    const trimmed = input.trim()
    if (!trimmed || isSending) return

    const safeInput = trimmed.slice(0, 1000)
    const newUserMessage: ChatMessage = { role: 'user', content: safeInput }
    const nextMessages: ChatMessage[] = [...messages, newUserMessage]
    setMessages(nextMessages)
    setInput('')
    setError('')
    setIsSending(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: safeInput,
          history: historyForApi
        })
      })

      const data = await response.json()

      if (!response.ok || !data?.reply) {
        throw new Error(data?.error || 'Erro ao obter resposta.')
      }

      setMessages([
        ...nextMessages,
        { role: 'assistant', content: String(data.reply) }
      ])
    } catch (err) {
      console.error(err)
      setError(t('chatError'))
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="w-80 sm:w-96 rounded-2xl border border-border/40 bg-background/95 backdrop-blur-lg shadow-2xl ring-1 ring-border/20 transition-all duration-300 ease-out translate-y-0 scale-100">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
            <div>
              <p className="text-sm font-semibold text-foreground">
                {t('chatTitle')}
              </p>
              <p className="text-xs text-muted-foreground">
                {t('chatSubtitle')}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 hover:bg-muted/50 transition-colors"
              aria-label={t('chatClose')}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div
            ref={listRef}
            className="max-h-80 overflow-y-auto px-4 py-3 space-y-3"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex',
                  message.role === 'assistant' ? 'justify-start' : 'justify-end'
                )}
              >
                <div
                  className={cn(
                    'rounded-2xl px-3 py-2 text-sm shadow-sm',
                    message.role === 'assistant'
                      ? 'bg-muted text-foreground'
                      : 'bg-primary text-primary-foreground'
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isSending && (
              <div className="text-xs text-muted-foreground">
                {t('chatTyping')}
              </div>
            )}
          </div>

          {error && (
            <p className="px-4 text-xs text-red-500 pb-2" role="alert">
              {error}
            </p>
          )}

          <div className="border-t border-border/50 px-4 py-3">
            <div className="flex gap-2 items-end">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                placeholder={t('chatPlaceholder')}
                className="min-h-[60px] resize-none"
                disabled={isSending}
              />
              <Button
                onClick={handleSend}
                disabled={isSending || input.trim().length === 0}
                className="h-10 w-10 p-0"
                aria-label={t('chatSend')}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">
              {t('chatDisclaimer')}
            </p>
          </div>
        </div>
      )}

      <button
        hidden={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'relative flex items-center gap-2 rounded-full px-4 py-3 shadow-lg text-primary-foreground',
          'bg-primary hover:bg-primary/90 transition-all duration-300 ease-out',
          !isOpen && 'animate-pulse'
        )}
        aria-label={t('chatOpenButton')}
      >
        <MessageCircle className="h-5 w-5" />
        <span className="text-sm font-semibold">{t('chatOpenButton')}</span>
      </button>
    </div>
  )
}
