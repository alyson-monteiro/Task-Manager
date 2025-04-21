require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());

// Importa os arquivos de rotas
const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/tasks.routes');

// Monta os grupos de rotas
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Rota de teste simples
app.get('/', (_, res) => res.send('API rodando!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`));
