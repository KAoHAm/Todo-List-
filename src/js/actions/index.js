// src/js/actions/index.js
import {ADD_ToDo, LOAD_ToDo, LOADING_ToDo, DELETE_ToDo, LOADING} from "../constants/action-types";

const url = "http://localhost:8081/to-do";

export const addToDo = (todo) => ({
    type: ADD_ToDo, payload: {todo, deadLine}
});
export const loadingToDo = (dispatch, page) => ({
    type: LOADING_ToDo, payload: {dispatch, page}
});
export const loading = (page,dispatch) => ({
    type: LOADING, payload: {page, dispatch}
});
export const loadToDo = (todos, count, links, currentPage) => ({
    type: LOAD_ToDo, payload: {todos, count, links, currentPage}
});
export const deleteToDo = (_id) => ({
    type: DELETE_ToDo, payload: {_id}
});



