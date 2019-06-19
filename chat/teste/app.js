const express = require('express')
const app = express()
const multer = require('multer');
const path = require('path');
const writeFile = require('write');
const fs = require('fs')
const sharp = require("sharp")
//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'));
app.use("/upload", express.static(path.join(__dirname,"upload")))
//routes
app.get('/', (req, res) => {
	res.render('index')
})

//Listen on port 3000
server = app.listen(3000)

//multer
const storage = multer.diskStorage({
    destination: './public/upload',
    filename: function(req, file, cb){
        cb(null,file.fieldname + '-' + Date.now() + 
        path.extname(file.originalname));
    }
});
//fieldname = index input name="fked"

// Init Upload
const upload = multer ({
    storage: storage,
    limits:{fileSize: 1000000}, //limite da imagem em bytes
    fileFilter: function(req,file,cb){
        checkFileType(file,cb);
    }
}).single('fked');

// CheckFileType
function checkFileType(file,cb){
    // Allowed File Extension
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(
        file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null, true);
    }else {
        cb('Error, Imagens Quaralho')
    }
}

//socket.io instantiation
const io = require("socket.io")(server)

const imagem = '';
const messagem='';


app.post('', (req,res) =>{ //botao upload 
    upload(req, res, (err) => {
        if(err){
            res.render('index',{
                msg: err
            });
        } else{
            console.log(req)
            //sharp(`/upload/`).resize(800).toFile(`/upload/${req.file.filename}`)
            sharp(req.file.path)
        .resize(850)
        .toFile(`./public/imagens/${req.file.filename}`)
        this.imagem= `imagens/${req.file.filename}`
        }
    })
});


//listen on every connection
io.on('connection', (socket) => {
	console.log('New user connected')

	//default username
	socket.username = "Anonymous"
    io.sockets.emit('new_message', { message: 'Has joined the chat', username: socket.username });

    //listen on change_username
    socket.on('change_username', (data) => {
        if (socket.username != data.username) {
            io.sockets.emit('new_message', { message: 'Mudou o nome para ' + data.username, username: socket.username });
            socket.username = data.username
        } else {
            console.log("nome igual" + socket)
        }
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        // var log = data.message + " " + socket.username + " " + new Date() + "\r\n";
        // fs.appendFile('teste1.txt', log)
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
        this.messagem ='username: ' + socket.username + ' messagem: '+ data.message +' '+new Date();
        //fs.appendFile('teste.txt',log + new Date())
        console.log(this.messagem)
        fs.appendFileSync('text.txt', this.messagem+"\r\n", function(err) {
            if (err) console.log(err);
          });
    })

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })

    socket.on('disconnected', (data) => {
        io.sockets.emit('new_message', { message: 'Disconnected  ', username: socket.username });
        socket.username = "Anonymous"
        console.log('Got disconnect!');
    });

    socket.on('disconnect', () => {
        console.log('disconnect')
        io.sockets.emit('new_message', { message: 'Disconected  ', username: socket.username });
    })

    socket.on('change_image', (data) => {
     io.sockets.emit('new_image', { image: this.imagem }); 
     fs.appendFileSync('imagens.txt',"username: " + socket.username +" Sent: "+this.imagem+"\r\n", function(err) {
        if (err) console.log(err);
      });
    })
})
