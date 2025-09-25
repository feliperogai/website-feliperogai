# Felipe Rogai - Portfolio Website

Um portfolio moderno e responsivo desenvolvido com Next, TypeScript e Tailwind CSS.

## ✨ Características

- **Design Moderno**: Interface elegante com tema escuro e acentos vibrantes
- **Totalmente Responsivo**: Otimizado para todos os tipos de dispositivos
- **Multi-idioma**: Suporte para português e inglês
- **Tema Escuro/Claro**: Alternância automática baseada na preferência do sistema
- **Animações Suaves**: Transições e animações CSS personalizadas
- **SEO Otimizado**: Meta tags e estrutura semântica

## 🚀 Tecnologias Utilizadas

- **Frontend**: Next, React, TypeScript
- **Estilização**: Tailwind CSS com configurações personalizadas
- **Componentes**: Shadcn/ui para componentes base
- **Ícones**: Lucide React
- **Internacionalização**: Context API para gerenciamento de idiomas
- **Deploy**: Vercel

## 📱 Responsividade

O site foi desenvolvido com uma abordagem **mobile-first** e inclui breakpoints responsivos para todos os tipos de dispositivos:

### Breakpoints Implementados

- **xs**: 475px - Dispositivos muito pequenos
- **sm**: 640px - Smartphones
- **md**: 768px - Tablets
- **lg**: 1024px - Laptops
- **xl**: 1280px - Desktops
- **2xl**: 1536px - Telas grandes
- **3xl**: 1920px - Telas muito grandes

### Recursos Responsivos

- **Menu Mobile**: Navegação hambúrguer para dispositivos móveis
- **Grid Adaptativo**: Layout de projetos que se ajusta automaticamente
- **Tipografia Escalável**: Tamanhos de texto que se adaptam à tela
- **Espaçamentos Flexíveis**: Margens e paddings responsivos
- **Imagens Otimizadas**: Aspect ratios que se ajustam ao dispositivo
- **Touch-Friendly**: Botões e elementos otimizados para toque

## 🎨 Componentes Principais

### Header
- Navegação responsiva com menu mobile
- Logo/nome que se adapta ao tamanho da tela
- Botões de navegação otimizados para mobile

### Hero Section
- Título principal com tamanhos escaláveis
- Grid de botões sociais responsivo
- Espaçamentos adaptativos

### About Section
- Layout em duas colunas que colapsa em mobile
- Foto de perfil com tamanhos responsivos
- Estatísticas organizadas em grid

### Projects Section
- Grid de cards que se ajusta automaticamente
- Cards com alturas consistentes
- Tags e botões otimizados para mobile

### Skills Section
- Grid de tecnologias responsivo
- Cards que se reorganizam por breakpoint
- Ícones e textos escaláveis

### Contact Form
- Formulário com campos responsivos
- Botões com tamanhos adequados para toque
- Espaçamentos adaptativos

### Footer
- Layout em colunas que se reorganiza
- Links e informações otimizados para mobile
- Tecnologias em tags responsivas

## 🛠️ Instalação e Uso

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre na pasta
cd website

# Instale as dependências
npm install

# Execute em desenvolvimento
npm run dev

# Build para produção
npm run build
```

### Scripts Disponíveis
- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run start` - Servidor de produção
- `npm run lint` - Verificação de linting

## 📁 Estrutura do Projeto

```
website/
├── app/                    # App Router do Next
│   ├── components/        # Componentes React
│   ├── contexts/          # Contextos (idioma, tema)
│   ├── i18n/             # Traduções
│   ├── globals.css       # Estilos globais
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Página inicial
├── components/            # Componentes UI base
│   └── ui/               # Shadcn/ui components
├── lib/                   # Utilitários
├── public/                # Assets estáticos
└── tailwind.config.js     # Configuração do Tailwind
```

## 🎯 Melhorias de Responsividade Implementadas

### 1. Sistema de Grid Responsivo
- Grid de projetos com breakpoints específicos
- Colunas que se ajustam automaticamente
- Espaçamentos adaptativos por dispositivo

### 2. Tipografia Escalável
- Tamanhos de texto que crescem com a tela
- Line-heights otimizados para cada breakpoint
- Hierarquia visual mantida em todos os tamanhos

### 3. Layout Adaptativo
- Containers com padding responsivo
- Margens que se ajustam ao dispositivo
- Espaçamentos verticais escaláveis

### 4. Componentes Mobile-First
- Botões com tamanhos mínimos para toque (44px)
- Navegação otimizada para mobile
- Elementos interativos acessíveis

### 5. Imagens e Mídia
- Aspect ratios responsivos
- Tamanhos de foto de perfil escaláveis
- Otimização para diferentes densidades de pixel

### 6. Performance Mobile
- Scroll suave otimizado
- Touch scrolling melhorado
- Animações otimizadas para dispositivos móveis

## 🌐 Suporte a Dispositivos

- **Smartphones**: 320px - 767px
- **Tablets**: 768px - 1023px  
- **Laptops**: 1024px - 1439px
- **Desktops**: 1440px - 1919px
- **Telas Grandes**: 1920px+

## 📱 Testes de Responsividade

O site foi testado e otimizado para:
- ✅ iPhone SE (375px)
- ✅ iPhone 12/13/14 (390px)
- ✅ Samsung Galaxy (360px)
- ✅ iPad (768px)
- ✅ iPad Pro (1024px)
- ✅ Laptop (1366px)
- ✅ Desktop (1920px)
- ✅ Telas ultrawide (2560px+)

## 🚀 Deploy

O site está configurado para deploy automático na Vercel com:
- Build otimizado para produção
- Compressão de assets
- Cache de imagens
- CDN global

## 📄 Licença

Este projeto é de uso pessoal e educacional.

## 📞 Contato

- **Email**: hello@example.com
- **GitHub**: [github.com/feliperogai](https://github.com)
- **LinkedIn**: [linkedin.com/in/feliperogai](https://linkedin.com)

---

Desenvolvido com ❤️ por Felipe Rogai
