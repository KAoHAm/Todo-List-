import React, {Component} from "react";
import {connect} from "react-redux";
import uuidv1 from "uuid";
import {DELETE_ToDo} from "../constants/action-types";
import  ItemsTodoComponent from "./ItemsTodoComponent"
const idv = uuidv1();

const mapStateToProps = state => {
    return {todos: state.todos, count: state.count};
};

const mapDispatchToProps = dispatch => {
    return {
        deleteToDo: (_id)=> dispatch({type: DELETE_ToDo, payload: {_id}})
    }
}


class ConnectedItem extends Component {

    render() {
        const    renderTodos = () => {
            return this.props.todos.map((todo, index) =>
                <ItemsTodoComponent delete={this.props.deleteToDo} key={idv + index} todo={todo}/>)
        }
        return (
            <div>
                {renderTodos()}
            </div>
        );
    }


}

const Item = connect(mapStateToProps, mapDispatchToProps)(ConnectedItem);
export default Item

