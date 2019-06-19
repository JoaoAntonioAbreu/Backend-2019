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
    var disconnected = $("#disconnected")

    var image = $("#image")
    var send_image = $("#send_image")




    send_image.click(function () {
        console.log('aqui')
        socket.emit('new_image', { image: image.val() })
    })

    //Listen on new_message
    socket.on("new_image", (data, file) => {
        console.log(data)
        feedback.html('');
        image.val('');
        chatroom.append("<img src='imagens/fked-1560911559980.png' style='max-width: 100%;height: auto;'>")
       // console.log("<img src='upload/fked-1560906187409.png></img>")
    })

    //Emit message
    send_message.click(function () {
        socket.emit('new_message', { message: message.val() })
    })

    //Listen on new_message
    socket.on("new_message", (data) => {
        feedback.html('');
        message.val('');
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
    })

    //Emit a username
    send_username.click(function () {
        socket.emit('change_username', { username: username.val() })
    })

    //change name
    socket.on("send_username", (data) => {
        feedback.html('');
        message.val('');
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
    })

    //Emit typing
    message.bind("keypress", () => {
        socket.emit('typing')
    })

    //Listen on typing
    socket.on('typing', (data) => {
        feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
    })

    //disconnect 
    socket.on('disconnect', () => {
        socket.emit('disconnect')
    })
    socket.on('disconnected', (data) => {
        feedback.html('');
        message.val('');
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
    })
    disconnected.click(function () {
        socket.emit('disconnected', { username: username.val() })
    })
});