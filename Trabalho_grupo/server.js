const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

function readFile(fileName) {
    var file = fs.readFileSync(fileName, 'utf-8');
    return file;
}
app.get('/', function (req, res) {
    var file = readFile('photos.json');
    var jsonData = JSON.parse(file);
    res.send(jsonData);
})

app.get('/photos/:id', function (req, res) {
    var file = readFile('photos.json');
    var jsonData = JSON.parse(file);
    var id = req.params.id;
    res.send(jsonData['photo' + id]);
})

app.delete('/photos/:id', function (req, res) {
    var file = readFile('photos.json');
    var jsonData = JSON.parse(file);
    var id = req.params.id;
    var photo = jsonData['photo' + id];
    if (photo) {
        delete jsonData['photo' + id];
        fs.writeFileSync("photos.json", JSON.stringify(jsonData, null, 4));
        res.send('O id '+ id + ' foi apagado com sucesso')
    } else {
        res.send("ID " + id + " nao foi encontrado")
    }
});

app.post('/photos/:id', function (req, res) {
    var file = readFile('photos.json');
    var jsonData = JSON.parse(file);
    var id = req.params.id;
    var photo = jsonData['photo' + id];

    if (photo) {
        photo.dislikes++;
        fs.writeFileSync("photos.json", JSON.stringify(jsonData, null));
        res.send(photo)
    } else {
        res.send("O id " + id + " nao foi encontrado");
    }
});

app.post('/comments/:id', function (req, res) {
    var file = readFile('photos.json');
    var jsonData = JSON.parse(file);
    var id = req.params.id;
    var photo = jsonData['photo' + id];
    var comment = req.body.comments;


    if (photo) {
        photo.comments.push(comment);
        fs.writeFileSync("photos.json", JSON.stringify(jsonData, null));
        res.send(jsonData['photo' + id])
    } else {
        res.send("O id " + id + " nao foi encontrado")
    }
});

app.get('/likes', function (req, res) {
    var file = readFile('./photos.json');
    var jsonData = JSON.parse(file)

    var key = Object.keys(jsonData);
    var obj_length = key.length;

    var likes = [];
    var guardar = [];
    for (var i = 1; i <= obj_length; i++) {
        likes.push(jsonData['photo' + i].likes);
    } 
    likes.sort();
    for(i=likes.length;i>=0;i--){
        for(j=1;j<=obj_length;j++){
            if(likes[i]==jsonData['photo'+j].likes){
                guardar.push('photo'+j,jsonData['photo'+j])
            }
        }
    }
    res.send(guardar);
})