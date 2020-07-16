const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

let requests = 0;

server.use((req, res, next) => {
    requests++;
    console.log(requests);
    next();
});

function checkIdExists(req, res, next) {
    const { id } = req.params;
    const project = projects.find(x => x.id == id);
    if(!project)
        return res.status(400).json({ error: `Project doens't exists` });
    req.project = project;
    next();
}

function checkTaskExists(req, res, next) {
    const { taskIndex } = req.params;
    const task = req.project.tasks[taskIndex];
    if(!task)
        return res.status(400).json({ error: `Task doens't exists`});
    next();
}

server.get('/projects', (req, res) => {
    return res.json(projects);
});

server.get('/projects/:id', checkIdExists, (req, res) => {
    return res.json(req.project);
});

server.post('/projects', (req, res) => {
    const { id, title } = req.body;

    if(projects.find( p => p.id == id)) 
        return res.status(400).json({ error: `Id ${id} already registered` });

    const project = {
        id,
        title,
        tasks: []
    };

    projects.push(project);
    return res.json(project);
});

server.put('/projects/:id', checkIdExists, (req, res) =>{
    const { title } = req.body;
    req.project.title = title;
    return res.json(req.project);
});

server.delete('/projects/:id', checkIdExists, (req, res) => {
    const index = projects.findIndex(x => x.id == req.project.id);
    projects.splice(index, 1);
    return res.send();
});

server.post('/projects/:id/tasks', checkIdExists, (req, res) => {
    const { title } = req.body;
    req.project.tasks.push(title);
    return res.json(req.project);
});

server.put('/projects/:id/tasks/:taskIndex', checkIdExists, checkTaskExists, (req, res) => {
    const { title } = req.body;
    const { taskIndex } = req.params;
    req.project.tasks[taskIndex] = title;
    return res.send(req.project);
});

server.delete('/projects/:id/tasks/:taskIndex', checkIdExists, checkTaskExists, (req, res) => {
    const { taskIndex } = req.params;
    req.project.tasks.splice(taskIndex, 1);
    return res.send();
})

server.listen(5000);