// src/js/reducers/index.js
import {ADD_ToDo, DELETE_ToDo, LOAD_ToDo, LOADING_ToDo, ADDING_ToDo} from "../constants/action-types";
import {loadToDo, addToDo, addingToDo} from "../actions";

const url = "http://localhost:8081/todo";
const TimeOut=(t)=>{
    t.map(el=>{
        if (el.deadLine <= Number(new Date)) {
            el.title = el.title.concat(" Not Done!!!");
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
        }
    })
}
const postingTodo=(dispatch, todo)=>{
    fetch(url, {
        method: 'POST',
        body: JSON.stringify( todo),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res=>res.json())
        .then(data=>{
            data.data.map(el=> {
                dispatch(addToDo(el.attributes.pop(), el.count))
            })
        })
}
const fetchTodo=( dispatch, page)=>{
    fetch(url+"?page[offset]="+(page))
        .then(res=>res.json())
        .then(el=> {
            el.data.map(el => {
                dispatch(loadToDo(el.attributes, el.count, page))
            })
        })
}
const initialState = {
    todos: [],
}
const rootReducer = (state = initialState, {type, payload}) => {

    switch (type) {
        case ADDING_ToDo: {
            postingTodo(payload.dispatch, payload.todo )
            return state
        }
        case ADD_ToDo: {
            return {todos: [...state.todos, payload.todo], count:payload.count+1};
        }
        case LOADING_ToDo: {
            fetchTodo(payload.dispatch, )
            return state
        }
        case LOAD_ToDo: {
            TimeOut(payload.todos)
            // return {todos: [...state.todos, ...payload.todos], count: payload.count, links: payload.links};
            return {todos: [ ...state.todos, ...payload.todos], count: payload.count};
        }
        case DELETE_ToDo: {
            deletetodo(payload)
            return {todos: [...state.todos.filter(todo => todo._id !== payload._id)], count: payload.count}
        }
        default:
            return state;
    }

};
export default rootReducer;

