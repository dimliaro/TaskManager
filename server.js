// backend/server.js

const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Μνήμη αντί για βάση για αρχή
let tasks = []; 
let idCounter = 1;

// Routes   

// GET all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST create a new task
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  const newTask = {
    id: idCounter++,
    title,
    description,
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json({ message: 'Task created', task: newTask });
});

// PUT update task
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const task = tasks.find(t => t.id == id);

  if (!task) return res.status(404).json({ message: 'Task not found' });

  task.title = title !== undefined ? title : task.title;
  task.description = description !== undefined ? description : task.description;
  task.completed = completed !== undefined ? completed : task.completed;

  res.json({ message: 'Task updated', task });
});

// DELETE task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(t => t.id != id);
  res.json({ message: 'Task deleted' });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
