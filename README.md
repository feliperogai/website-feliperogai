# Felipe Rogai — Portfolio

Portfólio pessoal moderno e responsivo desenvolvido em Next.js, TypeScript e Tailwind CSS, com deploy contínuo na Vercel.

## Destaques
- Design editorial escuro com identidade própria
- Experiência mobile-first e breakpoints completos
- Conteúdo em português, inglês e espanhol, com seletor de idioma
- Animações leves, SEO e performance otimizadas
- Componentes baseados em shadcn/ui e ícones Lucide

## Stack
- Next.js, React, TypeScript
- Tailwind CSS com configurações personalizadas
- shadcn/ui e Lucide React
- Context API para idioma e tema
- Vercel para deploy

## Como rodar
Pré-requisitos: Node.js 18+ e npm, yarn ou pnpm.

```bash
git clone [url-do-repositorio]
cd website
npm install
npm run dev

# build e produção
npm run build
npm run start

# lint
npm run lint
```

## Projetos
Os projetos ficam em `app/data/projects.ts`: para adicionar um novo, basta incluir um item na lista (e a descrição em `app/i18n/translations.ts`).

Os cards dos projetos web usam um preview ao vivo (mShots) até existir um screenshot local. Para gerar screenshots fixos:

```bash
npm i -D playwright && npx playwright install chromium
npm run screenshots   # salva em public/projects/ e atualiza app/data/screenshots.json
```

## Identidade visual
- Paleta: tinta `#0B0B0E`, papel `#F4F1EA` e laranja sinal `#FF5B1F`
- Tipografia: Inter (texto), Instrument Serif itálico (destaques) e JetBrains Mono (rótulos), servidas localmente via Fontsource
- Logo/favicon: monograma "fr" com cursor de terminal (`app/icon.svg`), também usado em `app/components/logo.tsx`

## Estrutura
```
app/               # App Router
components/        # UI e blocos de página
contexts/          # Tema e idioma
i18n/              # Traduções
lib/               # Utilitários
public/            # Assets estáticos
tailwind.config.js # Configuração do Tailwind
```

## Responsividade
- Layout mobile-first com breakpoints de xs a 3xl
- Grid adaptativo para projetos e seções
- Tipografia e espaçamentos escaláveis
- Menu mobile e elementos touch-friendly

## Deploy
Configuração pronta para Vercel com build otimizado, compressão de assets, cache de imagens e CDN global.

## Contato
- Email: feliperogai@hotmail.com
- GitHub: https://github.com/feliperogai
- LinkedIn: https://linkedin.com/in/feliperogai

## Licença
Projeto de uso pessoal e educacional.

Desenvolvido por Felipe Rogai.
