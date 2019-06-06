const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

var mysql = require('mysql')

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database: 'teste1'
       
});
//connection.connect();

app.get('/', (req, res) => {
         res.json({
             message: "po quarelho s"
         });
});

exports.author_detail = function (req,res,next){
    var userId = req.params.id;
    var query = 'SELECT * FROM persons WHERE id = ?';
    connection.query(query, userId, function (err, result, fields){
        if (err) throw err;
        res.render('person', {title: 'Person Detail', person:result[0] })

    });
};

app.post('/', (req, res) => {
    var post = req.body.messages;
    var query = 'Insert into post (post, person_id) values = [?,?]';
    connection.query(query, post,1, function (err, result, fields){
        if (err) throw err;
        res.render('post', {title: 'huehue', person:result[0] })
  });
}); 


const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});

module.exports = app;