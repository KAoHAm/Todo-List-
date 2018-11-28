const fs = require("fs");
const path='./toDo/to-do.json'
const writeing=(data, path)=>{ fs.writeFileSync(path, JSON.stringify(data) )}

exports.saveToDo=(toDo) => {
	const toDoArray = this.getToDo();
	toDoArray.push(toDo);
    writeing(toDoArray, path)
	return toDoArray;
},

exports.getToDo = () => {
	const data = fs.readFileSync(path);
    const toDoArray = JSON.parse(data);
	return toDoArray;
},

exports.delateToDo = (todo) => {
	const toDoArray = this.getToDo();
	const filterArray=toDoArray.filter(el=>el.id !==todo.id)
	writeing(filterArray, path)
	return filterArray;
}
