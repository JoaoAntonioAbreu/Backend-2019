const express = require('express')
const app = express()
const fs  = require("fs")

//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))


//routes
app.get('/', (req, res) => {
	res.render('index')
})

//Listen on port 3000
server = app.listen(3000)



//socket.io instantiation
const io = require("socket.io")(server)


//listen on every connection
io.on('connection', (socket) => {
	console.log('New user connected')
	//default username
	socket.username = "Anonymous"
    io.sockets.emit('new_message', {message : 'Entered the chat  ', username : socket.username});
    //listen on change_username
    socket.on('change_username', (data) => {
        if(socket.username!=data.username){
        io.sockets.emit('new_message', {message : 'Mudou o nome para '+data.username, username : socket.username});
        socket.username = data.username
        }else{
            console.log("nome igual"+ socket)
        }
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        if(data.image!=null){
            io.sockets.emit('new_message', {message : data.message, username : socket.username, image: data.image});
        }else{
            io.sockets.emit('new_message', {message : data.message, username : socket.username, image: data.image});
        }
        var log = data.message+" "+socket.username+" "+ new Date()+"\r\n";
        fs.appendFile('teste1.txt',log)

    })

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })

    
    socket.on('disconnected', (data)=> {
        io.sockets.emit('new_message', {message : 'Disconnected  ', username : socket.username});
        socket.username="Anonymous"
        console.log('Got disconnect!');
    });
   
    socket.on('disconnect',()=>{
        console.log('disconnect')
        io.sockets.emit('new_message', {message : 'Disconected  ', username : socket.username});
    })

   
})




//

const multer = require('multer');
const path = require('path');

// Set Store Engine (multer)
const storage = multer.diskStorage({
    destination: './public/upload',
    filename: function(req, file, cb){
        cb(null,file.fieldname + '-' + Date.now() + 
        path.extname(file.originalname));
    }
});
const upload = multer ({
    storage: storage,
    limits:{fileSize: 1000000}, //limite da imagem em bytes
    fileFilter: function(req,file,cb){
        checkFileType(file,cb);
    }
}).single('image');

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
app.post('/upload', (req,res) =>{ //botao upload 
    upload(req, res, (err) => {
        if(err){
            res.render('index',{
                msg: err
            });
        } else {
            if(req.file == undefined){
                res.render('index',{
                    msg: 'Nao tens imagens '
                });
            } else {
                res.render('index',{
                    file: `/upload/${req.file.filename}`
                });
            }
        }
    })
});