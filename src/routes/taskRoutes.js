import express from 'express';
import * as taskController from '../controllers/taskController.js';
import { validateTask } from '../middleware/validateTask.js';

const router = express.Router();

// List + Create
router.get('/', taskController.getTasks);
router.post('/', validateTask, taskController.createTask);

// NEW: Get one by id
router.get('/:id', taskController.getTaskById);

export default router;
