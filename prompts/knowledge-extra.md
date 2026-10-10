# Informações adicionais

Fatos complementares ao que aparece no site, conferidos nos repositórios públicos do GitHub (github.com/feliperogai).
Edite este arquivo para ensinar coisas novas ao chat (ex.: experiências do LinkedIn, certificações).

## Formação e localização
- Engenharia de Computação pela FIAP (já formado).
- Baseado em São Paulo.

## Tecnologias além das que aparecem no site
- Backend: Django e Flask (além de Node.js e FastAPI).
- IA: Hugging Face (além de OpenAI API e LangChain).
- Cloud: Azure (além de AWS).
- Mobile: Flutter e Dart, com Riverpod, go_router e Hive (usados no Buggo).
- Também já usei em projetos: Fastify, Rust, WebAssembly (Wasmtime), Tauri, Vite, Neon (PostgreSQL serverless) e deploy na Vercel.

## Mais detalhes dos projetos do portfólio
- Buggo: app feito em Flutter/Dart para quem quer aprender programação do zero, pensado principalmente para jovens que estudam pelo celular e têm pouco tempo. Tem onboarding (nome, nível, linguagem e meta diária), trilhas de aprendizado desbloqueadas por progresso, conteúdo de lógica de programação e Python, desafios interativos, quizzes e exercícios de completar código, XP, moedas, streak, conquistas, perfil com avatares, market, tela de troféus e um mascote que guia o usuário. Os dados ficam salvos no aparelho (Hive) e há uma API própria (Vercel + Neon Postgres) com login pelo Google. Site e monitor de status: https://buggo-api.vercel.app/
- Chorão Eterno: site-homenagem de fã ao Chorão e ao Charlie Brown Jr., feito em HTML, CSS e JavaScript puros (sem build). Conta a origem do apelido no skate e tem uma jukebox com os maiores sucessos (tocados pelo player oficial do Spotify, com busca, filtros e sorteio), discografia, linha do tempo, curiosidades com fonte e a formação da banda.
- Pokédex: feita em JavaScript puro, consumindo a PokéAPI, com visual retrô pixelado.

## Outros projetos (não aparecem na grade do portfólio, mas posso comentar quando fizer sentido)
- Ghost (https://github.com/feliperogai/ghost-compute): plataforma aberta de computação distribuída. Pessoas oferecem CPU e GPU ociosas de computadores Windows, com preço, horários e limites próprios, e clientes enviam jobs que rodam isolados em sandbox e são pagos em créditos virtuais (sem dinheiro). Tem control plane em TypeScript com Fastify, PostgreSQL e Redis; agente para Windows em Rust com Wasmtime; app desktop em Tauri 2 + React; dashboard em React/Vite; instalador MSI; workloads em WebAssembly (benchmark e inferência de imagens em CPU ou GPU). Princípios: nenhuma execução arbitrária, o dono da máquina sempre no controle, resultados verificados por hash e escolha de worker explicável.
- Sinu Cado Belisco (https://github.com/feliperogai/sinuca-tournament): sistema de gerenciamento de jogadores e partidas de sinuca, feito em Next.js com banco Neon (PostgreSQL serverless) e deploy na Vercel.
- Challenge Sanofi (https://github.com/feliperogai/saas-sanofi): projeto acadêmico da faculdade, um desafio de um ano para resolver um problema real de uma empresa parceira (Sanofi). Feito em Python com Flask, SQLAlchemy, Flask-Migrate, MySQL, JWT e Flask-Mail.
