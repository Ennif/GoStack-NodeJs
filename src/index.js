const { request, response } = require('express');
const express = require('express');  // importa o express para uma variavel

const {uuid, isUuid} = require('uuidv4');

const app = express();

app.use(express.json());


const projects = [];

function logRequests(req, res, next){
    const {method, url} = req
   
    const logLabel = `[${method.toUpperCase()}] ${url }`;
   
    console.time(logLabel)
    
     next();

    console.timeEnd(logLabel)
}

function validateProjectId(req,res,next){
    const {id} = req.params;

    if(!isUuid(id)){
        return res.status(400).json({ error: 'Invalid Project ID.'});
        }

     return next()   
}

app.use(logRequests);

app.get('/projects',function(req,res){
    const { title } = req.query;

    const results = title
     ? projects.filter(project => project.title.includes(title))
     : projects

    return res.json(results)
})

app.post('/projects' , function(req,res){
    const {title,owner} = req.body;  //const body = req.body;     
    
    const project = { id: uuid(), title, owner};
   
    projects.push(project);
   
    return res.json(project)
})

app.put('/projects/:id', validateProjectId , function(req,res){

    const {title,owner} = req.body;
    const { id } = req.params;

    const projectIndex = projects.findIndex(project => project.id == id);

    if (projectIndex < 0){
        return res.status(400).json({error: 'Project not found.'})
    }

    const project = {
        id,
        title,
        owner,
        
    };
    projects[projectIndex] = project;

    return res.json(project);
})

app.delete('/projects/:id', validateProjectId , function(req,res){
    const {id} =req.params; 

    const projectIndex = projects.findIndex(project => project.id == id);

    if (projectIndex < 0){
        return res.status(400).json({error: 'Project not found.'})
    }

    projects.splice(projectIndex,1);



    return res.status(204).send();
})

app.listen(3333,function(){
    console.log("Back-end Start‼")
}) //Define a porta do local host

//AULA 08