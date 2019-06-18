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
    var images = $("#images")
    var disconnected = $("#disconnected")
    //Emit message
    send_message.click(function () {
        if(images.val()==''){
            socket.emit('new_message', { message: message.val(), image : null })
    }else{
        console.log(images.val())
        socket.emit('new_message', { message: message.val(), image : images.val() })
        images.val('')

    }
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

    //imagens    
  
});