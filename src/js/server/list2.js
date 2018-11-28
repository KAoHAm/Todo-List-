const db=require("./todos/dataUtils")


var express = require('express');
const bodyParser = require('body-parser');
var app=express();

db.setUpConnection()
// kap e hastatum db-i het
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", ["GET", "PUT", "POST", "DELETE", "OPTIONS"]);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/",(req, res)=>{
    db.GetTodo()
        .then(data=>res.send(data))
})

app.post("/",(req, res)=>{
    db.PostTodo(req.body)
        .then(data=>res.send(data))
})

app.delete("/",(req, res)=>{

	db.DeleteTodo(req.body)

	 .then(data => res.send(data));
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});
console.log();