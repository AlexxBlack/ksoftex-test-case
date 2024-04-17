import express from 'express';
import { tasks, Task } from '../models/task';
import { randomUUID } from "node:crypto";
import { validateUUID } from "../middleware/validateUUID";

const router = express.Router();

// Create
router.post('/', (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).send('Title is required');
    }
    const newTask: Task = { id: randomUUID(), title };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Read all
router.get('/', (req, res) => {
    res.json(tasks);
});

// Read one
router.get('/:id',validateUUID, (req, res) => {
    const id = req.params.id;
    const task = tasks.find(t => t.id === id);
    if (task) {
        res.json(task);
    } else {
        res.status(404).send('Task not found');
    }
});

// Update
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { title } = req.body;
    if (!title) {
        return res.status(400).send('Title is required');
    }
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.title = title;
        res.json(task);
    } else {
        res.status(404).send('Task not found');
    }
});

// Delete
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
        tasks.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Task not found');
    }
});

export default router;