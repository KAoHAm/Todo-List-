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
                let arr=el.attributes.filter(el=>el.title===todo.title)
                dispatch(addToDo(arr[0], el.count))
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
const byTime =(p) => {
    p.sort((a,b)=>a.deadLine-b.deadLine)
}

const initialState = {
    todos: [],
    count: 0
}
const rootReducer = (state = initialState, {type, payload}) => {

    switch (type) {
        case ADDING_ToDo: {
            postingTodo(payload.dispatch, payload.todo )
            return state
        }
        case ADD_ToDo: {
            let newState=[...state.todos, payload.todo]
            byTime(newState)
            if(newState.length>6)
                newState.pop()
            return {todos: newState, count:state.count+1};
        }
        case LOADING_ToDo: {
            fetchTodo(payload.dispatch, payload.page )
            return state
        }
        case LOAD_ToDo: {
            TimeOut(payload.todos)

            //byTime(state.attributes)

            // return {todos: [...state.todos, ...payload.todos], count: payload.count, links: payload.links};
            return {todos: [  ...payload.todos], count: payload.count};
        }
        case DELETE_ToDo: {
            deletetodo(payload)
            return {todos: [...state.todos.filter(todo => todo._id !== payload._id)], count: state.count-1}
        }
        default:
            return state;
    }

};
export default rootReducer;

