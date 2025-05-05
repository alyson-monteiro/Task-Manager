require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());


const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/tasks.routes');

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server initialized on port ${PORT}`));
