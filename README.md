# Portfolio Website

Um portfolio moderno e responsivo construído com Next.js, React e Tailwind CSS.

## 🚀 Deploy na Vercel

### Pré-requisitos
- Conta na [Vercel](https://vercel.com)
- Projeto no GitHub, GitLab ou Bitbucket

### Passos para Deploy

1. **Faça push do código para o repositório**
   ```bash
   git add .
   git commit -m "Preparando para deploy na Vercel"
   git push origin main
   ```

2. **Acesse a Vercel**
   - Vá para [vercel.com](https://vercel.com)
   - Faça login com sua conta GitHub/GitLab/Bitbucket

3. **Importe o projeto**
   - Clique em "New Project"
   - Selecione o repositório do seu portfolio
   - A Vercel detectará automaticamente que é um projeto Next.js

4. **Configure o projeto**
   - **Framework Preset**: Next.js (deve ser detectado automaticamente)
   - **Build Command**: `npm run build` (padrão)
   - **Output Directory**: `.next` (padrão)
   - **Install Command**: `npm install` (padrão)

5. **Deploy**
   - Clique em "Deploy"
   - Aguarde o build e deploy
   - Seu site estará disponível em `https://seu-projeto.vercel.app`

### Configurações Automáticas
- O arquivo `vercel.json` já está configurado com otimizações
- Headers de segurança configurados
- Otimizações de imagem ativadas
- Compressão habilitada

## 🛠️ Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar build de produção
npm start
```

## 📁 Estrutura do Projeto

```
website/
├── app/                 # App Router do Next.js 13+
│   ├── components/      # Componentes React
│   ├── contexts/        # Contextos (idiomas, tema)
│   ├── hooks/          # Hooks customizados
│   ├── i18n/           # Internacionalização
│   └── globals.css     # Estilos globais
├── components/ui/       # Componentes de UI base
├── lib/                # Utilitários
└── public/             # Arquivos estáticos
```

## 🌟 Funcionalidades

- ✅ Design responsivo
- ✅ Tema claro/escuro
- ✅ Suporte a múltiplos idiomas
- ✅ Componentes reutilizáveis
- ✅ Otimização de performance
- ✅ SEO otimizado
- ✅ Acessibilidade

## 🔧 Tecnologias

- **Framework**: Next.js 15
- **UI**: React 18 + Tailwind CSS
- **TypeScript**: Para type safety
- **Deploy**: Vercel (otimizado)

## 📝 Licença

Este projeto é de uso pessoal.
