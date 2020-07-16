const express = require('express');

const server = express();

server.use(express.json());

server.post('/projects', (req, res) => {
    return res.send(`post projects`)
});

server.get('/projects', (req, res) => {
    return res.send(`get projects`);
});

server.get('/projects/:id', (req, res) => {
    return res.send(`get projects by id`);
});

server.put('/projects/:id', (req, res) =>{
    return res.send(`put projects`);
});

server.delete('/projects/:id', (req, res) => {
    return res.send(`delete projects`);
});

server.post('/projects/:id/tasks', (req, res) => {
    return res.send(`post tasks`);
});

server.put('/projects/:id/tasks/:taskId', (req, res) =>  {
    return res.send(`put tasks`);
});

server.delete('/projects/:id/tasks/:taskId', (req, res) => {
    return res.send(`delete task`);
})

server.listen(5000);