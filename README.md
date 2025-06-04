# Banko

Banko é um gerenciador de transações financeiras que permite o acompanhamento de operações via **boleto, cartão e pix**. Com uma interface moderna e intuitiva, os usuários podem registrar **entradas e saídas**, definir valores, adicionar descrições e contar com o salvamento automático da data atual.

## 🚀 Tecnologias utilizadas

Este projeto foi desenvolvido com as seguintes tecnologias:

- [Next.js](https://nextjs.org/) - Framework React para aplicações web
- [Shard CN UI](https://ui.shadcn.com/) - Biblioteca de componentes UI
- [Tailwind CSS](https://tailwindcss.com/) - Estilização rápida e eficiente
- [Supabase](https://supabase.com/) - Banco de dados Postgres e autenticação

## 📂 Estrutura do banco de dados

O projeto utiliza **Supabase** com um banco de dados Postgres estruturado da seguinte forma:

- **users**: Contém informações dos usuários cadastrados
- **account**: Armazena dados relacionados às contas dos usuários
- **transactions**: Gerencia as transações financeiras

## 🖥️ Estrutura da aplicação

Banko conta com duas páginas principais e duas para teste de redirecionamento da tela de erro personalizada:

- **Página Inicial** - Visão geral das finanças
- **Página de Transações** - Exibição e gerenciamento de operações financeiras com as opções de editar e excluir via por modal.
- **Página de Investimentos** - Ainda não implementada, exibe uma tela personalizada de erro `404`
- **Página de Outros Serviços** - Ainda não implementada, exibe uma tela personalizada de erro `404`

## 🗺️ Navegação

A navegação da aplicação ocorre através de um **sidebar**, que possui os seguintes recursos:

- **Expansão/Recolhimento**: Pode ser minimizado ao clicar na logo
- **Tema**: Possibilidade de alternar entre modos claro e escuro
- **Conta**: Exibição de informações do perfil do usuário

## 🎨 Protótipo no Figma

Para visualizar o design da interface e fluxo da aplicação, acesse o protótipo no Figma através do link abaixo:

🔗 [Protótipo Banko - Figma](https://www.figma.com/design/kST3RFJBwiKfNEdj03AwoY/Banko?node-id=1-3&t=6hVAH0v1dPyq3262-1)

## 🧑‍💻 Integrantes do projeto

Este projeto foi desenvolvido por:

- **Ana Viviane Souto Pinheiro**
- **Caroline Vitória Valério dos Santos**
- **Marcelo Sabino Machado**
- **Rafael Komorek de Aquino**

## ▶️ Como rodar o projeto

Para executar Banko localmente, siga os passos abaixo:

1. Clone este repositório:
  git clone https://github.com/RKomorek/Banko.git
  
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
  http://localhost:3000