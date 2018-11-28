import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return { todos: state.todos };
};
const ConnectedCount = ({ todos }) => (
    <h2> {todos.length} </h2>
);

const CountComponent = connect(mapStateToProps)(ConnectedCount);
export default CountComponent;

