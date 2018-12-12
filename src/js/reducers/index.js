// src/js/reducers/index.js
import {ADD_ToDo, DELETE_ToDo, LOAD_ToDo, LOADING_ToDo, LOADING} from "../constants/action-types";
import {loadToDo} from "../actions";


const url = "http://localhost:8081/todo";


const fetchTodo = (dispatch) => {
   fetch(url+"?page[offset]="+0)
       .then(res=>res.json())
       .then(el=> {
            let links=el.links
           el.data.map(el => {
              // console.log("el",el)
               dispatch(loadToDo(el.attributes, el.count, links))
           })
               // console.log(loadToDo)
       })

}
const TimeOut=(t)=>{
   // console.log("t",t)
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
        .then(res=>res.json())
        .then(todo=>console.log(todo))
}
const loading=( dispatch, page)=>{
    fetch(url+"?page[offset]="+(page-1))
        .then(res=>res.json())
        .then(el=> {
            let links=el.links
            el.data.map(el => {
                dispatch(loadToDo(el.attributes, el.count, links, page))
            })
        })
}
const initialState = {
    todos: [],
}



const rootReducer = (state = initialState, {type, payload}) => {

    switch (type) {
        case ADD_ToDo: {
            console.log("pay",payload)
            postTodo(payload.todo)
            console.log(state)
            return {todos: [...state.todos, payload.todo]};
        }
        case LOADING_ToDo: {
            fetchTodo(payload.dispatch)
            return state
        }
        case LOADING: {
            loading(payload.dispatch, payload.page)
            return state
        }
        case LOAD_ToDo: {
            TimeOut(payload.todos)
           // return {todos: [...state.todos, ...payload.todos], count: payload.count, links: payload.links};
            return {todos: [ ...payload.todos], count: payload.count, links: payload.links};
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