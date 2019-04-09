var obj = {
    "name": 'joao',
    "age": "19",
    "gender": 'M'
}
var str = JSON.stringify(obj)
console.log(str)

var json = JSON.parse(str)
console.log(json)



//Ficha 6
var Emitter = require("./emitter")
var emtr = new Emitter;

emtr.on('start', function(){
    console.log("teste");
})
// emtr.on(eventConstants.FILESAVED, function(){
//     console.log("A file was saved 1");
// });

// emtr.on(eventConstants.FILESAVED, function(){
//     console.log("A file was saved 2");
// });

emtr.emit("start");