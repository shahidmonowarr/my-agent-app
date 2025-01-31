import express, { Request, Response } from 'express';
import Task from '../models/Task';

const router = express.Router();

// Create a new task
router.post('/tasks', async (req: Request, res: Response) => {
  const { title, description } = req.body;
  try {
    const newTask = new Task({ title, description });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Get all tasks
router.get('/tasks', async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;