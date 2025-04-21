// src/middlewares/auth.middleware.js

const jwt = require('jsonwebtoken');

/**
 * Middleware que protege rotas, exigindo um JWT válido
 */
module.exports = (req, res, next) => {
  // 1. Pega o header "Authorization"
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ error: 'Token não fornecido' });
  }

  // 2. Separa esquema e token: "Bearer <token>"
  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res
      .status(401)
      .json({ error: 'Token inválido' });
  }

  try {
    // 3. Verifica o token e obtém o payload
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    // 4. Anexa dados do usuário à request para uso nas rotas
    req.user = {
      id: payload.userId,
      email: payload.email
    };
    return next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: 'Token inválido ou expirado' });
  }
};
