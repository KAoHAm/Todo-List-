//var mongo=require('mongodb').MongoClient;
var mongoose = require('mongoose')
const Schema=mongoose.Schema;

const todoSchema= new Schema({
    title: {type: String},
    deadLine: {type:Number}
}, {
    versionKey: false,
});

const Todo=mongoose.model("todo", todoSchema)


exports.setUpConnection=()=> {

    console.log("connecting...")
    mongoose.connect(`mongodb://localhost/todo`);

}

exports.GetTodo=()=>{
    console.log("Get Todo")

    return Todo.find()
}

exports.PostTodo=(data)=> {
    const todo=new Todo({
        title: data.title,
        deadLine: data.deadLine
    })
    console.log("Post Todo")
    return todo.save()
}

exports.DeleteTodo=(data)=> {
	console.log("deleting", data)
	return  Todo.deleteOne({"_id":data._id})

}

/*   links: {
        self: "http://localhost:8081/todos",
        next: "http://localhost:8081/todos?page[offset]=2",
        last: "http://localhost:8081/todos?page[offset]=10"
    },
    data: [{
        type: "articles",
        id: "1",
        attributes: {
            title: "JSON:API paints my bikeshed!"
        },
        relationships: {},
        links:{
            self: "http://localhost:8081/todos/1"
        },
    }],
   included: [{
        type: "todos",
        attributes: {
            title: {type: String},
            deadLine: {type:Number}
        },
        links: {
            self: "http://localhost:8081/todos/_id"
        }
    }],

}, {
    versionKey: false,
});*/