# Task Manager

## 📝 Introdução

**Task Manager** é uma aplicação web fullstack desenvolvida como parte de um desafio técnico para estágio em desenvolvimento Fullstack. A aplicação permite que usuários cadastrem-se, autentiquem-se e gerenciem suas tarefas através de uma interface intuitiva construída com **React**, consumindo uma API RESTful criada com **Node.js** e **Express**, conectada a um banco de dados **PostgreSQL**.

> ⚠️ A funcionalidade de **marcar tarefas como concluídas** ainda não foi implementada.

---

## 📑 Tabela de Conteúdos

* [Instalação](#instalação)
* [Uso](#uso)
* [Funcionalidades](#funcionalidades)
* [Decisões Técnicas](#decisões-técnicas)
* [Tecnologias Utilizadas](#tecnologias-utilizadas)
* [Configuração](#configuração)
* [Possíveis Melhorias Futuras](#possíveis-melhorias-futuras)
* [Licença](#licença)

---

## 🚀 Instalação

### Pré-requisitos

* Node.js (v18+ recomendado)
* PostgreSQL
* npm ou yarn

### Clonando o repositório

```bash
git clone https://github.com/alyson-monteiro/Task-Manager.git
cd Task-Manager
```

### Backend

```bash
cd backend
cp .env.example .env  # Crie o arquivo de ambiente com suas variáveis
npm install
npm run migrate  # Caso existam migrações configuradas
npm start
```

### Frontend

```bash
cd ../frontend
npm install
npm start
```

A aplicação estará disponível em: `http://localhost:3000`.

---

## 🧑‍💻 Uso

1. Acesse a aplicação.
2. Crie uma conta com e-mail e senha válidos.
3. Faça login.
4. Crie, edite ou exclua suas tarefas.
5. (Em breve) Marque tarefas como concluídas.

---

## ✅ Funcionalidades

* [x] Cadastro de usuário com validação básica.
* [x] Login e logout com autenticação JWT.
* [x] CRUD de tarefas (criar, listar, editar e excluir).
* [ ] Marcar tarefas como concluídas (em desenvolvimento).
* [x] Interface responsiva com React.
* [x] Consumo da API via Axios.
* [x] Navegação protegida por autenticação.

---

## ⚙️ Decisões Técnicas

* **Separação de camadas**: O projeto está dividido em `frontend` e `backend` para manter a separação de responsabilidades.
* **JWT**: Usado para autenticação, garantindo segurança nas rotas protegidas.
* **PostgreSQL com Sequelize**: ORM utilizado para simplificar interações com o banco de dados relacional.
* **React Hooks**: Usado para gerenciamento de estado e efeitos colaterais.
* **React Router**: Implementado para controle de rotas no frontend.
* **Proteção de rotas**: Somente usuários autenticados podem acessar a interface de tarefas.

---

## 🛠 Tecnologias Utilizadas

### Backend

* Node.js
* Express.js
* PostgreSQL
* Sequelize ORM
* JWT (jsonwebtoken)
* bcryptjs

### Frontend

* React.js
* Axios
* React Router DOM
* CSS/Styled Components (se aplicável)

---

## 🔧 Configuração

No diretório `/backend`, crie um arquivo `.env` com as seguintes variáveis:

```env
PORT=5000
DATABASE_URL=postgres://<user>:<password>@localhost:5432/<dbname>
JWT_SECRET=sua_chave_secreta
```

---

## 🚀 Possíveis Melhorias Futuras

* [ ] Implementar marcação de tarefas como concluídas.
* [ ] Adicionar testes unitários e de integração.
* [ ] Melhorar o feedback visual com mensagens de erro/sucesso.
* [ ] Implementar paginação para tarefas.
* [ ] Deploy em ambiente cloud (Heroku, Vercel etc.).

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

Se quiser, posso incluir um diagrama da arquitetura ou uma imagem de demonstração. Deseja isso?
