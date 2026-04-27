# Plano de Implementação: Mini Mercado Martin

## Visão Geral
Transformar a landing page estática do Mini Mercado Martin em uma aplicação Next.js moderna. O sistema não terá checkout online, mas permitirá que o cliente monte uma "cesta de compras" e envie o pedido diretamente para o WhatsApp da loja. Além disso, terá um painel simples protegido por senha para gerenciar os produtos.

## Fases do Projeto

### Fase 1: Setup e Configuração (Em Andamento)
- [ ] Inicializar o Next.js (App Router, TypeScript, Tailwind CSS)
- [ ] Configurar tokens de design (Cores: Verde e Laranja atuais)
- [ ] Preservar o `index .html` original como referência para a estrutura
- [ ] Configurar dependências (Zustand para estado do carrinho, Lucide React para ícones).

### Fase 2: Construção da Interface (Design Melhorado, Estrutura Mantida)
- [ ] **Componentes Globais:** Header responsivo (com ícone de carrinho) e Footer.
- [ ] **Página Inicial:**
  - Hero Section (melhorar tipografia e botões)
  - Seção de Banners
  - Seção de Produtos (com botão "Adicionar à Cesta")
  - Seção Promocional
  - Features e Depoimentos
- **Meta de Design:** Manter a topologia/layout atuais, mas aplicar refinamentos premium (sombras, hover effects, transições suaves, tipografia refinada).

### Fase 3: Funcionalidade de Carrinho (WhatsApp)
- [ ] Estado Global usando Zustand para a "Cesta de Compras"
- [ ] Drawer/Modal lateral para ver a cesta
- [ ] Função para gerar a mensagem formatada para o WhatsApp (ex: "Olá, gostaria de encomendar os seguintes produtos: 1x Maçã, 2x Banana...")
- [ ] Redirecionamento para a API do WhatsApp.

### Fase 4: Painel Administrativo
- [ ] Criar banco de dados simples (Prisma + SQLite local para dev) para armazenar os produtos.
- [ ] Rota `/admin` protegida por uma senha simples.
- [ ] CRUD básico de Produtos (Nome, Preço, Preço Antigo, Imagem, Categoria).

### Fase 5: Deploy e GitHub
- [ ] Inicializar repositório Git local e fazer o commit.
- [ ] Adicionar o remote repassado pelo usuário.
- [ ] Push e preparação para a Vercel.
