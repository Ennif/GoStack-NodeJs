const { request } = require('express');
const express = require('express');  // importa o express para uma variavel

const app = express();

app.use(express.json());

app.get('/projects' ,function(req,res){

    const {title, owner} = req.query; //--> //const query = req.query
    console.log(title);                     //console.log(query)
    console.log(owner);

    return res.json([
        'Projeto 1',
        'projeto 2'
    ])
})

app.post('/projects' , function(req,res){
    const {title,owner} = req.body;  //const body = req.body;     
    console.log(title)               //console.log(body)
    console.log(owner)
    return res.json([
        'Projeto 1',
        'Projeto 2',
        'Projeto 3'
    ])
})

app.put('/projects/:id' , function(req,res){

    const params = req.params;
    console.log(params)

    return res.json([
        'Projeto 4',
        'Projeto 2',
        'Projeto 3 '
    ])
})

app.delete('/projects/:id' , function(req,res){
    return res.json([
        'Projeto 4',
        'Projeto 2'
    ])
})

app.listen(3333,function(){
    console.log("Back-end Start‼")
}) //Define a porta do local host

//AULA 08