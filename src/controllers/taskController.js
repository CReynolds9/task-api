import * as taskService from '../services/taskService.js';

export async function getTasks(req, res, next) {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

export async function createTask(req, res, next) {
  try {
    const { title, completed } = req.body;
    const task = await taskService.createTask({ title, completed });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

// NEW: GET /tasks/:id
export async function getTaskById(req, res, next) {
  try {
    const id = Number(req.params.id);

    // 400: invalid id
    if (!Number.isInteger(id)) {
      return res.status(400).json({
        error: 'Validation failed',
        details: ['ID must be a number'],
      });
    }

    const task = await taskService.getTaskById(id);

    // 404: not found
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // 200
    return res.status(200).json(task);
  } catch (err) {
    next(err);
  }
}
