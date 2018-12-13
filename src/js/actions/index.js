// src/js/actions/index.js
import {ADD_ToDo, LOAD_ToDo, LOADING_ToDo, DELETE_ToDo} from "../constants/action-types";

export const addToDo = (todo) => ({
    type: ADD_ToDo, payload: {todo, deadLine, }
});
export const loadingToDo = (page,dispatch) => ({
    type: LOADING_ToDo, payload: {page, dispatch}
});
export const loadToDo = (todos, count, links, currentPage) => ({
    type: LOAD_ToDo, payload: {todos, count, links, currentPage}
});
export const deleteToDo = (_id) => ({
    type: DELETE_ToDo, payload: {_id}
});



