$(function () {
    //make connection
    var socket = io.connect('http://localhost:3000')

    //buttons and inputs
    var message = $("#message")
    var username = $("#username")
    var send_message = $("#send_message")
    var send_username = $("#send_username")
    var chatroom = $("#chatroom")
    var feedback = $("#feedback")
    var showUsername = $("#sUsername")
    var listUsers = $("#users_list")
    var guardarpalavra = null
    var imagem=$("#imagem")
    
    imagem.change(function(){
        console.log("chat.js "+socket.id)
        socket.emit('new_image',{id:socket.id})

    })

    //Emit message
    send_message.click(function (data) {
        private = false
        message.val().split(" ").forEach(palavra => {
            for (var i = 0; i < palavra.length; i++) {
                if (palavra[i] === "@" && i == 0) {
                    private = true
                    guardarpalavra = palavra
                    // console.log(palavra[i])
                }
            }
        })
        if (private == true) {
            var messagem = ""
            for (var i = 1; i < message.val().split(" ").length; i++) {
                if (i == message.val().split(" ").length - 1) {
                    messagem += (message.val()).split(" ")[i]
                } else {
                    messagem += (message.val()).split(" ")[i] + " "
                }
            }
            socket.emit('new_private_message', { message: messagem, user: guardarpalavra })
        } else {
            socket.emit('new_message', { message: message.val(), image: data.image, username: socket.username,id:socket.id })
        }
        message.val('')
    })

    //Listen on new_message
    socket.on("new_message", (data) => {
        feedback.html('');
        console.log(data)
        if (data.image != undefined && data.message == "") {
            chatroom.append("<p class='message'>" + data.username + ":<br> <img  width='500px' height='auto' src=" + data.image + ">  </p>")
        } else if (data.image != undefined && data.message != "") {
            chatroom.append("<p class='message'>" + data.username + ": " + data.message + "<br> <img  width='500px' height='auto' src=" + data.image + ">  </p>")
        } else {
            chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
        }
    })

    socket.on("show_username", (data) => {
        showUsername.html(data.username)
    })
    //Emit a username
    socket.on("show_users", (data) => {
        listUsers.html(null)
        Object.keys(data).forEach(u => {
            listUsers.append("<li>" + data[u].nome + "</li>")
            // console.log(data[u].nome)
        });
    })

    socket.on("alert", (data) => {
        alert(data.alert_text)
    })

    //Emit a username
    send_username.click(function () {
        socket.emit('change_username', { username: username.val() })
        username.val('')
    })

    //change name
    socket.on("send_username", (data) => {
        chatroom.append("<p class='message'>" + data.old_username + ": Mudou o nome para  " + data.new_username + "</p>")
    })


    //Emit typing
    message.bind("keypress", () => {
        socket.emit('typing')
    })

    //Listen on typing
    socket.on('typing', (data) => {
        feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
    })


});