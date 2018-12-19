//var mongo=require('mongodb').MongoClient;
var mongoose = require('mongoose')
var mongo = require('mongodb');
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

    return  Todo.find();
}

exports.Count=(i)=>{
    return  i=Todo.countDocuments()
}
var myId = mongoose.Types.ObjectId();
var ObjectID = mongo.ObjectID
exports.PostTodo=(data)=> {

    data._id=new ObjectID
    const todo=new Todo({
        // _id: new ObjectID(),
        title: data.title,
        deadLine: data.deadLine,
    })
    console.log("Post todo", data)
    return todo.save()

}

exports.DeleteTodo=(data)=> {
    console.log("deleting")
    return  Todo.deleteOne({"_id":data._id})

}

