// src/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');

// Rota para cadastro de usuário
router.post('/register', register);

// Rota para login (retorna JWT)
router.post('/login', login);

module.exports = router;