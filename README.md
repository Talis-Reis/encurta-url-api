<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Encurta URL API

API para encurtamento de URLs, desenvolvida em [NestJS](https://nestjs.com/) por Talis Aparecido dos Reis.

## Sumário

- [Descrição](#descrição)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Execução](#execução)
- [Endpoints Principais](#endpoints-principais)
- [Testes](#testes)
- [Licença](#licença)

## Descrição

Esta API permite criar, listar, atualizar e remover URLs encurtadas, além de autenticação de usuários e controle de permissões.

## Instalação

### Usando Docker Compose

O projeto possui um arquivo `docker-compose.yml` para facilitar a execução do ambiente completo (API + banco de dados).

1. **Configure o arquivo `.env`**
   Crie um arquivo `.env.development` baseado no `.env.example` e ajuste as variáveis conforme necessário, o `.env.example` já possui a configuração necessária, só copiar os dados do arquivo e colar dentro do `.env.development`.

2. **Suba os containers**
   Execute o comando abaixo na raiz do projeto:

   ```bash
   docker-compose up --build
   ```

   Isso irá subir a API e o banco de dados (PostgreSQL) já configurados.

3. **Acesse a aplicação**
   - API: [http://localhost:3000/api](http://localhost:3000/api)
   - Banco de dados: disponível na porta definida no `docker-compose.yml`

### Instalação manual (sem Docker)

Se preferir rodar localmente sem Docker:

```bash
npm install
```

Siga os passos de configuração e execução descritos abaixo.

## Configuração

Crie um arquivo `.env.development` baseado no `.env.example` e configure as variáveis de ambiente, como conexão com banco de dados e chave JWT. O `.env.example` já possui a configuração necessária, só copiar os dados do arquivo e colar dentro do `.env.development` depois alterar o host do banco de dados para localhost ou 127.0.0.1

> **Dica:**
> Você pode copiar o arquivo `.env.example` e renomear para `.env.development` para facilitar.
> O arquivo `.env.example` já contém todas as variáveis necessárias para rodar o projeto.

## Execução

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
```

Acesse a documentação Swagger em: `http://localhost:3000/api`

## Endpoints Principais

### Autenticação

- `POST /v1/auth/signin` — Login do usuário
- `POST /v1/auth/signup` — Cadastro de novo usuário

### Usuários

- `PATCH /v1/users/change-user` — Atualiza dados do usuário autenticado
- `PATCH /v1/users/:id/permissions` — Atualiza permissões (admin, user)
- `PATCH /v1/users/change-password` — Altera senha do usuário autenticado

### URLs Encurtadas

- `POST /v1/shorten-url` — Cria uma nova URL encurtada
- `GET /v1/shorten-url` — Lista URLs encurtadas do usuário
- `PATCH /v1/shorten-url/:id` — Atualiza a URL original
- `DELETE /v1/shorten-url/:id` — Remove uma URL encurtada

### Redirecionamento

- `GET /v1/:shortCode` — Redireciona para a URL original

> **Dica:**
> Para testar o redirecionamento, utilize a rota completa no navegador, por exemplo:
> `http://localhost:3000/api/v1/SHDs23`
>
> Se você tentar acessar essa rota pelo Swagger, pode ocorrer um erro, pois o Swagger não lida bem com redirecionamentos.
> Nesse caso, copie a URL gerada e acesse diretamente pelo navegador, ou utilize ferramentas como Postman ou Insomnia para testar o redirecionamento corretamente.

## Testes

```bash
npm run test
```

## Licença

UNLICENSED
