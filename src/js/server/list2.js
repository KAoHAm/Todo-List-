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
const todosPerPage=6
const page=0

const url = "http://localhost:8081/todo";
const resSend=(data={},url)=>{
    let next
    let len=Math.ceil(data.length/todosPerPage)
    len>1? next=page+1 : null
      return {
       links: {
            self: url,
            first: url+"?page[offset]="+page,
            next: url+"?page[offset]="+next,
            last: url+"?page[offset]="+len
        },
        data: [{
            type: "todos",
            attributes: data,
        }]
    }
}
app.get("/todo",(req, res)=>{
    let  curentPage=req.query.page;
    const todosPerPage=6;
console.log(curentPage)

     if(curentPage!==undefined){
         db.GetTodo().skip(todosPerPage*(curentPage.offset)).limit(todosPerPage)
             .then(data=>{
                 res.send(resSend(data, url))
             })
     }
    else {
         db.GetTodo()
             .then(data => {
                 res.send(resSend(data, url))
             })
     }
})

app.post("/todo",(req, res)=>{
    db.PostTodo(req.body)
        .then(data=>{
            console.log("p", data)
            res.send(data)
        })
})

app.delete("/todo",(req, res)=>{
	db.DeleteTodo(req.body)
	 .then(data => res.send(data));
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});
console.log();