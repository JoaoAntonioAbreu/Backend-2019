const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3306;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
var mysql = require('mysql')

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database: 'personsdb'
       
});
//connection.connect();



exports.author_detail = function (req,res,next){
    var userId = req.params.id;
    var query = 'SELECT * FROM persons WHERE id = ?';
    connection.query(query, userId, function (err, result, fields){
        if (err) throw err;
       // res.render('person', {title: 'Person Detail', person:
        res.send(result[0]);
    });
};