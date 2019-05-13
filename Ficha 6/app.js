const express = require('express');
const fs = require('fs');
const app = express();


var server = app.listen(4000, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s",host, port);
    fs.open('log.txt', 'a', function(err,fd){
        console.log(fd);
    });
});

function writeLog(req,res){
    var log = req.path + ", " + req.method + ", " + new Date + "\n";
    fs.appendFile('log.txt', log, function(err){
        if (err) throw err;
        console.log('Saved');
        
    });
}

app.get("/", function(req,res){
    writeLog(req,res);
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.end("Hello World");
})

app.get("/index", function(req,res){
    writeLog(req,res);    
    res.writeHead(200, {'Content-Type' : 'text/html'});

    var html = fs.readFileSync("./index.html", "utf-8"); 
    html = html.replace("Template", new Date());
    res.end(html);   
});

app.get("/user/:name", function(req,res){
    writeLog(req,res);    
    res.writeHead(200, {'Content-Type' : 'text/html'});
    var name = req.params.name;
    var html = fs.readFileSync("./index.html", "utf-8"); 
    html = html.replace("Template", "Welcome " + name + "!!!!!");
    res.end(html);   
});

app.get("/log", function(req,res){
    writeLog(req,res);
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    var log = fs.readFileSync("log.txt");
    res.end(log);
})

app.get("/download", function(req,res){
    writeLog(res,res);
    var log = "log.txt";
    res.download(log);   
    
});


app.get("/clear", function(req,res){
    writeLog(req,res);    
    res.writeHead(200, {'Content-Type' : 'text/html'});
    var html = fs.readFileSync("./index.html", "utf-8"); 
    fs.unlinkSync("log.txt");
    html = html.replace("Template", "Log Apagado ");
    
    res.end(html);   
});