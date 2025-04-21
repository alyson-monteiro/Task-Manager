const auth = require('../middlewares/auth.middleware');
const express = require('express');
const router = express.Router();
router.use(auth);


const {
  list,
  getOne,
  create,
  update,
  remove
} = require('../controllers/tasks.controller');

// Aplica middleware de autenticação a todas as rotas abaixo
router.use(auth);

// Retorna todas as tarefas do usuário autenticado
router.get('/', list);

// Retorna uma única tarefa pelo ID
router.get('/:id', getOne);

// Cria uma nova tarefa
router.post('/', create);

// Atualiza uma tarefa existente
router.put('/:id', update);

// Exclui uma tarefa
router.delete('/:id', remove);

module.exports = router;