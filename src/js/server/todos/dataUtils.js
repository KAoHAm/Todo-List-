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

    return  Todo.find().sort({"deadLine":-1});
}

exports.Count=(i)=>{
    return  i=Todo.countDocuments()
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

