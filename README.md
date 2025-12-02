# 📊 Sistema de Gerenciamento de Clientes - Projeto de Extensão

Plataforma web para gerenciamento de clientes desenvolvida para comércios locais que desejam ter controle sobre sua base de clientes e insights sobre a distribuição geográfica dos mesmos.

## 🎯 Objetivo

Permitir que estabelecimentos comerciais possam cadastrar, gerenciar e analisar seus clientes, com foco especial em dados geográficos que auxiliem na tomada de decisões estratégicas e logísticas.

## ✨ Funcionalidades

### Gestão de Clientes

- ✅ Cadastro completo de clientes
- ✅ Edição de informações cadastrais
- ✅ Visualização de lista de clientes
- ✅ Busca e filtragem de clientes

### Dados Coletados

- **Informações Pessoais**
  - Nome completo (obrigatório)
  - CPF (opcional)
- **Contato**
  - Telefone (obrigatório)
  - E-mail (opcional)
- **Endereço Completo**
  - Rua
  - Número
  - Bairro
  - Cidade
  - Estado
  - Indicador de residência fixa

### Análise Geográfica

- 📍 Identificação de localidades com maior concentração de clientes
- 📊 Dados agregados por bairro, cidade e estado
- 🗺️ Base de dados estruturada para análises de distribuição geográfica

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js 16 (App Router)
- **Linguagem**: TypeScript
- **Banco de Dados**: PostgreSQL
- **ORM**: Prisma
- **Validação**: Zod
- **Formulários**: React Hook Form
- **UI Components**: shadcn/ui
- **Estilização**: Tailwind CSS

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL
- npm ou yarn

## 🚀 Instalação

1. Clone o repositório

```bash
git clone [url-do-repositorio]
cd [nome-do-projeto]
```

2. Instale as dependências

```bash
npm install
```

3. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
```

4. Execute as migrations do banco de dados

```bash
npx prisma migrate dev
```

5. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:3000`

### Índices Otimizados

- `nome_completo`: Para buscas rápidas por nome
- `cidade`: Para análises por cidade
- `bairro`: Para análises por bairro

## 🔍 Casos de Uso

### Para o Comerciante

- Manter cadastro atualizado de clientes
- Identificar regiões com maior demanda
- Planejar estratégias de entrega e atendimento
- Definir áreas de expansão do negócio

### Análises Possíveis

- Distribuição de clientes por bairro
- Distribuição de clientes por cidade
- Percentual de clientes com residência fixa
- Mapeamento de áreas de cobertura

## 🔐 Validações Implementadas

- Nome completo: mínimo 3 caracteres
- Telefone: mínimo 8 caracteres
- E-mail: formato válido (quando preenchido)
- Endereço completo: todos os campos obrigatórios
- Estado: seleção de UF válida

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar produção
npm start

# Prisma Studio (visualizar banco de dados)
npx prisma studio

# Gerar cliente Prisma
npx prisma generate

# Criar migration
npx prisma migrate dev --name nome_da_migration
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
