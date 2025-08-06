# 💰 Banko

Banko é um gerenciador de transações financeiras que permite o acompanhamento de operações via **boleto, cartão e Pix**.

Com uma interface moderna e intuitiva, os usuários podem registrar **entradas e saídas**, definir valores, adicionar descrições, contar com **salvamento automático da data atual** e acessar **análises financeiras interativas com gráficos dinâmicos**.

## 🚀 Tecnologias Utilizadas

Este projeto foi desenvolvido com as seguintes ferramentas:

- [Next.js](https://nextjs.org/) — Framework React com suporte a SSR e SSG
- [ShardCN UI](https://ui.shadcn.com/) — Biblioteca de componentes UI
- [Tailwind CSS](https://tailwindcss.com/) — Estilização rápida e eficiente
- [Supabase](https://supabase.com/) — Banco de dados Postgres e autenticação
- [Docker](https://www.docker.com/) — Containerização do front e back-end
- [Docker Compose](https://docs.docker.com/compose/) — Orquestração de múltiplos serviços
- [Redux](https://redux.js.org/) — Gerenciamento de estado global
- [TypeScript](https://www.typescriptlang.org/) — Tipagem estática
- [Module Federation](https://webpack.js.org/concepts/module-federation/) — Integração de microfrontends
- [Vercel](https://vercel.com/) — Deploy rápido e integrado ao Next.js

## 📊 Funcionalidades Implementadas

#### Página Inicial

- Gráficos e análises financeiras
- Visualização de desempenho
- Dashboard com metas e alertas

#### Transações

- Filtros avançados e busca
- Scroll infinito ou paginação
- Edição de transações
- Upload de recibos/documentos
- Sugestões automáticas de categorias

#### Arquitetura

- Microfrontends via Module Federation
- Comunicação entre módulos
- SSR e SSG para melhor performance e SEO

#### Segurança

- Autenticação e autorização com Supabase
- Boas práticas para ambiente cloud

#### Acessibilidade

- Navegação por teclado
- Compatibilidade com leitores de tela
- Contraste e usabilidade acessível

## 🗂️ Estrutura do Banco de Dados

O projeto utiliza Supabase com banco de dados Postgres estruturado em:

- `users` — Dados dos usuários
- `account` — Contas vinculadas aos usuários
- `transactions` — Registros financeiros
- `attachments` — Arquivos e recibos anexados

## 🖥️ Estrutura da Aplicação

Organizada por microfrontends:

- **Dashboard** — Gráficos e visão geral
- **Transações** — Listagem, filtros, anexos
- **Investimentos** — Em desenvolvimento (404 customizado)
- **Outros Serviços** — Em desenvolvimento (404 customizado)

## 🗺️ Navegação

A navegação da aplicação ocorre através de um **sidebar**, que possui os seguintes recursos:

- **Expansão/Recolhimento**: Pode ser minimizado ao clicar na logo
  
- **Tema**: Possibilidade de alternar entre modos claro e escuro
  
- **Conta**: Exibição de informações do perfil do usuário
  

## 🐳 Executando com Docker

Subir contêineres

docker-compose up --build

Estrutura de Arquivos

- `Dockerfile` — Para cada serviço (ex.: frontend)
- `docker-compose.yml` — Orquestração dos serviços

## ▶️ Como rodar o projeto localmente

Para executar Banko localmente, siga os passos abaixo:

1. Clone este repositório:

  git clone [GitHub - RKomorek/Banko](https://github.com/RKomorek/Banko.git)

2. Navegue até o diretório do projeto:

  cd banko

3. Instale as dependências:

  npm install

4. Criei na base do projeto um arquivo " .env "
  
5. Configure o ".env" com as seguintes informações:
  
"API_URL= [Url do Supabase]

SUPABASE_ANON_KEY=[Chave pública do Supabase]"

6. Inicie o servidor de desenvolvimento:

  npm run dev

7. O projeto será iniciado e estará disponível em:

  [http://localhost:3000](http://localhost:3000)

## Como acessar o projeto na Vercel

Acesse o link a seguir:

🔗 [https://banko-psi.vercel.app/](https://banko-psi.vercel.app/ "https://banko-psi.vercel.app/")

## 👥 Integrantes do Projeto

- Ana Viviane Souto Pinheiro
- Caroline Vitória Valério dos Santos
- Marcelo Sabino Machado
- Rafael Komorek de Aquino

## 🔎 Repositório

🔗 [Banko no GitHub](https://github.com/RKomorek/Banko.git)

## 🎨 Protótipo no Figma

Visualize o protótipo clicando aqui: 🔗 [Protótipo Banko - Figma](https://www.figma.com/design/kST3RFJBwiKfNEdj03AwoY/Banko?node-id=1-3&t=6hVAH0v1dPyq3262-1)