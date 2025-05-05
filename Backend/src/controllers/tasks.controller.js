const {
    getTasksByUser,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
  } = require('../models/task.model');
  

//List all users tasks
  exports.list = async (req, res) => {
    try {
      const tasks = await getTasksByUser(req.user.id);
      return res.json(tasks);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error listing tasks' });
    }
  };
  

  //Return a single task by ID
  exports.getOne = async (req, res) => {
    try {
      const task = await getTaskById(req.params.id, req.user.id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      return res.json(task);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error in getting task' });
    }
  };
  

  exports.create = async (req, res) => {
    try {
      const { title, description } = req.body;
      if (!title) {
        return res.status(400).json({ error: 'Title is required' });
      }
      const id = await createTask({ title, description, userId: req.user.id });
      return res.status(201).json({ message: 'Task Created', id });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error creating task' });
    }
  };
  

  exports.update = async (req, res) => {
    try {
      const { title, description } = req.body;
      await updateTask(req.params.id, { title, description }, req.user.id);
      return res.json({ message: 'Task updated' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error updating task' });
    }
  };
  

  exports.remove = async (req, res) => {
    try {
      await deleteTask(req.params.id, req.user.id);
      return res.json({ message: 'Task deleted' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error deleting task' });
    }
  };