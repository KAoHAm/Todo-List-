// src/js/reducers/index.js
import {ADD_ToDo, DELETE_ToDo, LOAD_ToDo, LOADING_ToDo} from "../constants/action-types";
import {loadToDo} from "../actions";


const url = "http://localhost:8081/";
const fetchTodo = (dispatch) => {
    fetch(url)
        .then(response => response.json())
        .then(todos => {
            dispatch(loadToDo(todos))

        })
}
const TimeOut=(t)=>{
    t.map(el=>{
        if(el.deadLine<=Number(new Date)){
            el.title= el.title.concat(" Not Done!!!");
            //console.log("el",typeof el.title)
        }
    })
}
const deletetodo=(todo)=>{
    return fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(todo),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
    })
        .then(res => res.json())
 }
const postTodo=(todo)=>{
    fetch(url, {
        method: 'POST',
        body: JSON.stringify( todo),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}
const initialState = {
    todos: [],
}
const rootReducer = (state = initialState, {type, payload}) => {

    switch (type) {
        case ADD_ToDo: {
            postTodo(payload.todo)
            return {todos: [...state.todos, payload.todo]};
        }
        case LOADING_ToDo: {

            fetchTodo(payload.dispatch)
            return state
        }
        case LOAD_ToDo: {

            TimeOut(payload.todos)
            return {todos: [...state.todos, ...payload.todos]};
        }
        case DELETE_ToDo: {

            deletetodo(payload)
            return {todos: [...state.todos.filter(todo => todo._id !== payload._id)]}
        }
        default:
            return state;
    }

};
export default rootReducer;