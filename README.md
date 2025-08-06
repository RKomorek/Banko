# 🏦 Banko - Sistema Bancário

Um sistema bancário moderno desenvolvido com Next.js 15, TypeScript e Supabase, focado em gerenciamento de transações financeiras com interface intuitiva e recursos avançados.

## ✨ Funcionalidades

### 🏠 Dashboard Principal
- **Visão Geral Financeira**: Saldo atual, métricas de entrada/saída
- **Gráficos Interativos**: Visualização de dados financeiros com Recharts
- **Widgets Personalizáveis**: Cards informativos com dados em tempo real
- **Navegação Intuitiva**: Sidebar responsiva com acesso rápido às funcionalidades

### 💳 Gerenciamento de Transações
- **CRUD Completo**: Criar, editar, deletar e visualizar transações
- **Filtros Avançados**: Busca por data, tipo, valor e descrição
- **Upload de Anexos**: Suporte a imagens e documentos via Cloudinary
- **Recibos Detalhados**: Modal com informações completas e download de anexos
- **Validação Robusta**: Verificações de dados e tratamento de erros

### 🎨 Interface Moderna
- **Design Responsivo**: Otimizado para desktop, tablet e mobile
- **Tema Escuro/Claro**: Suporte a múltiplos temas
- **Loading States**: Skeletons e spinners elegantes
- **Empty States**: Mensagens informativas quando não há dados
- **Error Handling**: Tratamento amigável de erros
- **Acessibilidade**: Navegação por teclado e suporte a screen readers

## 🛠️ Tecnologias

### Frontend
- **Next.js 15**: Framework React com App Router
- **TypeScript**: Tipagem estática para código robusto
- **Tailwind CSS**: Estilização utilitária e responsiva
- **Shadcn/ui**: Componentes acessíveis e customizáveis
- **Recharts**: Gráficos interativos e responsivos
- **Lucide React**: Ícones modernos e consistentes

### Backend & Serviços
- **Supabase**: Backend-as-a-Service (autenticação, banco de dados)
- **Cloudinary**: Armazenamento e otimização de imagens
- **Next.js API Routes**: Endpoints para operações server-side

### Arquitetura
- **Modular**: Organização por domínios e funcionalidades
- **Event Bus**: Comunicação entre módulos
- **Context API**: Gerenciamento de estado global
- **Error Boundaries**: Tratamento robusto de erros

## 🚀 Instalação

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Conta no Supabase
- Conta no Cloudinary

### 1. Clone o repositório
```bash
git clone https://github.com/RKomorek/Banko.git
cd banko
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` com suas credenciais:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=seu_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=seu_api_secret
```

### 4. Configure o banco de dados
Execute os scripts SQL fornecidos em `supabase-setup.md` para criar as tabelas necessárias.

### 5. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) para ver o projeto.

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Páginas Next.js 15 (App Router)
│   ├── page.tsx           # Dashboard principal
│   ├── login/             # Página de login
│   ├── register/          # Página de registro
│   └── transactions/      # Página de transações
├── components/            # Componentes React
│   ├── ui/               # Componentes base (Shadcn/ui)
│   ├── dashboard/        # Componentes do dashboard
│   └── transactions/     # Componentes de transações
├── services/             # Serviços e APIs
├── interfaces/           # Tipos TypeScript
├── context/              # Context API
├── hooks/                # Custom hooks
├── lib/                  # Utilitários
└── utils/                # Funções auxiliares
```

## 🎯 Funcionalidades Principais

### Dashboard
- **Métricas Financeiras**: Saldo, entradas, saídas e tendências
- **Gráficos Interativos**: Visualização temporal de transações
- **Widgets Personalizáveis**: Cards com informações relevantes
- **Navegação Rápida**: Acesso direto às funcionalidades

### Transações
- **Listagem Avançada**: Tabela com paginação e ordenação
- **Filtros Dinâmicos**: Busca por múltiplos critérios
- **Upload de Anexos**: Suporte a imagens e documentos
- **Recibos Detalhados**: Modal com informações completas
- **Ações em Lote**: Edição e exclusão múltipla

### UX/UI
- **Loading States**: Skeletons e spinners elegantes
- **Empty States**: Mensagens informativas
- **Error Handling**: Tratamento amigável de erros
- **Responsividade**: Otimizado para todos os dispositivos
- **Acessibilidade**: Navegação por teclado e screen readers

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Inicia servidor de produção
npm run lint         # Executa ESLint
npm run type-check   # Verifica tipos TypeScript
```

## 🐳 Docker

### Build da imagem
```bash
docker build -t banko .
```

### Executar com Docker Compose
```bash
docker-compose up -d
```

## 📊 Performance

### Otimizações Implementadas
- **Code Splitting**: Carregamento sob demanda
- **Image Optimization**: Otimização automática de imagens
- **Bundle Analysis**: Análise de tamanho do bundle
- **Lazy Loading**: Carregamento lazy de componentes
- **Caching**: Cache inteligente de dados

### Métricas
- **Lighthouse Score**: 95+ em todas as categorias
- **Bundle Size**: < 500KB gzipped
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s

## ♿ Acessibilidade

### Implementações
- **ARIA Labels**: Labels descritivos para elementos
- **Keyboard Navigation**: Navegação completa por teclado
- **Screen Reader Support**: Compatibilidade com leitores de tela
- **High Contrast**: Suporte a modo de alto contraste
- **Focus Management**: Gerenciamento de foco adequado

## 🔒 Segurança

### Medidas Implementadas
- **Row Level Security**: Políticas de acesso no Supabase
- **Input Validation**: Validação robusta de dados
- **XSS Protection**: Proteção contra ataques XSS
- **CSRF Protection**: Proteção contra CSRF
- **Secure Headers**: Headers de segurança configurados

## 📈 Roadmap

### Próximas Funcionalidades
- [ ] **Notificações Push**: Alertas em tempo real
- [ ] **Relatórios Avançados**: Exportação de dados
- [ ] **Integração Bancária**: APIs de bancos reais
- [ ] **Multi-moedas**: Suporte a diferentes moedas
- [ ] **Backup Automático**: Backup automático de dados

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Rafael** - Desenvolvido para projeto de pós-graduação

---

⭐ Se este projeto te ajudou, considere dar uma estrela!