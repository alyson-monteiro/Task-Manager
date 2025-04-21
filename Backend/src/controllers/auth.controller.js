// src/controllers/auth.controller.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/user.model');

/**
 * Cadastra um novo usuário
 */
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Preencha todos os campos' });
    }

    // Verifica se o e-mail já existe
    if (await findUserByEmail(email)) {
      return res.status(409).json({ error: 'E-mail já cadastrado' });
    }

    // Gera hash da senha
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Cria o usuário no banco
    const userId = await createUser({ username, email, passwordHash });
    return res.status(201).json({ message: 'Usuário criado', userId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

/**
 * Faz login de usuário e retorna JWT
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Preencha todos os campos' });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Compara senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gera o token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};