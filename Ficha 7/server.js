const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3306;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
var mysql = require('mysql')

var connection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database: 'personsdb'    
});
connection.connect();

app.listen(port,() =>console.log(`Listening on port ${port}`));

app.get(`/persons`, function(req,res){
    connection.query("SELECT * FROM persons", function (err,result,field){
        // if(err) throw err;
        if(err){
            res.send(err);
        }
        else{
            res.send(result);    
        }
    });
});


app.post('/persons',function(req,res){
    var insert = 'INSERT INTO persons SET ?';
    var values = req.body;
    connection.query(insert,values, function (err,result,field){
        if(err){
            console.log("error: ", err);
            res.send(err);
        } 
        else{
            console.log(result.insertId);
            res.send(""+result.insertId);
        }
    });
});


app.delete('/persons', function(req,res){
    var insert = 'DELETE FROM persons WHERE ?';
    var values = req.body;
    connection.query(insert,values, function (err,result,field){
        if(err){
            console.log("error: ", err);
            res.send(err);
        } 
        else{
        console.log('deleted ' + result.affectedRows + ' rows');
            res.send(""+ result.affectedRows)
        }
    });
})