const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');

function readFile(fileName){
    var file = fs.readFileSync(fileName, 'utf-8');
    return file;
}


app.get('/', function(req, res) {
    res.send(readFile("persons.json"))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
