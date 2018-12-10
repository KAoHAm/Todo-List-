// src/js/actions/index.js
import {ADD_ToDo, LOAD_ToDo, LOADING_ToDo, DELETE_ToDo} from "../constants/action-types";

const url = "http://localhost:8081/to-do";

export const addToDo = (todo) => ({
    type: ADD_ToDo, payload: {todo, deadLine}
});
export const loadingToDo = (dispatch, count) => ({
    type: LOADING_ToDo, payload: {dispatch, count}
});
export const loadToDo = (todos, count) => ({
    type: LOAD_ToDo, payload: {todos, count}
});
export const deleteToDo = (_id) => ({
    type: DELETE_ToDo, payload: {_id}
});



