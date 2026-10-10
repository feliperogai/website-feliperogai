# Informações adicionais

Fatos complementares ao que aparece no site, tirados do meu LinkedIn e dos repositórios públicos do GitHub (github.com/feliperogai).
Edite este arquivo para ensinar coisas novas ao chat.

## Experiência profissional
- Analista de Dados Jr na Invictus Data & AI (tempo integral, presencial em São Paulo), de outubro de 2025 até hoje. Coleto, trato e analiso dados para apoiar decisões estratégicas, crio dashboards e relatórios, identifico tendências e uso ferramentas de análise para otimizar processos e melhorar a eficiência das operações. No dia a dia trabalho bastante com Power BI e Microsoft Fabric (detalhes em "Dados e BI").
- Estagiário de Desenvolvimento de IA na onsmart.AI (presencial em São Paulo), de junho a outubro de 2025. Fui especialista na criação de agentes inteligentes para automatizar processos de negócios: analisava fluxos de trabalho operacionais, projetava e implementava soluções com IA para tarefas repetitivas, otimização de recursos e eficiência, e integrava e escalava essas soluções em ambientes corporativos. O projeto OnSmart.AI do portfólio é dessa empresa.
- Além do emprego, faço projetos próprios e sites para empresas (os do portfólio).

## Dados e BI: Power BI e Microsoft Fabric
É uma das minhas áreas mais fortes hoje.
- Power BI: conheço praticamente tudo do ecossistema. Construo modelos semânticos, escrevo medidas e lógica de negócio em DAX e entrego relatórios e dashboards com todos os indicadores do negócio.
- Conexões de dados, inclusive com fontes locais (on-premises) através do gateway de dados do Power BI.
- Microsoft Fabric: uso muito para engenharia de dados, com processos de ETL que levam os dados pelas camadas bronze, silver e gold (arquitetura medalhão).
- Meu fluxo de trabalho: trato os dados no Fabric até a camada gold, entendo o modelo de negócio, replico essas regras no modelo semântico com DAX e mostro tudo no Power BI.

## Formação e certificados
- Engenharia de Computação pela FIAP (já formado). Os estudos me deram uma base sólida em lógica de programação, algoritmos e estruturas de dados, e apliquei isso em vários projetos em equipe.
- Certificados:
  - Engenharia de Software (FIAP, agosto de 2026)
  - AI Skills Fest 2026 (Microsoft, junho de 2026)
  - Inteligência Artificial e Computacional (FIAP, junho de 2025)
  - Códigos de Alta Performance (FIAP, fevereiro de 2025)

## Sobre mim (do LinkedIn)
- Baseado em São Paulo.
- Morei um ano no México. A experiência ampliou minha perspectiva e me ensinou a me adaptar rápido a novos ambientes e desafios.
- Estou sempre aprimorando minhas habilidades e aprendendo novas tecnologias.

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
