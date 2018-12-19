import {ADD_ToDo, LOAD_ToDo, LOADING_ToDo, DELETE_ToDo, ADDING_ToDo} from "../constants/action-types";

export const addingToDo = (dispatch, todo, count ) => ({
    type: ADDING_ToDo, payload: {dispatch, todo, count}
});
export const addToDo = (todo, count) => ({
    type: ADD_ToDo, payload: {todo, count}
});
export const loadingToDo = (page,dispatch) => ({
    type: LOADING_ToDo, payload: {page, dispatch}
});
export const loadToDo = (todos, count, ) => ({
    type: LOAD_ToDo, payload: {todos, count,  }
});
export const deleteToDo = (_id, count, deadLine) => ({
    type: DELETE_ToDo, payload: {_id, count, deadLine}
});