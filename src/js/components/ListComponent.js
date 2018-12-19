import React, { Component } from "react";
import { connect } from "react-redux";
import Item from "./ItemsComponent";
import {addToDo, loadingToDo, deleteToDo} from "../actions";
import Page from "./PaginationComponent"
const mapDispatchToProps = dispatch => {
    return {
        loadingToDo: () => dispatch(loadingToDo(dispatch))
    };
};
const mapStateToProps = state => {
    return {todos: state.todos, count: state.count};
};
const byTime =(p) => {
    p.sort((a,b)=>a.deadLine-b.deadLine)
}

class ProductList extends Component {

    render(){

        byTime(this.props.todos)
        if(this.props.todos.length>6)
            this.props.todos.pop()
        return(
            <div >
                <ul className="list-group list-group-flush"  onLoad={this.handleSubmit}>
                    <Item />
                    <Page />
                </ul>

            </div>
        )
    }

};

const ListComponent=connect(mapStateToProps)(ProductList)
export default ListComponent