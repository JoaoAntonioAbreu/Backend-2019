const fs = require('fs');

function writeLorem(){
    var lorem = '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."';
    for (var i = 0; i<300; i++) {
        fs.appendFileSync('./lorem.txt', lorem);
    }

};
writeLorem();

// fs.readFileSync('./lorem.txt', (err,data) =>{
//     if (err) throw (err)
//     var x = data;
//     console.log("somethingsomethings");

// });