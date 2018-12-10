import React, { Component } from "react";
import { connect } from "react-redux";
import Item from "./ItemsComponent";
import {addToDo, loadingToDo, deleteToDo} from "../actions";

const mapDispatchToProps = dispatch => {
    return {
        loadingToDo: () => dispatch(loadingToDo(dispatch))
    };
};
const mapStateToProps = state => {
    return {todos: state.todos};
};
class ProductList extends Component {
    componentDidMount () {
       this.props.loadingToDo()
    }
    render(){
console.log("propl",this.props)
console.log("statel",this.state)
        return(
            <div >
                <ul className="list-group list-group-flush"  onLoad={this.handleSubmit}>
                <Item />
                </ul>
            </div>
        )
    }
};

const ListComponent=connect(mapStateToProps, mapDispatchToProps)(ProductList)
export default ListComponent



