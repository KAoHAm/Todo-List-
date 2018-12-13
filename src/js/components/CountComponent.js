import React from "react";
import { connect } from "react-redux";

const count = st => {
    return { count: st.count };
};
const ConnectedCount = ({ count }) => (
    <h2> {count} </h2>
);

const CountComponent = connect(count)(ConnectedCount);
export default CountComponent;

