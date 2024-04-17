import express from 'express';
import tasksRouter from './api/tasks';
import config from './config';

const app = express();

app.use(express.json());

app.use('/tasks', tasksRouter);

app.listen(config.server.port, () => {
    console.log(`Server running at http://localhost:${config.server.port}`);
});