import {ADD_ToDo, LOAD_ToDo, LOADING_ToDo, DELETE_ToDo, ADDING_ToDo} from "../constants/action-types";

export const addingToDo = (dispatch, todo) => ({
    type: ADDING_ToDo, payload: {dispatch, todo}
});
export const addToDo = (todo) => ({
    type: ADD_ToDo, payload: {todo}
});
export const loadingToDo = (dispatch, page,) => ({
    type: LOADING_ToDo, payload: {page, dispatch}
});
export const loadToDo = (todos, count) => ({
    type: LOAD_ToDo, payload: {todos, count}
});
export const deleteToDo = (_id) => ({
    type: DELETE_ToDo, payload: {_id}
});