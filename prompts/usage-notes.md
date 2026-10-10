# Notas de uso do chat "Felipe Rogai"

- O prompt de sistema é montado em `app/api/chat/route.ts` juntando:
  1. `prompts/system-prompt.md`: personalidade, tom e regras de conversa;
  2. a base de conhecimento gerada por `app/api/chat/knowledge.ts`, a partir dos mesmos dados do site
     (`app/data/projects.ts`, `app/data/stack.ts`, `app/data/profile.ts` e os textos em português de `app/i18n/translations.ts`).
- Para a IA "saber" algo novo, atualize os dados do site; o chat acompanha automaticamente.
- Fatos que não aparecem no site (ex.: observações sobre o TCC) ficam em `knowledge.ts`.
- As respostas chegam em streaming (texto puro) e o widget (`app/components/chat-widget.tsx`) renderiza
  formatação leve com `app/components/chat-markdown.tsx`.
- Variáveis de ambiente: `DEEPSEEK_API_KEY` (obrigatória) e `DEEPSEEK_BASE_URL` (opcional).
