# Template de Backend — Express + Prisma + JWT

Este projeto é um **template de backend** criado para acelerar o início de novos sistemas, fornecendo uma base sólida, organizada e segura.

_OBS_:_O ideal é você desenvolver desde a base até o avançado, esse é um template/guia para te ajudar a estudar, espero que seja de grande ajuda._

Ele já vem com **arquitetura em camadas**, **autenticação JWT**, **Prisma com migrations**, **middlewares de segurança** e estrutura preparada para crescimento.

> Indicado para quem já entende a base de backend e quer ganhar velocidade.  
> Para iniciantes, recomenda-se estudar e praticar a construção manual antes de utilizar templates.

---

## Tecnologias Principais

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- JWT (JSON Web Token)

---

## Bibliotecas de Segurança

- **cors** — Controle de acesso entre origens
- **helmet** — Headers HTTP de segurança
- **bcryptjs** — Hash e verificação de senhas
- **jsonwebtoken** — Autenticação via JWT
- **@types/jsonwebtoken** — Tipagem para desenvolvimento

---

## Bibliotecas Utilizadas

### Produção

- **express** — Framework HTTP
- **@prisma/client** — Cliente ORM do Prisma
- **bcryptjs** — Criptografia de senhas
- **cors** — Configuração de CORS
- **helmet** — Segurança HTTP
- **jsonwebtoken** — Tokens JWT
- **nodemailer** — Envio de e-mails
- **uuid** — Geração de identificadores únicos
- **dotenv** — Variáveis de ambiente

### Desenvolvimento

- **prisma** — CLI do Prisma
- **typescript** — Compilador TypeScript
- **tsx** — Execução TS em desenvolvimento
- **@types/node**
- **@types/express**
- **@types/cors**
- **@types/nodemailer**

---

## Arquitetura do Sistema

Arquitetura em camadas simples e escalável:

```
src/
├── server.ts # Inicialização do servidor
├── routes/ # Rotas da aplicação
├── controllers/ # Camada HTTP
├── services/ # Regras de negócio
├── middlewares/ # Middlewares globais
├── utils/ # Utilitários e helpers
├── config/ # Configurações
└── models/ # Tipos e modelos
prisma/
├── schema.prisma # Schema do banco
└── migrations/ # Migrations
```
---

### Responsabilidades

- **server.ts**
  - Inicializa o Express
  - Aplica middlewares globais
  - Registra rotas e handlers de erro

- **routes/**
  - Agrupamento de endpoints (`/auth`, `/users`, `/contacts`, `/ping`)
  - Apenas direcionam para controllers

- **controllers/**
  - Tratam requisição e resposta HTTP
  - Chamam serviços
  - Sem regra de negócio

- **services/**
  - Regras de negócio
  - Autenticação
  - Integrações (banco, e-mail)

- **middlewares/**
  - Autenticação JWT
  - Tratamento de erros

- **utils/**
  - Tokens
  - Hash de senha
  - Erros customizados
  - Templates de e-mail

- **prisma/**
  - Models
  - Migrations
  - Acesso ao banco

---

## Instalação e Uso

### 1. Instalar dependências

````npm i```

### 2. Configurando variáveis de ambiente

Crie um arquivo ```.env``` na raiz do projeto.

*Banco de Dados (PostgreSQL)*

```
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nomedobanco
```

*Servidor*

```
PORT=3000
```
*Autenticação JWT*

```
JWT_SECRET=chave
JWT_EXPIRES_IN=2h
```
_OBS_:_Não use a mesma chave para todos os projetos, você precisa gerar, tem sites que fazem isso._

*Envio de E-mails (SMTP)*
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=senha-ou-chave-de-aplicativo
SMTP_FROM="Exemplo <no-reply@exemplo.com>"
```

### 3. Configurar o banco de dados

O projeto já está preparado para PostgreSQL.

### 4. Executar migrations

```npx prisma migrate dev```

### 5. Iniciar o servidor

```npm run dev```

Servidor disponível em:

http://localhost:PORT

## Objetivo do Template

- Padronizar estrutura de backend
- Evitar retrabalho inicial
- Garantir boas práticas
- Facilitar manutenção
- Escalar projetos com segurança

*Espero ter te ajudado, desejo sucesso em sua carreira.*

---

### Dica

Lembre de utilizar o seu ```.gitignore``` não coloque arquivos importantes como ```env``` ou as bibliotecas utilizadas no node_modules, um exemplo do que você deve conter em seu ```.gitignore```.

```
node_modules
.env
/src/generated/prisma
docs
dist
```