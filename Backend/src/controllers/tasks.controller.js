// src/controllers/tasks.controller.js
const {
    getTasksByUser,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
  } = require('../models/task.model');
  
  /**
   * Lista todas as tarefas do usuário
   */
  exports.list = async (req, res) => {
    try {
      const tasks = await getTasksByUser(req.user.id);
      return res.json(tasks);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar tarefas' });
    }
  };
  
  /**
   * Retorna uma tarefa pelo ID
   */
  exports.getOne = async (req, res) => {
    try {
      const task = await getTaskById(req.params.id, req.user.id);
      if (!task) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }
      return res.json(task);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar tarefa' });
    }
  };
  
  /**
   * Cria uma nova tarefa
   */
  exports.create = async (req, res) => {
    try {
      const { title, description } = req.body;
      if (!title) {
        return res.status(400).json({ error: 'Título é obrigatório' });
      }
      const id = await createTask({ title, description, userId: req.user.id });
      return res.status(201).json({ message: 'Tarefa criada', id });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao criar tarefa' });
    }
  };
  
  /**
   * Atualiza uma tarefa existente
   */
  exports.update = async (req, res) => {
    try {
      const { title, description } = req.body;
      await updateTask(req.params.id, { title, description }, req.user.id);
      return res.json({ message: 'Tarefa atualizada' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    }
  };
  
  /**
   * Remove uma tarefa
   */
  exports.remove = async (req, res) => {
    try {
      await deleteTask(req.params.id, req.user.id);
      return res.json({ message: 'Tarefa excluída' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao excluir tarefa' });
    }
  };