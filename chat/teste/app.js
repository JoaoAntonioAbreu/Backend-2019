const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const uuidv1 = require("uuid/v1");
const fs = require("fs");
// const sharp = require("sharp");
//set the template engine ejs
app.set("view engine", "ejs");

//middlewares
app.use(express.static("public"));
app.use("/upload", express.static(path.join(__dirname, "upload")));
//routes
app.get("/", (req, res) => {
  res.render("index");
});

//Listen on port 3000

var server = app.listen(3000, function() {
  var port = server.address().port;

  console.log("Example app listening at http://localhost:%s", port);

  fs.open("chat_log.txt", "a", function(err) {
    if (err) throw err;
    console.log("Ficheiro Aberto!");
  });
  fs.open("user_log.txt", "a", function(err) {
    if (err) throw err;
    console.log("Ficheiro Aberto!");
  });
});

const users = {};
const files = {};
var count = 0;
const io = require("socket.io")(server);

//listen on every connection
io.on("connection", socket => {
  function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;

    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Imagens!");
    }
  }
  const storage = multer.diskStorage({
    destination: "./public/upload",
    filename: function(req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    }
  });
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, //limite da imagem em bytes
    fileFilter: function(req, file, cb) {
      checkFileType(file, cb);
    }
  }).single("fked");

  app.post("/", (req, res) => {
    //botao upload
    upload(req, res, err => {
      if (!err) {
        this.imagem = `upload/${req.file.filename}`;
        console.log(this.imagem);

        files[count] = { imagem: this.imagem, uploader: this.imagem_id };
        console.log(files);
        count++;
      }
    });
  });

  var id = uuidv1();
  users[socket.id] = { nome: "User_" + id, socket: socket.id };
  socket.username = "User_" + id;
  io.sockets.emit("show_users", users);
  io.sockets.emit("new_message", {
    message: "Entered the chat  ",
    username: socket.username
  });
  socket.emit("show_username", { username: socket.username });

  today = new Date();
  today =
    today.getDate() +
    "/" +
    today.getMonth() +
    "/" +
    today.getFullYear() +
    " as " +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds();
  var log = socket.username + " Entrou no chat no dia " + today + "\r\n";
  fs.appendFileSync("user_log.txt", log, function(err) {
    if (err) throw err;
    console.log("Saved!");
  });

  //listen on change_username
  //listen on change_username
  socket.on("change_username", data => {
    var nomesrepetido = false;
    Object.keys(users).forEach(u => {
      // console.log(users[u])
      if (users[u].nome === data.username) {
        // socket.emit('new_message', { username: socket.username, message: data.message });
        nomesrepetido = true;
      }
    });
    if (nomesrepetido != true && socket.username != data.username) {
      io.sockets.emit("send_username", {
        new_username: data.username,
        old_username: socket.username
      });
      users[socket.id].nome = data.username;
      socket.username = data.username;
      socket.emit("show_username", { username: socket.username });
      io.sockets.emit("show_users", users);
    } else if (socket.username == data.username) {
      socket.emit("alert", { alert_text: "You have already this nickname!" });
    } else {
      socket.emit("alert", {
        alert_text: "Someone have already this nickname!"
      });
    }
  });

  socket.on("new_image", data => {
    this.imagem_id = data.id;
    console.log("onchange: " + this.imagem_id);
  });

  //listen on new_message
  socket.on("new_message", data => {
    today = new Date();
    today =
      today.getDate() +
      "/" +
      today.getMonth() +
      "/" +
      today.getFullYear() +
      " " +
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds();
    // if (socket.id == this.imagem_id) {
    Object.keys(files).forEach(f => {
      if (this.imagem != null && data.id == files[f].uploader) {
        io.sockets.emit("new_message", {
          image: files[f].imagem,
          username: socket.username,
          message: data.message
        });
        delete files[f];
        var log =
          socket.username +
          " Enviou: " +
          data.message +
          " this.imagem:  " +
          this.imagem +
          " Dia: " +
          today +
          "\r\n";
      } else {
        io.sockets.emit("new_message", {
          message: data.message,
          username: socket.username
        });
        var log =
          socket.username +
          " Enviou: " +
          data.message +
          " Dia: " +
          today +
          "\r\n";
      }
    });
    // }else{
    //   io.sockets.emit("new_message",{ message: 'Espera caralho', username: socket.username })
    // }
    fs.appendFileSync("chat_log.txt", log, function(err) {
      if (err) throw err;
      console.log("Saved!");
    });
  });

  socket.on("new_private_message", data => {
    var SelfPrivateMessage = false;
    var MessageSend = false;
    today = new Date();
    today =
      today.getDate() +
      "/" +
      today.getMonth() +
      "/" +
      today.getFullYear() +
      " " +
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds();
    Object.keys(users).forEach(u => {
      // console.log(users[u])
      if (
        "@" + users[u].nome === data.user &&
        data.user != "@" + socket.username
      ) {
        if (this.imagem != null) {
          socket.broadcast
            .to(users[u].socket)
            .emit("new_message", {
              image: this.imagem,
              username: "@" + socket.username,
              message: data.message
            });
          socket.emit("new_message", {
            image: this.imagem,
            username: "@" + socket.username,
            message: data.message
          });
          MessageSend = true;
          var log =
            socket.username +
            " Enviou: " +
            data.message +
            " e a this.imagem " +
            this.image +
            " para " +
            users[u].nome +
            " Dia: " +
            today +
            "\r\n";
          return log;
        } else {
          socket.broadcast
            .to(users[u].socket)
            .emit("new_message", {
              message: data.message,
              username: "@" + socket.username
            });
          socket.emit("new_message", {
            username: "@" + socket.username,
            message: data.message
          });
          MessageSend = true;
          var log =
            socket.username +
            " Enviou: " +
            data.message +
            " para " +
            users[u].nome +
            " Dia: " +
            today +
            "\r\n";
          return log;
        }
      } else if (data.user == "@" + socket.username) {
        SelfPrivateMessage = true;
      }
    });
    if (MessageSend != true && SelfPrivateMessage == true) {
      socket.emit("alert", {
        alert_text: "What's the point of whispering yourself?"
      });
    } else if (MessageSend != true) {
      socket.emit("alert", {
        alert_text: "Don't have any user with that nickname!"
      });
    }
    fs.appendFile("chat_log.txt", log, function(err) {
      if (err) throw err;
      console.log("Saved!");
    });
  });

  //listen on typing
  socket.on("typing", data => {
    socket.broadcast.emit("typing", { username: socket.username });
  });

  socket.on("disconnect", () => {
    console.log("disconnect");
    // console.log(socket.id)
    Object.keys(users).forEach(u => {
      if (socket.id == u) {
        delete users[u];
      }
    });
    // console.log(users)
    io.sockets.emit("show_users", users);
    io.sockets.emit("new_message", {
      message: "Disconected  ",
      username: socket.username
    });
  });
});
