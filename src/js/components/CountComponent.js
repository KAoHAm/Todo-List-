import React from "react";
import { connect } from "react-redux";
const count = st => {
    return { todos: st.count };
};
const ConnectedCount = ({ todos }) => (

    <h2> {

        todos} </h2>
);

const CountComponent = connect(count)(ConnectedCount);
export default CountComponent;

