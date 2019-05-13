const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

function readFile(fileName){
    var file = fs.readFileSync(fileName, 'utf-8');
    return file;
}


app.get('/', function(req, res) {
    res.send(readFile("persons.json"));
});

app.post('/users', function(req,res){
    console.log("id in body");
    var file = readFile('persons.json');
    var jsonData = JSON.parse(file);
    var key = Object.keys(jsonData);
    var obj_length = key.length;
    obj_length++
    jsonData['person' + obj_length] = req.body;
    res.send(jsonData);
    
});

app.delete('/users/:id', function(req, res){
    var file = readFile('persons.json');
    var jsonData = JSON.parse(file);
    var id = req.params.id;
    delete jsonData['person' + id];
    res.send(jsonData);
});

app.get('/users/:id', function(req, res){
    var file = readFile('persons.json');
    var jsonData = JSON.parse(file);
    var id = req.params.id;
  
    res.send(jsonData['person'+id]);
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
