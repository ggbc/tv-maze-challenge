##
## I developed the code in english but the readme I'll try to keep in portuguese, understanding that the evaluators are brazilians also.
##



# TV Challenge

Aplicação web full-stack para busca e acompanhamento de séries de TV,
desenvolvida como desafio técnico.

## Tecnologias

- **Backend:** Node.js 24, TypeScript 5.9.3, Express
- **Frontend:** React, TypeScript, Vite
- **Banco de dados:** PostgreSQL 15
- **Infraestrutura:** Docker, Docker Compose 3.3

## Arquitetura

O projeto segue os princípios de **Clean Architecture** e **SOLID**,
com o backend organizado em quatro camadas:

- `domain` — Entities e interfaces dos repositórios, sem dependências externas.
- `application` — Use Cases e interfaces de serviços externos (API TVMaze).
- `infrastructure` — Implementações concretas: banco de dados e chamadas HTTP.
- `interfaces` — Controllers e rotas Express.

A regra de dependência é sempre respeitada: camadas externas conhecem as internas, nunca o contrário. Isso garante que os Use Cases sejam testáveis de forma isolada, sem banco de dados ou internet.

## Funcionalidades

- Busca de séries pelo nome (API pública TVMaze) 
- Tela de detalhes com poster, sinopse, gêneros e lista de episódios
- Episódios agrupados por temporada
- Checkbox para marcar episódios como assistidos (estado persistido no banco)
- Comentários por série

## Como rodar

**Pré-requisito:** Docker e Docker Compose instalados.
```bash
git clone https://github.com/seu-usuario/tv-challenge.git
cd tv-challenge
docker-compose up --build
```

Aguarde as mensagens:
```
tv_challenge_db       | Banco de dados pronto para aceitar conexões.
tv_challenge_backend  | Banco de dados conectado com sucesso.
tv_challenge_backend  | Migrations executadas com sucesso.
tv_challenge_backend  | Servidor rodando na porta 7777
```

Acesse:
- **Frontend:** http://localhost:3000
- **Backend (health check):** http://localhost:7777/health

## Como rodar os testes
```bash
cd backend
npm test
```

## Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET    | /shows?q=query | Busca séries pelo nome |
| GET    | /shows/:id | Detalhes da série com episódios |
| GET    | /shows/:id/comments | Comentários da série |
| PATCH  | /episodes/:id/watched | Marca/desmarca episódio como assistido |
| POST   | /episodes/comments | Adiciona comentário |

## Estrutura do projeto
```
tv-challenge/
├── backend/
│   ├── src/
│   │   ├── domain/          # Entities e interfaces
│   │   ├── application/     # Use Cases
│   │   ├── infrastructure/  # Banco de dados e HTTP externo
│   │   └── interfaces/      # Controllers e rotas
│   └── tests/               # Testes unitários dos Use Cases
├── frontend/
│   └── src/
│       ├── components/      # Componentes reutilizáveis
│       ├── pages/           # Telas da aplicação
│       └── services/        # Chamadas ao backend 
└── docker-compose.yml
```