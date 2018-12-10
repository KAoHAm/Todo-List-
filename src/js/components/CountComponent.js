import React from "react";
import { connect } from "react-redux";
const url = "http://localhost:8081/todo"
const count = st => {
  /* fetch(url)
       .then(res => res.json())
       .then (todo=>{
           todo.data.map(el=>{
              st.todos= el.attributes
           })
       })
       console.log(st,"state")*/
    return { todos: st.todos };
};
const ConnectedCount = ({ todos }) => (

    <h2> {todos.length} </h2>
);

const CountComponent = connect(count)(ConnectedCount);
export default CountComponent;

