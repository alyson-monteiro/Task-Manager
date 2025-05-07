# Task Manager

## 📝 Introduction

**Task Manager** is a simple fullstack web application developed for portfolio purposes and to reinforce core concepts. The app allows users to register, authenticate, and manage their tasks through a clean and intuitive interface built with **React**, consuming a RESTful API developed using **Node.js** and **Express**, connected to a **PostgreSQL** database running in a Docker container.

---

## 🚀 Installation

### Prerequisites

* Node.js
* Docker + Docker Compose
* npm or yarn

### Cloning the Repository

```bash
git clone https://github.com/alyson-monteiro/Task-Manager.git
cd Task-Manager
```

### Database (PostgreSQL via Docker)

1. Start the PostgreSQL container:

```bash
docker-compose up -d
```

2. Copy the SQL file into the container:

```bash
docker cp meudb.sql postgres_sql:/meudb.sql
```

3. Execute the SQL script to populate the database:

```bash
docker exec -it postgres_sql psql -U postgres -d meudb -f /meudb.sql
```

### Backend

```bash
cd backend
cp .env.example .env  # Create the environment file with your variables
npm install
npm run dev
```

### Frontend

```bash
cd ../frontend
npm install
npm start
```

The app will be available at: `http://localhost:3000`.

---

## 🧑‍💻 Usage

1. Access the application.
2. Register with a valid email and password.
3. Log in.
4. Create, edit, or delete your tasks.

---

## ✅ Features

* [x] User registration with basic validation
* [x] Login and logout with JWT authentication
* [x] Task CRUD (create, read, update, delete)
* [x] Responsive interface with React
* [x] API consumption via Axios
* [x] Protected navigation for authenticated users

---

## ⚙️ Technical Decisions

* **Layered architecture**: The project is split into `frontend` and `backend` for clear separation of responsibilities
* **JWT**: Used for secure authentication and authorization
* **PostgreSQL with Sequelize**: ORM used for database interaction
* **Docker**: Simplifies database setup and management
* **React Hooks**: Used for state and effect management
* **React Router**: Handles routing in the frontend
* **Route protection**: Only authenticated users can access task management features

---

## 🛠 Technologies Used

### Backend

* Node.js
* Express.js
* PostgreSQL (via Docker)
* Sequelize ORM
* JWT (jsonwebtoken)
* bcryptjs

### Frontend

* React.js
* Axios
* React Router DOM
* CSS

---

## 🔧 Configuration

In the `/backend` directory, create a `.env` file with the following variables:

```env
PORT=3001
DB_HOST=postgres_sql
DB_PORT=5432
DB_USER=postgres
DB_PASS=yourpassword
DB_NAME=meudb
JWT_SECRET=umSegredoMuitoForte123
```

> Note: Make sure the `DB_HOST` matches the name of the PostgreSQL service defined in your `docker-compose.yml`.

---

## 📄 License

This project is licensed under the MIT License.
