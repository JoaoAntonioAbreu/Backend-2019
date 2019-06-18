// require and instantiate express
var express = require('express');
var app = express();

app.set('view engine', 'ejs'); // set up ejs for templating

//middlewares
app.use(express.static('public'));

// express server
var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port);
});

// route
app.get('/', function (req, res) {
    res.render('index.ejs');
});

var io = require('socket.io')(server);

// Registar o evento Connection
io.on('connection', function(socket){
    console.log("New User Connected")
    console.log(socket.id)

    socket.username = "Anonymous"
});

io.on('disconnect', function(socket){
    console.log("User disconnected"+ socket.id)
})


